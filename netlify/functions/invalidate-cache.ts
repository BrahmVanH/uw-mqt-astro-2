import type { Handler, HandlerEvent } from '@netlify/functions';
import { getRedis } from './lib/redis';
import { queries, type QueryName } from './lib/generated-queries';
import { getContentQueryKey, getParentQueryNames } from './lib/schema-parser';
import crypto from "node:crypto";

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }


  const origin = event.headers['x-wp-webhook-source'];


  if (!origin) {
    throw new Error("Origin not allowed");
  }

  if (origin !== process.env.ALLOWED_ORIGIN_INVALIDATE_CACHE) {
    throw new Error("Origin not allowed");
  }


  const webhookSecret = process.env.INVALIDATE_CACHE_WEBHOOK_JWT;

  if (!webhookSecret) {
    console.error('WEBHOOK_SECRET_KEY not configured');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error' })
    };
  }

  const signature = event.headers['x-hub-signature-256'];
  const timestamp = event.headers['x-webhook-timestamp'];
  const source = event.headers['x-webhook-source'];

  if (!signature || !timestamp) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Missing authentication headers' })
    };
  }

  const now = Math.floor(Date.now() / 1000);
  const requestTime = parseInt(timestamp);

  if (Math.abs(now - requestTime) > 300) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Request timestamp too old' })
    };
  }

  const expectedSignature = 'sha256=' + crypto
    .createHmac('sha256', webhookSecret)
    .update(event.body || '')
    .digest('hex');

  if (!crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )) {
    console.error('Invalid signature');
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Invalid signature' })
    };
  }
  const body = JSON.parse(event.body || '{}');

  try {

    const redis = getRedis();

    const postTypeKey = body.graphql_plural_name

    let cursor = '0';
    let allKeys: string[] = [];

    do {
      const result = await redis.scan(cursor, { match: 'pageContent:*' });
      cursor = result[0];
      allKeys.push(...result[1]);
    } while (cursor !== '0');


    const keyValuePairs: Record<string, any> = {};

    if (allKeys.length > 0) {
      const values = await redis.mget(...allKeys);

      for (const [index, key] of allKeys.entries()) {
        keyValuePairs[key] = values[index];
      }

    }


    const postTypeParentPageQueryNames: QueryName[] = getParentQueryNames(postTypeKey, queries);


    const deletionPromises = postTypeParentPageQueryNames.map(async (queryName) => {
      const queryKey = getContentQueryKey(queryName);

      const result = await redis.del(queryKey);

      return { queryName, queryKey, deleted: result };
    });

    const deletionResults = await Promise.all(deletionPromises);

    const clearedKeys = deletionResults
      .filter(result => result.deleted > 0)
      .map(result => result.queryKey);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Cache invalidated successfully',
        postType: postTypeKey,
        clearedKeys: clearedKeys,
        deletionResults: deletionResults
      }),
    };

  } catch (error) {
    console.error('Error processing webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
import type { Handler, HandlerEvent } from '@netlify/functions';
import { getRedis } from './lib/redis';
import { queries, type QueryName } from './lib/generated-queries';
import { getContentQueryKey, getParentQueryNames } from './lib/schema-parser';

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  console.log("event: ", event)
  const origin = event.headers['x-wp-webhook-source'];

  if (!origin) {
    throw new Error("Origin not allowed");
  }

  if (origin !== process.env.ALLOWED_ORIGIN_INVALIDATE_CACHE) {
    throw new Error("Origin not allowed");
  }

  try {
    const body = JSON.parse(event.body || '{}');


    const redis = getRedis();

    const postTypeKey = body.graphql_plural_name
    console.log("postTypeKey: ", postTypeKey)

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
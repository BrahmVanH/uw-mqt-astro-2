import type { Handler, HandlerEvent } from '@netlify/functions';
import { getRedis } from './lib/redis';

/**
 * Manual cache purge function.
 * Clears both Upstash Redis page content cache AND Netlify CDN cache.
 *
 * Usage:
 *   POST https://<your-site>/.netlify/functions/manual-purge
 *   Headers: { "x-purge-secret": "<MANUAL_PURGE_SECRET env var>" }
 *   Body (optional): { "path": "/" }  — defaults to purging all pageContent keys
 *
 * Or use the query param for quick browser-based purge:
 *   GET https://<your-site>/.netlify/functions/manual-purge?secret=<SECRET>&path=/
 */
export const handler: Handler = async (event: HandlerEvent) => {
  // Support both GET (convenience) and POST
  const secret =
    event.headers['x-purge-secret'] ||
    (event.queryStringParameters?.secret ?? '');

  const expectedSecret = process.env.MANUAL_PURGE_SECRET;

  if (!expectedSecret) {
    console.error('MANUAL_PURGE_SECRET not configured');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error' }),
    };
  }

  if (secret !== expectedSecret) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }

  // Determine which path(s) to purge
  let targetPath: string | null = null;
  if (event.httpMethod === 'POST' && event.body) {
    try {
      const body = JSON.parse(event.body);
      targetPath = body.path ?? null;
    } catch {
      // ignore parse errors, purge all
    }
  } else {
    targetPath = event.queryStringParameters?.path ?? null;
  }

  const results: Record<string, unknown> = {};

  try {
    // 1. Clear Redis cache
    const redis = getRedis();

    if (targetPath) {
      // Delete specific page cache key(s) matching the path
      let cursor = '0';
      const matchingKeys: string[] = [];
      do {
        const result = await redis.scan(cursor, {
          match: `pageContent:${targetPath}:*`,
        });
        cursor = result[0];
        matchingKeys.push(...result[1]);
      } while (cursor !== '0');

      if (matchingKeys.length > 0) {
        await Promise.all(matchingKeys.map((key) => redis.del(key)));
      }
      results.redis = {
        cleared: matchingKeys.length,
        keys: matchingKeys,
      };
    } else {
      // Purge ALL pageContent keys
      let cursor = '0';
      const allKeys: string[] = [];
      do {
        const result = await redis.scan(cursor, { match: 'pageContent:*' });
        cursor = result[0];
        allKeys.push(...result[1]);
      } while (cursor !== '0');

      if (allKeys.length > 0) {
        await Promise.all(allKeys.map((key) => redis.del(key)));
      }
      results.redis = {
        cleared: allKeys.length,
        keys: allKeys,
      };
    }

    // 2. Purge Netlify CDN cache
    const siteId = process.env.NETLIFY_SITE_ID;
    const netlifyToken = process.env.NETLIFY_PURGE_TOKEN;

    if (siteId && netlifyToken) {
      const purgeResponse = await fetch(
        'https://api.netlify.com/api/v1/purge',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${netlifyToken}`,
          },
          body: JSON.stringify({
            site_id: siteId,
            // If no specific path, purge everything
            ...(targetPath ? { cache_tags: [`path:${targetPath}`] } : {}),
          }),
        },
      );

      results.netlify = {
        status: purgeResponse.status,
        ok: purgeResponse.ok,
        message: purgeResponse.ok
          ? 'CDN cache purged'
          : await purgeResponse.text(),
      };
    } else {
      results.netlify = {
        skipped: true,
        message:
          'NETLIFY_SITE_ID or NETLIFY_PURGE_TOKEN not configured — CDN cache not purged',
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Cache purge completed',
        targetPath: targetPath ?? 'ALL',
        results,
      }),
    };
  } catch (error) {
    console.error('Error during manual purge:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal server error',
        details: String(error),
      }),
    };
  }
};

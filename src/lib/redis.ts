import { Redis } from "@upstash/redis";
import {
  UPSTASH_REDIS_URL,
  UPSTASH_REDIS_TOKEN,
} from "astro:env/server";

export function getRedis() {
  return new Redis({
    url: UPSTASH_REDIS_URL,
    token: UPSTASH_REDIS_TOKEN,
  });
}

import { type AuthTokens, getAuthTokens, refreshAuthToken } from "./API";
import { onError } from "./error";

export async function getOrRefreshTokens(): Promise<AuthTokens["authToken"]> {
  const redis = getRedis();
  const authTtl = 300; // 5 minutes
  const refreshTtl = 604800; // 7 days
  const authTokenKey = "wp_auth_token";
  const refreshTokenKey = "wp_refresh_token";

  try {
    // Try to get existing tokens
    const [authToken, refreshToken] = await Promise.all([
      redis.get(authTokenKey),
      redis.get(refreshTokenKey),
    ]);
    // If we have a refresh token but no auth token, refresh
    if (refreshToken && !authToken) {
      try {
        const tokens = await refreshAuthToken(refreshToken as string);
        // Store new tokens
        await Promise.all([
          redis.set(authTokenKey, tokens.authToken, { ex: authTtl }), // 10 minutes - 1 second
        ]);
        return tokens.authToken;
      } catch (error) {
        // If refresh fails, clear tokens and do full login
        await Promise.all([
          redis.del(authTokenKey),
          redis.del(refreshTokenKey),
        ]);
      }
    }

    // If no valid tokens, do full login
    if (!authToken || !refreshToken) {
      const tokens = await getAuthTokens();
      if (!tokens) {
        throw new Error("Failed to get tokens");
      }
      await Promise.all([
        redis.set(authTokenKey, tokens.authToken, { ex: authTtl }), // 5 minutes
        redis.set(refreshTokenKey, tokens.refreshToken, { ex: refreshTtl }), // 7 days
      ]);
      return tokens.authToken;
    }

    return authToken as string;
  } catch (error: any) {
    onError("getOrRefreshTokens", error);
    throw error;
  }
}

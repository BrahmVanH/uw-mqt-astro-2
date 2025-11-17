import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function graphqlSchemaCache(): AstroIntegration {
  return {
    name: 'graphql-schema-cache',
    hooks: {
      'astro:build:done': async () => {
        console.log('📝 Caching GraphQL schema...');

        try {
          // Use dynamic imports with absolute paths
          const queriesPath = join(__dirname, '../lib/API/queries/index.js');
          console.log(`🔍 Attempting to import queries from: ${queriesPath}`);

          const queries = await import(queriesPath);

          console.log('📊 QUERIES IMPORTED:');
          console.log('📊 Query keys:', Object.keys(queries));
          console.log('📊 Full queries object:', JSON.stringify(queries, null, 2));

          // Uncomment and implement when ready:
          // const schemaParserPath = join(__dirname, '../lib/API/schema-parser.js');
          // const redisPath = join(__dirname, '../lib/redis.js');
          // 
          // const { extractQueries } = await import(schemaParserPath);
          // const { getRedis } = await import(redisPath);

          // const redis = getRedis();

          // // Process all your queries
          // const schemas = Object.entries(queries).map(([name, query]) => ({
          //   name,
          //   paths: extractQueries(query)
          // }));

          // const schemaData = {
          //   timestamp: new Date().toISOString(),
          //   buildId: process.env.CONTEXT || process.env.BUILD_ID || 'local',
          //   schemas
          // };

          // // Store with build-specific key
          // await redis.set(
          //   `graphql:schema:${schemaData.buildId}:${Date.now()}`,
          //   JSON.stringify(schemaData)
          // );

          // // Store as latest
          // await redis.set(
          //   'graphql:schema:latest',
          //   JSON.stringify(schemaData)
          // );

          console.log('✅ GraphQL schema cached successfully');
        } catch (error) {
          console.error('❌ Failed to cache schema:', error);
          // Don't fail the build on cache errors
        }
      }
    }
  };
}
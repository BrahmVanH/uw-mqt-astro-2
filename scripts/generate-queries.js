import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const queriesDir = path.join(__dirname, '../src/lib/API/queries');
const outputFile = path.join(__dirname, '../netlify/functions/lib/generated-queries.ts');

// Collect all queries and fragments from all subdirectories
function collectAllQueries(dir, queries = {}) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively search subdirectories
      collectAllQueries(filePath, queries);
    } else if (file.endsWith('.ts')) {
      const content = fs.readFileSync(filePath, 'utf-8');

      // Extract all exported queries/fragments - more flexible regex
      const exportMatches = content.matchAll(/export const (\w+(?:Query|Fragment|ComponentQuery)) = gql`([\s\S]*?)`;/g);

      for (const match of exportMatches) {
        const [, name, query] = match;
        queries[name] = query.trim();
        console.log(`Found: ${name} in ${filePath}`);
      }
    }
  });

  return queries;
}

function resolveTemplateReferences(queryString, allQueries) {
  // Replace template literal references with actual query content
  return queryString.replace(/\$\{(\w+)\}/g, (match, varName) => {
    console.log(`Trying to resolve: ${varName}`);
    if (allQueries[varName]) {
      console.log(`✓ Resolved: ${varName}`);
      // Recursively resolve any nested references
      return resolveTemplateReferences(allQueries[varName], allQueries);
    }

    // If we can't resolve it, leave it as is (might be an actual variable)
    console.warn(`⚠️  Warning: Could not resolve template reference: ${varName}`);
    return match;
  });
}

function generateQueriesFile() {
  // Collect all queries from all directories
  console.log(`Scanning directory: ${queriesDir}`);
  const allQueries = collectAllQueries(queriesDir);

  console.log('\nAll found queries:', Object.keys(allQueries));

  // Resolve template references in all queries
  const resolvedQueries = {};

  Object.entries(allQueries).forEach(([name, query]) => {
    console.log(`\nProcessing: ${name}`);
    resolvedQueries[name] = resolveTemplateReferences(query, allQueries);
  });

  // Create the output directory if it doesn't exist
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const output = `// Auto-generated file - do not edit manually
export const queries = ${JSON.stringify(resolvedQueries, null, 2)} as const;

export type QueryName = keyof typeof queries;
`;

  fs.writeFileSync(outputFile, output);
  console.log(`\nGenerated queries file with ${Object.keys(resolvedQueries).length} queries`);
}

generateQueriesFile();
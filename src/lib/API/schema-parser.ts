
import type { DocumentNode } from 'graphql';

/**
 * Extracts top-level query names from a GraphQL query string or DocumentNode
 * @param query - A GraphQL query string wrapped in gql`` or a DocumentNode
 * @returns Array of top-level query/component names
 * 
 * @example
 * const query = gql`
 *   query HomePage {
 *     homePageHeroes {
 *       nodes {
 *         homePageHeroFields {
 *           heading
 *         }
 *       }
 *     }
 *     partnersComponents {
 *       nodes { ... }
 *     }
 *   }
 * `;
 * 
 * extractQueries(query);
 * // Returns: ['homePageHeroes', 'partnersComponents']
 */
export function extractQueries(query: DocumentNode | string): string[] {
  let queryString: string;

  // Handle both DocumentNode and string inputs
  if (typeof query === 'string') {
    queryString = query;
  } else if (query && typeof query === 'object' && 'loc' in query) {
    // Extract the query string from DocumentNode
    queryString = query.loc?.source?.body || '';
  } else {
    throw new Error('Invalid query format. Expected DocumentNode or string.');
  }

  // Remove comments and normalize whitespace
  const cleanedQuery = queryString
    .replace(/#[^\n]*/g, '') // Remove comments
    .replace(/\$\{[^}]+\}/g, '') // Remove fragment interpolations like ${fragmentName}
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  // Extract the main query body (everything between the outermost braces)
  // Handle both named queries (query Name { }) and anonymous queries ({ })
  const queryBodyMatch = cleanedQuery.match(/(?:query|mutation|subscription)?\s*\w*\s*\{([\s\S]*)\}$/);
  if (!queryBodyMatch) {
    return [];
  }

  const queryBody = queryBodyMatch[1];

  // Parse only the top-level fields
  const topLevelQueries = parseTopLevel(queryBody);

  // Remove duplicates while preserving order
  return [...new Set(topLevelQueries)];
}

/**
 * Parses the top level of a GraphQL selection set
 */
function parseTopLevel(selectionSet: string): string[] {
  const queries: string[] = [];

  let depth = 0;
  let currentField = '';
  let inString = false;
  let stringChar = '';
  let inFragmentSpread = false;

  for (let i = 0; i < selectionSet.length; i++) {
    const char = selectionSet[i];
    const prevChar = i > 0 ? selectionSet[i - 1] : '';

    // Handle string literals
    if ((char === '"' || char === "'") && prevChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
        stringChar = '';
      }
      if (depth === 0) {
        currentField += char;
      }
      continue;
    }

    // Skip processing inside strings
    if (inString) {
      if (depth === 0) {
        currentField += char;
      }
      continue;
    }

    // Track fragment spreads (e.g., ...FragmentName)
    if (char === '.' && selectionSet[i + 1] === '.' && selectionSet[i + 2] === '.') {
      inFragmentSpread = true;
      i += 2;
      continue;
    }

    // Handle opening braces
    if (char === '{') {
      if (depth === 0 && currentField.trim()) {
        const fieldName = extractFieldName(currentField.trim());
        if (fieldName) {
          queries.push(fieldName);
        }
        currentField = '';
      }
      depth++;
    }
    // Handle closing braces
    else if (char === '}') {
      depth--;
      if (depth === 0) {
        if (currentField.trim() && !inFragmentSpread) {
          const fieldName = extractFieldName(currentField.trim());
          if (fieldName) {
            queries.push(fieldName);
          }
        }
        currentField = '';
      }
    }
    // Handle field separators at the root level
    else if (depth === 0 && (char === ' ' || char === '\n' || char === ',' || char === '\t')) {
      if (currentField.trim() && !inFragmentSpread) {
        const fieldName = extractFieldName(currentField.trim());
        if (fieldName) {
          queries.push(fieldName);
        }
      }
      currentField = '';
      inFragmentSpread = false;
    }
    // Build up the current field name
    else if (depth === 0) {
      currentField += char;
    }
  }

  // Handle the last field if there is one
  if (depth === 0 && currentField.trim() && !inFragmentSpread) {
    const fieldName = extractFieldName(currentField.trim());
    if (fieldName) {
      queries.push(fieldName);
    }
  }

  return queries;
}

/**
 * Extracts the field name from a field definition
 */
function extractFieldName(field: string): string {
  if (!field) return '';

  field = field.trim();

  // Skip variables (e.g., $variable)
  if (field.startsWith('$')) return '';

  // Skip fragment spreads (e.g., ...FragmentName)
  if (field.startsWith('...')) return '';

  // Skip directives (e.g., @include, @skip)
  if (field.startsWith('@')) return '';

  // Remove arguments (everything in parentheses), handling nested parens
  let withoutArgs = '';
  let parenDepth = 0;
  for (let i = 0; i < field.length; i++) {
    if (field[i] === '(') {
      parenDepth++;
    } else if (field[i] === ')') {
      parenDepth--;
    } else if (parenDepth === 0) {
      withoutArgs += field[i];
    }
  }

  // Handle aliases (e.g., "alias: fieldName" -> "fieldName")
  const aliasMatch = withoutArgs.match(/^\s*(\w+)\s*:\s*(\w+)/);
  if (aliasMatch) {
    return aliasMatch[2]; // Return the actual field name, not the alias
  }

  // Extract just the field name
  const fieldMatch = withoutArgs.match(/^(\w+)/);
  return fieldMatch ? fieldMatch[1] : '';
}
import { queries, type QueryName } from './generated-queries.js';

type QueryCollection = Record<string, string>;

/**
 * Removes trailing slash from a path string
 */
const removeTrailingSlash = (path: string): string => {
  return path.replace(/\/$/, "");
};


export function getContentQueryKey(queryName: QueryName): string {
  const queryKey = getContentQueryPath(queryName);
  return "pageContent:" + queryKey + "/:{}"
}

/**
 * Gets the query name (key) for a given path
 * @param path - The URL path to get the query name for
 * @returns The query name/key from generated-queries.ts
 */
function getContentQueryPath(queryName: QueryName): string {

  switch (queryName) {
    case "homePageQuery":
      return "";
    case "partnerPageQuery":
      return "/get-involved/partner";
    case "ourImpactPageQuery":
      return "/our-impact";
    case "healthyCommunityPageQuery":
      return "/our-impact/healthy-community";
    case "financialSecurityPageQuery":
      return "/our-impact/financial-security";
    case "communityResiliencyPageQuery":
      return "/our-impact/community-resiliency";
    case "youthOpportunityPageQuery":
      return "/our-impact/youth-opportunity";
    case "campaignToolkitPageQuery":
      return "/get-involved/partner/campaign-toolkit";
    case "valuesHistoryPageQuery":
      return "/about/values-history";
    case "ourCulturePageQuery":
      return "/about/our-culture";
    case "ourLeadershipPageQuery":
      return "/about/our-leadership";
    case "getInvolvedPageQuery":
      return "/get-involved";
    case "individualsPageQuery":
      return "/get-involved/individuals";
    case "agenciesPageQuery":
      return "/get-involved/partner/agencies";
    case "aliceReportContentQuery":
      return "/united-for-alice";
    default:
      return "/";
  }
}

/**
 * Extracts top-level query names from a GraphQL query string
 * @param query - A GraphQL query string
 * @returns Array of top-level query/component names
 */
export function extractQueries(query: string): string[] {
  const cleanedQuery = query
    .replace(/#[^\n]*/g, '')
        .replace(/\$\{[^}]+\}/g, '') 
    .replace(/\s+/g, ' ') 
    .trim();

  const queryBodyMatch = cleanedQuery.match(/(?:query|mutation|subscription)?\s*\w*\s*\{([\s\S]*)\}$/);
  if (!queryBodyMatch) {
    return parseTopLevel(cleanedQuery);
  }

  const queryBody = queryBodyMatch[1];

  const topLevelQueries = parseTopLevel(queryBody);

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

    if (inString) {
      if (depth === 0) {
        currentField += char;
      }
      continue;
    }

    if (char === '.' && selectionSet[i + 1] === '.' && selectionSet[i + 2] === '.') {
      inFragmentSpread = true;
      i += 2;
      continue;
    }

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
    else if (depth === 0) {
      currentField += char;
    }
  }

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

  if (field.startsWith('$')) return '';

  if (field.startsWith('...')) return '';

  if (field.startsWith('@')) return '';

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

  const aliasMatch = withoutArgs.match(/^\s*(\w+)\s*:\s*(\w+)/);
  if (aliasMatch) {
    return aliasMatch[2]; 
  }

  const fieldMatch = withoutArgs.match(/^(\w+)/);
  return fieldMatch ? fieldMatch[1] : '';
}

/**
 * Creates a record mapping top-level component query names to arrays of their parent query names
 * @returns Record where keys are component query names and values are arrays of parent query names
 */
export function createQueryComponentMap(queries: QueryCollection): Record<string, string[]> {
  const queryComponentMap: Record<string, string[]> = {};

  for (const [queryName, queryString] of Object.entries(queries)) {
    const componentQueries = extractQueries(queryString);

    for (const componentQuery of componentQueries) {
      if (!queryComponentMap[componentQuery]) {
        queryComponentMap[componentQuery] = [];
      }
      if (!queryComponentMap[componentQuery].includes(queryName)) {
        queryComponentMap[componentQuery].push(queryName);
      }
    }
  }

  return queryComponentMap;
}

/**
 * Gets all parent query names for a specific component query
 * @param componentQueryName - The name of the component query to look up
 * @returns Array of parent query names if found, empty array otherwise
 */
export function getParentQueryNames(componentQueryName: string, queries: QueryCollection): QueryName[] {
  const queryComponentMap = createQueryComponentMap(queries);
  return (queryComponentMap[componentQueryName] as QueryName[]) || [];
}

/**
 * Gets the primary (first) parent query name for a specific component query
 * For backwards compatibility - returns the first parent if multiple exist
 * @param componentQueryName - The name of the component query to look up
 * @returns The first parent query name if found, undefined otherwise
 */
export function getParentQueryName(componentQueryName: string, queries: QueryCollection): string | undefined {
  const parents = getParentQueryNames(componentQueryName, queries);
  return parents.length > 0 ? parents[0] : undefined;
}

/**
 * Gets all component queries for a specific parent query
 * @param parentQueryName - The name of the parent query
 * @returns Array of component query names that belong to the parent query
 */
export function getComponentQueries(parentQueryName: string): string[] {
  const queryString = queries[parentQueryName as QueryName];
  if (!queryString) {
    return [];
  }

  return extractQueries(queryString);
}



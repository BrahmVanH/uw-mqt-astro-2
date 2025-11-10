// src/lib/API/sanitize.ts

// Simple regex-based sanitization for SSR environments
// This avoids jsdom/DOM dependencies that cause issues in serverless functions
export function sanitizeHTML(dirty: string): string {
  if (typeof dirty !== 'string') {
    return '';
  }

  // Remove script tags and their content
  let clean = dirty.replaceAll(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove dangerous event handlers
  clean = clean.replaceAll(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');

  // Remove javascript: URLs
  clean = clean.replaceAll(/javascript:/gi, '');

  // Remove style attributes (optional - comment out if you need them)
  // clean = clean.replaceAll(/\s*style\s*=\s*["'][^"']*["']/gi, '');

  // Remove dangerous tags
  const dangerousTags = ['script', 'object', 'embed', 'form', 'input', 'textarea', 'select', 'button', 'iframe'];
  for (const tag of dangerousTags) {
    const regex = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
    clean = clean.replaceAll(regex, '');
  }

  // Allow only specific tags (more restrictive approach)
  const allowedTags = new Set(['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img']);
  const tagPattern = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;

  clean = clean.replaceAll(tagPattern, (match, tagName) => {
    if (allowedTags.has(tagName.toLowerCase())) {
      // For allowed tags, still remove dangerous attributes
      let cleanTag = match;
      cleanTag = cleanTag.replaceAll(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
      cleanTag = cleanTag.replaceAll(/javascript:/gi, '');
      return cleanTag;
    }
    return ''; // Remove disallowed tags
  });

  return clean;
}
// src/lib/sanitize.ts
import DOMPurify, { type WindowLike } from 'dompurify';
import { JSDOM } from 'jsdom';

// For server-side rendering (Astro build time)
function createDOMPurify() {
  if (typeof window !== 'undefined') {
    // Client-side
    return DOMPurify;
  } else {
    // Server-side
    const window = new JSDOM('').window as unknown as WindowLike;
    return DOMPurify(window);
  }
}

export function sanitizeHTML(dirty: string): string {
  const purify = createDOMPurify();

  return purify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'span', 'div',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'a', 'img'
    ],
    ALLOWED_ATTR: [
      'href', 'title', 'alt', 'src', 'width', 'height',
      'class', 'id', 'style'
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    ADD_ATTR: ['target'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
    FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input', 'textarea', 'select', 'button']
  });
}
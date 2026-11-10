import sanitizeHtml from 'sanitize-html';

const LENGTH = /^-?[\d.]+(px|rem|em|%)?( -?[\d.]+(px|rem|em|%)?){0,3}$/;
const COLOR = /^(#[0-9a-f]{3,8}|rgba?\([\d.,\s%]+\)|[a-z]+)$/i;
const BORDER = /^[\d.]+px (solid|dashed|dotted) (#[0-9a-f]{3,8}|rgba?\([\d.,\s%]+\)|[a-z]+)$/i;

// Each value is matched exactly, so url(), expression() and positioning cannot get through.
const allowedStyles: Record<string, RegExp[]> = {
  margin: [LENGTH],
  'margin-top': [LENGTH],
  'margin-bottom': [LENGTH],
  padding: [LENGTH],
  width: [LENGTH],
  'border-radius': [LENGTH],
  'font-size': [LENGTH],
  'letter-spacing': [LENGTH],
  'line-height': [/^[\d.]+$/],
  color: [COLOR],
  background: [COLOR],
  'background-color': [COLOR],
  border: [BORDER],
  'border-left': [BORDER],
  'font-weight': [/^(normal|bold|[1-9]00)$/],
  'font-family': [/^['"\w\s,-]+$/],
  display: [/^(block|inline|inline-block)$/],
  'text-decoration': [/^(none|underline)$/],
  'text-transform': [/^(none|uppercase|lowercase|capitalize)$/],
};

const options: sanitizeHtml.IOptions = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code',
    'strong', 'b', 'em', 'i', 'u', 's', 'sub', 'sup', 'span', 'div', 'section', 'header',
    'figure', 'figcaption', 'table', 'caption', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'a', 'img',
  ],
  allowedAttributes: {
    '*': ['class', 'style'],
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding'],
    h2: ['id'],
    h3: ['id'],
    th: ['colspan', 'rowspan'],
    td: ['colspan', 'rowspan'],
  },
  allowedStyles: { '*': allowedStyles },
  allowedSchemes: ['http', 'https', 'mailto'],
  allowedSchemesByTag: { img: ['http', 'https'] },
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName, attribs) => ({
      tagName,
      attribs: attribs.target === '_blank' ? { ...attribs, rel: 'noopener noreferrer' } : attribs,
    }),
  },
};

/** Article bodies come from the database, so they are cleaned at the point of rendering. */
export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, options);
}

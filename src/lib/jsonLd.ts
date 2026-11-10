/**
 * Serialises structured data for a <script> tag. JSON.stringify alone leaves "<"
 * intact, so a database value containing "</script>" could break out of the tag.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

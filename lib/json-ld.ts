/**
 * JSON.stringify does not escape "</", so a stray "</script>" inside CMS
 * content (article titles, excerpts, FAQ answers) could close the JSON-LD
 * <script> tag early and inject arbitrary markup. Escaping "<" keeps the
 * JSON valid while making that impossible.
 */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

// Images are served from the local public directory instead of CloudFront
export function getImageUrl(src: string) {
  if (!src) return '';
  // If the src already starts with http, return it as is
  if (src.startsWith('http')) return src;

  // Serve from the local public directory
  return `/${src}`;
}

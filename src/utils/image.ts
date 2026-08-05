// Images are served from the local public directory instead of CloudFront
export function getImageUrl(src: string) {
  if (!src) return '';
  // If the src already starts with http, return it as is
  if (src.startsWith('http')) return src;

  if (src.startsWith('users/') || src.startsWith('companies/') || src.startsWith('platforms/')) {
    return `${import.meta.env.VITE_API_URL}/s3/serve-images-plataform-prod/${src}`;
  }

  // Serve static images from the local public directory
  return `/${src}`;
}

// Images are served from the local public directory instead of CloudFront
export function getImageUrl(src: string) {
  if (!src) {
    return '';
  }
  
  // Intercept old AWS URLs and rewrite to local MinIO proxy
  if (src.includes('s3.amazonaws.com')) {
    const pathIndex = src.indexOf('.com/') + 4;
    const path = src.substring(pathIndex); // starts with '/'

    return `${import.meta.env.VITE_API_URL}/s3/serve-images-plataform-prod${path}`;
  }

  // If the src already starts with http, return it as is
  if (src.startsWith('http')) {
    return src;
  }

  const s3Prefixes = [
    'users/', 'companies/', 'platforms/', 'open_badges/', 
    'public_templates/', 'public_certificates/', 'background_images/', 
    'images/', 'files/', 'pj/'
  ];

  if (s3Prefixes.some(prefix => src.startsWith(prefix))) {
    return `${import.meta.env.VITE_API_URL}/s3/serve-images-plataform-prod/${src}`;
  }

  // Serve static images from the local public directory
  return `/${src}`;
}

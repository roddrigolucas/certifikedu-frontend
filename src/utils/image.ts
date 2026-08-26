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

  // Static images in the local public directory
  if (src.startsWith('images/') || src.startsWith('/images/')) {
    return src.startsWith('/') ? src : `/${src}`;
  }

  // All other dynamic image paths (UUIDs, certificates, templates, backgrounds, etc.) come from MinIO
  const cleanPath = src.startsWith('/') ? src.substring(1) : src;
  
return `${import.meta.env.VITE_API_URL}/s3/serve-images-plataform-prod/${cleanPath}`;
}

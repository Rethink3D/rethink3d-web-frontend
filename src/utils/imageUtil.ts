export const getImageUrl = (path: string | undefined): string => {
  if (!path) return "/placeholder-image.png";
  if (path.startsWith("http")) return path;

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  if (cleanPath.startsWith("files/")) return `${baseUrl}/${cleanPath}`;

  return `${baseUrl}/files/${cleanPath}`;
};

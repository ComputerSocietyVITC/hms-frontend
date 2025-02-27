import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const bucketName =
  process.env.NEXT_PUBLIC_MINIO_BUCKET_NAME || "nextjs-uploads";
const host = process.env.NEXT_PUBLIC_MINIO_HOST || "localhost";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGithubUsername(github: string | null) {
  return github?.match(/github\.com\/([^/]+)/)?.[1] || null;
}

export function getImageUrl(imageId: string | null, mimeType: string | null) {
  if (!imageId || !mimeType) return null;

  return `${host}/${bucketName}/${imageId}.${mimeType}`;
}

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.S3_REGION || "auto",
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
});

const bucket = process.env.S3_BUCKET ?? "ccau-images";

/**
 * Generate a presigned PUT URL for device image uploads.
 * Expires in 5 minutes (300 seconds).
 */
export async function generatePresignedPutUrl(
  s3Key: string
): Promise<{ url: string; expiresIn: number }> {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: s3Key,
    ContentType: "image/jpeg",
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });
  return { url, expiresIn: 300 };
}

/**
 * Generate a presigned GET URL for viewing images.
 * Expires in 5 minutes (300 seconds).
 */
export async function generatePresignedGetUrl(
  s3Key: string
): Promise<{ url: string; expiresIn: number }> {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: s3Key,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 300 });
  return { url, expiresIn: 300 };
}

/**
 * Get object metadata (size, content type) from S3.
 */
export async function getObjectHead(s3Key: string) {
  const command = new HeadObjectCommand({
    Bucket: bucket,
    Key: s3Key,
  });

  const response = await s3Client.send(command);
  return {
    contentLength: response.ContentLength,
    contentType: response.ContentType,
  };
}

/**
 * Construct the standard S3 key for a camera image.
 * Format: timelapse/{SITE_ID}/{DEVICE_ID}/{YYYY}/{MM}/{DD}/{filename}
 */
export function buildS3Key(
  siteId: string,
  deviceId: string,
  capturedAt: Date,
  filename: string
): string {
  const year = capturedAt.getUTCFullYear();
  const month = String(capturedAt.getUTCMonth() + 1).padStart(2, "0");
  const day = String(capturedAt.getUTCDate()).padStart(2, "0");

  return `timelapse/${siteId}/${deviceId}/${year}/${month}/${day}/${filename}`;
}

/**
 * Derive the thumbnail S3 key from an image S3 key.
 * Convention: thumbnails/{same_path_as_original}
 */
export function thumbnailKeyFromImageKey(imageS3Key: string): string {
  return imageS3Key.replace(/^timelapse\//, "thumbnails/");
}

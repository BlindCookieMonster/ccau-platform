import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { images, devices } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getObjectHead } from "@/lib/s3";

/**
 * POST /api/webhooks/s3
 *
 * Receives S3 event notifications for new image uploads.
 * Parses the S3 key, looks up the device, and inserts an images row.
 *
 * Expected S3 key format:
 *   timelapse/{SITE_ID}/{DEVICE_ID}/{YYYY}/{MM}/{DD}/{filename}.jpg
 */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Handle SNS subscription confirmation
  if (body.Type === "SubscriptionConfirmation") {
    // Auto-confirm by fetching the SubscribeURL
    if (typeof body.SubscribeURL === "string") {
      await fetch(body.SubscribeURL);
    }
    return NextResponse.json({ ok: true });
  }

  // Handle SNS notification wrapping S3 event
  let records: Array<Record<string, unknown>> = [];

  if (body.Type === "Notification" && typeof body.Message === "string") {
    // SNS wraps the S3 event in Message
    try {
      const message = JSON.parse(body.Message);
      records = message.Records ?? [];
    } catch {
      return NextResponse.json(
        { error: "Could not parse SNS message" },
        { status: 400 }
      );
    }
  } else if (body.Records && Array.isArray(body.Records)) {
    // Direct S3 event notification
    records = body.Records;
  }

  for (const record of records) {
    const s3Info = record.s3 as
      | { object?: { key?: string; size?: number }; bucket?: { name?: string } }
      | undefined;

    const s3Key = s3Info?.object?.key;
    const fileSize = s3Info?.object?.size;

    if (!s3Key || typeof s3Key !== "string") continue;

    // Parse the key: timelapse/{SITE_ID}/{DEVICE_ID}/{YYYY}/{MM}/{DD}/{filename}
    const keyMatch = s3Key.match(
      /^timelapse\/([^/]+)\/([^/]+)\/(\d{4})\/(\d{2})\/(\d{2})\/(.+)$/
    );
    if (!keyMatch) continue;

    const [, , deviceIdStr, , , , filename] = keyMatch;

    // Parse timestamp from filename
    const timestampMatch = filename.match(
      /(\d{4})-(\d{2})-(\d{2})T(\d{2})-(\d{2})-(\d{2})Z?/
    );
    if (!timestampMatch) continue;

    const [, year, month, day, hour, minute, second] = timestampMatch;
    const capturedAt = new Date(
      `${year}-${month}-${day}T${hour}:${minute}:${second}Z`
    );

    // Look up device
    const [device] = await db
      .select()
      .from(devices)
      .where(eq(devices.deviceId, deviceIdStr))
      .limit(1);

    if (!device || !device.projectId) continue;

    // Get file size from S3 if not in the event
    let fileSizeBytes = typeof fileSize === "number" ? fileSize : null;
    if (!fileSizeBytes) {
      try {
        const head = await getObjectHead(s3Key);
        fileSizeBytes = head.contentLength ?? null;
      } catch {
        // Non-critical — continue without size
      }
    }

    // Insert image row (skip if s3_key already exists)
    try {
      await db
        .insert(images)
        .values({
          deviceId: device.id,
          projectId: device.projectId,
          s3Key,
          capturedAt,
          fileSizeBytes,
          qaStatus: "pending",
          thumbnailS3Key: s3Key.replace(/^timelapse\//, "thumbnails/"),
        })
        .onConflictDoNothing();
    } catch {
      // Duplicate key or other constraint — skip
      continue;
    }

    // Update device last_seen_at
    await db
      .update(devices)
      .set({
        lastSeenAt: new Date(),
        status: "online",
      })
      .where(eq(devices.id, device.id));
  }

  return NextResponse.json({ ok: true });
}

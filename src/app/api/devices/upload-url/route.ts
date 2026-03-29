import { NextRequest, NextResponse } from "next/server";
import { authenticateDevice } from "@/lib/device-auth";
import { generatePresignedPutUrl, buildS3Key } from "@/lib/s3";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * GET /api/devices/upload-url?filename=CAM001_2026-03-29T14-00-00Z.jpg
 *
 * Device auth via X-Device-Key header.
 * Returns a presigned S3 PUT URL scoped to the device's project.
 */
export async function GET(request: NextRequest) {
  const device = await authenticateDevice(request);
  if (!device) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const filename = request.nextUrl.searchParams.get("filename");
  if (!filename) {
    return NextResponse.json(
      { error: "Missing filename parameter" },
      { status: 400 }
    );
  }

  // Validate filename format: {DEVICE_ID}_{TIMESTAMP}.jpg
  const filenameRegex = /^[A-Za-z0-9]+_\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}Z?\.\w+$/;
  if (!filenameRegex.test(filename)) {
    return NextResponse.json(
      { error: "Invalid filename format. Expected: DEVICE_YYYY-MM-DDTHH-MM-SSZ.jpg" },
      { status: 400 }
    );
  }

  if (!device.projectId) {
    return NextResponse.json(
      { error: "Device not assigned to a project" },
      { status: 400 }
    );
  }

  // Look up the project to get site_id
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, device.projectId))
    .limit(1);

  if (!project) {
    return NextResponse.json(
      { error: "Project not found" },
      { status: 404 }
    );
  }

  // Parse timestamp from filename
  // Expected: CAM001_2026-03-29T14-00-00Z.jpg
  const timestampMatch = filename.match(
    /(\d{4})-(\d{2})-(\d{2})T(\d{2})-(\d{2})-(\d{2})Z?/
  );
  if (!timestampMatch) {
    return NextResponse.json(
      { error: "Could not parse timestamp from filename" },
      { status: 400 }
    );
  }

  const [, year, month, day, hour, minute, second] = timestampMatch;
  const capturedAt = new Date(
    `${year}-${month}-${day}T${hour}:${minute}:${second}Z`
  );

  const s3Key = buildS3Key(project.siteId, device.deviceId, capturedAt, filename);
  const { url, expiresIn } = await generatePresignedPutUrl(s3Key);

  return NextResponse.json({
    upload_url: url,
    s3_key: s3Key,
    expires_in: expiresIn,
  });
}

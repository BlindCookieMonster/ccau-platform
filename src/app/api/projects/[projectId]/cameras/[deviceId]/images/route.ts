import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { images, devices, projects, tenants } from "@/db/schema";
import { eq, and, gte, lt, sql } from "drizzle-orm";
import { generatePresignedGetUrl } from "@/lib/s3";

type RouteParams = {
  params: Promise<{ projectId: string; deviceId: string }>;
};

/**
 * GET /api/projects/[projectId]/cameras/[deviceId]/images?date=YYYY-MM-DD
 * List images for a specific camera on a specific day.
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { projectId, deviceId } = await params;
  const { orgId } = await auth();
  if (!orgId) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  // Verify tenant owns this project
  const [tenant] = await db
    .select()
    .from(tenants)
    .where(eq(tenants.clerkOrgId, orgId))
    .limit(1);

  if (!tenant) {
    return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
  }

  const [project] = await db
    .select()
    .from(projects)
    .where(and(eq(projects.id, projectId), eq(projects.tenantId, tenant.id)))
    .limit(1);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  // Verify device belongs to this project
  const [device] = await db
    .select()
    .from(devices)
    .where(and(eq(devices.id, deviceId), eq(devices.projectId, projectId)))
    .limit(1);

  if (!device) {
    return NextResponse.json({ error: "Device not found" }, { status: 404 });
  }

  const dateParam = request.nextUrl.searchParams.get("date");
  if (!dateParam || !/^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
    return NextResponse.json(
      { error: "date parameter required (YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  const dayStart = new Date(`${dateParam}T00:00:00Z`);
  const dayEnd = new Date(`${dateParam}T23:59:59.999Z`);

  const imageList = await db
    .select({
      id: images.id,
      capturedAt: images.capturedAt,
      thumbnailS3Key: images.thumbnailS3Key,
      s3Key: images.s3Key,
      qaStatus: images.qaStatus,
      qaFlags: images.qaFlags,
      sidecarBatteryV: images.sidecarBatteryV,
      sidecarSignalRssi: images.sidecarSignalRssi,
      fileSizeBytes: images.fileSizeBytes,
      width: images.width,
      height: images.height,
    })
    .from(images)
    .where(
      and(
        eq(images.deviceId, deviceId),
        eq(images.projectId, projectId),
        gte(images.capturedAt, dayStart),
        lt(images.capturedAt, dayEnd)
      )
    )
    .orderBy(images.capturedAt);

  // Generate presigned URLs for thumbnails
  const imagesWithUrls = await Promise.all(
    imageList.map(async (img) => {
      let thumbnailUrl: string | null = null;
      if (img.thumbnailS3Key) {
        try {
          const { url } = await generatePresignedGetUrl(img.thumbnailS3Key);
          thumbnailUrl = url;
        } catch {
          // Fall back to original if thumbnail doesn't exist
          const { url } = await generatePresignedGetUrl(img.s3Key);
          thumbnailUrl = url;
        }
      }

      return {
        id: img.id,
        captured_at: img.capturedAt,
        thumbnail_url: thumbnailUrl,
        qa_status: img.qaStatus,
        qa_flags: img.qaFlags,
        sidecar_battery_v: img.sidecarBatteryV,
        sidecar_signal_rssi: img.sidecarSignalRssi,
        file_size_bytes: img.fileSizeBytes,
        width: img.width,
        height: img.height,
      };
    })
  );

  return NextResponse.json({
    images: imagesWithUrls,
    count: imagesWithUrls.length,
    date: dateParam,
  });
}

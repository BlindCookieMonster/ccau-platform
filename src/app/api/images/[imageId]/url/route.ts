import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { images, projects, tenants } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { generatePresignedGetUrl } from "@/lib/s3";

type RouteParams = { params: Promise<{ imageId: string }> };

/**
 * GET /api/images/[imageId]/url
 * Generate a presigned GET URL for a full-resolution image.
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { imageId } = await params;
  const { orgId } = await auth();
  if (!orgId) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  // Verify tenant owns this image's project
  const [tenant] = await db
    .select()
    .from(tenants)
    .where(eq(tenants.clerkOrgId, orgId))
    .limit(1);

  if (!tenant) {
    return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
  }

  const [image] = await db
    .select()
    .from(images)
    .where(eq(images.id, imageId))
    .limit(1);

  if (!image) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  // Verify image belongs to tenant's project
  const [project] = await db
    .select()
    .from(projects)
    .where(
      and(eq(projects.id, image.projectId), eq(projects.tenantId, tenant.id))
    )
    .limit(1);

  if (!project) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { url, expiresIn } = await generatePresignedGetUrl(image.s3Key);

  return NextResponse.json({
    url,
    expires_in: expiresIn,
  });
}

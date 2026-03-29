import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { images, devices, projects, tenants } from "@/db/schema";
import { eq, and, gte, lt, sql } from "drizzle-orm";

type RouteParams = {
  params: Promise<{ projectId: string; deviceId: string }>;
};

/**
 * GET /api/projects/[projectId]/cameras/[deviceId]/calendar?month=YYYY-MM
 * Returns image count per day for the given month.
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

  const monthParam = request.nextUrl.searchParams.get("month");
  if (!monthParam || !/^\d{4}-\d{2}$/.test(monthParam)) {
    return NextResponse.json(
      { error: "month parameter required (YYYY-MM)" },
      { status: 400 }
    );
  }

  const [yearStr, monthStr] = monthParam.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);

  const monthStart = new Date(Date.UTC(year, month - 1, 1));
  const monthEnd = new Date(Date.UTC(year, month, 1)); // First day of next month

  const days = await db
    .select({
      date: sql<string>`to_char(${images.capturedAt} AT TIME ZONE 'UTC', 'YYYY-MM-DD')`,
      count: sql<number>`count(*)::int`,
    })
    .from(images)
    .where(
      and(
        eq(images.deviceId, deviceId),
        eq(images.projectId, projectId),
        gte(images.capturedAt, monthStart),
        lt(images.capturedAt, monthEnd)
      )
    )
    .groupBy(
      sql`to_char(${images.capturedAt} AT TIME ZONE 'UTC', 'YYYY-MM-DD')`
    )
    .orderBy(
      sql`to_char(${images.capturedAt} AT TIME ZONE 'UTC', 'YYYY-MM-DD')`
    );

  return NextResponse.json({ days });
}

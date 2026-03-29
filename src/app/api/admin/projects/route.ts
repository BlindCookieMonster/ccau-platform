import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { projects, tenants, devices } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

/**
 * GET /api/admin/projects
 * List projects for the current org, or all projects for system admin.
 */
export async function GET() {
  const { orgId } = await auth();
  if (!orgId) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  // Get tenant for current org
  const [tenant] = await db
    .select()
    .from(tenants)
    .where(eq(tenants.clerkOrgId, orgId))
    .limit(1);

  if (!tenant) {
    return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
  }

  const projectList = await db
    .select({
      id: projects.id,
      name: projects.name,
      siteId: projects.siteId,
      location: projects.location,
      startDate: projects.startDate,
      endDate: projects.endDate,
      status: projects.status,
      createdAt: projects.createdAt,
      cameraCount: sql<number>`(
        SELECT count(*)::int FROM ${devices} WHERE ${devices.projectId} = ${projects.id}
      )`,
    })
    .from(projects)
    .where(eq(projects.tenantId, tenant.id))
    .orderBy(projects.createdAt);

  return NextResponse.json({ projects: projectList });
}

/**
 * POST /api/admin/projects
 * Create a new project.
 */
export async function POST(request: NextRequest) {
  const { orgId } = await auth();
  if (!orgId) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const [tenant] = await db
    .select()
    .from(tenants)
    .where(eq(tenants.clerkOrgId, orgId))
    .limit(1);

  if (!tenant) {
    return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, site_id, location, start_date, end_date } = body;

  if (!name || typeof name !== "string") {
    return NextResponse.json(
      { error: "name is required" },
      { status: 400 }
    );
  }
  if (!site_id || typeof site_id !== "string") {
    return NextResponse.json(
      { error: "site_id is required" },
      { status: 400 }
    );
  }

  const [project] = await db
    .insert(projects)
    .values({
      tenantId: tenant.id,
      name,
      siteId: site_id,
      location: typeof location === "string" ? location : null,
      startDate: typeof start_date === "string" ? start_date : null,
      endDate: typeof end_date === "string" ? end_date : null,
    })
    .returning();

  return NextResponse.json({ project }, { status: 201 });
}

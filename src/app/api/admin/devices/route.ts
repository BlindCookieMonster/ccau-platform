import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { devices, tenants, projects } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { generateDeviceApiKey } from "@/lib/device-auth";

/**
 * GET /api/admin/devices
 * List devices for the current org.
 */
export async function GET() {
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

  const deviceList = await db
    .select({
      id: devices.id,
      deviceId: devices.deviceId,
      name: devices.name,
      model: devices.model,
      routerModel: devices.routerModel,
      simIccid: devices.simIccid,
      status: devices.status,
      lastSeenAt: devices.lastSeenAt,
      projectId: devices.projectId,
      projectName: projects.name,
      projectSiteId: projects.siteId,
      createdAt: devices.createdAt,
      imagesToday: sql<number>`(
        SELECT count(*)::int FROM images
        WHERE images.device_id = ${devices.id}
        AND images.captured_at >= CURRENT_DATE
      )`,
    })
    .from(devices)
    .leftJoin(projects, eq(devices.projectId, projects.id))
    .where(eq(devices.tenantId, tenant.id))
    .orderBy(devices.deviceId);

  return NextResponse.json({ devices: deviceList });
}

/**
 * POST /api/admin/devices
 * Register a new device. Returns the generated API key (shown once).
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

  const { device_id, name, model, router_model, sim_iccid, project_id } = body;

  if (!device_id || typeof device_id !== "string") {
    return NextResponse.json(
      { error: "device_id is required" },
      { status: 400 }
    );
  }
  if (!name || typeof name !== "string") {
    return NextResponse.json(
      { error: "name is required" },
      { status: 400 }
    );
  }

  const apiKey = generateDeviceApiKey();

  const [device] = await db
    .insert(devices)
    .values({
      deviceId: device_id,
      tenantId: tenant.id,
      projectId: typeof project_id === "string" ? project_id : null,
      name,
      model: typeof model === "string" ? model : null,
      routerModel: typeof router_model === "string" ? router_model : null,
      simIccid: typeof sim_iccid === "string" ? sim_iccid : null,
      apiKey,
    })
    .returning();

  return NextResponse.json(
    {
      device: {
        id: device.id,
        deviceId: device.deviceId,
        name: device.name,
        api_key: apiKey,
      },
    },
    { status: 201 }
  );
}

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { devices, tenants, deviceTelemetry } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * GET /api/admin/devices/[id]
 * Get device details including latest telemetry.
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
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

  const [device] = await db
    .select()
    .from(devices)
    .where(and(eq(devices.id, id), eq(devices.tenantId, tenant.id)))
    .limit(1);

  if (!device) {
    return NextResponse.json({ error: "Device not found" }, { status: 404 });
  }

  // Get latest telemetry
  const [latestTelemetry] = await db
    .select()
    .from(deviceTelemetry)
    .where(eq(deviceTelemetry.deviceId, device.id))
    .orderBy(desc(deviceTelemetry.recordedAt))
    .limit(1);

  return NextResponse.json({
    device,
    latestTelemetry: latestTelemetry ?? null,
  });
}

/**
 * PATCH /api/admin/devices/[id]
 * Update device (name, project assignment, status, etc.)
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
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

  // Verify device belongs to tenant
  const [existing] = await db
    .select()
    .from(devices)
    .where(and(eq(devices.id, id), eq(devices.tenantId, tenant.id)))
    .limit(1);

  if (!existing) {
    return NextResponse.json({ error: "Device not found" }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Build update object from allowed fields
  const updates: Record<string, unknown> = {};
  if (typeof body.name === "string") updates.name = body.name;
  if (typeof body.project_id === "string" || body.project_id === null)
    updates.projectId = body.project_id;
  if (typeof body.status === "string") updates.status = body.status;
  if (typeof body.model === "string") updates.model = body.model;
  if (typeof body.router_model === "string")
    updates.routerModel = body.router_model;
  if (typeof body.sim_iccid === "string") updates.simIccid = body.sim_iccid;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: "No valid fields to update" },
      { status: 400 }
    );
  }

  const [updated] = await db
    .update(devices)
    .set(updates)
    .where(eq(devices.id, id))
    .returning();

  return NextResponse.json({ device: updated });
}

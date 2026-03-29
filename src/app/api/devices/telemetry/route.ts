import { NextRequest, NextResponse } from "next/server";
import { authenticateDevice } from "@/lib/device-auth";
import { db } from "@/db";
import { deviceTelemetry, devices } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * POST /api/devices/telemetry
 *
 * Device auth via X-Device-Key header.
 * Accepts telemetry data and updates device last_seen_at.
 */
export async function POST(request: NextRequest) {
  const device = await authenticateDevice(request);
  if (!device) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Insert telemetry row
  await db.insert(deviceTelemetry).values({
    deviceId: device.id,
    batteryVoltage: typeof body.battery_voltage === "number" ? body.battery_voltage : null,
    batterySoc: typeof body.battery_soc === "number" ? body.battery_soc : null,
    solarPowerW: typeof body.solar_power_w === "number" ? body.solar_power_w : null,
    signalRssi: typeof body.signal_rssi === "number" ? body.signal_rssi : null,
    signalType: typeof body.signal_type === "string" ? body.signal_type : null,
    routerTempC: typeof body.router_temp_c === "number" ? body.router_temp_c : null,
    storageUsedMb: typeof body.storage_used_mb === "number" ? body.storage_used_mb : null,
  });

  // Update device last_seen_at and status
  await db
    .update(devices)
    .set({
      lastSeenAt: new Date(),
      status: "online",
    })
    .where(eq(devices.id, device.id));

  return NextResponse.json({ ok: true });
}

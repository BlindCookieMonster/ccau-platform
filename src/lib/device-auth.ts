import { NextRequest } from "next/server";
import { db } from "@/db";
import { devices } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { InferSelectModel } from "drizzle-orm";

type Device = InferSelectModel<typeof devices>;

/**
 * Validate the X-Device-Key header and return the device record.
 * Returns null if the key is missing or invalid.
 */
export async function authenticateDevice(
  request: NextRequest
): Promise<Device | null> {
  const apiKey = request.headers.get("X-Device-Key");

  if (!apiKey) {
    return null;
  }

  const [device] = await db
    .select()
    .from(devices)
    .where(eq(devices.apiKey, apiKey))
    .limit(1);

  return device ?? null;
}

/**
 * Generate a device API key in the format: ccau_dev_{32 hex chars}
 */
export function generateDeviceApiKey(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `ccau_dev_${hex}`;
}

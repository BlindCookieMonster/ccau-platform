import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { tenants } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Get the current user's tenant from their Clerk org.
 * Returns null if the user has no active org.
 */
export async function getCurrentTenant() {
  const { orgId, userId } = await auth();

  if (!orgId || !userId) {
    return null;
  }

  const [tenant] = await db
    .select()
    .from(tenants)
    .where(eq(tenants.clerkOrgId, orgId))
    .limit(1);

  return tenant ?? null;
}

/**
 * Require an authenticated user with an active org.
 * Returns the tenant or throws a Response for use in API routes.
 */
export async function requireTenant() {
  const tenant = await getCurrentTenant();
  if (!tenant) {
    throw new Response(JSON.stringify({ error: "Unauthorised" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return tenant;
}

/**
 * Check if the current user is a CCAU system admin.
 * System admins have the "org:admin" role in their org.
 */
export async function isSystemAdmin(): Promise<boolean> {
  const { orgRole } = await auth();
  return orgRole === "org:admin";
}

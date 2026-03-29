import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { tenants, projects, devices, images } from "@/db/schema";
import { sql, gte, lt, eq } from "drizzle-orm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, FolderKanban, Camera, AlertTriangle } from "lucide-react";

export default async function AdminPage() {
  const { orgId } = await auth();
  if (!orgId) redirect("/sign-in");

  // Fetch cross-tenant stats
  const [tenantCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(tenants);

  const [projectCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(projects);

  const [deviceStats] = await db
    .select({
      total: sql<number>`count(*)::int`,
      online: sql<number>`count(*) filter (where ${devices.status} = 'online')::int`,
      offline: sql<number>`count(*) filter (where ${devices.status} = 'offline')::int`,
      maintenance: sql<number>`count(*) filter (where ${devices.status} = 'maintenance')::int`,
    })
    .from(devices);

  const [todayImages] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(images)
    .where(gte(images.capturedAt, sql`CURRENT_DATE`));

  // Find stale devices (offline > 2 hours but were online)
  const staleDevices = await db
    .select({
      id: devices.id,
      deviceId: devices.deviceId,
      name: devices.name,
      lastSeenAt: devices.lastSeenAt,
      tenantName: tenants.name,
    })
    .from(devices)
    .innerJoin(tenants, eq(devices.tenantId, tenants.id))
    .where(
      sql`${devices.lastSeenAt} IS NOT NULL AND ${devices.lastSeenAt} < NOW() - INTERVAL '2 hours' AND ${devices.status} != 'maintenance'`
    )
    .orderBy(devices.lastSeenAt)
    .limit(10);

  const stats = deviceStats ?? {
    total: 0,
    online: 0,
    offline: 0,
    maintenance: 0,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">CCAU Admin</h1>
        <p className="text-muted-foreground">Cross-tenant overview</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tenants</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tenantCount?.count ?? 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projectCount?.count ?? 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Devices</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.online} online &middot; {stats.offline} offline &middot;{" "}
              {stats.maintenance} maintenance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Images Today</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {todayImages?.count ?? 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {staleDevices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {staleDevices.map((device) => {
                const hoursAgo = device.lastSeenAt
                  ? Math.floor(
                      (Date.now() - new Date(device.lastSeenAt).getTime()) /
                        3600000
                    )
                  : null;
                return (
                  <div
                    key={device.id}
                    className="flex items-center justify-between rounded-md border px-3 py-2"
                  >
                    <div>
                      <span className="font-medium">
                        {device.deviceId} — {device.name}
                      </span>
                      <span className="ml-2 text-sm text-muted-foreground">
                        ({device.tenantName})
                      </span>
                    </div>
                    <Badge variant="destructive">
                      Offline {hoursAgo}h
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

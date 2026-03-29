import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { db } from "@/db";
import {
  tenants,
  projects,
  devices,
  deviceTelemetry,
  images,
} from "@/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

function statusBadge(status: string) {
  switch (status) {
    case "online":
      return <Badge className="bg-green-600">Online</Badge>;
    case "offline":
      return <Badge variant="destructive">Offline</Badge>;
    case "maintenance":
      return <Badge variant="secondary">Maintenance</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function batteryColour(voltage: number | null): string {
  if (voltage === null) return "text-muted-foreground";
  if (voltage > 12.4) return "text-green-600";
  if (voltage >= 11.8) return "text-yellow-600";
  return "text-red-600";
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { orgId } = await auth();
  if (!orgId) redirect("/sign-in");

  const [tenant] = await db
    .select()
    .from(tenants)
    .where(eq(tenants.clerkOrgId, orgId))
    .limit(1);

  if (!tenant) notFound();

  const [project] = await db
    .select()
    .from(projects)
    .where(and(eq(projects.id, id), eq(projects.tenantId, tenant.id)))
    .limit(1);

  if (!project) notFound();

  // Get devices with latest telemetry and today's image count
  const deviceList = await db
    .select({
      id: devices.id,
      deviceId: devices.deviceId,
      name: devices.name,
      status: devices.status,
      lastSeenAt: devices.lastSeenAt,
      model: devices.model,
      imagesToday: sql<number>`(
        SELECT count(*)::int FROM ${images}
        WHERE ${images.deviceId} = ${devices.id}
        AND ${images.capturedAt} >= CURRENT_DATE
      )`,
    })
    .from(devices)
    .where(eq(devices.projectId, project.id))
    .orderBy(devices.deviceId);

  // Get latest telemetry for each device
  const telemetryMap = new Map<
    string,
    { batteryVoltage: number | null; signalRssi: number | null }
  >();

  for (const device of deviceList) {
    const [latest] = await db
      .select({
        batteryVoltage: deviceTelemetry.batteryVoltage,
        signalRssi: deviceTelemetry.signalRssi,
      })
      .from(deviceTelemetry)
      .where(eq(deviceTelemetry.deviceId, device.id))
      .orderBy(desc(deviceTelemetry.recordedAt))
      .limit(1);

    if (latest) {
      telemetryMap.set(device.id, latest);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
          <Badge
            variant={project.status === "active" ? "default" : "secondary"}
          >
            {project.status}
          </Badge>
        </div>
        <p className="text-muted-foreground">
          {project.location ?? project.siteId}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cameras</CardTitle>
          <CardDescription>
            {deviceList.length} camera{deviceList.length !== 1 ? "s" : ""}{" "}
            deployed
          </CardDescription>
        </CardHeader>
        <CardContent>
          {deviceList.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No cameras assigned to this project yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Camera</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Image</TableHead>
                  <TableHead>Battery</TableHead>
                  <TableHead>Signal</TableHead>
                  <TableHead className="text-right">Images Today</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deviceList.map((device) => {
                  const telemetry = telemetryMap.get(device.id);
                  return (
                    <TableRow key={device.id}>
                      <TableCell>
                        <Link
                          href={`/projects/${project.id}/cameras/${device.id}`}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          {device.deviceId} — {device.name}
                        </Link>
                        {device.model && (
                          <p className="text-xs text-muted-foreground">
                            {device.model}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>{statusBadge(device.status)}</TableCell>
                      <TableCell className="text-sm">
                        {device.lastSeenAt
                          ? new Date(device.lastSeenAt).toLocaleString(
                              "en-AU",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                day: "numeric",
                                month: "short",
                              }
                            )
                          : "Never"}
                      </TableCell>
                      <TableCell>
                        {telemetry?.batteryVoltage !== null &&
                        telemetry?.batteryVoltage !== undefined ? (
                          <span
                            className={`font-medium ${batteryColour(telemetry.batteryVoltage)}`}
                          >
                            {telemetry.batteryVoltage.toFixed(1)}V
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {telemetry?.signalRssi !== null &&
                        telemetry?.signalRssi !== undefined ? (
                          <span className="text-sm">
                            {telemetry.signalRssi} dBm
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {device.imagesToday}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

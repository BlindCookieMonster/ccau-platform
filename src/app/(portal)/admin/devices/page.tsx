import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { devices, projects, tenants, deviceTelemetry } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import {
  Card,
  CardContent,
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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

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

export default async function AdminDevicesPage() {
  const { orgId } = await auth();
  if (!orgId) redirect("/sign-in");

  const deviceList = await db
    .select({
      id: devices.id,
      deviceId: devices.deviceId,
      name: devices.name,
      model: devices.model,
      status: devices.status,
      lastSeenAt: devices.lastSeenAt,
      projectName: projects.name,
      tenantName: tenants.name,
      createdAt: devices.createdAt,
      latestBattery: sql<number | null>`(
        SELECT battery_voltage FROM ${deviceTelemetry}
        WHERE ${deviceTelemetry.deviceId} = ${devices.id}
        ORDER BY recorded_at DESC LIMIT 1
      )`,
      latestSignal: sql<number | null>`(
        SELECT signal_rssi FROM ${deviceTelemetry}
        WHERE ${deviceTelemetry.deviceId} = ${devices.id}
        ORDER BY recorded_at DESC LIMIT 1
      )`,
      imagesToday: sql<number>`(
        SELECT count(*)::int FROM images
        WHERE images.device_id = ${devices.id}
        AND images.captured_at >= CURRENT_DATE
      )`,
    })
    .from(devices)
    .leftJoin(projects, eq(devices.projectId, projects.id))
    .innerJoin(tenants, eq(devices.tenantId, tenants.id))
    .orderBy(devices.deviceId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Device Management
          </h1>
          <p className="text-muted-foreground">
            All cameras across tenants
          </p>
        </div>
        <Link href="/admin/devices/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Register Device
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Seen</TableHead>
                <TableHead>Battery</TableHead>
                <TableHead>Signal</TableHead>
                <TableHead className="text-right">Today</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deviceList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    No devices registered yet.
                  </TableCell>
                </TableRow>
              ) : (
                deviceList.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell>
                      <div className="font-medium">{device.deviceId}</div>
                      <div className="text-xs text-muted-foreground">
                        {device.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {device.tenantName}
                    </TableCell>
                    <TableCell className="text-sm">
                      {device.projectName ?? (
                        <span className="text-muted-foreground">
                          Unassigned
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{statusBadge(device.status)}</TableCell>
                    <TableCell className="text-sm">
                      {device.lastSeenAt
                        ? new Date(device.lastSeenAt).toLocaleString("en-AU", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Never"}
                    </TableCell>
                    <TableCell>
                      {device.latestBattery !== null ? (
                        <span
                          className={`font-medium ${batteryColour(device.latestBattery)}`}
                        >
                          {device.latestBattery.toFixed(1)}V
                        </span>
                      ) : (
                        <span className="text-muted-foreground">&mdash;</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {device.latestSignal !== null ? (
                        <span className="text-sm">
                          {device.latestSignal} dBm
                        </span>
                      ) : (
                        <span className="text-muted-foreground">&mdash;</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {device.imagesToday}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

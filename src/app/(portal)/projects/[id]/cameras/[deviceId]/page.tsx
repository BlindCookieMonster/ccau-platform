import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { db } from "@/db";
import { tenants, projects, devices } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageCalendar } from "@/components/image-calendar";
import { ImageGrid } from "@/components/image-grid";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string; deviceId: string }>;
  searchParams: Promise<{ month?: string; date?: string }>;
}

export default async function CameraPage({ params, searchParams }: PageProps) {
  const { id: projectId, deviceId } = await params;
  const { month: monthParam, date: dateParam } = await searchParams;
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
    .where(and(eq(projects.id, projectId), eq(projects.tenantId, tenant.id)))
    .limit(1);

  if (!project) notFound();

  const [device] = await db
    .select()
    .from(devices)
    .where(and(eq(devices.id, deviceId), eq(devices.projectId, projectId)))
    .limit(1);

  if (!device) notFound();

  // Determine current month
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;

  if (monthParam && /^\d{4}-\d{2}$/.test(monthParam)) {
    const [y, m] = monthParam.split("-");
    year = parseInt(y, 10);
    month = parseInt(m, 10);
  } else if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
    const [y, m] = dateParam.split("-");
    year = parseInt(y, 10);
    month = parseInt(m, 10);
  }

  // Fetch calendar data
  const monthStr = `${year}-${String(month).padStart(2, "0")}`;
  const calendarRes = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/projects/${projectId}/cameras/${deviceId}/calendar?month=${monthStr}`,
    {
      headers: { Cookie: "" }, // Server-side fetch won't have cookies
      cache: "no-store",
    }
  ).catch(() => null);

  // Use direct DB query instead if internal fetch fails
  let calendarDays: Array<{ date: string; count: number }> = [];
  let dayImages: Array<{
    id: string;
    captured_at: string;
    thumbnail_url: string | null;
    qa_status: string;
    qa_flags: string[] | null;
    sidecar_battery_v: number | null;
    sidecar_signal_rssi: number | null;
    file_size_bytes: number | null;
    width: number | null;
    height: number | null;
  }> = [];

  // Direct DB queries for server component
  const { images } = await import("@/db/schema");
  const { gte, lt, sql } = await import("drizzle-orm");

  // Calendar data
  const monthStart = new Date(Date.UTC(year, month - 1, 1));
  const monthEnd = new Date(Date.UTC(year, month, 1));

  const calendarData = await db
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

  calendarDays = calendarData;

  // If a specific date is selected, fetch images for that day
  if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
    const dayStart = new Date(`${dateParam}T00:00:00Z`);
    const dayEnd = new Date(`${dateParam}T23:59:59.999Z`);

    const { generatePresignedGetUrl } = await import("@/lib/s3");

    const imageList = await db
      .select({
        id: images.id,
        capturedAt: images.capturedAt,
        thumbnailS3Key: images.thumbnailS3Key,
        s3Key: images.s3Key,
        qaStatus: images.qaStatus,
        qaFlags: images.qaFlags,
        sidecarBatteryV: images.sidecarBatteryV,
        sidecarSignalRssi: images.sidecarSignalRssi,
        fileSizeBytes: images.fileSizeBytes,
        width: images.width,
        height: images.height,
      })
      .from(images)
      .where(
        and(
          eq(images.deviceId, deviceId),
          eq(images.projectId, projectId),
          gte(images.capturedAt, dayStart),
          lt(images.capturedAt, dayEnd)
        )
      )
      .orderBy(images.capturedAt);

    dayImages = await Promise.all(
      imageList.map(async (img) => {
        let thumbnailUrl: string | null = null;
        const keyToSign = img.thumbnailS3Key ?? img.s3Key;
        try {
          const { url } = await generatePresignedGetUrl(keyToSign);
          thumbnailUrl = url;
        } catch {
          // skip
        }

        return {
          id: img.id,
          captured_at: img.capturedAt.toISOString(),
          thumbnail_url: thumbnailUrl,
          qa_status: img.qaStatus,
          qa_flags: img.qaFlags,
          sidecar_battery_v: img.sidecarBatteryV,
          sidecar_signal_rssi: img.sidecarSignalRssi,
          file_size_bytes: img.fileSizeBytes,
          width: img.width,
          height: img.height,
        };
      })
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          href={`/projects/${projectId}`}
          className="flex items-center gap-1 hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          {project.name}
        </Link>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">
            {device.deviceId} — {device.name}
          </h1>
          <Badge
            className={
              device.status === "online"
                ? "bg-green-600"
                : device.status === "offline"
                  ? "bg-red-600"
                  : ""
            }
            variant={device.status === "maintenance" ? "secondary" : "default"}
          >
            {device.status}
          </Badge>
        </div>
        <p className="text-muted-foreground">{project.name}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Image Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageCalendar
              year={year}
              month={month}
              days={calendarDays}
              projectId={projectId}
              deviceId={deviceId}
            />
          </CardContent>
        </Card>

        {/* Image grid (shown when a date is selected) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {dateParam
                ? new Date(dateParam).toLocaleDateString("en-AU", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Select a day to view images"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dateParam ? (
              <ImageGrid images={dayImages} date={dateParam} />
            ) : (
              <p className="py-10 text-center text-muted-foreground">
                Click a day on the calendar to view captured images.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

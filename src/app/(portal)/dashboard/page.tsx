import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { tenants, projects, devices, images } from "@/db/schema";
import { eq, sql, and, gte } from "drizzle-orm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, FolderKanban, Image, Clock } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const { orgId } = await auth();
  if (!orgId) redirect("/sign-in");

  const [tenant] = await db
    .select()
    .from(tenants)
    .where(eq(tenants.clerkOrgId, orgId))
    .limit(1);

  if (!tenant) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <h1 className="text-2xl font-bold">No Organisation Found</h1>
        <p className="text-muted-foreground">
          Contact CCAU to set up your account.
        </p>
      </div>
    );
  }

  // Fetch stats
  const [projectList, deviceStats, todayImageCount] = await Promise.all([
    db
      .select({
        id: projects.id,
        name: projects.name,
        siteId: projects.siteId,
        location: projects.location,
        status: projects.status,
        startDate: projects.startDate,
        cameraCount: sql<number>`(
          SELECT count(*)::int FROM ${devices} WHERE ${devices.projectId} = ${projects.id}
        )`,
        lastImage: sql<string | null>`(
          SELECT max(${images.capturedAt})::text FROM ${images} WHERE ${images.projectId} = ${projects.id}
        )`,
      })
      .from(projects)
      .where(eq(projects.tenantId, tenant.id))
      .orderBy(projects.name),

    db
      .select({
        total: sql<number>`count(*)::int`,
        online: sql<number>`count(*) filter (where ${devices.status} = 'online')::int`,
        offline: sql<number>`count(*) filter (where ${devices.status} = 'offline')::int`,
      })
      .from(devices)
      .where(eq(devices.tenantId, tenant.id)),

    db
      .select({
        count: sql<number>`count(*)::int`,
      })
      .from(images)
      .innerJoin(projects, eq(images.projectId, projects.id))
      .where(
        and(
          eq(projects.tenantId, tenant.id),
          gte(images.capturedAt, sql`CURRENT_DATE`)
        )
      ),
  ]);

  const stats = deviceStats[0] ?? { total: 0, online: 0, offline: 0 };
  const imagesToday = todayImageCount[0]?.count ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{tenant.name}</h1>
        <p className="text-muted-foreground">Dashboard overview</p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projectList.filter((p) => p.status === "active").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Cameras
            </CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.online} online &middot; {stats.offline} offline
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Images Today</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{imagesToday}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Last Upload</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projectList.some((p) => p.lastImage) ? (
                <TimeAgo
                  date={
                    projectList
                      .map((p) => p.lastImage)
                      .filter(Boolean)
                      .sort()
                      .reverse()[0]!
                  }
                />
              ) : (
                <span className="text-muted-foreground text-sm">
                  No uploads
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Projects</h2>
        {projectList.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              No projects yet. Contact CCAU to get started.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {projectList.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card className="transition-shadow hover:shadow-md cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        {project.name}
                      </CardTitle>
                      <Badge
                        variant={
                          project.status === "active" ? "default" : "secondary"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {project.location ?? project.siteId}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{project.cameraCount} cameras</span>
                      {project.startDate && (
                        <span>
                          Since{" "}
                          {new Date(project.startDate).toLocaleDateString(
                            "en-AU",
                            { month: "short", year: "numeric" }
                          )}
                        </span>
                      )}
                      {project.lastImage && (
                        <span>
                          Last image:{" "}
                          <TimeAgo date={project.lastImage} />
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TimeAgo({ date }: { date: string }) {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffMin < 1) return <span>just now</span>;
  if (diffMin < 60) return <span>{diffMin}m ago</span>;
  if (diffHrs < 24) return <span>{diffHrs}h ago</span>;
  return <span>{diffDays}d ago</span>;
}

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { tenants, projects, devices } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function ProjectsPage() {
  const { orgId } = await auth();
  if (!orgId) redirect("/sign-in");

  const [tenant] = await db
    .select()
    .from(tenants)
    .where(eq(tenants.clerkOrgId, orgId))
    .limit(1);

  if (!tenant) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        No organisation found.
      </div>
    );
  }

  const projectList = await db
    .select({
      id: projects.id,
      name: projects.name,
      siteId: projects.siteId,
      location: projects.location,
      status: projects.status,
      startDate: projects.startDate,
      endDate: projects.endDate,
      cameraCount: sql<number>`(
        SELECT count(*)::int FROM ${devices} WHERE ${devices.projectId} = ${projects.id}
      )`,
    })
    .from(projects)
    .where(eq(projects.tenantId, tenant.id))
    .orderBy(projects.name);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          All camera projects for {tenant.name}
        </p>
      </div>

      {projectList.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            No projects yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projectList.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="transition-shadow hover:shadow-md cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{project.name}</CardTitle>
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
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{project.cameraCount} cameras</p>
                    {project.startDate && (
                      <p>
                        Started{" "}
                        {new Date(project.startDate).toLocaleDateString(
                          "en-AU"
                        )}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

import { Camera, Building2, Clock, MapPin } from "lucide-react";

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`px-4 py-20 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-3 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400">
      {children}
    </span>
  );
}

const projects = [
  {
    title: "Commercial Office Complex",
    location: "Geelong, VIC",
    duration: "18 months",
    cameras: 6,
    status: "Completed",
  },
  {
    title: "Residential Apartment Block",
    location: "Melbourne, VIC",
    duration: "24 months",
    cameras: 6,
    status: "In Progress",
  },
  {
    title: "Industrial Warehouse Fit-Out",
    location: "Werribee, VIC",
    duration: "12 months",
    cameras: 4,
    status: "Completed",
  },
  {
    title: "Mixed-Use Development",
    location: "Torquay, VIC",
    duration: "20 months",
    cameras: 6,
    status: "In Progress",
  },
  {
    title: "Community Sports Facility",
    location: "Ballarat, VIC",
    duration: "14 months",
    cameras: 6,
    status: "Completed",
  },
  {
    title: "Heritage Renovation Project",
    location: "Geelong, VIC",
    duration: "10 months",
    cameras: 4,
    status: "Upcoming",
  },
];

export default function OurWorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,168,67,0.12),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Our Work</SectionLabel>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Projects We&apos;ve Documented
            </h1>
            <p className="mt-6 text-lg text-slate-300">
              A selection of construction projects captured through our
              time-lapse camera systems across Victoria.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 transition-all hover:border-amber-500/30"
            >
              {/* Placeholder visual */}
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                <div className="text-center">
                  <Building2 className="mx-auto h-10 w-10 text-slate-600 transition-colors group-hover:text-amber-500/40" />
                  <p className="mt-2 text-xs text-slate-600">
                    Visual coming soon
                  </p>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      project.status === "Completed"
                        ? "bg-green-500/10 text-green-400"
                        : project.status === "In Progress"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-slate-500/10 text-slate-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {project.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Camera className="h-3.5 w-3.5" />
                    {project.cameras} cameras
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400">
            More projects coming soon. Stay tuned!
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Want Your Project Documented?
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Get in touch to discuss how we can capture your next build.
          </p>
          <div className="mt-8">
            <a
              href="mailto:ben.cook@re-create.au?subject=Project%20Enquiry"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
            >
              Contact Us
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}

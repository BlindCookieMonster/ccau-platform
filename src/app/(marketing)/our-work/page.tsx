/* ------------------------------------------------------------------ */
/*  Section Badge                                                      */
/* ------------------------------------------------------------------ */
function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-[4px] bg-amber-500/10 px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.6px] text-[#B88100]">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Project Data                                                       */
/* ------------------------------------------------------------------ */
const projects = [
  {
    title: "Commercial Office Complex",
    location: "Geelong, VIC",
    duration: "18 months",
    cameras: "6 cameras",
    status: "Completed",
  },
  {
    title: "Residential Apartment Block",
    location: "Melbourne, VIC",
    duration: "24 months",
    cameras: "6 cameras",
    status: "In Progress",
  },
  {
    title: "Industrial Warehouse Fit-Out",
    location: "Werribee, VIC",
    duration: "12 months",
    cameras: "4 cameras",
    status: "Completed",
  },
  {
    title: "Mixed-Use Development",
    location: "Torquay, VIC",
    duration: "20 months",
    cameras: "6 cameras",
    status: "In Progress",
  },
  {
    title: "Community Sports Facility",
    location: "Ballarat, VIC",
    duration: "14 months",
    cameras: "6 cameras",
    status: "Completed",
  },
  {
    title: "Heritage Renovation Project",
    location: "Geelong, VIC",
    duration: "10 months",
    cameras: "4 cameras",
    status: "Upcoming",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function OurWorkPage() {
  return (
    <>
      {/* Hero — light bg */}
      <section className="bg-white py-24 sm:py-28 px-5 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-7xl text-center">
          <SectionBadge>OUR PORTFOLIO</SectionBadge>
          <h1 className="mt-5 text-[40px] sm:text-[52px] lg:text-[60px] font-bold leading-[1.2] tracking-[-3.6px] text-[#171717]">
            Our Work
          </h1>
          <p className="mt-6 text-[16px] leading-[1.5] text-[#171717]/70 max-w-2xl mx-auto">
            A selection of construction projects captured through our time-lapse
            camera systems across Victoria.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="bg-[#F7F8FA] py-24 px-5 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.title}
                className="relative aspect-[4/3] rounded-lg overflow-hidden group"
              >
                {/* Dark gradient simulating construction photo */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-stone-800 transition-all group-hover:from-slate-700 group-hover:via-slate-600 group-hover:to-stone-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`inline-block rounded-[4px] px-2.5 py-1 text-[11px] font-semibold ${
                      project.status === "Completed"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : project.status === "In Progress"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-white/10 text-white/60"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-[18px] font-bold text-white tracking-tight">
                    {project.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-white/60">
                    <span>{project.location}</span>
                    <span>{project.duration}</span>
                    <span>{project.cameras}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-[16px] text-[#171717]/50">
            More projects coming soon.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-5 sm:px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-stone-950" />
        <div className="relative mx-auto max-w-7xl text-center">
          <h2 className="text-[36px] sm:text-[40px] lg:text-[44px] font-extrabold leading-[1.2] tracking-[-2px] text-white/90">
            Want Your Project Documented?
          </h2>
          <p className="mt-4 text-[16px] text-white/60 max-w-lg mx-auto">
            Get in touch to discuss how we can capture your next build.
          </p>
          <div className="mt-10">
            <a
              href="mailto:ben.cook@re-create.au?subject=Project%20Enquiry"
              className="h-12 px-6 inline-flex items-center justify-center rounded-lg bg-[#F2AF0D] text-[#171717] text-[14px] font-semibold transition-colors hover:bg-[#dba00c]"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

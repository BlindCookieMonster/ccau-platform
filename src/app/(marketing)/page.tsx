import {
  Camera,
  Video,
  Cloud,
  Clapperboard,
  Clock,
  ChevronRight,
  Milestone,
  HardHat,
  Eye,
  Aperture,
  Wrench,
  MapPin,
  Users,
  Mail,
} from "lucide-react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Reusable section wrapper                                          */
/* ------------------------------------------------------------------ */
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`px-4 py-20 sm:px-6 lg:px-8 ${className}`}
    >
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

/* ------------------------------------------------------------------ */
/*  Hero                                                              */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,168,67,0.15),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8 lg:py-44">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Construction Time-Lapse Specialists</SectionLabel>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Document the Unforgettable.{" "}
            <span className="text-amber-500">Visually.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            We help you preserve every stage of your project through
            high-quality time-lapse cameras, drone footage, and cloud-based
            access. All designed to capture progress with precision.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#process"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
            >
              See How It Works
              <ChevronRight className="h-4 w-4" />
            </a>
            <a
              href="mailto:ben.cook@re-create.au"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  What We Do                                                        */
/* ------------------------------------------------------------------ */
const services = [
  {
    icon: Camera,
    title: "Camera Installation",
    description:
      "Professional mounting and setup of high-resolution cameras tailored to your site layout.",
  },
  {
    icon: Video,
    title: "Time-Lapse Production",
    description:
      "Quarterly progressive time-lapse videos showcasing your project milestones.",
  },
  {
    icon: Clapperboard,
    title: "Optional Drone Footage",
    description:
      "Aerial perspectives that complement your ground-level camera coverage.",
  },
  {
    icon: Cloud,
    title: "Cloud Access",
    description:
      "24/7 access to all images via our secure web portal with 5G connectivity.",
  },
];

function WhatWeDo() {
  return (
    <Section>
      <div className="text-center">
        <SectionLabel>What We Do</SectionLabel>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          End-to-End Construction Documentation
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          From installation to final delivery, we handle every aspect of your
          construction time-lapse project.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((svc) => (
          <div
            key={svc.title}
            className="group rounded-xl border border-white/10 bg-slate-900/60 p-6 transition-all hover:border-amber-500/30 hover:bg-slate-900"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
              <svc.icon className="h-5 w-5 text-amber-500" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              {svc.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {svc.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Why This Matters                                                  */
/* ------------------------------------------------------------------ */
function WhyThisMatters() {
  return (
    <Section className="bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel>Why This Matters</SectionLabel>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Milestones Fade. Memories Shouldn&apos;t.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-slate-300">
          So much happens on your construction site — but without visual
          documentation, the story gets lost. Stakeholders miss key moments.
          Marketing misses a golden asset. History disappears.
        </p>
        <p className="mt-4 text-lg font-medium text-amber-400">
          That&apos;s why we&apos;re here.
        </p>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Camera Layout                                                     */
/* ------------------------------------------------------------------ */
const cameraGroups = [
  {
    icon: Eye,
    cameras: "Camera 1 & 2",
    title: "South-East & South-West",
    description: "Cherry picker mounted for elevated, wide-angle coverage of the full site.",
  },
  {
    icon: Aperture,
    cameras: "Camera 3",
    title: "Free-Standing Mount",
    description: "Ground-level perspective capturing detailed progress from a key vantage point.",
  },
  {
    icon: MapPin,
    cameras: "Camera 4, 5 & 6",
    title: "Pole Mounts",
    description: "Versatile positioning on poles for targeted coverage of specific build zones.",
  },
];

function CameraLayout() {
  return (
    <Section>
      <div className="text-center">
        <SectionLabel>Camera Layout</SectionLabel>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          6 Cameras. Every Angle Covered.
        </h2>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {cameraGroups.map((group) => (
          <div
            key={group.cameras}
            className="rounded-xl border border-white/10 bg-slate-900/60 p-6 text-center"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
              <group.icon className="h-6 w-6 text-amber-500" />
            </div>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-amber-400">
              {group.cameras}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-white">
              {group.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {group.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  The Process (PITL)                                                */
/* ------------------------------------------------------------------ */
const steps = [
  {
    number: "01",
    title: "Initial Time-Lapse",
    description:
      "We install cameras and begin capturing from day one. Your project is documented from the very first milestone.",
  },
  {
    number: "02",
    title: "Quarterly Updates",
    description:
      "Every quarter, we produce a progressive time-lapse showing your project's evolution — perfect for stakeholder updates.",
  },
  {
    number: "03",
    title: "Final Production",
    description:
      "Delivering a comprehensive time-lapse story of your project from start to finish. A lasting visual record.",
  },
];

function Process() {
  return (
    <Section
      id="process"
      className="bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950"
    >
      <div className="text-center">
        <SectionLabel>The Process</SectionLabel>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Progressive Time-Lapse, Built for Milestones
        </h2>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.number} className="relative">
            <span className="text-5xl font-black text-amber-500/20">
              {step.number}
            </span>
            <h3 className="mt-2 text-xl font-semibold text-white">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Who's Behind the Lens                                             */
/* ------------------------------------------------------------------ */
function AboutUs() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel>Who&apos;s Behind the Lens</SectionLabel>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          We&apos;re Not Just Camera Techs
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-slate-300">
          We&apos;re storytellers who understand construction. With years of
          experience in both professional photography and the building industry,
          we know which moments matter — and how to capture them.
        </p>
        <div className="mt-10 flex items-center justify-center gap-8">
          <div className="text-center">
            <Users className="mx-auto h-6 w-6 text-amber-500" />
            <p className="mt-2 text-sm font-medium text-white">
              Australian-Based Team
            </p>
          </div>
          <div className="text-center">
            <HardHat className="mx-auto h-6 w-6 text-amber-500" />
            <p className="mt-2 text-sm font-medium text-white">
              Construction Industry Experience
            </p>
          </div>
          <div className="text-center">
            <Camera className="mx-auto h-6 w-6 text-amber-500" />
            <p className="mt-2 text-sm font-medium text-white">
              Professional Quality
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Add-on Visits                                                     */
/* ------------------------------------------------------------------ */
const addons = [
  {
    icon: Milestone,
    title: "Progress Capture",
    price: "$300 / visit",
    description:
      "Ground and aerial photos and videos documenting your current site state. Ideal for stakeholder updates and project records.",
  },
  {
    icon: Clapperboard,
    title: "Action Capture",
    price: "$550 / visit",
    description:
      "Focused footage of active construction work — trades in action, machinery moving, structures rising. Bring the build to life.",
  },
  {
    icon: Wrench,
    title: "Builders Choice Capture",
    price: "Custom pricing",
    description:
      "Tailored documentation for handover, marketing, or special milestones. We work with you to define exactly what you need.",
  },
];

function Addons() {
  return (
    <Section className="bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
      <div className="text-center">
        <SectionLabel>Add-On Visits</SectionLabel>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Capture More When It Matters
        </h2>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {addons.map((addon) => (
          <div
            key={addon.title}
            className="rounded-xl border border-white/10 bg-slate-900/60 p-6 transition-all hover:border-amber-500/30"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
              <addon.icon className="h-5 w-5 text-amber-500" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              {addon.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-amber-400">
              {addon.price}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              {addon.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Pricing                                                           */
/* ------------------------------------------------------------------ */
function Pricing() {
  return (
    <Section>
      <div className="text-center">
        <SectionLabel>Pricing</SectionLabel>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Transparent Pricing. Seamless Experience.
        </h2>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        {/* Installation */}
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6">
          <h3 className="text-lg font-semibold text-white">
            Installation (One-Off)
          </h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 font-medium text-slate-400">Cameras</th>
                  <th className="pb-3 font-medium text-slate-400">
                    Mount Type
                  </th>
                  <th className="pb-3 text-right font-medium text-slate-400">
                    Cost
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-white/5">
                  <td className="py-3">Camera 1 &amp; 2</td>
                  <td className="py-3">Cherry picker mounted</td>
                  <td className="py-3 text-right font-medium text-white">
                    $1,500
                    <span className="block text-xs text-slate-500">
                      + cherry picker rental
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3">Camera 3</td>
                  <td className="py-3">Free-standing</td>
                  <td className="py-3 text-right font-medium text-white">
                    $1,200
                  </td>
                </tr>
                <tr>
                  <td className="py-3">Camera 4, 5 &amp; 6</td>
                  <td className="py-3">Pole mounts</td>
                  <td className="py-3 text-right font-medium text-white">
                    $1,800
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly */}
        <div className="rounded-xl border border-amber-500/30 bg-slate-900/60 p-6">
          <h3 className="text-lg font-semibold text-white">Monthly Service</h3>
          <div className="mt-6 text-center">
            <p className="text-4xl font-bold text-white">
              $1,500
              <span className="text-lg font-normal text-slate-400">/month</span>
            </p>
            <p className="mt-2 text-sm text-slate-400">
              For all 6 cameras — includes cloud storage, 5G connectivity,
              maintenance, and quarterly video production.
            </p>
          </div>
          <div className="mt-6 space-y-2">
            {[
              "Cloud storage & 5G connectivity",
              "24/7 camera monitoring",
              "Quarterly progressive time-lapse videos",
              "Web portal access for your team",
              "Ongoing maintenance & support",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 shrink-0 text-amber-500" />
                <span className="text-slate-300">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-slate-500">
            All prices exclude GST
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Final CTA                                                         */
/* ------------------------------------------------------------------ */
function FinalCta() {
  return (
    <Section className="bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
      <div className="mx-auto max-w-3xl text-center">
        <SectionLabel>Get Started</SectionLabel>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Let&apos;s Start Capturing.
        </h2>
        <p className="mt-4 text-lg text-slate-300">
          Ready to document your next project? Get in touch for a free
          consultation or request a quote.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="mailto:ben.cook@re-create.au?subject=Free%20Consultation%20Request"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
          >
            <Mail className="h-4 w-4" />
            Book a Free Consultation
          </a>
          <a
            href="mailto:ben.cook@re-create.au?subject=Quote%20Request"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export default function MarketingHomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <WhyThisMatters />
      <CameraLayout />
      <Process />
      <AboutUs />
      <Addons />
      <Pricing />
      <FinalCta />
    </>
  );
}

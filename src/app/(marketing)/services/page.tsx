import {
  Camera,
  Video,
  Cloud,
  Clapperboard,
  Clock,
  Shield,
  Headphones,
  DollarSign,
  MapPin,
  Milestone,
  Wrench,
  ChevronRight,
} from "lucide-react";

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

/* ------------------------------------------------------------------ */
/*  Complete Time-Lapse Package                                       */
/* ------------------------------------------------------------------ */
const packageInclusions = [
  {
    icon: Camera,
    title: "6 High-Resolution Cameras",
    description:
      "Professional-grade cameras with weather-resistant housing, positioned for comprehensive site coverage.",
  },
  {
    icon: Cloud,
    title: "5G Cloud Connectivity",
    description:
      "All images uploaded in real time via 5G to our secure Australian-based cloud platform.",
  },
  {
    icon: Video,
    title: "Quarterly PITL Videos",
    description:
      "Professionally edited Progressive Interim Time-Lapse videos delivered every quarter.",
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description:
      "Continuous camera health monitoring with proactive maintenance and rapid issue resolution.",
  },
  {
    icon: Shield,
    title: "Secure Web Portal",
    description:
      "Access all images and videos through our secure web portal. Share access with your team and stakeholders.",
  },
  {
    icon: Headphones,
    title: "Ongoing Support",
    description:
      "Dedicated support throughout your project. Camera relocations, troubleshooting, and technical assistance.",
  },
];

/* ------------------------------------------------------------------ */
/*  Add-on Services                                                   */
/* ------------------------------------------------------------------ */
const addons = [
  {
    icon: Milestone,
    title: "Progress Capture",
    price: "$300 / visit",
    features: [
      "Ground-level photography",
      "Aerial drone photography",
      "Short video clips",
      "Ideal for stakeholder updates",
    ],
  },
  {
    icon: Clapperboard,
    title: "Action Capture",
    price: "$550 / visit",
    features: [
      "Everything in Progress Capture",
      "Active construction footage",
      "Trades and machinery in action",
      "Dynamic video content",
    ],
  },
  {
    icon: Wrench,
    title: "Builders Choice Capture",
    price: "Custom pricing",
    features: [
      "Tailored to your requirements",
      "Handover documentation",
      "Marketing-ready content",
      "Special milestone coverage",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Why Choose CCAU                                                   */
/* ------------------------------------------------------------------ */
const reasons = [
  {
    icon: MapPin,
    title: "Australian-Based",
    description:
      "Local team, local servers, local support. We understand Australian construction sites and regulations.",
  },
  {
    icon: Camera,
    title: "Professional Quality",
    description:
      "We come from a professional photography and videography background — not just camera installation.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description:
      "No hidden fees. Clear installation costs and a simple monthly service fee that covers everything.",
  },
  {
    icon: Headphones,
    title: "Ongoing Support",
    description:
      "24/7 camera monitoring, proactive maintenance, and responsive support for the life of your project.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,168,67,0.12),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Our Services</SectionLabel>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Everything You Need to Document Your Build
            </h1>
            <p className="mt-6 text-lg text-slate-300">
              From camera installation to final video delivery, our complete
              time-lapse package covers every aspect of construction
              documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Complete Package */}
      <Section>
        <div className="text-center">
          <SectionLabel>Complete Package</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            The Complete Time-Lapse Package
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Everything included in our standard service — one installation fee,
            one monthly rate, no surprises.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packageInclusions.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 bg-slate-900/60 p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <item.icon className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Add-on Services */}
      <Section className="bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
        <div className="text-center">
          <SectionLabel>Optional Add-Ons</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Add-On Visit Packages
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Book additional site visits for milestone documentation, marketing
            content, or handover packages.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {addons.map((addon) => (
            <div
              key={addon.title}
              className="flex flex-col rounded-xl border border-white/10 bg-slate-900/60 p-6"
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
              <ul className="mt-4 flex-1 space-y-2">
                {addon.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <ChevronRight className="h-3 w-3 shrink-0 text-amber-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Choose CCAU */}
      <Section>
        <div className="text-center">
          <SectionLabel>Why Choose CCAU</SectionLabel>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Built for the Australian Construction Industry
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="flex gap-4 rounded-xl border border-white/10 bg-slate-900/60 p-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                <reason.icon className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Contact us for a free site assessment and quote.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="mailto:ben.cook@re-create.au?subject=Service%20Enquiry"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
            >
              Get in Touch
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}

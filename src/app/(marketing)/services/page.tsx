import {
  Camera,
  Video,
  Cloud,
  Clock,
  Shield,
  Headphones,
  MapPin,
  DollarSign,
  Check,
  Milestone,
  Clapperboard,
  Wrench,
} from "lucide-react";

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
/*  Data                                                               */
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
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function ServicesPage() {
  return (
    <>
      {/* Hero — light bg */}
      <section className="bg-white py-24 sm:py-28 px-5 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-7xl text-center">
          <SectionBadge>OUR SERVICES</SectionBadge>
          <h1 className="mt-5 text-[40px] sm:text-[52px] lg:text-[60px] font-bold leading-[1.2] tracking-[-3.6px] text-[#171717]">
            Comprehensive Time-Lapse Solutions
          </h1>
          <p className="mt-6 text-[16px] leading-[1.5] text-[#171717]/70 max-w-2xl mx-auto">
            From camera installation to final video delivery, our complete
            time-lapse package covers every aspect of construction documentation.
          </p>
        </div>
      </section>

      {/* Complete Package — light bg */}
      <section className="bg-[#F7F8FA] py-24 px-5 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <SectionBadge>COMPLETE PACKAGE</SectionBadge>
            <h2 className="mt-5 text-[36px] sm:text-[44px] lg:text-[48px] font-bold leading-[1.2] tracking-[-2.88px] text-[#171717]">
              What&apos;s Included
            </h2>
            <p className="mt-4 text-[16px] leading-[1.5] text-[#171717]/70 max-w-2xl mx-auto">
              Everything included in our standard service — one installation
              fee, one monthly rate, no surprises.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packageInclusions.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-lg p-8 border border-[#E0E4EA]/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <item.icon className="h-5 w-5 text-[#F2AF0D]" />
                </div>
                <h3 className="mt-4 text-[18px] font-bold text-[#171717] tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.5] text-[#171717]/60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Pricing summary */}
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="relative rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-stone-800" />
              <div className="relative p-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#F2AF0D]">
                  Installation
                </p>
                <p className="mt-2 text-[28px] font-bold text-white">
                  From $1,200
                </p>
                <p className="mt-1 text-[14px] text-white/60">
                  One-time installation depending on mounting type
                </p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-stone-800" />
              <div className="relative p-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#F2AF0D]">
                  Monthly Service
                </p>
                <p className="mt-2 text-[28px] font-bold text-white">
                  $1,500/month
                </p>
                <p className="mt-1 text-[14px] text-white/60">
                  For all 6 cameras — includes everything
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Optional Add-Ons */}
      <section className="bg-white py-24 px-5 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <SectionBadge>OPTIONAL ADD-ONS</SectionBadge>
            <h2 className="mt-5 text-[36px] sm:text-[44px] lg:text-[48px] font-bold leading-[1.2] tracking-[-2.88px]">
              <span className="text-[#171717] italic">Want More Than Just </span>
              <span className="text-[#C9A45A] italic">Time-lapse?</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {addons.map((addon) => (
              <div
                key={addon.title}
                className="bg-[#F5F3ED] border-t-[3px] border-t-[#F2AF0D] rounded-lg p-8 sm:p-10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <addon.icon className="h-5 w-5 text-[#F2AF0D]" />
                </div>
                <h3 className="mt-4 text-[20px] font-bold text-[#171717] tracking-[-1px]">
                  {addon.title}
                </h3>
                <p className="mt-2 text-[22px] font-bold text-[#F2AF0D]">
                  {addon.price}
                </p>
                <ul className="mt-5 space-y-3">
                  {addon.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-[14px] text-[#171717]/70"
                    >
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-[#F2AF0D]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose CCAU */}
      <section className="bg-[#F7F8FA] py-24 px-5 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white rounded-lg p-8 sm:p-12">
            <div className="text-center mb-12">
              <SectionBadge>WHY CHOOSE CCAU</SectionBadge>
              <h2 className="mt-5 text-[36px] sm:text-[40px] lg:text-[44px] font-bold leading-[1.2] tracking-[-2px] text-[#171717]">
                Built for the Australian Construction Industry
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                    <reason.icon className="h-5 w-5 text-[#F2AF0D]" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#171717] tracking-tight">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.5] text-[#171717]/60">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-5 sm:px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-stone-950" />
        <div className="relative mx-auto max-w-7xl text-center">
          <h2 className="text-[36px] sm:text-[40px] lg:text-[44px] font-extrabold leading-[1.2] tracking-[-2px] text-white/90">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-[16px] text-white/60 max-w-lg mx-auto">
            Contact us for a free site assessment and quote.
          </p>
          <div className="mt-10">
            <a
              href="mailto:ben.cook@re-create.au?subject=Service%20Enquiry"
              className="h-12 px-6 inline-flex items-center justify-center rounded-lg bg-[#F2AF0D] text-[#171717] text-[14px] font-semibold transition-colors hover:bg-[#dba00c]"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

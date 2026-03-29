import { ChevronDown, Check } from "lucide-react";
import Link from "next/link";

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
/*  Section 1 — Hero                                                   */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Dark gradient background — construction atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-stone-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_60%_-30%,rgba(120,100,60,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_80%,rgba(80,70,40,0.08),transparent)]" />

      <div className="relative w-full mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pb-20 sm:pb-28 lg:pb-32 pt-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-end">
          {/* Left — headline */}
          <div>
            <h1 className="text-[40px] sm:text-[52px] lg:text-[60px] font-bold leading-[1.2] tracking-[-3.6px]">
              <span className="text-white/70">Document the </span>
              <span className="bg-gradient-to-r from-white via-[#F2AF0D]/30 to-white bg-clip-text text-transparent">
                Unforgettable.
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-[#F2AF0D]/40 to-white bg-clip-text text-transparent">
                Visually.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-[1.5] text-white/70">
              We help you preserve every stage of your project through
              high-quality time-lapse cameras, drone footage, and cloud-based
              access. All designed to capture progress with precision.
            </p>
          </div>

          {/* Right — CTA block */}
          <div className="flex flex-col items-start lg:items-end gap-5">
            <p className="text-white/60 text-[15px] italic">
              Let&apos;s document the future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#process"
                className="h-12 px-6 inline-flex items-center justify-center rounded-lg bg-[#F2AF0D] text-[#171717] text-[14px] font-semibold transition-colors hover:bg-[#dba00c]"
              >
                See How It Works
              </a>
              <a
                href="mailto:ben.cook@re-create.au"
                className="h-12 px-6 inline-flex items-center justify-center rounded-lg bg-white/10 border border-white/30 text-white text-[14px] font-semibold transition-colors hover:bg-white/20"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#2C2911] to-transparent" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2 — What's Included (dark olive)                           */
/* ------------------------------------------------------------------ */
const serviceItems = [
  {
    title: "Camera Installation",
    description:
      "Professional mounting and setup of high-resolution cameras tailored to your site layout, with multiple mount options for optimal coverage.",
  },
  {
    title: "Time-lapse Production",
    description:
      "Quarterly progressive time-lapse videos showcasing your project milestones, professionally edited and delivered.",
  },
  {
    title: "Optional Drone Footage",
    description:
      "Aerial perspectives that complement your ground-level camera coverage, capturing the full scale of your build.",
  },
  {
    title: "Cloud Access",
    description:
      "24/7 access to all images via our secure web portal with 5G connectivity. Share with your team and stakeholders.",
  },
];

function WhatsIncluded() {
  return (
    <section className="bg-[#2C2911] py-24 px-5 sm:px-6 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left column */}
          <div>
            <SectionBadge>WHAT WE DO</SectionBadge>
            <h2 className="mt-5 text-[36px] sm:text-[44px] lg:text-[48px] font-bold leading-[1.2] tracking-[-2.88px] italic">
              <span className="text-white">What&apos;s Included </span>
              <span className="text-white/40">in Our </span>
              <span className="text-white">Time-Lapse </span>
              <span className="text-white/40">Service?</span>
            </h2>
            <p className="mt-5 text-[16px] leading-[1.5] text-white/70 max-w-lg">
              From installation to final delivery, we handle every aspect of
              your construction time-lapse project. One package, no surprises.
            </p>
            <a
              href="#process"
              className="mt-8 h-12 px-6 inline-flex items-center justify-center rounded-lg bg-[#F2AF0D] text-[#171717] text-[14px] font-semibold transition-colors hover:bg-[#dba00c]"
            >
              See How It Works
            </a>
          </div>

          {/* Right column — service items */}
          <div className="flex flex-col">
            {serviceItems.map((item, i) => (
              <div
                key={item.title}
                className={`py-6 ${i > 0 ? "border-t border-white/10" : ""} ${i % 2 === 1 ? "bg-white/[0.02] -mx-4 px-4 rounded-md" : ""}`}
              >
                <h3 className="text-[20px] font-bold tracking-[-1.2px] italic text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-[16px] leading-[1.5] text-white/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 — Why This Matters (atmospheric)                         */
/* ------------------------------------------------------------------ */
function WhyThisMatters() {
  return (
    <section className="relative py-28 px-5 sm:px-6 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-stone-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_0%_50%,rgba(100,90,50,0.08),transparent)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <SectionBadge>WHY THIS MATTERS</SectionBadge>
          <h2 className="mt-5 text-[36px] sm:text-[44px] lg:text-[48px] font-bold leading-[1.2] tracking-[-2.88px] italic">
            <span className="text-white">Milestones </span>
            <span className="text-white/40">Fade. </span>
            <span className="text-white">Memories </span>
            <span className="text-white/40">Shouldn&apos;t.</span>
          </h2>
          <p className="mt-6 text-[16px] leading-[1.7] text-white">
            So much happens on your construction site — but without visual
            documentation, the story gets lost. <strong>Stakeholders miss key
            moments.</strong> Marketing misses a golden asset. <strong>History
            disappears.</strong>
          </p>
          <p className="mt-4 text-[16px] leading-[1.5] text-white font-medium">
            That&apos;s why we&apos;re here.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4 — Camera Layout (light section)                          */
/* ------------------------------------------------------------------ */
const cameraCards = [
  {
    label: "Camera 1 & 2",
    subtitle: "South-east & South-west",
    description: "Cherry picker mounted for elevated, wide-angle coverage",
  },
  {
    label: "Camera 3",
    subtitle: "Free-standing mount",
    description: "Ground-level perspective from a key vantage point",
  },
  {
    label: "Camera 4, 5, 6",
    subtitle: "Pole mounts",
    description: "Versatile positioning for targeted build zone coverage",
  },
];

function CameraLayout() {
  return (
    <section className="bg-white py-28 px-5 sm:px-6 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Two-column header */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-start">
          <div>
            <SectionBadge>CAMERA LAYOUT</SectionBadge>
            <h2 className="mt-5 text-[36px] sm:text-[44px] lg:text-[48px] font-bold leading-[1.2] tracking-[-2.88px] text-[#171717]">
              6 Cameras. Every Angle Covered.
            </h2>
          </div>
          <p className="text-[16px] leading-[1.5] text-[#171717]/70 lg:pt-16">
            Each camera is strategically positioned to provide comprehensive
            coverage of your entire site. Multiple mounting options ensure we
            capture every angle of your build.
          </p>
        </div>

        {/* 3-column camera card grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cameraCards.map((card) => (
            <div
              key={card.label}
              className="relative aspect-[4/3] rounded-lg overflow-hidden group"
            >
              {/* Dark gradient simulating construction photo */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-stone-800" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Text overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#F2AF0D]">
                  {card.label}
                </p>
                <h3 className="mt-1 text-[18px] font-bold text-white tracking-tight">
                  {card.subtitle}
                </h3>
                <p className="mt-1 text-[14px] text-white/70">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 5 — The Process (split layout)                             */
/* ------------------------------------------------------------------ */
const processSteps = [
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
      "Delivering a comprehensive time-lapse story of your project from start to finish. A lasting visual record of your entire build journey.",
  },
];

function Process() {
  return (
    <section id="process" className="relative py-28 px-5 sm:px-6 lg:px-20 overflow-hidden">
      {/* Dark atmospheric right side */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-stone-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_80%_50%,rgba(80,70,40,0.1),transparent)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* White card panel */}
          <div className="bg-white rounded-xl p-8 sm:p-10 shadow-2xl">
            <SectionBadge>THE PROCESS</SectionBadge>
            <h2 className="mt-5 text-[28px] sm:text-[34px] font-bold leading-[1.2] tracking-[-1.5px] text-[#171717]">
              Progressive Time-lapse, Built for Milestones
            </h2>
            <p className="mt-4 text-[16px] leading-[1.5] text-[#171717]/70">
              Our three-phase approach ensures your project is captured
              comprehensively from groundbreak to completion.
            </p>

            {/* Steps */}
            <div className="mt-8 flex flex-col">
              {processSteps.map((step, i) => (
                <div
                  key={step.number}
                  className={`flex gap-5 py-5 ${i < processSteps.length - 1 ? "border-b border-dashed border-gray-200" : ""}`}
                >
                  {/* Number + gold bar */}
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <span className="text-[36px] font-bold text-gray-200 leading-none">
                      {step.number}
                    </span>
                    <div className="w-0.5 h-12 bg-[#F2AF0D]" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[18px] font-bold text-[#171717] tracking-tight">
                        {step.title}
                      </h3>
                      <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                    </div>
                    {/* Show description on last step (expanded) */}
                    {i === processSteps.length - 1 && (
                      <p className="mt-2 text-[14px] leading-[1.5] text-[#171717]/70">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side — atmospheric (empty, the bg gradient provides the mood) */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 6 — Who's Behind the Lens (dark atmospheric)               */
/* ------------------------------------------------------------------ */
function BehindTheLens() {
  return (
    <section className="relative py-28 px-5 sm:px-6 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-stone-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_30%_60%,rgba(100,90,50,0.06),transparent)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <SectionBadge>WHY THIS MATTERS</SectionBadge>
          <h2 className="mt-5 text-[36px] sm:text-[40px] lg:text-[44px] font-bold leading-[1.2] tracking-[-2px] text-white">
            Who&apos;s Behind the Lens?
          </h2>
          <p className="mt-6 text-[16px] leading-[1.7] text-white/80">
            We&apos;re storytellers who understand construction. With years of
            experience in both professional photography and the building
            industry, we know which moments matter — and how to capture them.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/services"
              className="h-12 px-6 inline-flex items-center justify-center rounded-lg bg-[#F2AF0D] text-[#171717] text-[14px] font-semibold transition-colors hover:bg-[#dba00c]"
            >
              Meet the Team
            </Link>
            <a
              href="mailto:ben.cook@re-create.au"
              className="h-12 px-6 inline-flex items-center justify-center rounded-lg bg-white/10 border border-white/30 text-white text-[14px] font-semibold transition-colors hover:bg-white/20"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 7 — Add-on Visits (light section)                          */
/* ------------------------------------------------------------------ */
const addons = [
  {
    title: "Progress Capture Ground & Air",
    price: "$300/visit",
    features: [
      "Ground-level photography",
      "Aerial drone photography",
      "Short video clips",
      "Ideal for stakeholder updates",
    ],
  },
  {
    title: "Action Capture Ground & Air",
    price: "$550/visit",
    features: [
      "Everything in Progress Capture",
      "Active construction footage",
      "Trades and machinery in action",
      "Dynamic video content",
    ],
  },
  {
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

function AddonVisits() {
  return (
    <section className="bg-white py-28 px-5 sm:px-6 lg:px-20">
      <div className="mx-auto max-w-7xl text-center">
        <SectionBadge>ADD-ON VISITS</SectionBadge>
        <h2 className="mt-5 text-[36px] sm:text-[44px] lg:text-[48px] font-bold leading-[1.2] tracking-[-2.88px]">
          <span className="text-[#171717] italic">Want More Than Just </span>
          <span className="text-[#C9A45A] italic">Time-lapse?</span>
        </h2>

        {/* 3-column card grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {addons.map((addon) => (
            <div
              key={addon.title}
              className="bg-[#F5F3ED] border-t-[3px] border-t-[#F2AF0D] rounded-lg p-8 sm:p-10"
            >
              <h3 className="text-[20px] font-bold tracking-[-1px] text-[#171717]">
                {addon.title}
              </h3>
              <p className="mt-2 text-[24px] font-bold text-[#F2AF0D]">
                {addon.price}
              </p>
              <ul className="mt-5 space-y-3">
                {addon.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] text-[#171717]/70">
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
  );
}

/* ------------------------------------------------------------------ */
/*  Section 8 — Pricing (light section)                                */
/* ------------------------------------------------------------------ */
const installCards = [
  {
    cameras: "Camera 1 & 2",
    mount: "Cherry picker mounted",
    price: "$1,500",
    note: "+ cherry picker rental",
  },
  {
    cameras: "Camera 3",
    mount: "Free-standing mount",
    price: "$1,200",
    note: null,
  },
  {
    cameras: "Camera 4, 5 & 6",
    mount: "Pole mounts",
    price: "$1,800",
    note: null,
  },
];

function Pricing() {
  return (
    <section className="bg-white py-28 px-5 sm:px-6 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionBadge>PROJECT INVESTMENT</SectionBadge>
        <h2 className="mt-5 text-[40px] sm:text-[52px] lg:text-[64px] font-bold leading-[1.2] tracking-[-1.6px]">
          <span className="italic text-[#8B7E3C]">Transparent </span>
          <span className="text-[#1E293B]">Pricing.</span>
          <br />
          <span className="italic text-[#1E293B]">Seamless </span>
          <span className="text-[#8B7E3C]">Experience.</span>
        </h2>

        {/* Gold divider */}
        <div className="mt-8 h-px bg-gradient-to-r from-[#F2AF0D] via-[#F2AF0D]/50 to-transparent max-w-md" />

        {/* Two-column pricing */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Installation */}
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#B88100] mb-5">
              INSTALLATION & MOUNTING
            </h3>
            <div className="flex flex-col gap-4">
              {installCards.map((card) => (
                <div
                  key={card.cameras}
                  className="relative rounded-lg overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-stone-800" />
                  <div className="relative p-5 flex items-center justify-between">
                    <div>
                      <p className="text-[14px] font-semibold text-white">
                        {card.cameras}
                      </p>
                      <p className="text-[13px] text-white/60 mt-0.5">
                        {card.mount}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[22px] font-bold text-[#F2AF0D]">
                        {card.price}
                      </p>
                      {card.note && (
                        <p className="text-[11px] text-white/50 mt-0.5">
                          {card.note}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[12px] text-[#171717]/50">
              All prices exclude GST
            </p>
          </div>

          {/* Monthly */}
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#B88100] mb-5">
              ONGOING HOSTING & CLOUD STORAGE
            </h3>
            <div className="relative rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-stone-800" />
              <div className="relative p-8">
                <p className="text-[14px] text-white/60">For all 6 cameras</p>
                <p className="mt-2 text-[36px] font-bold text-[#F2AF0D]">
                  $1,500
                  <span className="text-[16px] font-normal text-white/50">
                    /month
                  </span>
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Cloud storage & 5G connectivity",
                    "24/7 camera monitoring",
                    "Quarterly progressive time-lapse videos",
                    "Web portal access for your team",
                    "Ongoing maintenance & support",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-[14px] text-white/80"
                    >
                      <Check className="h-4 w-4 shrink-0 text-[#F2AF0D]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[12px] text-white/40">
                  All prices exclude GST
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 9 — CTA (dark atmospheric)                                 */
/* ------------------------------------------------------------------ */
function FinalCta() {
  return (
    <section className="relative py-28 px-5 sm:px-6 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-stone-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(100,90,50,0.08),transparent)]" />

      <div className="relative mx-auto max-w-7xl text-center">
        <h2 className="text-[36px] sm:text-[40px] lg:text-[44px] font-extrabold leading-[1.2] tracking-[-2px] text-white/90">
          Let&apos;s Start Capturing.
        </h2>
        <p className="mt-4 text-[16px] leading-[1.5] text-white/60 max-w-lg mx-auto">
          Ready to document your next project? Get in touch for a free
          consultation or request a quote.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:ben.cook@re-create.au?subject=Free%20Consultation%20Request"
            className="h-12 px-6 inline-flex items-center justify-center rounded-lg bg-[#F2AF0D] text-[#171717] text-[14px] font-semibold transition-colors hover:bg-[#dba00c]"
          >
            Book a Free Consultation
          </a>
          <a
            href="mailto:ben.cook@re-create.au?subject=Quote%20Request"
            className="h-12 px-6 inline-flex items-center justify-center rounded-lg bg-white/10 border border-white/30 text-white text-[14px] font-semibold transition-colors hover:bg-white/20"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function MarketingHomePage() {
  return (
    <>
      <Hero />
      <WhatsIncluded />
      <WhyThisMatters />
      <CameraLayout />
      <Process />
      <BehindTheLens />
      <AddonVisits />
      <Pricing />
      <FinalCta />
    </>
  );
}

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */
type FaqCategory =
  | "All"
  | "General"
  | "Installation"
  | "Pricing"
  | "Service"
  | "Technical"
  | "Add-ons";

interface FaqItem {
  category: Exclude<FaqCategory, "All">;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  // General
  {
    category: "General",
    question: "What is a construction time-lapse camera system?",
    answer:
      "A construction time-lapse camera system automatically captures images of your construction site at regular intervals, which are then compiled into a video showing the entire build process condensed into minutes. Our system includes high-resolution cameras, 5G connectivity, cloud storage, and quarterly video production.",
  },
  {
    category: "General",
    question: "How many cameras do I need for my project?",
    answer:
      "We typically recommend 6 cameras to provide comprehensive coverage of most construction sites. However, the exact number depends on your site\u2019s size, layout, and specific documentation needs. We conduct a site assessment to determine the optimal camera placement and quantity.",
  },

  // Installation
  {
    category: "Installation",
    question: "How long does installation take?",
    answer:
      "Initial camera installation typically takes 1-2 days depending on your site\u2019s complexity and the mounting types required. We coordinate with your site team to minimise disruption and ensure all safety protocols are followed.",
  },
  {
    category: "Installation",
    question: "What mounting options are available?",
    answer:
      "We offer several mounting options: cherry picker mounted (for elevated views), free-standing mounts, and pole mounts. Each option is designed to provide optimal angles while ensuring camera stability and security throughout your project.",
  },

  // Pricing
  {
    category: "Pricing",
    question: "What are the costs involved?",
    answer:
      "Our pricing includes two components: 1) One-time installation costs ($1,200-$1,800 depending on mounting type, plus any required equipment rental), and 2) Monthly service fee of $1,500 for 6 cameras (includes cloud storage, connectivity, maintenance, and quarterly video production). All prices exclude GST.",
  },
  {
    category: "Pricing",
    question: "Are there any additional costs?",
    answer:
      "The main additional costs are optional add-on visits (Progress Capture at $300/visit, Action Capture at $550/visit, or custom Builders Choice packages). If cherry picker rental is needed for installation, that cost is typically $500-$800.",
  },

  // Service
  {
    category: "Service",
    question: "How often will I receive time-lapse videos?",
    answer:
      "Our standard service includes quarterly Progressive Interim Time-Lapse (PITL) videos. These are professionally edited to showcase your project\u2019s major milestones. You also have 24/7 access to all raw images through our cloud platform.",
  },
  {
    category: "Service",
    question: "Can I access the footage in real-time?",
    answer:
      "Yes! All images are uploaded to our secure cloud platform via 5G connectivity. You and your authorised team members can access the latest images anytime through our web portal.",
  },

  // Technical
  {
    category: "Technical",
    question: "What happens if a camera stops working?",
    answer:
      "We provide 24/7 monitoring of all cameras. If we detect any issues, our team is notified immediately and we\u2019ll coordinate a site visit to resolve the problem. This monitoring and maintenance service is included in your monthly fee.",
  },
  {
    category: "Technical",
    question: "Where is the footage stored?",
    answer:
      "All footage is securely stored on Australian-based servers with redundant backups. This ensures data sovereignty, fast access times, and compliance with Australian data protection regulations.",
  },

  // Add-ons
  {
    category: "Add-ons",
    question: "What\u2019s included in the add-on visit packages?",
    answer:
      "Progress Capture ($300) includes ground and aerial photos/videos of your current site state. Action Capture ($550) adds focus on active construction work. Builders Choice is a custom package for handover documentation, with pricing based on your specific requirements.",
  },
  {
    category: "Add-ons",
    question: "Can I request additional site visits?",
    answer:
      "Absolutely! You can book add-on visits at any time during your project. We recommend booking at least 2 weeks in advance for major milestones, though we can often accommodate shorter notice periods.",
  },
];

const categories: FaqCategory[] = [
  "All",
  "General",
  "Installation",
  "Pricing",
  "Service",
  "Technical",
  "Add-ons",
];

/* ------------------------------------------------------------------ */
/*  FAQ Accordion Item                                                 */
/* ------------------------------------------------------------------ */
function FaqAccordionItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white border border-[#E0E4EA] rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex items-start gap-4"
      >
        <div className="flex-1">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.5px] text-[#B88100] mb-1.5">
            {faq.category}
          </span>
          <span className="block text-[16px] font-bold text-[#171717] tracking-tight leading-snug">
            {faq.question}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-[#171717]/40 mt-1 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-5 -mt-1">
          <p className="text-[14px] leading-[1.6] text-[#171717]/60">
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <>
      {/* Hero — light bg */}
      <section className="bg-white py-24 sm:py-28 px-5 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-7xl text-center">
          <SectionBadge>HELP CENTER</SectionBadge>
          <h1 className="mt-5 text-[40px] sm:text-[52px] lg:text-[60px] font-bold leading-[1.2] tracking-[-3.6px] text-[#171717]">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-[16px] leading-[1.5] text-[#171717]/70 max-w-2xl mx-auto">
            Everything you need to know about our construction time-lapse camera
            systems and services.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="bg-[#F7F8FA] py-20 px-5 sm:px-6 lg:px-20">
        <div className="mx-auto max-w-3xl">
          {/* Category filter pills */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setOpenIndex(null);
                }}
                className={cn(
                  "rounded-lg px-4 py-2 text-[13px] font-medium transition-all",
                  activeCategory === category
                    ? "bg-transparent text-[#171717] font-semibold"
                    : "bg-[#F1F3F6] text-[#171717]/60 hover:text-[#171717]/80"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ accordion */}
          <div className="flex flex-col gap-3">
            {filteredFaqs.map((faq, index) => (
              <FaqAccordionItem
                key={`${faq.category}-${index}`}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </div>

          {/* Still have questions? */}
          <div className="mt-16 bg-[#F7F8FA] border border-[#E0E4EA] rounded-lg p-8 sm:p-12 text-center">
            <h3 className="text-[22px] font-bold text-[#171717] tracking-tight">
              Still have questions?
            </h3>
            <p className="mt-3 text-[16px] text-[#171717]/60">
              We&apos;re happy to help. Get in touch and we&apos;ll get back to
              you as soon as possible.
            </p>
            <a
              href="mailto:ben.cook@re-create.au?subject=FAQ%20Enquiry"
              className="mt-6 inline-block text-[14px] font-bold text-[#171717] underline underline-offset-4 hover:text-[#F2AF0D] transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

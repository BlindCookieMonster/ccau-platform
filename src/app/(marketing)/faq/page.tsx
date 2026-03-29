"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                          */
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
      "We typically recommend 6 cameras to provide comprehensive coverage of most construction sites. However, the exact number depends on your site's size, layout, and specific documentation needs. We conduct a site assessment to determine the optimal camera placement and quantity.",
  },

  // Installation
  {
    category: "Installation",
    question: "How long does installation take?",
    answer:
      "Initial camera installation typically takes 1-2 days depending on your site's complexity and the mounting types required. We coordinate with your site team to minimise disruption and ensure all safety protocols are followed.",
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
      "Our standard service includes quarterly Progressive Interim Time-Lapse (PITL) videos. These are professionally edited to showcase your project's major milestones. You also have 24/7 access to all raw images through our cloud platform.",
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
      "We provide 24/7 monitoring of all cameras. If we detect any issues, our team is notified immediately and we'll coordinate a site visit to resolve the problem. This monitoring and maintenance service is included in your monthly fee.",
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
    question: "What's included in the add-on visit packages?",
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
/*  Component Helpers                                                 */
/* ------------------------------------------------------------------ */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-3 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("All");

  const filteredFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,168,67,0.12),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>FAQ</SectionLabel>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-lg text-slate-300">
              Everything you need to know about our construction time-lapse
              camera systems and services.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Category filter tabs */}
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  activeCategory === category
                    ? "bg-amber-500 text-slate-950"
                    : "border border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <Accordion className="space-y-2">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem
                key={`${faq.category}-${index}`}
                className="rounded-xl border border-white/10 bg-slate-900/60 px-5 not-last:border-b-white/10"
              >
                <AccordionTrigger className="py-4 text-base font-medium text-white hover:no-underline hover:text-amber-400">
                  <span className="pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 leading-relaxed">
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Still have questions */}
          <div className="mt-16 rounded-xl border border-white/10 bg-slate-900/60 p-8 text-center">
            <h3 className="text-xl font-semibold text-white">
              Still Have Questions?
            </h3>
            <p className="mt-2 text-slate-400">
              We&apos;re happy to help. Get in touch and we&apos;ll get back to
              you as soon as possible.
            </p>
            <a
              href="mailto:ben.cook@re-create.au?subject=FAQ%20Enquiry"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

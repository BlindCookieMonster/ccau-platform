"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/our-work", label: "OUR WORK" },
  { href: "/services", label: "SERVICES" },
  { href: "/faq", label: "FAQ" },
];

function MarketingHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full h-[61px] bg-black/20 backdrop-blur-[24px] border-b border-white/10">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-[#F2AF0D] font-bold italic text-[15px] tracking-tight">
            CONSTRUCTION TIMELAPSE
          </span>
          <span className="text-[#F2AF0D]/70 text-[10px] font-medium tracking-[0.5px] uppercase">
            CAMERAS AUSTRALIA
          </span>
        </Link>

        {/* Desktop nav — centre */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[12px] font-medium uppercase tracking-[-0.3px] transition-colors",
                  isActive
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="mailto:ben.cook@re-create.au"
            className="h-9 px-4 flex items-center rounded-lg bg-white/10 border border-white/30 text-white text-[12px] font-semibold transition-colors hover:bg-white/20"
          >
            Get a Quote
          </Link>
          <Link
            href="/sign-in"
            className="text-[12px] font-medium text-white/70 transition-colors hover:text-white"
          >
            Login
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-black/90 backdrop-blur-[24px] md:hidden">
          <nav className="flex flex-col gap-1 px-5 py-4">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-[12px] font-medium uppercase tracking-[-0.3px] transition-colors",
                    isActive
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/sign-in"
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2 text-[12px] font-medium text-white/70 transition-colors hover:text-white"
            >
              Login
            </Link>
            <Link
              href="mailto:ben.cook@re-create.au"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center h-9 px-4 rounded-lg bg-white/10 border border-white/30 text-white text-[12px] font-semibold transition-colors hover:bg-white/20"
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function MarketingFooter() {
  return (
    <footer className="bg-[#0A0906]">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top — Logo + tagline centred */}
        <div className="text-center">
          <div className="flex flex-col items-center leading-tight">
            <span className="text-[#F2AF0D] font-bold italic text-[18px] tracking-tight">
              CONSTRUCTION TIMELAPSE
            </span>
            <span className="text-[#F2AF0D]/70 text-[11px] font-medium tracking-[0.5px] uppercase mt-0.5">
              CAMERAS AUSTRALIA
            </span>
          </div>
          <p className="mt-3 text-white/50 text-[15px] italic">
            Document the unforgettable.
          </p>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-white/10" />

        {/* Middle three-column */}
        <div className="grid gap-8 md:grid-cols-3 items-start">
          {/* Nav links left */}
          <nav className="flex flex-col gap-2 md:items-start items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] font-medium text-white/70 uppercase tracking-[-0.3px] transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social icon circles centre */}
          <div className="flex items-center justify-center gap-3">
            {/* Instagram */}
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          {/* CTA buttons right */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <Link
              href="/services"
              className="text-[12px] font-medium text-white/70 uppercase tracking-[-0.3px] transition-colors hover:text-white"
            >
              View Our Services
            </Link>
            <Link
              href="mailto:ben.cook@re-create.au"
              className="h-9 px-5 flex items-center rounded-lg bg-[#FFCD11] text-[#171717] text-[12px] font-semibold transition-colors hover:bg-[#F2AF0D]"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[12px] text-white/50">
            <Link href="#" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white/70 transition-colors">
              Terms of Service
            </Link>
          </div>
          <p className="text-[12px] text-white/50">
            Copyright {new Date().getFullYear()} Construction Cameras Australia
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col font-[family-name:var(--font-inter)]">
      <MarketingHeader />
      <main className="flex-1 pt-[61px]">{children}</main>
      <MarketingFooter />
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/our-work", label: "Our Work" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
];

function MarketingHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Camera className="h-6 w-6 text-amber-500" />
          <span className="text-lg font-semibold tracking-tight text-white">
            CCAU
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
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
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-amber-500"
                    : "text-slate-300 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="ml-4 flex items-center gap-2">
            <Link
              href="/sign-in"
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              Login
            </Link>
            <Button
              className="bg-amber-500 text-slate-950 hover:bg-amber-400"
              render={<Link href="mailto:ben.cook@re-create.au" />}
            >
              Get a Quote
            </Button>
          </div>
        </nav>

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
        <div className="border-t border-white/10 bg-slate-950 md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
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
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-amber-500"
                      : "text-slate-300 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/sign-in"
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              Login
            </Link>
            <Link
              href="mailto:ben.cook@re-create.au"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-amber-400"
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
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-amber-500" />
              <span className="font-semibold text-white">
                Construction Cameras Australia
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Professional time-lapse camera systems for construction sites
              across Australia.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Navigation
            </h3>
            <ul className="mt-3 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Contact
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="mailto:ben.cook@re-create.au"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  ben.cook@re-create.au
                </a>
              </li>
              <li>
                <span className="text-sm text-slate-400">
                  Geelong, Victoria, Australia
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Construction Cameras Australia.
            All rights reserved.
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
    <div className="flex min-h-screen flex-col bg-slate-950">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/services" },
  { label: "Track Order", href: "/track" },
  { label: "Become a Partner", href: "/apply" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(root.current, { y: -32, opacity: 0, duration: 0.9, delay: 0.1 });
    },
    { scope: root }
  );

  useGSAP(
    () => {
      if (!open || !panel.current) return;
      gsap.from(panel.current, { opacity: 0, y: -8, duration: 0.35 });
      gsap.from(".js-mobile-link", { opacity: 0, y: -6, stagger: 0.04, duration: 0.3 });
    },
    { scope: root, dependencies: [open], revertOnUpdate: true }
  );

  return (
    <header ref={root} className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={`flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
          scrolled ? "border border-border bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(14,23,48,0.2)]" : "bg-transparent"
        }`}
      >
        <Link href="/#home" data-cursor-hover className="font-display text-lg font-semibold tracking-tight text-navy">
          BM <span className="text-primary">Xpress</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-cursor-hover
              className="text-sm text-muted-foreground transition-colors hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link href="/#contact" className={buttonVariants({ size: "sm" })}>
            Get Started
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-navy md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div ref={panel} className="absolute inset-x-4 top-20 rounded-2xl border border-border bg-white p-6 shadow-[0_20px_50px_-20px_rgba(14,23,48,0.3)] md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="js-mobile-link text-base text-navy"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-2">
              <ThemeToggle />
              <Link href="/#contact" onClick={() => setOpen(false)} className={buttonVariants({ size: "sm" })}>
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

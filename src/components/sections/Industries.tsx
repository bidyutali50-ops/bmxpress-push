"use client";

import { useRef } from "react";
import {
  ShoppingCart, Store, Shirt, Apple, HeartPulse, Package,
  UtensilsCrossed, Cpu, Sparkles, Factory,
} from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { industries } from "@/lib/data";

const icons = [ShoppingCart, Store, Shirt, Apple, HeartPulse, Package, UtensilsCrossed, Cpu, Sparkles, Factory];

export function Industries() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        });
        tl.from(".js-ind-head > *", { opacity: 0, y: 20, stagger: 0.08 })
          // Tiles resolve outward from the middle of the grid.
          .from(".js-ind", {
            opacity: 0,
            scale: 0.94,
            stagger: { each: 0.045, from: "center", grid: "auto" },
            duration: 0.6,
          }, "-=0.4");
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".js-ind-head > *", ".js-ind"], { opacity: 1, scale: 1, y: 0 });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative py-28">
      <div className="pointer-events-none absolute inset-0 bg-[#FAFBFD]" />
      <div className="container relative">
        <div className="js-ind-head mx-auto max-w-2xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Industries</p>
          <h2 className="font-display mt-4 text-4xl font-light tracking-[-0.03em] text-navy sm:text-5xl">
            Built for how <span className="font-semibold text-primary">your sector</span> ships
          </h2>
          <p className="mt-4 text-muted-foreground">
            Handling, SLAs and reconciliation change by category. We configure to the
            category rather than pushing everything down one pipe.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {industries.map((ind, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={ind.name}
                data-cursor-hover
                className="js-ind group rounded-2xl border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_16px_40px_-16px_rgba(14,23,48,0.25)]"
              >
                <Icon size={18} className="text-secondary transition-colors duration-300 group-hover:text-primary" />
                <p className="font-display mt-4 text-sm font-semibold text-navy">{ind.name}</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{ind.note}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

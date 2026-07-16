"use client";

import { useRef } from "react";
import {
  Gauge, Radar, Wallet, Truck, Code2, Warehouse, ShieldCheck, LayoutDashboard,
} from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { features } from "@/lib/data";

const icons = [Gauge, Radar, Wallet, Truck, Code2, Warehouse, ShieldCheck, LayoutDashboard];

export function Features() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        });
        tl.from(".js-features-head > *", { opacity: 0, y: 20, stagger: 0.08 })
          // The grid is a single bordered slab, so its cells wipe in as a sheet
          // rather than each tile floating up on its own.
          .from(".js-cell", { opacity: 0, stagger: { each: 0.04, from: "start" }, duration: 0.5 }, "-=0.4")
          .from(".js-cell-inner", { y: 12, opacity: 0, stagger: 0.04, duration: 0.5 }, "<0.05");
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".js-features-head > *", ".js-cell", ".js-cell-inner"], { opacity: 1, y: 0 });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative py-28">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-40" />
      <div className="container relative">
        <div className="js-features-head max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Platform</p>
          <h2 className="font-display mt-4 text-4xl font-light tracking-[-0.03em] text-navy sm:text-5xl">
            Built for <span className="font-semibold text-secondary">operators</span>, not just riders
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={feature.title} className="js-cell group relative bg-white p-6 transition-colors duration-300 hover:bg-[#FAFBFD]">
                <div className="js-cell-inner">
                  <Icon size={18} className="text-secondary transition-colors duration-300 group-hover:text-primary" />
                  <h3 className="font-display mt-4 text-sm font-semibold text-navy">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

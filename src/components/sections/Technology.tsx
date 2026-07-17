"use client";

import { useRef } from "react";
import {
  Radar, Route, Zap, Code2, BarChart3, FileCheck, Cloud, ShieldCheck, BellRing,
} from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { technology } from "@/lib/data";

const icons = [Radar, Route, Zap, Code2, BarChart3, FileCheck, Cloud, ShieldCheck, BellRing];

export function Technology() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        });
        tl.from(".js-tech-head > *", { opacity: 0, y: 20, stagger: 0.08 })
          // One bordered slab, so the cells wipe in as a sheet rather than
          // each tile floating up independently.
          .from(".js-tech-cell", { opacity: 0, stagger: { each: 0.04, from: "start" }, duration: 0.5 }, "-=0.4")
          .from(".js-tech-inner", { y: 12, opacity: 0, stagger: 0.04, duration: 0.5 }, "<0.05");
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".js-tech-head > *", ".js-tech-cell", ".js-tech-inner"], { opacity: 1, y: 0 });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="technology" className="relative py-28">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-40" />
      <div className="container relative">
        <div className="js-tech-head max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Platform</p>
          <h2 className="font-display mt-4 text-4xl font-light tracking-[-0.03em] text-navy sm:text-5xl">
            The delivery runs on <span className="font-semibold text-secondary">our own stack</span>
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            We didn&apos;t bolt software onto a courier business. The platform is the
            business — every rider, hub and shipment is a record in one live system.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {technology.map((t, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={t.title} className="js-tech-cell group relative bg-white p-6 transition-colors duration-300 hover:bg-[#FAFBFD]">
                <div className="js-tech-inner">
                  <div className="flex items-center gap-3">
                    <Icon size={18} className="text-secondary transition-colors duration-300 group-hover:text-primary" />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-sm font-semibold text-navy">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

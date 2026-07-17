"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { aboutPillars } from "@/lib/data";

export function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        });
        tl.from(".js-about-copy > *", { opacity: 0, y: 22, stagger: 0.09 })
          // The rule draws down as the pillars arrive beside it.
          .from(".js-about-rule", { scaleY: 0, transformOrigin: "top", duration: 1 }, "-=0.5")
          .from(".js-pillar", { opacity: 0, x: 20, stagger: 0.1 }, "-=0.85");
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".js-about-copy > *", ".js-pillar"], { opacity: 1, x: 0, y: 0 });
        gsap.set(".js-about-rule", { scaleY: 1 });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="about" className="relative py-28">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="js-about-copy">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              About BM Xpress
            </p>
            <h2 className="font-display mt-4 text-4xl font-light tracking-[-0.03em] text-navy sm:text-5xl">
              A logistics <span className="font-semibold text-primary">technology</span> company
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              BM Xpress builds and runs the software its own fleet moves on. Dispatch,
              routing, proof of delivery and settlement are one system — which is why
              a shipment behaves the same whether it&apos;s one parcel across a city or
              a standing enterprise contract.
            </p>
            <p className="mt-4 max-w-md text-muted-foreground">
              We operate our own hubs and riders in West Bengal, and extend beyond that
              footprint through vetted partners held to the same tracking and settlement
              standards. We&apos;ll always tell you which of the two applies to your lanes.
            </p>
          </div>

          <div className="relative pl-8">
            <span className="js-about-rule absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-primary via-secondary to-transparent" />
            <div className="grid gap-8 sm:grid-cols-2">
              {aboutPillars.map((p) => (
                <div key={p.title} className="js-pillar">
                  <h3 className="font-display text-base font-semibold text-navy">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

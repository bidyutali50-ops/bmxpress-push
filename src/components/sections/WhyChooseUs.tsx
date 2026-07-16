"use client";

import { useRef } from "react";
import { ShieldCheck, HeartHandshake, IndianRupee, Rocket, Cpu, Users2 } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { whyChooseUs } from "@/lib/data";

const icons = [Rocket, ShieldCheck, IndianRupee, HeartHandshake, Cpu, Users2];

export function WhyChooseUs() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        });
        // The copy establishes the claim, then the evidence arrives behind it.
        tl.from(".js-why-copy > *", { opacity: 0, x: -24, stagger: 0.1 })
          .from(".js-why-item", { opacity: 0, y: 20, stagger: { each: 0.07, from: "start" } }, "-=0.5");
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".js-why-copy > *", ".js-why-item"], { opacity: 1, x: 0, y: 0 });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="why-us" className="relative py-28">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="js-why-copy">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Why BM Xpress
            </p>
            <h2 className="font-display mt-4 text-4xl font-light tracking-[-0.03em] text-navy sm:text-5xl">
              The infrastructure behind your <span className="font-semibold text-primary">last mile</span>
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              We run the riders, the routing and the reconciliation — so your team
              can focus on the product, not the delivery problem.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {whyChooseUs.map((item, i) => {
              const Icon = icons[i % icons.length];
              return (
                <div key={item.title} className="js-why-item group bg-white p-5 transition-colors duration-300 hover:bg-[#FAFBFD]">
                  <Icon size={18} className="text-secondary transition-colors duration-300 group-hover:text-primary" />
                  <p className="font-display mt-3 text-sm font-semibold text-navy">{item.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

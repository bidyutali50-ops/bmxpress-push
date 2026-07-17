"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { faqs } from "@/lib/data";

export function FAQ() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        });
        tl.from(".js-faq-head > *", { opacity: 0, y: 20, stagger: 0.08 })
          .from(".js-faq-row", { opacity: 0, y: 14, stagger: 0.06 }, "-=0.4");
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".js-faq-head > *", ".js-faq-row"], { opacity: 1, y: 0 });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  // Height animates from its measured value, so answers of any length open
  // correctly — a fixed max-height would either clip or lag.
  useGSAP(
    () => {
      faqs.forEach((_, i) => {
        const panel = root.current?.querySelector<HTMLElement>(`.js-answer-${i}`);
        if (!panel) return;
        const isOpen = open === i;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        gsap.to(panel, {
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          duration: reduced ? 0 : 0.45,
          ease: "power2.inOut",
        });
        gsap.to(`.js-plus-${i}`, {
          rotate: isOpen ? 135 : 0,
          duration: reduced ? 0 : 0.4,
          ease: "power2.inOut",
        });
      });
    },
    { scope: root, dependencies: [open] }
  );

  return (
    <section ref={root} className="relative py-28">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="js-faq-head">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">FAQ</p>
            <h2 className="font-display mt-4 text-4xl font-light tracking-[-0.03em] text-navy sm:text-5xl">
              Questions, <span className="font-semibold text-primary">answered</span>
            </h2>
            <p className="mt-4 max-w-sm text-muted-foreground">
              Anything not covered here, ask us directly — a real person on the ops
              team replies within one business day.
            </p>
          </div>

          <div className="border-t border-border">
            {faqs.map((faq, i) => (
              <div key={faq.q} className="js-faq-row border-b border-border">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  data-cursor-hover
                  className="flex w-full items-start justify-between gap-6 py-5 text-left"
                >
                  <span className={`font-display text-base transition-colors duration-300 ${open === i ? "text-primary" : "text-navy"}`}>
                    {faq.q}
                  </span>
                  <Plus size={16} className={`js-plus-${i} mt-1 shrink-0 ${open === i ? "text-primary" : "text-muted-foreground"}`} />
                </button>
                <div className={`js-answer-${i} overflow-hidden`} style={{ height: 0, opacity: 0 }}>
                  <p className="pb-5 pr-10 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

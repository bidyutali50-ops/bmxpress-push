"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { numbers } from "@/lib/data";

export function Numbers() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" },
        (context) => {
          const { reduced } = context.conditions as { reduced: boolean };
          const cells = gsap.utils.toArray<HTMLElement>(".js-number");

          cells.forEach((cell) => {
            const valueEl = cell.querySelector<HTMLElement>(".js-value");
            if (!valueEl) return;
            const target = Number(valueEl.dataset.value ?? 0);

            if (reduced) {
              valueEl.textContent = target.toLocaleString("en-IN");
              return;
            }

            // Animating a proxy object and writing the rounded result each tick
            // is GSAP's idiomatic counter — no React state, so no re-render per frame.
            const proxy = { n: 0 };
            gsap.to(proxy, {
              n: target,
              duration: 1.8,
              ease: "power2.out",
              scrollTrigger: { trigger: cell, start: "top 85%", once: true },
              onUpdate: () => {
                valueEl.textContent = Math.round(proxy.n).toLocaleString("en-IN");
              },
            });
          });

          if (!reduced) {
            gsap.from(cells, {
              opacity: 0,
              y: 16,
              stagger: 0.1,
              scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
            });
          }
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative border-y border-border py-20">
      <div className="container grid grid-cols-2 gap-y-10 sm:grid-cols-4">
        {numbers.map((n) => (
          <div key={n.label} className="js-number border-l border-border pl-5">
            <p className="font-display text-4xl font-semibold tabular-nums tracking-tight text-navy sm:text-5xl">
              <span className="js-value" data-value={n.value}>0</span>
              <span className="text-primary">{n.suffix}</span>
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {n.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

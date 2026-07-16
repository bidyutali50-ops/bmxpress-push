"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { coverageHubs, coverageRoutes } from "@/lib/data";

export function Coverage() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const hubMap = Object.fromEntries(coverageHubs.map((h) => [h.id, h]));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" },
        (context) => {
          const { reduced } = context.conditions as { reduced: boolean };
          const routes = gsap.utils.toArray<SVGLineElement>(".js-route");

          if (reduced) {
            gsap.set([".js-coverage-head > *", ".js-map", ".js-hub", ".js-chip"], { opacity: 1, y: 0, scale: 1 });
            gsap.set(routes, { strokeDashoffset: 0 });
            return;
          }

          // Each route is masked by its own length, so it draws from origin to
          // destination — the network literally builds itself rather than fading in.
          routes.forEach((line) => {
            const len = line.getTotalLength();
            gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
          });

          const tl = gsap.timeline({
            scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
          });

          tl.from(".js-coverage-head > *", { opacity: 0, y: 20, stagger: 0.08 })
            .from(".js-map", { opacity: 0, y: 24 }, "-=0.4")
            .to(routes, { strokeDashoffset: 0, duration: 0.9, stagger: 0.09, ease: "power2.inOut" }, "-=0.3")
            // Hubs land after the route reaches them, not before.
            .from(".js-hub", { scale: 0, opacity: 0, transformOrigin: "center", stagger: { each: 0.06, from: "center" }, ease: "back.out(2)", duration: 0.5 }, "-=0.7")
            .from(".js-chip", { opacity: 0, y: 10, stagger: 0.03, duration: 0.4 }, "-=0.3");
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative py-28">
      <div className="container">
        <div className="js-coverage-head mx-auto max-w-2xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Coverage network
          </p>
          <h2 className="font-display mt-4 text-4xl font-light tracking-[-0.03em] text-navy sm:text-5xl">
            Live across <span className="font-semibold text-primary">West Bengal</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            A schematic view of our hub network — hover a node for the district it serves.
          </p>
        </div>

        <div className="js-map mx-auto mt-16 max-w-3xl rounded-3xl border border-border bg-white p-6 shadow-[0_24px_60px_-30px_rgba(14,23,48,0.25)] sm:p-10">
          <div className="relative mx-auto aspect-[4/5] max-w-md">
            <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
              {coverageRoutes.map(([from, to]) => {
                const a = hubMap[from];
                const b = hubMap[to];
                if (!a || !b) return null;
                return (
                  <line
                    key={`${from}-${to}`}
                    className="js-route"
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke="#E30613"
                    strokeWidth="0.4"
                    strokeOpacity="0.4"
                  />
                );
              })}

              {coverageHubs.map((hub) => (
                <g
                  key={hub.id}
                  className="js-hub cursor-pointer"
                  onMouseEnter={() => setActive(hub.id)}
                  onMouseLeave={() => setActive(null)}
                >
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={hub.tier === "primary" ? 2.6 : 1.8}
                    fill={hub.tier === "primary" ? "#E30613" : "#2563EB"}
                    style={{ transition: "r 0.2s ease" }}
                  />
                  {hub.tier === "primary" && (
                    <circle
                      cx={hub.x} cy={hub.y} r="4.5"
                      fill="none" stroke="#E30613" strokeWidth="0.3" opacity="0.5"
                      className="animate-pulse-glow"
                    />
                  )}
                </g>
              ))}
            </svg>

            {coverageHubs.map((hub) => (
              <span
                key={hub.id}
                style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                className={`pointer-events-none absolute -translate-x-1/2 -translate-y-[220%] whitespace-nowrap rounded-full bg-navy px-2 py-0.5 text-[10px] font-medium text-white transition-opacity duration-200 ${
                  active === hub.id ? "opacity-100" : "opacity-0"
                }`}
              >
                {hub.name}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {coverageHubs.map((hub) => (
              <Link
                key={hub.id}
                href={`/areas/${hub.id}`}
                onMouseEnter={() => setActive(hub.id)}
                onMouseLeave={() => setActive(null)}
                data-cursor-hover
                className={`js-chip rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  active === hub.id
                    ? "border-primary/60 bg-primary/5 text-primary"
                    : "border-border text-muted-foreground hover:border-navy/25"
                }`}
              >
                {hub.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { coverageHubs, coverageRoutes } from "@/lib/data";

export function Coverage() {
  const [active, setActive] = useState<string | null>(null);
  const hubMap = Object.fromEntries(coverageHubs.map((h) => [h.id, h]));

  return (
    <section className="relative py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Coverage network</p>
          <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Live across West Bengal
          </h2>
          <p className="mt-4 text-muted-foreground">
            A schematic view of our hub network — hover a node for the district it serves.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass mx-auto mt-16 max-w-3xl rounded-3xl p-6 sm:p-10"
        >
          <div className="relative mx-auto aspect-[4/5] max-w-md">
            <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
              {coverageRoutes.map(([from, to], i) => {
                const a = hubMap[from];
                const b = hubMap[to];
                if (!a || !b) return null;
                return (
                  <motion.line
                    key={`${from}-${to}`}
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke="#E30613"
                    strokeWidth="0.4"
                    strokeOpacity="0.35"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 + i * 0.08 }}
                  />
                );
              })}

              {coverageHubs.map((hub, i) => (
                <g
                  key={hub.id}
                  onMouseEnter={() => setActive(hub.id)}
                  onMouseLeave={() => setActive(null)}
                  className="cursor-pointer"
                >
                  <motion.circle
                    cx={hub.x}
                    cy={hub.y}
                    r={hub.tier === "primary" ? 2.6 : 1.8}
                    fill={hub.tier === "primary" ? "#E30613" : "#111111"}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.06, type: "spring", stiffness: 200 }}
                    animate={active === hub.id ? { scale: 1.6 } : { scale: 1 }}
                  />
                  {hub.tier === "primary" && (
                    <circle cx={hub.x} cy={hub.y} r="4.5" fill="none" stroke="#E30613" strokeWidth="0.3" opacity="0.5" className="animate-pulse-glow" />
                  )}
                </g>
              ))}
            </svg>

            {coverageHubs.map((hub) => (
              <span
                key={hub.id}
                style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                className={`pointer-events-none absolute -translate-x-1/2 -translate-y-[220%] whitespace-nowrap rounded-full border border-border bg-ink-900/90 px-2 py-0.5 text-[10px] font-medium text-foreground transition-opacity duration-200 ${
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
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  active === hub.id
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-foreground/20"
                }`}
              >
                {hub.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

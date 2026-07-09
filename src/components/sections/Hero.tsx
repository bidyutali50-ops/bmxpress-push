"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Globe } from "@/components/three/Globe";
import { Starfield } from "@/components/three/Starfield";
import { heroStats } from "@/lib/data";
import { useCounter } from "@/hooks/useCounter";

const capabilities = [
  "Hyperlocal",
  "Last-mile",
  "Quick commerce",
  "3PL fulfilment",
  "Dedicated fleet",
];

const ease = [0.16, 1, 0.3, 1] as const;

function Stat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const count = useCounter(value, { duration: 1600 });
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease }}
      className="border-l border-border pl-4"
    >
      <p className="font-display text-3xl font-semibold tabular-nums tracking-tight text-navy sm:text-4xl">
        {count}
        <span className="text-primary">{suffix}</span>
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32">
      <div className="pointer-events-none absolute inset-0 bg-grid-fine bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute inset-0 mesh-bg" />

      <div className="container relative z-10">
        <div className="grid items-center gap-8 pb-8 lg:grid-cols-[1.05fr_1fr] lg:gap-4">
          {/* ---------- Type ---------- */}
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="flex flex-wrap items-center gap-x-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              <span className="inline-block h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary" />
              Murshidabad
              <span className="text-primary">&rarr;</span>
              Kolkata
              <span className="text-border">/</span>
              30 hubs
              <span className="text-border">/</span>
              24&times;7
            </motion.p>

            <h1 className="font-display mt-6 text-[2.75rem] leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-[4.25rem]">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.05, ease }}
                className="block font-light text-navy"
              >
                Delivering <span className="font-semibold text-primary">Speed.</span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.18, ease }}
                className="mt-1 block font-light text-navy"
              >
                Powered by <span className="font-semibold text-secondary">Technology.</span>
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease }}
              className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground"
            >
              We move parcels across 200+ pincodes in West Bengal — dispatched from
              30 hubs, carried by 500+ riders, and tracked end to end.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.42 }}
              className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
            >
              {capabilities.map((c, i) => (
                <li key={c} className="flex items-center gap-4">
                  {i > 0 && <span className="text-border">&middot;</span>}
                  {c}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Button size="lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Get Started <ArrowRight size={16} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                <MessageCircle size={16} /> Contact Us
              </Button>
            </motion.div>
          </div>

          {/* ---------- Globe ---------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease }}
            className="relative h-[340px] w-full sm:h-[440px] lg:h-[560px]"
          >
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(37,99,235,0.22), transparent 70%)" }}
            />
            <Canvas camera={{ position: [0, 0, 6.4], fov: 42 }} dpr={[1, 1.75]}>
              <Suspense fallback={null}>
                <Starfield count={420} />
                <Globe />
              </Suspense>
            </Canvas>
          </motion.div>
        </div>

        {/* ---------- Stats ---------- */}
        <div className="grid grid-cols-2 gap-y-8 border-t border-border py-10 sm:grid-cols-4">
          {heroStats.map((s, i) => (
            <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={0.6 + i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

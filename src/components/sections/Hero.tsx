"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe } from "@/components/three/Globe";
import { Starfield } from "@/components/three/Starfield";
import { heroStats } from "@/lib/data";
import { useCounter } from "@/hooks/useCounter";

const words = ["Hyperlocal Delivery", "Last-Mile Logistics", "Quick Commerce", "3PL Fulfilment", "Dedicated Fleet"];

function StatItem({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const count = useCounter(value, { duration: 1800 });
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="glass rounded-2xl px-5 py-4 text-center"
    >
      <p className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
        {count}
        {suffix}
      </p>
      <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">{label}</p>
    </motion.div>
  );
}

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden pt-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-white bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute inset-0 mesh-bg" />

      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6.5], fov: 42 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <Starfield />
            <Globe />
          </Suspense>
        </Canvas>
      </div>

      <div className="container relative z-10 flex flex-1 flex-col items-center justify-center py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Badge>India · West Bengal · 24x7 dispatch</Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          Delivering the <span className="text-primary text-glow">Future</span> of Logistics
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 h-7 overflow-hidden"
        >
          <motion.div
            animate={{ y: `-${wordIndex * 1.75}rem` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => setWordIndex((i) => (i + 1) % words.length)}
          >
            {words.map((w) => (
              <p key={w} className="h-7 text-base font-medium text-muted-foreground sm:text-lg">
                {w}
              </p>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button size="lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Get Started <ArrowRight size={16} />
          </Button>
          <Button size="lg" variant="outline" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            <MessageCircle size={16} /> Contact Us
          </Button>
        </motion.div>

        <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {heroStats.map((s, i) => (
            <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={0.7 + i * 0.1} />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="relative z-10 mx-auto mb-10 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-[11px] uppercase tracking-widest">Scroll</span>
        <span className="h-8 w-[1px] animate-pulse-glow bg-primary" />
      </motion.div>
    </section>
  );
}

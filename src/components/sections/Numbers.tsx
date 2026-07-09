"use client";

import { motion } from "framer-motion";
import { numbers } from "@/lib/data";
import { useCounter } from "@/hooks/useCounter";
import { useInView } from "@/hooks/useInView";

function NumberItem({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const count = useCounter(value, { duration: 1800, start: inView });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <p className="font-display text-glow text-5xl font-semibold text-primary sm:text-6xl">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">{label}</p>
    </motion.div>
  );
}

export function Numbers() {
  return (
    <section className="relative border-y border-border/70 bg-gradient-to-b from-transparent via-primary/[0.04] to-transparent py-24">
      <div className="container grid grid-cols-2 gap-10 sm:grid-cols-4">
        {numbers.map((n, i) => (
          <NumberItem key={n.label} value={n.value} suffix={n.suffix} label={n.label} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}

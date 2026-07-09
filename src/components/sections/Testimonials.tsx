"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section className="relative py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Partners</p>
          <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            What our partners say
          </h2>
        </div>

        <div className="relative mx-auto mt-16 max-w-2xl">
          <Quote className="mx-auto mb-6 text-primary/40" size={36} />
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl p-8 text-center sm:p-12"
            >
              <p className="font-display text-xl leading-relaxed text-foreground sm:text-2xl">
                &ldquo;{current.quote}&rdquo;
              </p>
              <p className="mt-6 text-sm font-semibold">{current.name}</p>
              <p className="text-xs text-muted-foreground">{current.company}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-primary" : "w-1.5 bg-foreground/[0.06]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

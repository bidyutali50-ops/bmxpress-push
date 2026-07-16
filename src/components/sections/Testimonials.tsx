"use client";

import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  // Re-runs whenever the quote changes, animating the new one in. revertOnUpdate
  // clears the previous tween so rapid changes can't stack conflicting states.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(card.current, { opacity: 0, y: 14, duration: 0.6 });
    },
    { scope: root, dependencies: [index], revertOnUpdate: true }
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".js-testi-head > *", {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const current = testimonials[index];

  return (
    <section ref={root} className="relative py-28">
      <div className="container">
        <div className="js-testi-head mx-auto max-w-2xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Partners</p>
          <h2 className="font-display mt-4 text-4xl font-light tracking-[-0.03em] text-navy sm:text-5xl">
            What our <span className="font-semibold text-primary">partners</span> say
          </h2>
        </div>

        <div className="relative mx-auto mt-14 max-w-2xl">
          <Quote className="mx-auto mb-6 text-border" size={32} />
          <div ref={card} className="rounded-3xl border border-border bg-white p-8 text-center shadow-[0_24px_60px_-32px_rgba(14,23,48,0.28)] sm:p-12">
            <p className="font-display text-xl font-light leading-relaxed text-navy sm:text-2xl">
              &ldquo;{current.quote}&rdquo;
            </p>
            <p className="mt-6 text-sm font-semibold text-navy">{current.name}</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{current.company}</p>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-primary" : "w-1.5 bg-border hover:bg-navy/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

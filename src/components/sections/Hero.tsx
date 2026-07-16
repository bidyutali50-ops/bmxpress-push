"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ArrowRight, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP, EASE } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { Globe } from "@/components/three/Globe";
import { Starfield } from "@/components/three/Starfield";
import { heroStats } from "@/lib/data";

gsap.registerPlugin(SplitText);

const capabilities = ["Hyperlocal", "Last-mile", "Quick commerce", "3PL fulfilment", "Dedicated fleet"];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(".js-h-anim", { opacity: 1, y: 0 });
        return;
      }

      let split: SplitText | undefined;

      // useGSAP runs in a layout effect, so hiding here happens before first
      // paint — without it the headline would paint in place and then jump to
      // its start position once SplitText resolves. JS off means it never
      // hides, so the copy still renders for crawlers and no-JS visitors.
      gsap.set(".js-headline", { autoAlpha: 0 });

      // Splitting before fonts settle measures the wrong line breaks.
      document.fonts.ready.then(() => {
        split = new SplitText(".js-headline", { type: "lines", mask: "lines" });
        gsap.set(".js-headline", { autoAlpha: 1 });

        const tl = gsap.timeline({ defaults: { ease: EASE.out } });

        tl.from(".js-eyebrow", { opacity: 0, y: 10, duration: 0.6 })
          // Lines rise out of their own mask — the single most effective way to
          // make a headline read as typeset rather than faded in.
          .from(split.lines, { yPercent: 110, duration: 1, stagger: 0.12 }, "-=0.3")
          .from(".js-sub", { opacity: 0, y: 14, duration: 0.7 }, "-=0.6")
          .from(".js-cap", { opacity: 0, y: 8, stagger: 0.05, duration: 0.5 }, "-=0.45")
          .from(".js-cta", { opacity: 0, y: 12, stagger: 0.08, duration: 0.6 }, "-=0.35")
          .from(".js-globe", { opacity: 0, scale: 0.92, duration: 1.4, ease: EASE.expo }, 0.2)
          .from(".js-stat", { opacity: 0, y: 16, stagger: 0.07, duration: 0.6 }, "-=0.8");

        // Counters run off the same clock as the reveal, not a separate hook.
        gsap.utils.toArray<HTMLElement>(".js-stat-value").forEach((el) => {
          const target = Number(el.dataset.value ?? 0);
          const proxy = { n: 0 };
          gsap.to(proxy, {
            n: target,
            duration: 1.6,
            delay: 0.9,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = Math.round(proxy.n).toString();
            },
          });
        });
      });

      return () => {
        split?.revert();
        gsap.set(".js-headline", { clearProps: "visibility,opacity" });
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} id="home" className="relative overflow-hidden pt-32">
      <div className="pointer-events-none absolute inset-0 bg-grid-fine bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute inset-0 mesh-bg" />

      <div className="container relative z-10">
        <div className="grid items-center gap-8 pb-8 lg:grid-cols-[1.05fr_1fr] lg:gap-4">
          {/* Type */}
          <div className="max-w-xl">
            <p className="js-eyebrow js-h-anim flex flex-wrap items-center gap-x-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary" />
              Murshidabad
              <span className="text-primary">&rarr;</span>
              Kolkata
              <span className="text-border">/</span>
              30 hubs
              <span className="text-border">/</span>
              24&times;7
            </p>

            <h1 className="js-headline js-h-anim font-display mt-6 text-[2.75rem] font-light leading-[1.02] tracking-[-0.04em] text-navy sm:text-6xl lg:text-[4.25rem]">
              Delivering <span className="font-semibold text-primary">Speed.</span>{" "}
              Powered by <span className="font-semibold text-secondary">Technology.</span>
            </h1>

            <p className="js-sub js-h-anim mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
              We move parcels across 200+ pincodes in West Bengal — dispatched from
              30 hubs, carried by 500+ riders, and tracked end to end.
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {capabilities.map((c, i) => (
                <li key={c} className="js-cap js-h-anim flex items-center gap-4">
                  {i > 0 && <span className="text-border">&middot;</span>}
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <div className="js-cta js-h-anim">
                <Button size="lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                  Get Started <ArrowRight size={16} />
                </Button>
              </div>
              <div className="js-cta js-h-anim">
                <Button size="lg" variant="outline" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                  <MessageCircle size={16} /> Contact Us
                </Button>
              </div>
            </div>
          </div>

          {/* Globe */}
          <div className="js-globe js-h-anim relative h-[340px] w-full sm:h-[440px] lg:h-[560px]">
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
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-y-8 border-t border-border py-10 sm:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="js-stat js-h-anim border-l border-border pl-4">
              <p className="font-display text-3xl font-semibold tabular-nums tracking-tight text-navy sm:text-4xl">
                <span className="js-stat-value" data-value={s.value}>0</span>
                <span className="text-primary">{s.suffix}</span>
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

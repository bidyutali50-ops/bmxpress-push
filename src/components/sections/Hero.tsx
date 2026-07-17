"use client";

import { Suspense, useRef } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP, EASE } from "@/lib/gsap";
import { Button, buttonVariants } from "@/components/ui/button";
import { Globe } from "@/components/three/Globe";
import { Starfield } from "@/components/three/Starfield";

const capabilities = ["Last-mile", "Hyperlocal", "Quick commerce", "Fulfilment", "Enterprise"];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".js-h", { opacity: 1, y: 0 });
        return;
      }

      let split: SplitText | undefined;

      // Hidden in the layout effect, before first paint, so the headline can't
      // render in place and then jump once SplitText resolves. With JS off it
      // never hides — the copy still renders for crawlers.
      gsap.set(".js-headline", { autoAlpha: 0 });

      document.fonts.ready.then(() => {
        split = new SplitText(".js-headline", { type: "lines", mask: "lines" });
        gsap.set(".js-headline", { autoAlpha: 1 });

        const tl = gsap.timeline({ defaults: { ease: EASE.out } });
        tl.from(".js-eyebrow", { opacity: 0, y: 10, duration: 0.6 })
          .from(split.lines, { yPercent: 110, duration: 1.05, stagger: 0.11 }, "-=0.3")
          .from(".js-sub", { opacity: 0, y: 14, duration: 0.7 }, "-=0.65")
          .from(".js-cap", { opacity: 0, y: 8, stagger: 0.05, duration: 0.5 }, "-=0.45")
          .from(".js-cta", { opacity: 0, y: 12, stagger: 0.09, duration: 0.6 }, "-=0.35")
          .from(".js-globe", { opacity: 0, scale: 0.92, duration: 1.5, ease: EASE.expo }, 0.2)
          .from(".js-scroll", { opacity: 0, duration: 0.6 }, "-=0.4");
      });

      // The indicator keeps breathing after the entrance settles.
      gsap.to(".js-scroll-dot", {
        y: 14,
        repeat: -1,
        duration: 1.5,
        ease: "power1.inOut",
        yoyo: true,
      });

      return () => {
        split?.revert();
        gsap.set(".js-headline", { clearProps: "visibility,opacity" });
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} id="home" className="relative min-h-screen overflow-hidden pt-32">
      <div className="pointer-events-none absolute inset-0 bg-grid-fine bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute inset-0 mesh-bg" />

      <div className="container relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-4">
          <div className="max-w-xl">
            <p className="js-eyebrow js-h flex flex-wrap items-center gap-x-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary" />
              Logistics technology
              <span className="text-border">/</span>
              HQ West Bengal
              <span className="text-border">/</span>
              Built to scale nationally
            </p>

            <h1 className="js-headline js-h font-display mt-6 text-[2.75rem] font-light leading-[1.02] tracking-[-0.04em] text-navy sm:text-6xl lg:text-[4.25rem]">
              The Future of <span className="font-semibold text-primary">Smart Logistics</span>
            </h1>

            <p className="js-sub js-h mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
              Technology-powered last-mile delivery, fulfilment and logistics
              solutions helping businesses scale across India.
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {capabilities.map((c, i) => (
                <li key={c} className="js-cap js-h flex items-center gap-4">
                  {i > 0 && <span className="text-border">&middot;</span>}
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <div className="js-cta js-h">
                <Button size="lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                  Get Started <ArrowRight size={16} />
                </Button>
              </div>
              <div className="js-cta js-h">
                <Link href="/apply" className={buttonVariants({ size: "lg", variant: "outline" })}>
                  Become a Delivery Partner
                </Link>
              </div>
            </div>
          </div>

          <div className="js-globe js-h relative h-[340px] w-full sm:h-[440px] lg:h-[560px]">
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

        <div className="js-scroll js-h flex justify-center pb-10 pt-4">
          <div className="flex h-11 w-6 items-start justify-center rounded-full border border-border p-1.5">
            <span className="js-scroll-dot block h-1.5 w-1.5 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}

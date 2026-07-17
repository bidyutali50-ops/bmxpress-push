"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CheckCircle2, ClipboardList, MapPin, Package, Truck, Warehouse } from "lucide-react";
import { processSteps } from "@/lib/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const RED = "#E53935";
const BLUE = "#2563EB";
const NAVY = "#0E1730";

const icons = [ClipboardList, MapPin, Warehouse, Truck, Package, CheckCircle2];

const steps = processSteps.map((step, i) => ({
  icon: icons[i],
  label: step.label,
  description: step.description,
}));

const LAST = steps.length - 1;
const accentFor = (i: number) => (i === LAST ? RED : BLUE);

export function DeliveryProcess() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const activate = (i: number) => ({
        node: { backgroundColor: accentFor(i), borderColor: accentFor(i), color: "#ffffff", scale: 1.1 },
        numeral: { color: accentFor(i) },
        label: { color: NAVY, opacity: 1 },
      });

      const mm = gsap.matchMedia();

      // ---- Desktop: pin, and let scroll carry the parcel down the rail ------
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        // Step 0 is where the parcel starts, so it is lit before any scrolling
        // happens — otherwise the pinned section opens looking empty.
        gsap.set(".js-node-0", activate(0).node);
        gsap.set(".js-numeral-0", activate(0).numeral);
        gsap.set(".js-label-0", activate(0).label);
        gsap.set(".js-caption-0", { autoAlpha: 1, y: 0 });
        gsap.set(".js-parcel", { xPercent: -50, yPercent: -50 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: `+=${LAST * 60}%`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true, // re-measure the track on resize
          },
        });

        // The track spans node 0's centre to node 5's centre, so scroll progress
        // maps 1:1 onto the parcel passing each node: node i lights at i / LAST.
        // x (transform) not `left` — `left` would force layout every frame.
        tl.to(".js-rail-fill", { scaleX: 1, ease: "none" }, 0)
          .to(".js-parcel", { x: () => track.current?.offsetWidth ?? 0, ease: "none" }, 0)
          .to(".js-parcel-icon", { rotate: 720, ease: "none" }, 0);

        steps.forEach((_, i) => {
          const at = i / LAST;
          const state = activate(i);

          if (i > 0) {
            tl.to(`.js-node-${i}`, { ...state.node, duration: 0.05 }, at)
              .to(`.js-numeral-${i}`, { ...state.numeral, duration: 0.05 }, at)
              .to(`.js-label-${i}`, { ...state.label, duration: 0.05 }, at)
              .to(`.js-caption-${i}`, { autoAlpha: 1, y: 0, duration: 0.05 }, at);
          }
          // Retire each caption just before the next one lands.
          if (i < LAST) {
            tl.to(`.js-caption-${i}`, { autoAlpha: 0, y: -10, duration: 0.05 }, (i + 1) / LAST - 0.05);
          }
        });
      });

      // ---- Mobile / reduced motion: a plain readable list, no pin, no scrub --
      mm.add("(max-width: 767px), (prefers-reduced-motion: reduce)", () => {
        steps.forEach((_, i) => {
          const state = activate(i);
          gsap.set(`.js-node-${i}`, { ...state.node, scale: 1 });
          gsap.set(`.js-numeral-${i}`, state.numeral);
          gsap.set(`.js-label-${i}`, state.label);
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex flex-col justify-center overflow-hidden py-24 md:min-h-screen md:py-0"
    >
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-40" />

      <div className="container relative">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            How it works
          </p>
          <h2 className="font-display mt-4 text-4xl font-light tracking-[-0.03em] text-navy sm:text-5xl">
            From checkout to <span className="font-semibold text-primary">doorstep</span>
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Six steps run behind every order — whether it&apos;s one hyperlocal drop
            or two hundred next-day parcels.
          </p>
        </div>

        {/* ---------------- Rail (desktop only) ---------------- */}
        <div className="relative mt-16 md:mt-24">
          {/* Track spans node 0 → node 5 centres: each of 6 columns is 1/6 wide,
              so the first centre sits at 1/12 (8.333%) and the last at 11/12. */}
          <div
            ref={track}
            className="pointer-events-none absolute top-7 hidden h-px md:block"
            style={{ left: "8.333%", right: "8.333%" }}
          >
            <div className="absolute inset-0 bg-border" />
            <div className="js-rail-fill absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-secondary to-primary" />
            <div className="js-parcel absolute left-0 top-0">
              <div className="js-parcel-icon flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white shadow-[0_8px_24px_-6px_rgba(14,23,48,0.5)]">
                <Package size={16} />
              </div>
            </div>
          </div>

          <ol className="relative grid grid-cols-1 gap-6 md:grid-cols-6 md:gap-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.label}
                  className="flex items-start gap-4 md:flex-col md:items-center md:gap-0 md:text-center"
                >
                  <div
                    className={`js-node-${i} flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-white text-muted-foreground md:h-14 md:w-14`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="md:contents">
                    <span
                      className={`js-numeral-${i} font-mono text-[10px] tracking-[0.2em] text-muted-foreground md:mt-4`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`js-label-${i} mt-0.5 block text-sm font-medium text-muted-foreground opacity-60 md:mt-1 md:max-w-[8rem]`}
                    >
                      {step.label}
                    </span>
                    {/* Inline on mobile; the crossfading caption below covers desktop. */}
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground md:hidden">
                      {step.description}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ---------------- Crossfading caption (desktop only) ---------------- */}
        <div className="relative mt-16 hidden h-16 md:block">
          {steps.map((step, i) => (
            <p
              key={step.label}
              className={`js-caption-${i} absolute inset-x-0 mx-auto max-w-lg text-center text-lg leading-relaxed text-muted-foreground`}
              style={{ visibility: "hidden", opacity: 0 }}
            >
              {step.description}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

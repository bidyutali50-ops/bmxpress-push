"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Bike, CheckCircle2, MapPin, Package, Truck } from "lucide-react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@/lib/gsap";
import { shipmentTimeline } from "@/lib/data";

gsap.registerPlugin(MotionPathPlugin);

const PATH = "M 40 200 C 120 60, 220 260, 320 120 S 480 40, 560 160";

export function LiveTracking() {
  const root = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [eta, setEta] = useState(17);

  useEffect(() => {
    const stepTimer = setInterval(
      () => setActiveStep((s) => (s < shipmentTimeline.length - 1 ? s + 1 : 1)),
      3200
    );
    const etaTimer = setInterval(() => setEta((e) => (e > 3 ? e - 1 : 17)), 1200);
    return () => {
      clearInterval(stepTimer);
      clearInterval(etaTimer);
    };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" },
        (context) => {
          const { reduced } = context.conditions as { reduced: boolean };
          const route = document.querySelector<SVGPathElement>(".js-route-path");

          if (reduced) {
            gsap.set([".js-track-head > *", ".js-panel"], { opacity: 1, y: 0 });
            if (route) gsap.set(route, { strokeDashoffset: 0 });
            return;
          }

          const tl = gsap.timeline({
            scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
          });
          tl.from(".js-track-head > *", { opacity: 0, y: 20, stagger: 0.08 })
            .from(".js-panel", { opacity: 0, y: 28 }, "-=0.4");

          if (route) {
            const len = route.getTotalLength();
            gsap.set(route, { strokeDasharray: len, strokeDashoffset: len });
            tl.to(route, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, "-=0.4");
          }

          // MotionPathPlugin drives the rider along the same curve the route
          // draws — replacing a hand-rolled rAF loop calling getPointAtLength.
          gsap.to(".js-rider", {
            motionPath: { path: ".js-route-path", align: ".js-route-path", alignOrigin: [0.5, 0.5] },
            duration: 6,
            repeat: -1,
            ease: "none",
          });
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="tracking" className="relative py-28">
      <div className="container">
        <div className="js-track-head mx-auto max-w-2xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Live operations
          </p>
          <h2 className="font-display mt-4 text-4xl font-light tracking-[-0.03em] text-navy sm:text-5xl">
            Every order, tracked in <span className="font-semibold text-secondary">real time</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            A preview of what your team and your customers see — rider position,
            route and ETA, updated continuously.
          </p>
          <Link
            href="/track"
            data-cursor-hover
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            Track a shipment <ArrowRight size={14} />
          </Link>
        </div>

        <div className="js-panel mt-16 grid overflow-hidden rounded-3xl border border-border bg-white shadow-[0_30px_70px_-35px_rgba(14,23,48,0.35)] lg:grid-cols-[1.4fr_1fr]">
          {/* Map */}
          <div className="relative border-b border-border bg-[#FAFBFD] p-6 lg:border-b-0 lg:border-r">
            <div className="absolute inset-0 bg-grid-fine bg-[size:28px_28px] opacity-60" />
            <div className="relative flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary" />
                Live route · Kolkata Hub 04
              </span>
              <span className="font-mono tabular-nums">ETA {eta} min</span>
            </div>

            <svg viewBox="0 0 600 300" className="relative mt-4 h-[260px] w-full">
              <path d={PATH} fill="none" stroke="rgba(14,23,48,0.1)" strokeWidth="3" />
              <path className="js-route-path" d={PATH} fill="none" stroke="#E53935" strokeWidth="3" strokeLinecap="round" />
              <circle cx="40" cy="200" r="6" fill="#0E1730" />
              <circle cx="560" cy="160" r="6" fill="#E53935" />
              <g className="js-rider">
                <circle r="13" fill="#2563EB" opacity="0.2" />
                <circle r="7" fill="#2563EB" />
                <circle r="2.5" fill="#ffffff" />
              </g>
            </svg>

            <div className="relative mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin size={11} /> Pickup</span>
              <span className="flex items-center gap-1"><Bike size={11} /> En route</span>
              <span className="flex items-center gap-1"><MapPin size={11} /> Drop</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Shipment timeline
            </p>
            <ol className="mt-5 space-y-5">
              {shipmentTimeline.map((step, i) => {
                const done = i <= activeStep;
                return (
                  <li key={step.label} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full border transition-colors duration-500 ${
                          done ? "border-secondary bg-secondary text-white" : "border-border text-muted-foreground"
                        }`}
                      >
                        {done ? <CheckCircle2 size={14} /> : <Package size={12} />}
                      </span>
                      {i < shipmentTimeline.length - 1 && (
                        <span className={`mt-1 h-8 w-px transition-colors duration-500 ${done ? "bg-secondary/50" : "bg-border"}`} />
                      )}
                    </div>
                    <div>
                      <p className={`text-sm font-medium transition-colors duration-500 ${done ? "text-navy" : "text-muted-foreground"}`}>
                        {step.label}
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground">{step.time}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-6 flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-xs text-muted-foreground">
              <Truck size={14} className="text-secondary" />
              Rider Anup K. · Bike · 4.9★
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

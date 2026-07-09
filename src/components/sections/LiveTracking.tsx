"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bike, CheckCircle2, MapPin, Package, Truck } from "lucide-react";
import { shipmentTimeline } from "@/lib/data";

const PATH = "M 40 200 C 120 60, 220 260, 320 120 S 480 40, 560 160";

export function LiveTracking() {
  const [activeStep, setActiveStep] = useState(1);
  const [eta, setEta] = useState(17);
  const pathRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setActiveStep((s) => (s < shipmentTimeline.length - 1 ? s + 1 : 1));
    }, 3200);
    const etaTimer = setInterval(() => {
      setEta((e) => (e > 3 ? e - 1 : 17));
    }, 1200);
    return () => {
      clearInterval(stepTimer);
      clearInterval(etaTimer);
    };
  }, []);

  useEffect(() => {
    let raf: number;
    const durationMs = 6000;
    const start = performance.now();

    const tick = (now: number) => {
      const path = pathRef.current;
      const marker = markerRef.current;
      if (path && marker) {
        const length = path.getTotalLength();
        const progress = ((now - start) % durationMs) / durationMs;
        const point = path.getPointAtLength(progress * length);
        marker.setAttribute("transform", `translate(${point.x}, ${point.y})`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="tracking" className="relative py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Live operations</p>
          <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Every order, tracked in real time
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
            Track a real shipment <ArrowRight size={14} />
          </Link>
        </div>


        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass glow-red mt-16 grid gap-0 overflow-hidden rounded-3xl lg:grid-cols-[1.4fr_1fr]"
        >
          {/* Map / route panel */}
          <div className="relative h-[380px] border-b border-border bg-ink-900 p-6 lg:border-b-0 lg:border-r">
            <div className="absolute inset-0 bg-grid-white bg-[size:32px_32px] opacity-40" />
            <div className="relative flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 animate-pulse-glow rounded-full bg-primary" /> Live route · Kolkata Hub 04
              </span>
              <span className="font-mono">ETA {eta} min</span>
            </div>

            <svg viewBox="0 0 600 300" className="relative mt-4 h-[280px] w-full">
              <path d={PATH} fill="none" stroke="rgba(30,20,60,0.12)" strokeWidth="3" />
              <motion.path
                ref={pathRef}
                d={PATH}
                fill="none"
                stroke="#E30613"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
              />
              <circle cx="40" cy="200" r="6" fill="#111111" />
              <circle cx="560" cy="160" r="6" fill="#E30613" />

              <g ref={markerRef}>
                <circle r="13" fill="#2563EB" opacity="0.2" />
                <circle r="7" fill="#2563EB" />
                <circle r="2.5" fill="#ffffff" />
              </g>
            </svg>

            <div className="relative mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin size={12} /> Pickup hub</span>
              <span className="flex items-center gap-1"><Bike size={12} /> Rider en route</span>
              <span className="flex items-center gap-1"><MapPin size={12} /> Drop location</span>
            </div>
          </div>

          {/* Timeline panel */}
          <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Shipment timeline</p>
            <ol className="mt-5 space-y-5">
              {shipmentTimeline.map((step, i) => {
                const done = i <= activeStep;
                return (
                  <li key={step.label} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full border transition-colors duration-500 ${
                          done ? "border-primary bg-primary/20 text-primary" : "border-border text-muted-foreground"
                        }`}
                      >
                        {done ? <CheckCircle2 size={14} /> : <Package size={12} />}
                      </span>
                      {i < shipmentTimeline.length - 1 && (
                        <span className={`mt-1 h-8 w-[1.5px] ${done ? "bg-primary/60" : "bg-foreground/[0.04]"}`} />
                      )}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${done ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.label}
                      </p>
                      <p className="text-xs text-muted-foreground">{step.time}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-6 flex items-center gap-2 rounded-xl border border-border bg-foreground/[0.03] px-4 py-3 text-xs text-muted-foreground">
              <Truck size={14} className="text-primary" />
              Rider Anup K. · Bike · 4.9★ rating
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

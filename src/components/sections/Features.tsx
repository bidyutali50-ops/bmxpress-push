"use client";

import { motion } from "framer-motion";
import {
  Gauge, Radar, Wallet, Truck, Code2, Warehouse, ShieldCheck, LayoutDashboard,
} from "lucide-react";
import { features } from "@/lib/data";

const icons = [Gauge, Radar, Wallet, Truck, Code2, Warehouse, ShieldCheck, LayoutDashboard];

export function Features() {
  return (
    <section className="relative py-28">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-40" />
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Platform</p>
          <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Built for operators, not just riders
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-foreground/[0.04] sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
                className="group relative bg-ink-950 p-6 transition-colors duration-300 hover:bg-ink-900"
              >
                <Icon size={20} className="text-primary" />
                <h3 className="font-display mt-4 text-base font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

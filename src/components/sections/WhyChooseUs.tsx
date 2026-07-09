"use client";

import { motion } from "framer-motion";
import { ShieldCheck, HeartHandshake, IndianRupee, Rocket, Cpu, Users2 } from "lucide-react";
import { whyChooseUs } from "@/lib/data";

const icons = [Rocket, ShieldCheck, IndianRupee, HeartHandshake, Cpu, Users2];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-28">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Why BM Xpress</p>
            <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              The infrastructure behind
              <br /> your last mile
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              We run the riders, the routing and the reconciliation — so your team
              can focus on the product, not the delivery problem.
            </p>
          </div>

          <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-3">
            {whyChooseUs.map((item, i) => {
              const Icon = icons[i % icons.length];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass flex flex-col items-start gap-3 rounded-2xl p-5 animate-float"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={18} />
                  </div>
                  <p className="font-display text-sm font-semibold">{item.title}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bike, Clock, HandCoins, HeartHandshake, ShieldCheck, TrendingUp } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const benefits = [
  { icon: HandCoins, label: "Weekly Payout", description: "Get paid every week, on time, every time." },
  { icon: Clock, label: "Flexible Working", description: "Choose the hours that work for your life." },
  { icon: TrendingUp, label: "Daily Incentives", description: "Extra earnings on peak-hour and bulk runs." },
  { icon: ShieldCheck, label: "Insurance", description: "Coverage while you're on the road delivering." },
  { icon: HeartHandshake, label: "Support Team", description: "A real ops team, not a chatbot, when you need help." },
  { icon: Bike, label: "Growth Opportunity", description: "Move from rider to hub lead as you grow with us." },
];

export function DeliveryPartner() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0 bg-ink-950" />
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-60" />

      <div className="container relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Join the fleet</p>
            <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Become a Delivery Partner
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Ride with BM Xpress and earn on your own schedule — weekly payouts,
              daily incentives, and a real support team behind you.
            </p>
            <Link href="/apply" className={buttonVariants({ size: "lg", className: "mt-8" })}>
              Apply Now
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="glass rounded-2xl p-5"
              >
                <b.icon size={20} className="text-primary" />
                <p className="font-display mt-3 text-sm font-semibold">{b.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

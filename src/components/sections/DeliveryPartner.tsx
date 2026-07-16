"use client";

import { useRef } from "react";
import Link from "next/link";
import { Bike, Clock, HandCoins, HeartHandshake, ShieldCheck, TrendingUp } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { buttonVariants } from "@/components/ui/button";

const benefits = [
  { icon: HandCoins, label: "Weekly Payout", description: "Paid every week, on time, every time." },
  { icon: Clock, label: "Flexible Working", description: "Choose the hours that fit your life." },
  { icon: TrendingUp, label: "Daily Incentives", description: "Extra earnings on peak-hour and bulk runs." },
  { icon: ShieldCheck, label: "Insurance", description: "Coverage while you're on the road." },
  { icon: HeartHandshake, label: "Support Team", description: "A real ops team, not a chatbot." },
  { icon: Bike, label: "Growth", description: "Move from rider to hub lead as you grow." },
];

export function DeliveryPartner() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        });
        tl.from(".js-partner-copy > *", { opacity: 0, y: 20, stagger: 0.09 })
          .from(".js-benefit", { opacity: 0, y: 18, stagger: { each: 0.06, from: "edges" } }, "-=0.45");
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".js-partner-copy > *", ".js-benefit"], { opacity: 1, y: 0 });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0 bg-[#FAFBFD]" />
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-50" />

      <div className="container relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="js-partner-copy">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Join the fleet
            </p>
            <h2 className="font-display mt-4 text-4xl font-light tracking-[-0.03em] text-navy sm:text-5xl">
              Become a <span className="font-semibold text-primary">Delivery Partner</span>
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Ride with BM Xpress and earn on your own schedule — weekly payouts,
              daily incentives, and a real support team behind you.
            </p>
            <div className="mt-8">
              <Link href="/apply" className={buttonVariants({ size: "lg" })}>
                Apply Now
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.label} className="js-benefit rounded-xl border border-border bg-white p-4">
                <b.icon size={16} className="text-secondary" />
                <p className="font-display mt-3 text-xs font-semibold text-navy">{b.label}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

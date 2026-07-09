"use client";

import { useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap, Clock, CalendarClock, ShoppingBag, Warehouse, Truck, Users, Boxes, ArrowRight,
} from "lucide-react";
import { servicesContent } from "@/lib/services-content";

const icons = [Zap, Clock, CalendarClock, ShoppingBag, Warehouse, Truck, Users, Boxes];

function TiltCard({
  index, title, description, slug,
}: { index: number; title: string; description: string; slug: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = icons[index % icons.length];

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  };

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="glass group relative overflow-hidden rounded-2xl p-6 transition-transform duration-300 ease-out will-change-transform"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/20 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon size={20} />
      </div>
      <h3 className="font-display mt-5 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <Link
        href={`/services/${slug}`}
        data-cursor-hover
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary"
      >
        Learn more <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">What we run</p>
          <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            One fleet, every delivery format
          </h2>
          <p className="mt-4 text-muted-foreground">
            From a single dark-store pickup to a full 3PL contract — the same riders,
            hubs and dashboard scale with whatever you need moved.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {servicesContent.map((service, i) => (
            <TiltCard
              key={service.slug}
              index={i}
              title={service.title}
              description={service.shortDescription}
              slug={service.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

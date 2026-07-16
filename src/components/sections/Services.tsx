"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Zap, Clock, CalendarClock, ShoppingBag, Warehouse, Truck, Users, Boxes,
  ArrowRight, RotateCcw, Wallet, Store, Globe2,
} from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { servicesContent } from "@/lib/services-content";

const icons = [Zap, Clock, CalendarClock, ShoppingBag, Warehouse, Truck, Users, Boxes, Globe2, Store, RotateCcw, Wallet];

function ServiceCard({ index, title, description, slug }: {
  index: number; title: string; description: string; slug: string;
}) {
  const card = useRef<HTMLAnchorElement>(null);
  const Icon = icons[index % icons.length];

  useGSAP(
    () => {
      const el = card.current;
      if (!el) return;
      if (window.matchMedia("(hover: none)").matches) return;

      // quickTo keeps a reusable tween per property rather than spawning a new
      // tween on every mousemove — the pattern the performance skill calls for.
      const rotX = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3" });
      const rotY = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3" });
      const lift = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        rotY(((e.clientX - r.left) / r.width - 0.5) * 10);
        rotX((0.5 - (e.clientY - r.top) / r.height) * 10);
        lift(-6);
      };
      const onLeave = () => {
        rotX(0);
        rotY(0);
        lift(0);
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: card }
  );

  return (
    <Link
      ref={card}
      href={`/services/${slug}`}
      data-reveal
      data-cursor-hover
      className="group relative flex flex-col rounded-2xl border border-border bg-white p-6 [transform-style:preserve-3d] [perspective:800px] hover:border-navy/20"
    >
      <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
        {String(index + 1).padStart(2, "0")}
      </span>
      <Icon size={20} className="mt-5 text-secondary transition-colors duration-300 group-hover:text-primary" />
      <h3 className="font-display mt-4 text-base font-semibold tracking-tight text-navy">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Learn more <ArrowRight size={12} />
      </span>
    </Link>
  );
}

export function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        });
        tl.from(".js-services-head > *", { opacity: 0, y: 20, stagger: 0.08 })
          // Cards are dealt from the left rather than all blinking in together.
          .from("[data-reveal]", { opacity: 0, y: 24, stagger: { each: 0.05, from: "start" } }, "-=0.45");
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".js-services-head > *", "[data-reveal]"], { opacity: 1, y: 0 });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="services" className="relative py-28">
      <div className="container">
        <div className="js-services-head max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            What we run
          </p>
          <h2 className="font-display mt-4 text-4xl font-light tracking-[-0.03em] text-navy sm:text-5xl">
            One fleet, every <span className="font-semibold text-primary">delivery format</span>
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            From a single dark-store pickup to a full 3PL contract — the same riders,
            hubs and dashboard scale with whatever you need moved.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {servicesContent.map((service, i) => (
            <ServiceCard
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

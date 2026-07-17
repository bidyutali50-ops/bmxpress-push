"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button, buttonVariants } from "@/components/ui/button";

export function FinalCTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        });
        tl.from(".js-cta-panel", { opacity: 0, y: 30, duration: 0.9 })
          .from(".js-cta-inner > *", { opacity: 0, y: 18, stagger: 0.1 }, "-=0.5");

        // Magnetic pull on the primary CTA — quickTo so mousemove reuses one
        // tween per axis instead of spawning a new one each event.
        const magnet = root.current?.querySelector<HTMLElement>(".js-magnet");
        if (magnet && !window.matchMedia("(hover: none)").matches) {
          const xTo = gsap.quickTo(magnet, "x", { duration: 0.5, ease: "power3" });
          const yTo = gsap.quickTo(magnet, "y", { duration: 0.5, ease: "power3" });
          const onMove = (e: MouseEvent) => {
            const r = magnet.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
          };
          const onLeave = () => {
            xTo(0);
            yTo(0);
          };
          magnet.addEventListener("mousemove", onMove);
          magnet.addEventListener("mouseleave", onLeave);
          return () => {
            magnet.removeEventListener("mousemove", onMove);
            magnet.removeEventListener("mouseleave", onLeave);
          };
        }
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".js-cta-panel", ".js-cta-inner > *"], { opacity: 1, y: 0 });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative py-28">
      <div className="container">
        <div className="js-cta-panel relative overflow-hidden rounded-[2rem] bg-navy px-6 py-20 text-center sm:px-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 60% 60% at 20% 0%, rgba(229,57,53,0.35), transparent 60%), radial-gradient(ellipse 60% 60% at 80% 100%, rgba(37,99,235,0.35), transparent 60%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px]" />

          <div className="js-cta-inner relative mx-auto max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
              Let&apos;s talk volume
            </p>
            <h2 className="font-display mt-5 text-4xl font-light leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
              Ready to transform your <span className="font-semibold text-primary">logistics?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-white/60">
              Send us your lanes, volumes and SLA expectations. You&apos;ll get a rate
              card and a straight answer on what we run directly.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <div className="js-magnet">
                <Button size="lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                  Contact Sales <ArrowRight size={16} />
                </Button>
              </div>
              <Link
                href="/apply"
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className: "border-white/20 text-white hover:border-white/40 hover:bg-white/5",
                })}
              >
                Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

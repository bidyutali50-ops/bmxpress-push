"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function LoadingScreen() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      // Reduced motion: don't hold the page hostage behind an animation.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDone(true);
        return;
      }

      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setDone(true);
        },
      });

      tl.from(".js-load-mark", { opacity: 0, y: 12, duration: 0.6 })
        .fromTo(".js-load-bar", { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, "-=0.2")
        .to(".js-load-mark", { opacity: 0, y: -10, duration: 0.4 }, "+=0.1")
        .to(root.current, { autoAlpha: 0, duration: 0.5 }, "-=0.2");

      return () => {
        document.body.style.overflow = "";
      };
    },
    { scope: root }
  );

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
      <p className="js-load-mark font-display text-2xl font-semibold tracking-tight text-navy">
        BM <span className="text-primary">Xpress</span>
      </p>
      <div className="mt-5 h-px w-40 overflow-hidden bg-border">
        <div className="js-load-bar h-full w-full origin-left bg-primary" />
      </div>
    </div>
  );
}

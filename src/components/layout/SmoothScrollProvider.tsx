"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Lenis and ScrollTrigger must share a single clock. Without this, Lenis
    // runs its own requestAnimationFrame loop and ScrollTrigger reads stale
    // scroll positions — triggers fire late and scrubbed animations judder.
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000); // GSAP ticker is in seconds
    gsap.ticker.add(raf);

    // lagSmoothing lets GSAP "jump" the playhead after a frame drop, which
    // desyncs it from Lenis' scroll position. Off means scroll stays authoritative.
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33); // restore GSAP's default
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

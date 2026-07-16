"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Registered once, here, rather than in every component that animates.
gsap.registerPlugin(useGSAP, ScrollTrigger);

// House motion language. Every animation inherits these unless it has a
// reason not to, which is what stops the site feeling like fourteen
// different people animated it.
gsap.defaults({
  ease: "power3.out",
  duration: 0.8,
});

/** Brand easing — a firm start that settles, rather than a generic ease-out. */
export const EASE = {
  out: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
} as const;

export { gsap, ScrollTrigger, useGSAP };

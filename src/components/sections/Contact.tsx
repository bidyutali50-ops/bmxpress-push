"use client";

import { useState, type FormEvent } from "react";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { servicesContent } from "@/lib/services-content";

type Status = "idle" | "loading" | "success" | "error";

const serviceOptions = servicesContent.map((s) => s.title);

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      service_required: String(formData.get("service_required") ?? "") || null,
      requirement: String(formData.get("requirement") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    if (!isSupabaseConfigured) {
      setStatus("error");
      setError("Form is not connected yet — add Supabase env vars to enable submissions.");
      return;
    }

    const { error: submitError } = await supabase.from("contact_submissions").insert([payload]);

    if (submitError) {
      setStatus("error");
      setError(submitError.message);
      return;
    }

    setStatus("success");
    e.currentTarget.reset();
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        });
        tl.from(".js-contact-head > *", { opacity: 0, y: 20, stagger: 0.08 })
          .from(".js-contact-panel", { opacity: 0, y: 26 }, "-=0.4");
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".js-contact-head > *", ".js-contact-panel"], { opacity: 1, y: 0 });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  // Animates whichever pane is showing when the form flips to its success state.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".js-swap", { opacity: 0, y: 10, duration: 0.5 });
    },
    { scope: root, dependencies: [status === "success"], revertOnUpdate: true }
  );

  return (
    <section ref={root} id="contact" className="relative py-28">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-50" />
      <div className="container relative">
        <div className="js-contact-head mx-auto max-w-2xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Get in touch</p>
          <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Let&apos;s move something
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tell us what you need delivered — a real person on our ops team replies within one business day.
          </p>
        </div>

        <div className="js-contact-panel mx-auto mt-14 max-w-2xl rounded-3xl border border-border bg-white p-6 shadow-[0_24px_60px_-32px_rgba(14,23,48,0.28)] sm:p-10">
          <>
            {status === "success" ? (
              <div className="js-swap flex flex-col items-center py-10 text-center">
                <CheckCircle2 className="text-primary" size={48} />
                <p className="font-display mt-4 text-xl font-semibold">Message sent</p>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  Thanks — we&apos;ve got your requirement and someone from our team will reach out shortly.
                </p>
                <Button variant="outline" size="sm" className="mt-6" onClick={() => setStatus("idle")}>
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="js-swap grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required placeholder="Your full name" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" placeholder="Company name" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" required placeholder="10-digit mobile number" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required placeholder="you@company.com" />
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="service_required">Service Required</Label>
                  <select
                    id="service_required"
                    name="service_required"
                    defaultValue=""
                    className="flex h-12 w-full rounded-xl border border-border bg-foreground/[0.03] px-4 text-sm outline-none focus-visible:border-primary/60"
                  >
                    <option value="" disabled>Select a service</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="requirement">Requirement</Label>
                  <Input id="requirement" name="requirement" placeholder="e.g. Dedicated fleet for 200 daily orders" />
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" placeholder="Tell us a bit more about what you need" />
                </div>

                {error && (
                  <p className="text-xs text-primary sm:col-span-2">{error}</p>
                )}

                <div className="sm:col-span-2">
                  <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "loading"}>
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Send message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </>
        </div>
      </div>
    </section>
  );
}

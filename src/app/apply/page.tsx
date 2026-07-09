import type { Metadata } from "next";
import { PartnerApplicationForm } from "@/components/sections/PartnerApplicationForm";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Become a Delivery Partner",
  description: "Apply to become a BM Xpress delivery partner — weekly payouts, flexible hours, daily incentives and insurance.",
  alternates: { canonical: `${siteConfig.url}/apply` },
};

export default function ApplyPage() {
  return (
    <section className="relative pb-24 pt-36">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-40" />
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Join the fleet</p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Become a Delivery Partner
          </h1>
          <p className="mt-4 text-muted-foreground">
            Fill in your details below. Our onboarding team typically reaches out within 1-2 business days.
          </p>
        </div>

        <div className="mt-12">
          <PartnerApplicationForm />
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { TrackingSearch } from "@/components/sections/TrackingSearch";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Track Your Shipment",
  description: "Track your BM Xpress shipment in real time by tracking ID, order ID, or phone number.",
  alternates: { canonical: `${siteConfig.url}/track` },
};

export default function TrackPage() {
  return (
    <section className="relative pb-24 pt-36">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-40" />
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Live tracking</p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Where&apos;s my shipment?
          </h1>
          <p className="mt-4 text-muted-foreground">
            Enter your tracking ID, order ID, or the phone number used at checkout.
          </p>
        </div>

        <div className="mt-12">
          <TrackingSearch />
        </div>
      </div>
    </section>
  );
}

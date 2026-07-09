import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { areasContent } from "@/lib/areas-content";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Service Areas in West Bengal",
  description:
    "BM Xpress delivery coverage across West Bengal — Murshidabad, Kolkata, Howrah, Hooghly, Malda, Asansol, Durgapur and Nadia.",
  alternates: { canonical: `${siteConfig.url}/areas` },
};

export default function AreasIndexPage() {
  return (
    <section className="pb-24 pt-36">
      <div className="container">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Service areas</p>
        <h1 className="font-display mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Coverage across West Bengal
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Eight districts, one dashboard. Each area runs its own hub coverage tuned
          to local geography rather than a flat, one-size-fits-all dispatch zone.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {areasContent.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              data-cursor-hover
              className="glass group flex flex-col justify-between rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div>
                <MapPin size={18} className="text-primary" />
                <h2 className="font-display mt-4 text-lg font-semibold tracking-tight">{area.name}</h2>
                <p className="mt-2 text-xs text-muted-foreground">{area.region}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                View coverage <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

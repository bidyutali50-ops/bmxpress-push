import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { servicesContent } from "@/lib/services-content";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Delivery Services",
  description:
    "Every delivery format BM Xpress runs across West Bengal — hyperlocal, same-day, next-day, quick commerce, dark store fulfilment, warehouse delivery, dedicated fleet and 3PL logistics.",
  alternates: { canonical: `${siteConfig.url}/services` },
};

export default function ServicesIndexPage() {
  return (
    <section className="pb-24 pt-36">
      <div className="container">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Services</p>
        <h1 className="font-display mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Every delivery format, one operator
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          From a single hyperlocal pickup to a full 3PL contract — pick the tier that matches
          how your business actually ships, or mix several under one account.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicesContent.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              data-cursor-hover
              className="glass group flex flex-col justify-between rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div>
                <h2 className="font-display text-lg font-semibold tracking-tight">{service.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.shortDescription}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Learn more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { areasContent, getAreaBySlug } from "@/lib/areas-content";
import { servicesContent } from "@/lib/services-content";
import { siteConfig } from "@/lib/data";
import { buttonVariants } from "@/components/ui/button";

export function generateStaticParams() {
  return areasContent.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return {};

  return {
    title: `Delivery in ${area.name}`,
    description: area.metaDescription,
    alternates: { canonical: `${siteConfig.url}/areas/${area.slug}` },
    openGraph: {
      title: `Delivery in ${area.name} · ${siteConfig.name}`,
      description: area.metaDescription,
    },
  };
}

export default async function AreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${siteConfig.legalName} — ${area.name}`,
    areaServed: area.region,
    parentOrganization: siteConfig.legalName,
    description: area.metaDescription,
  };

  return (
    <section className="pb-24 pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container max-w-3xl">
        <Link href="/areas" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft size={14} /> All service areas
        </Link>

        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-primary">{area.region}</p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Delivery in {area.name}
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">{area.intro}</p>

        <div className="mt-10 space-y-5 text-foreground/85">
          {area.body.map((para, i) => (
            <p key={i} className="leading-relaxed">{para}</p>
          ))}
        </div>

        <div className="glass mt-12 rounded-2xl p-6">
          <h2 className="font-display text-lg font-semibold">{area.name} at a glance</h2>
          <ul className="mt-4 space-y-3">
            {area.localNotes.map((note) => (
              <li key={note} className="flex items-start gap-2 text-sm text-foreground/85">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" /> {note}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="font-display text-lg font-semibold">Services available in {area.name}</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {servicesContent.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="glass mt-12 flex flex-col items-start gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Shipping into {area.name}? Tell us your pincode and order volume.
          </p>
          <Link href="/#contact" className={buttonVariants({ size: "default" })}>
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}

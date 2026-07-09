import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { servicesContent, getServiceBySlug } from "@/lib/services-content";
import { siteConfig } from "@/lib/data";
import { buttonVariants } from "@/components/ui/button";

export function generateStaticParams() {
  return servicesContent.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: `${siteConfig.url}/services/${service.slug}` },
    openGraph: {
      title: `${service.title} · ${siteConfig.name}`,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.legalName,
    },
    areaServed: "West Bengal, India",
    description: service.metaDescription,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="pb-24 pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="container max-w-3xl">
        <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft size={14} /> All services
        </Link>

        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-primary">Service</p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{service.title}</h1>
        <p className="mt-5 text-lg text-muted-foreground">{service.intro}</p>

        <div className="mt-10 space-y-5 text-foreground/85">
          {service.body.map((para, i) => (
            <p key={i} className="leading-relaxed">{para}</p>
          ))}
        </div>

        <div className="glass mt-12 rounded-2xl p-6">
          <h2 className="font-display text-lg font-semibold">Who uses {service.title.toLowerCase()}</h2>
          <ul className="mt-4 space-y-3">
            {service.useCases.map((useCase) => (
              <li key={useCase} className="flex items-start gap-2 text-sm text-foreground/85">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" /> {useCase}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="font-display text-lg font-semibold">Frequently asked questions</h2>
          <div className="mt-5 space-y-5">
            {service.faqs.map((faq) => (
              <div key={faq.q} className="border-b border-border pb-5">
                <p className="font-medium">{faq.q}</p>
                <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass mt-12 flex flex-col items-start gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Want {service.title.toLowerCase()} for your business? Tell us your requirement.
          </p>
          <Link href="/#contact" className={buttonVariants({ size: "default" })}>
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}

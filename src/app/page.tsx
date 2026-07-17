import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { Technology } from "@/components/sections/Technology";
import { LiveTracking } from "@/components/sections/LiveTracking";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { DeliveryProcess } from "@/components/sections/DeliveryProcess";
import { Coverage } from "@/components/sections/Coverage";
import { DeliveryPartner } from "@/components/sections/DeliveryPartner";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Contact } from "@/components/sections/Contact";
import { faqs, siteConfig } from "@/lib/data";

// FAQPage is one of the few schema types Google still renders as a rich result,
// and the answers here are real, so it's worth emitting.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
    addressRegion: "West Bengal",
    postalCode: "742122",
    addressCountry: "IN",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <Hero />
      <TrustedBy />
      <About />
      <Services />
      <Industries />
      <Technology />
      <LiveTracking />
      <WhyChooseUs />
      <DeliveryProcess />
      <Coverage />
      <DeliveryPartner />
      <FAQ />
      <FinalCTA />
      <Contact />
    </>
  );
}

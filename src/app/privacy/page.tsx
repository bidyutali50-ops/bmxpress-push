import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.legalName}.`,
  alternates: { canonical: `${siteConfig.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <section className="pb-24 pt-36">
      <div className="container max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Legal</p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: July 2026</p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-foreground/85">
          <p>
            {siteConfig.legalName} (&quot;BM Xpress&quot;, &quot;we&quot;, &quot;us&quot;) collects
            information you provide directly to us — through our contact form, delivery partner
            application, and shipment tracking lookup — in order to respond to enquiries, evaluate
            partner applications, and provide delivery tracking services.
          </p>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Information we collect</h2>
            <p className="mt-2">
              Contact form submissions (name, company, email, phone, message), delivery partner
              applications (name, phone, email, address, vehicle details, government ID numbers,
              bank account details, and uploaded documents), and shipment tracking queries
              (tracking number or phone number you enter to search).
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">How we use it</h2>
            <p className="mt-2">
              To respond to business enquiries, evaluate and onboard delivery partner applicants,
              provide shipment status information, and operate our delivery network. We do not
              sell your personal information to third parties.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Document security</h2>
            <p className="mt-2">
              Identity and bank documents submitted through the delivery partner application are
              stored in access-restricted storage and are only visible to authorised BM Xpress
              personnel involved in partner onboarding.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Contact us</h2>
            <p className="mt-2">
              For questions about this policy or to request deletion of your data, email{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-primary">{siteConfig.email}</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

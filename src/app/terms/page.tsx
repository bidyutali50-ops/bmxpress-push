import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${siteConfig.legalName}.`,
  alternates: { canonical: `${siteConfig.url}/terms` },
};

export default function TermsPage() {
  return (
    <section className="pb-24 pt-36">
      <div className="container max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Legal</p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: July 2026</p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-foreground/85">
          <p>
            These terms govern use of the {siteConfig.legalName} website, shipment tracking tool,
            and delivery partner application. By using this site, you agree to these terms.
          </p>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Shipment tracking</h2>
            <p className="mt-2">
              Tracking information is provided for the convenience of customers and recipients of
              BM Xpress shipments. Status, timestamps and estimated delivery times are indicative
              and may change based on real operational conditions.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Delivery partner applications</h2>
            <p className="mt-2">
              Submitting a delivery partner application does not guarantee onboarding. BM Xpress
              reserves the right to verify submitted documents, reject applications, and set
              eligibility criteria at its discretion. Payout terms, incentives and working
              arrangements are confirmed separately during onboarding.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Service commitments</h2>
            <p className="mt-2">
              Delivery SLAs, coverage areas and pricing referenced on this site are general and
              subject to a specific service agreement for business partners. Nothing on this site
              constitutes a binding delivery guarantee absent a signed agreement.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Contact</h2>
            <p className="mt-2">
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-primary">{siteConfig.email}</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

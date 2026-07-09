import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/data";

const quickLinks = [
  { label: "Services", href: "/services" },
  { label: "Tracking", href: "/track" },
  { label: "Become a Partner", href: "/apply" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const socials = [
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: MessageCircle, href: siteConfig.social.whatsapp, label: "WhatsApp" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-ink-950 pt-24">
      {/* Animated wave divider */}
      <div className="pointer-events-none absolute -top-px left-0 right-0 overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="h-12 w-full"
        >
          <path
            className="fill-background"
            d="M0,32 C150,60 350,0 600,24 C850,48 1050,4 1200,28 L1200,0 L0,0 Z"
          />
        </svg>
      </div>

      <div className="container">
        <div className="grid gap-12 pb-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight">
              BM <span className="text-primary">Xpress</span>
            </p>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              Delivering Speed. Powered by Technology.
            </p>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              {siteConfig.legalName} — hyperlocal delivery and last-mile logistics
              built for quick commerce, D2C and 3PL partners across West Bengal.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-cursor-hover
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Quick links</p>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-foreground/80 transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Contact</p>
            <ul className="mt-4 space-y-3 text-sm text-foreground/80">
              <li className="flex items-start gap-2">
                <Phone size={15} className="mt-0.5 shrink-0 text-primary" />
                <a href={`tel:+91${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={15} className="mt-0.5 shrink-0 text-primary" />
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />
                <span>
                  {siteConfig.address.line1}, {siteConfig.address.line2}, {siteConfig.address.line3}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <p>Built with care in West Bengal.</p>
        </div>
      </div>
    </footer>
  );
}

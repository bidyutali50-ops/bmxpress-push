import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { blogPosts, getPostBySlug } from "@/lib/blog-content";
import { siteConfig } from "@/lib/data";
import { buttonVariants } from "@/components/ui/button";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `${siteConfig.url}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: siteConfig.legalName },
    publisher: { "@type": "Organization", name: siteConfig.legalName },
  };

  return (
    <section className="pb-24 pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container max-w-2xl">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft size={14} /> All posts
        </Link>

        <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{formatDate(post.publishedAt)}</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {post.readingMinutes} min read</span>
        </div>

        <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>

        <article className="mt-10 space-y-10">
          {post.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-xl font-semibold tracking-tight">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-foreground/85">
                {section.paragraphs.map((para, i) => (
                  <p key={i} className="leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
          ))}
        </article>

        <div className="glass mt-14 flex flex-col items-start gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">Have a delivery requirement in mind? Let&apos;s talk.</p>
          <Link href="/#contact" className={buttonVariants({ size: "default" })}>
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}

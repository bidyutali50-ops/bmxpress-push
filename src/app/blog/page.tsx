import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/lib/blog-content";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical, no-fluff writing on last-mile logistics, delivery operations and running delivery-driven businesses in West Bengal — from the BM Xpress team.",
  alternates: { canonical: `${siteConfig.url}/blog` },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogIndexPage() {
  const sorted = [...blogPosts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <section className="pb-24 pt-36">
      <div className="container max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Blog</p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Notes on last-mile logistics
        </h1>
        <p className="mt-4 text-muted-foreground">
          Practical writing on delivery operations, from the team running it every day.
        </p>

        <div className="mt-14 space-y-6">
          {sorted.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              data-cursor-hover
              className="glass group block rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{formatDate(post.publishedAt)}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {post.readingMinutes} min read</span>
              </div>
              <h2 className="font-display mt-3 text-xl font-semibold tracking-tight sm:text-2xl">{post.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Read more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

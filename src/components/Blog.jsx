import { useEffect, useState } from "react";
import { POSTS } from "../data/posts";
import { SERVICES } from "../data/services";

/* ---------------- shared bits ---------------- */

function BlogHeader() {
  return (
    <header className="border-b border-white/10">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="font-bold text-lg">US Star Trucking LLC</a>
        <div className="flex items-center gap-5 text-sm">
          <a href="/blog" className="text-blue-300 hover:text-white transition hidden sm:block">Blog</a>
          <a href="/track" className="text-blue-300 hover:text-white transition hidden sm:block">Track Shipment</a>
          <a href="/#quote-form" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-bold transition whitespace-nowrap">
            Get Free Quote
          </a>
        </div>
      </div>
    </header>
  );
}

function BlogFooter() {
  return (
    <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-400">
      <p>
        <strong className="text-white">US Star Trucking LLC</strong> · USDOT 3205543 · MC 206532 ·{" "}
        <a href="tel:+18657227114" className="text-blue-300 hover:text-white">(865) 722-7114</a> ·{" "}
        <a href="/" className="text-blue-300 hover:text-white">carshippingservice.org</a>
      </p>
    </footer>
  );
}

const fmtDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

/* ---------------- blog index (/blog) ---------------- */

export function BlogIndex() {
  useEffect(() => {
    document.title = "Car Shipping Blog & Guides | US Star Trucking LLC";
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Car shipping guides from US Star Trucking LLC — costs, open vs enclosed transport, snowbird checklists, prep tips, and transit times.");
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.setAttribute("rel", "canonical"); document.head.appendChild(canonical); }
    canonical.setAttribute("href", "https://carshippingservice.org/blog");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <BlogHeader />
      <main className="max-w-4xl mx-auto px-6 py-14">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold">Car Shipping Blog</h1>
          <p className="mt-4 text-blue-300 text-lg">
            Guides, checklists, and straight answers from the US Star Trucking team.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {POSTS.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-3xl border border-white/15 bg-white/5 hover:bg-white/10 hover:border-blue-500 transition p-6 sm:p-8 block"
            >
              <div className="flex items-center gap-3 text-xs text-blue-300 font-semibold uppercase tracking-wide mb-3">
                <span className="bg-blue-500/20 rounded-full px-3 py-1">{post.category}</span>
                <span>{fmtDate(post.date)}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {post.emoji} {post.title}
              </h2>
              <p className="text-blue-200 leading-relaxed text-sm">{post.excerpt}</p>
              <p className="mt-4 text-blue-400 font-bold text-sm">Read article →</p>
            </a>
          ))}
        </div>
      </main>
      <BlogFooter />
    </div>
  );
}

/* ---------------- article page (/blog/:slug) ---------------- */

export function BlogPost({ post }) {
  const [related] = useState(() =>
    POSTS.filter((p) => p.slug !== post?.slug).slice(0, 3)
  );

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | US Star Trucking LLC`;
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", post.excerpt);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.setAttribute("rel", "canonical"); document.head.appendChild(canonical); }
    canonical.setAttribute("href", `https://carshippingservice.org/blog/${post.slug}`);

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "blog-post-schema";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.date,
      author: { "@type": "Organization", name: "US Star Trucking LLC" },
      publisher: { "@type": "Organization", name: "US Star Trucking LLC", url: "https://carshippingservice.org" },
      description: post.excerpt,
      mainEntityOfPage: `https://carshippingservice.org/blog/${post.slug}`,
    });
    document.getElementById("blog-post-schema")?.remove();
    document.head.appendChild(script);
    return () => document.getElementById("blog-post-schema")?.remove();
  }, [post]);

  if (!post) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <BlogHeader />
      <main className="max-w-3xl mx-auto px-6 py-14">
        <a href="/blog" className="text-sm text-blue-300 hover:text-white transition">← All articles</a>

        <div className="mt-6 mb-10">
          <div className="flex items-center gap-3 text-xs text-blue-300 font-semibold uppercase tracking-wide mb-4">
            <span className="bg-blue-500/20 rounded-full px-3 py-1">{post.category}</span>
            <span>{fmtDate(post.date)}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            {post.emoji} {post.title}
          </h1>
        </div>

        <article className="flex flex-col gap-10">
          {post.sections.map((section) => (
            <section key={section.h}>
              <h2 className="text-2xl font-bold mb-4 text-blue-300">{section.h}</h2>
              {section.p.map((para, i) => (
                <p key={i} className="text-blue-100 leading-relaxed mb-4">{para}</p>
              ))}
            </section>
          ))}
        </article>

        {/* CTA */}
        <div className="mt-14 rounded-3xl border-2 border-blue-500 bg-blue-500/10 p-8 text-center">
          <h2 className="text-2xl font-extrabold">Get your instant car shipping quote</h2>
          <p className="mt-2 text-blue-200 text-sm">
            Under a minute, no phone call — and $50 off your first shipment with code{" "}
            <span className="font-mono font-bold text-white">USSTAR50</span>.
          </p>
          <a
            href="/#quote-form"
            className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-bold transition"
          >
            Get My Free Quote
          </a>
        </div>

        {/* Related */}
        <div className="mt-14">
          <h3 className="text-lg font-bold mb-4 text-blue-200">Keep reading:</h3>
          <div className="flex flex-col gap-3 mb-8">
            {related.map((p) => (
              <a
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 transition px-5 py-4 text-sm font-semibold text-blue-200"
              >
                {p.emoji} {p.title} →
              </a>
            ))}
          </div>
          <h3 className="text-lg font-bold mb-4 text-blue-200">Our services:</h3>
          <div className="flex flex-wrap gap-2">
            {SERVICES.slice(0, 6).map((s) => (
              <a
                key={s.slug}
                href={`/${s.slug}`}
                className="rounded-full border border-white/15 bg-white/5 hover:bg-white/15 px-4 py-2 text-sm font-semibold text-blue-200 transition"
              >
                {s.emoji} {s.short}
              </a>
            ))}
          </div>
        </div>
      </main>
      <BlogFooter />
    </div>
  );
}
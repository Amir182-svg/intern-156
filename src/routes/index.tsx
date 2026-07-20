import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ShieldCheck, Truck, Wrench, Headphones, ArrowRight, ChevronLeft, ChevronRight,
  Flame, Sparkles, Award, Timer, Instagram,
} from "lucide-react";
import { SectionHead } from "@/components/site-layout";
import { ProductCard } from "@/components/product-card";
import { categories, products, brands } from "@/lib/store-data";
import appliances from "@/assets/appliances-hero.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "  Elite Electronics — Premium Electronics & Home Appliances Store" },
      { name: "description", content: "Shop refrigerators, air conditioners, LED TVs, washing machines, kitchen appliances and more at Elite Electronics — genuine products, best prices, nationwide delivery." },
      { property: "og:title", content: "Elite Electronics" },
      { property: "og:description", content: "Your trusted electronics & home appliances store in Pakistan." },
    ],
  }),
  component: Home,
});

const slides = [
  { eyebrow: "New Collection", title: "Latest Electronics", strong: "Redefine Your Home", desc: "Discover the newest arrivals from Samsung, LG, Haier, Dawlance and more.", cta: "Shop Now" },
  { eyebrow: "Home Appliances", title: "Best in Class", strong: "Home Appliances", desc: "Refrigerators, ACs, washing machines and kitchen essentials for every family.", cta: "Explore Products" },
  { eyebrow: "Exclusive Discounts", title: "Save Up to 30%", strong: "This Season", desc: "Limited-time deals on top brands. Genuine warranty. Nationwide delivery.", cta: "See Deals" },
  { eyebrow: "100% Genuine", title: "Trusted Since Years", strong: "Original Products", desc: "Every product comes with original warranty and after-sales support.", cta: "Why Choose Us" },
];

function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedCategories />
      <FlashSale />
      <FeaturedProducts />
      <PromoBanner />
      <BestSellers />
      <BrandsStrip />
      <WhyChoose />
      <Reviews />
      <InstaGallery />
      <Newsletter />
    </>
  );
}

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);
  const s = slides[i];
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/25 blur-3xl" />
      <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <img
        src="/product.jpg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1.2fr_1fr] md:py-28">
        <div className="text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-brand" /> {s.eyebrow}
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
            {s.title}
            <br />
            <span className="text-brand">{s.strong}</span>
          </h1>
          <p className="mt-5 max-w-lg text-base text-white/80 sm:text-lg">{s.desc}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-[var(--shadow-brand)] transition hover:brightness-110">
              {s.cta} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/categories" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15">
              Explore Products
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-6 text-white/85">
            <Stat n="500+" label="Products" />
            <div className="h-8 w-px bg-white/20" />
            <Stat n="10k+" label="Happy Customers" />
            <div className="h-8 w-px bg-white/20" />
            <Stat n="18+" label="Top Brands" />
          </div>
          <div className="mt-8 flex items-center gap-3">
            <button onClick={() => setI((v) => (v - 1 + slides.length) % slides.length)} className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/5 backdrop-blur hover:bg-white/15" aria-label="Previous"><ChevronLeft className="h-4 w-4" /></button>
            <div className="flex gap-1.5">
              {slides.map((_, k) => (
                <button key={k} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-brand" : "w-3 bg-white/40"}`} aria-label={`Slide ${k + 1}`} />
              ))}
            </div>
            <button onClick={() => setI((v) => (v + 1) % slides.length)} className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/5 backdrop-blur hover:bg-white/15" aria-label="Next"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>

        
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold text-white">{n}</div>
      <div className="text-[11px] uppercase tracking-wider">{label}</div>
    </div>
  );
}
function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/10 p-2">
      <div className="text-[10px] uppercase tracking-wider text-white/60">{label}</div>
      <div className="mt-0.5 text-xs font-bold">{value}</div>
    </div>
  );
}

function TrustBar() {
  const items = [
    { icon: ShieldCheck, title: "Original Warranty", desc: "100% genuine products" },
    { icon: Truck, title: "Fast Delivery", desc: "Nationwide shipping" },
    { icon: Wrench, title: "After-Sales Service", desc: "Expert repair & support" },
    { icon: Headphones, title: "7 Days a Week", desc: "Customer support ready" },
  ];
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {items.map((i) => (
          <div key={i.title} className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <i.icon className="h-6 w-6" />
            </div>
            <div>
              <div className="font-semibold text-foreground">{i.title}</div>
              <div className="text-sm text-muted-foreground">{i.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedCategories() {
  const featured = categories.slice(0, 8);
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHead
        eyebrow="Browse"
        title="Featured Categories"
        subtitle="Everything you need for your home — from big appliances to everyday essentials."
        action={<Link to="/categories" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">View all <ArrowRight className="h-4 w-4" /></Link>}
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {featured.map((c) => (
          <Link
            key={c.slug}
            to="/shop"
            search={{ category: c.slug }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-brand/50 hover:shadow-[var(--shadow-card)]"
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand/5 transition group-hover:bg-brand/15" />
            <c.icon className="relative h-9 w-9 text-primary transition group-hover:text-brand" />
            <div className="relative mt-6 font-semibold text-foreground">{c.name}</div>
            <div className="relative mt-1 text-xs text-muted-foreground">{c.count} products →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function useCountdown(hours: number) {
  const [end] = useState(() => Date.now() + hours * 60 * 60 * 1000);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, end - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { h, m, s };
}

function FlashSale() {
  const { h, m, s } = useCountdown(12);
  const flash = products.filter((p) => p.isFlash).slice(0, 4);
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand">
              <Flame className="h-3.5 w-3.5" /> Flash Sale
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Today's Hot Deals</h2>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-brand" />
            {[["Hours", h], ["Min", m], ["Sec", s]].map(([l, v]) => (
              <div key={l as string} className="rounded-xl bg-white/10 px-3 py-2 text-center backdrop-blur">
                <div className="font-display text-xl font-bold">{String(v).padStart(2, "0")}</div>
                <div className="text-[10px] uppercase tracking-wider text-primary-foreground/60">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {flash.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const list = products.slice(0, 8);
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHead
        eyebrow="Featured"
        title="Featured Products"
        subtitle="Handpicked deals from top brands — Dawlance, Haier, PEL, Samsung, Orient and more."
        action={<Link to="/shop" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline">Shop all <ArrowRight className="h-4 w-4" /></Link>}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid gap-6 md:grid-cols-2">
        {[
          { title: "Summer Cooling", sub: "Up to 20% off on ACs & Air Coolers", gradient: "from-sky-500 to-blue-700" },
          { title: "Kitchen Essentials", sub: "Save big on ovens, blenders & juicers", gradient: "from-orange-500 to-rose-600" },
        ].map((b) => (
          <div key={b.title} className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${b.gradient} p-8 text-white`}>
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15" />
            <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10" />
            <span className="relative text-xs font-semibold uppercase tracking-widest">Special Offer</span>
            <h3 className="relative mt-2 font-display text-3xl font-bold">{b.title}</h3>
            <p className="relative mt-2 max-w-sm text-white/85">{b.sub}</p>
            <Link to="/deals" className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-white">
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function BestSellers() {
  const list = products.filter((p) => p.isBestSeller || p.isNew).slice(0, 4);
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHead
        eyebrow="Latest Arrivals"
        title="New & Best Sellers"
        subtitle="Fresh stock of the most-loved products from top international and Pakistani brands."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

function BrandsStrip() {
  return (
    <section className="border-y border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHead eyebrow="Popular Brands" title="Trusted by Top Brands" subtitle="We stock only authorized, original products from Pakistan's most trusted names." />
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9">
          {brands.map((b) => (
            <div key={b} className="flex h-16 items-center justify-center rounded-xl border border-border bg-card font-display font-bold text-primary/70 transition hover:-translate-y-0.5 hover:border-brand hover:text-brand">
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  const items = [
    { icon: Award, title: "15+ Years of Trust", desc: "Serving Pakistani families with quality electronics." },
    { icon: ShieldCheck, title: "Original Warranty", desc: "Every product is authorized and warranty-backed." },
    { icon: Truck, title: "Fast Nationwide Delivery", desc: "Doorstep delivery across all major cities." },
    { icon: Headphones, title: "Expert Support", desc: "Dedicated team to guide before and after purchase." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHead eyebrow="Why Choose Us" title="Shop With Confidence" subtitle="What makes thousands of customers pick Al Rehmani Electronics year after year." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((i) => (
          <div key={i.title} className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-brand-foreground">
              <i.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-display text-lg font-bold text-primary">{i.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    { name: "Ahmed K.", city: "Lahore", text: "Bought a Haier inverter AC — installation was quick and the price was the best in town.", rating: 5 },
    { name: "Sana R.", city: "Karachi", text: "The team helped me pick the right fridge for my family. Genuine product, delivered next day.", rating: 5 },
    { name: "Bilal M.", city: "Islamabad", text: "Excellent after-sales service. My washing machine had an issue and they resolved it in 24 hours.", rating: 5 },
  ];
  return (
    <section className="bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHead eyebrow="Customer Reviews" title="What Our Customers Say" />
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex text-amber-500">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                ))}
              </div>
              <p className="mt-4 text-sm text-foreground/90">"{r.text}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstaGallery() {
  const items = products.slice(0, 6);
  
}

function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl p-10 text-white sm:p-14" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/30 blur-3xl" />
        <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">Stay in the loop</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Get Exclusive Deals in Your Inbox</h2>
            <p className="mt-3 max-w-md text-white/80">Be first to know about flash sales, new arrivals and members-only offers.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex overflow-hidden rounded-full bg-white p-1.5 shadow-xl">
            <input type="email" required placeholder="Enter your email" className="flex-1 bg-transparent px-4 text-sm text-primary outline-none" />
            <button className="rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground hover:brightness-110">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
}

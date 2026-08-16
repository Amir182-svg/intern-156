import { createFileRoute } from "@tanstack/react-router";
import { Award, Heart, Truck, ShieldCheck, Target, Compass } from "lucide-react";
import { SectionHead } from "@/components/site-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Elite Electronics" },
      { name: "description", content: "Elite Electronics has served Pakistani families with genuine electronics and home appliances for over 15 years." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative overflow-hidden text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/25 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">About Us</span>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Trusted Since Years —<br />Serving Pakistani Homes.</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            At Elite Electronics, we've built our reputation on one simple promise: genuine
            products, honest prices and dependable service — for every family, every home.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">Our Story</span>
          <h2 className="mt-2 font-display text-3xl font-bold text-primary">From a Small Shop to a Household Name</h2>
          <p className="mt-4 text-muted-foreground">
            What began as a small neighbourhood store years ago has grown into one of Pakistan's
            trusted destinations for electronics and home appliances. Through every step, our
            focus has stayed the same — offering original products, guiding customers honestly
            and standing behind every sale with real after-sales support.
          </p>
          <p className="mt-4 text-muted-foreground">
            Today, thousands of families across Pakistan bring home a piece of Al Rehmani every
            month. We remain independently owned, personally involved, and deeply grateful.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Stat n="15+" label="Years of Experience" />
          <Stat n="10k+" label="Happy Customers" />
          <Stat n="500+" label="Products" />
          <Stat n="18+" label="Trusted Brands" />
        </div>
      </section>

      <section className="bg-secondary/50">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-3">
          <Pillar icon={Target} title="Our Mission" desc="Make high-quality electronics accessible to every Pakistani household through fair prices, genuine products and trusted service." />
          <Pillar icon={Compass} title="Our Vision" desc="To be Pakistan's most loved electronics retailer — a name families recommend to their friends and pass on to their children." />
          <Pillar icon={Heart} title="Our Values" desc="Honesty above profit. Service above sales. Long relationships above one-time transactions. Always." />
        </div>
      </section>

      <section className="bg-[#F5F8FC]">
  <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6"></div>
        <SectionHead eyebrow="Why Customers Trust Us" title="Built on Real Promises" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Feature icon={ShieldCheck} title="Original Products" desc="Every item is authorized and warranty-backed." />
          <Feature icon={Award} title="15+ Years Experience" desc="Decades of serving Pakistani families." />
          <Feature icon={Truck} title="Fast Delivery" desc="Doorstep delivery nationwide, on schedule." />
          <Feature icon={Heart} title="Excellent Support" desc="Real people, real help — before and after purchase." />
        </div>
      </section>
    </>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="font-display text-4xl font-bold text-brand">{n}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function Pillar({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-brand-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 font-display text-xl font-bold text-primary">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <Icon className="h-8 w-8 text-brand" />
      <h4 className="mt-4 font-semibold text-foreground">{title}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

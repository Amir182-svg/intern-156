import { createFileRoute } from "@tanstack/react-router";
import { Flame } from "lucide-react";
import { SectionHead } from "@/components/site-layout";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/store-data";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Today's Deals — Al Rehmani Electronics" },
      { name: "description", content: "Save on top electronics and home appliances with today's exclusive deals and flash sales." },
    ],
  }),
  component: Deals,
});

function Deals() {
  const flash = products.filter((p) => p.isFlash);
  const rest = products.filter((p) => !p.isFlash).slice(0, 8);

  return (
    <>
      <section className="relative overflow-hidden text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
            <Flame className="h-3.5 w-3.5 text-brand" /> Limited Time
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">Today's Best Deals</h1>
          <p className="mt-3 max-w-xl text-white/80">
            Big discounts across every category. Genuine products, warranty included, nationwide delivery.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHead eyebrow="Flash Sale" title="Ends Soon" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {flash.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <SectionHead eyebrow="More Offers" title="Save On These" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </>
  );
}

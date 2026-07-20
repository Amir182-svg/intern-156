import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHead } from "@/components/site-layout";
import { brands } from "@/lib/store-data";

export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title: "Top Brands — Al Rehmani Electronics" },
      { name: "description", content: "Shop authorized products from Samsung, LG, Haier, Dawlance, PEL, Orient and more at Al Rehmani Electronics." },
    ],
  }),
  component: BrandsPage,
});

function BrandsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionHead
        eyebrow="Trusted Brands"
        title="Shop by Brand"
        subtitle="We stock only authorized, original products from the world's most trusted electronics brands."
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {brands.map((b) => (
          <Link
            key={b}
            to="/shop"
            search={{ brand: b }}
            className="group flex h-28 flex-col items-center justify-center rounded-2xl border border-border bg-card font-display text-lg font-bold text-primary/80 transition hover:-translate-y-1 hover:border-brand hover:text-brand hover:shadow-[var(--shadow-card)]"
          >
            {b}
            <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Shop →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

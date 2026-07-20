import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHead } from "@/components/site-layout";
import { categories } from "@/lib/store-data";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "All Categories — Elite Electronics" },
      { name: "description", content: "Explore all electronics and home-appliance categories at Elite Electronics." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionHead
        eyebrow="All Categories"
        title="Shop by Category"
        subtitle="Discover the complete range of electronics and home appliances we stock."
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/shop"
            search={{ category: c.slug }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-brand/50 hover:shadow-[var(--shadow-card)]"
          >
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand/5 transition group-hover:bg-brand/15" />
            <c.icon className="relative h-8 w-8 text-primary transition group-hover:text-brand" />
            <div className="relative mt-4 text-sm font-semibold text-foreground">{c.name}</div>
            <div className="relative mt-1 text-xs text-muted-foreground">{c.count} products</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

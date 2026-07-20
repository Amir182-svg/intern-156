import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { SlidersHorizontal, Grid3x3, List, X } from "lucide-react";
import { SectionHead } from "@/components/site-layout";
import { ProductCard } from "@/components/product-card";
import { categories, brands, products } from "@/lib/store-data";

const shopSearchSchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  sort: z.enum(["featured", "low", "high", "rating"]).optional(),
});

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Products — Al Rehmani Electronics" },
      { name: "description", content: "Browse the full range of refrigerators, ACs, TVs, washing machines and home appliances at Al Rehmani Electronics." },
    ],
  }),
  validateSearch: (s) => shopSearchSchema.parse(s),
  component: Shop,
});

function Shop() {
  const { category, brand, sort } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [cat, setCat] = useState<string | undefined>(category);
  const [br, setBr] = useState<string | undefined>(brand);
  const [order, setOrder] = useState(sort ?? "featured");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let list = products.slice();
    if (cat) list = list.filter((p) => p.category === cat);
    if (br) list = list.filter((p) => p.brand === br);
    if (order === "low") list.sort((a, b) => a.price - b.price);
    if (order === "high") list.sort((a, b) => b.price - a.price);
    if (order === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, br, order]);

  const activeCat = categories.find((c) => c.slug === cat);

  return (
    <>
      <div className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="text-xs text-muted-foreground">Home / Shop {activeCat && ` / ${activeCat.name}`}</div>
          <h1 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">
            {activeCat ? activeCat.name : "All Products"}
          </h1>
          <p className="mt-2 text-muted-foreground">{filtered.length} products available</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-6">
          <FilterCard title="Categories">
            <ul className="space-y-1 text-sm">
              <li>
                <button
                  onClick={() => { setCat(undefined); navigate({ search: (s: Record<string, unknown>) => ({ ...s, category: undefined }) }); }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left ${!cat ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                >
                  All Categories
                </button>
              </li>
              {categories.slice(0, 12).map((c) => (
                <li key={c.slug}>
                  <button
                    onClick={() => { setCat(c.slug); navigate({ search: (s: Record<string, unknown>) => ({ ...s, category: c.slug }) }); }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left ${cat === c.slug ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                  >
                    <span>{c.name}</span>
                    <span className="text-xs opacity-70">{c.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </FilterCard>

          <FilterCard title="Brands">
            <div className="flex flex-wrap gap-2">
              {brands.slice(0, 12).map((b) => (
                <button
                  key={b}
                  onClick={() => setBr(br === b ? undefined : b)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${br === b ? "border-brand bg-brand text-brand-foreground" : "border-border hover:border-brand hover:text-brand"}`}
                >
                  {b}
                </button>
              ))}
            </div>
          </FilterCard>

          {(cat || br) && (
            <button
              onClick={() => { setCat(undefined); setBr(undefined); navigate({ search: {} }); }}
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
            >
              <X className="h-4 w-4" /> Clear filters
            </button>
          )}
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4" /> Showing {filtered.length} results
            </div>
            <div className="flex items-center gap-2">
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value as typeof order)}
                className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm outline-none"
              >
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <div className="flex overflow-hidden rounded-lg border border-border">
                <button onClick={() => setView("grid")} className={`p-1.5 ${view === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}><Grid3x3 className="h-4 w-4" /></button>
                <button onClick={() => setView("list")} className={`p-1.5 ${view === "list" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}><List className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center text-muted-foreground">
              No products match your filters.
            </div>
          ) : (
            <div className={view === "grid" ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3" : "space-y-4"}>
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function FilterCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-primary">{title}</h3>
      {children}
    </div>
  );
}

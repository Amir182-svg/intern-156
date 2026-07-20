import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store-context";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Your Wishlist — Elite Electronics" }] }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist, productById } = useStore();
  const items = wishlist.map((id) => productById(id)).filter(Boolean);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl">Your Wishlist</h1>
      <p className="mt-1 text-sm text-muted-foreground">{items.length} saved product{items.length !== 1 ? "s" : ""}</p>

      {items.length === 0 ? (
        <div className="mx-auto mt-16 max-w-md text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-secondary">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="mt-6 font-display text-2xl font-bold">No favourites yet</h2>
          <p className="mt-2 text-muted-foreground">Tap the heart on any product to save it here.</p>
          <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground hover:brightness-110">
            Browse Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => p && <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  );
}

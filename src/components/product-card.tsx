import { Heart, ShoppingCart, Star, Eye, GitCompare } from "lucide-react";
import { formatPKR, type Product } from "@/lib/store-data";
import { useStore } from "@/lib/store-context";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, inWishlist } = useStore();

  const discount = Math.round(((product.original - product.price) / product.original) * 100);
  const wished = inWishlist(product.id);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[var(--shadow-card-hover)]">
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-transparent">
  <img
    src={product.image}
    alt={product.name}
    className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
  />

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-bold text-brand-foreground shadow-sm">
              -{discount}%
            </span>
          )}
          {product.isNew && <Pill className="bg-emerald-500 text-white">New</Pill>}
          {product.isBestSeller && <Pill className="bg-primary text-primary-foreground">Best Seller</Pill>}
          {product.isFlash && <Pill className="bg-red-500 text-white">Flash</Pill>}
        </div>

        <div className="absolute right-3 top-3 flex flex-col gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
          <IconBtn onClick={() => toggleWishlist(product.id)} label="Wishlist" active={wished}>
            <Heart className={`h-4 w-4 ${wished ? "fill-brand text-brand" : ""}`} />
          </IconBtn>
          <IconBtn label="Quick View"><Eye className="h-4 w-4" /></IconBtn>
          <IconBtn label="Compare"><GitCompare className="h-4 w-4" /></IconBtn>
        </div>

        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => addToCart(product.id)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-xs font-semibold text-primary-foreground shadow-lg transition hover:bg-brand hover:text-brand-foreground"
          >
            <ShoppingCart className="h-4 w-4" /> Add to Cart
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-brand">{product.brand}</div>
        <div className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-foreground">
          {product.name}
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <div className="flex items-center gap-0.5 text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="font-semibold">{product.rating}</span>
          </div>
          <span className="text-muted-foreground">({product.reviews})</span>
          <span className="ml-auto text-[10px] font-medium text-emerald-600">
            {product.stock === "in-stock" ? "In stock" : product.stock === "low-stock" ? "Low stock" : "Out of stock"}
          </span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <div className="font-display text-lg font-bold text-primary">{formatPKR(product.price)}</div>
            <div className="text-xs text-muted-foreground line-through">{formatPKR(product.original)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-sm ${className}`}>{children}</span>;
}

function IconBtn({
  children, label, onClick, active,
}: { children: React.ReactNode; label: string; onClick?: () => void; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`grid h-9 w-9 place-items-center rounded-full border border-white/60 bg-white/85 shadow-sm backdrop-blur transition hover:bg-brand hover:text-brand-foreground ${
        active ? "bg-white text-brand" : "text-primary"
      }`}
    >
      {children}
    </button>
  );
}

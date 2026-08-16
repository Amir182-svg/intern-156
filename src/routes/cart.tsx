import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store-context";
import { formatPKR } from "@/lib/store-data";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Al Rehmani Electronics" }] }),
  component: Cart,
});

function Cart() {
  const { cart, productById, updateQty, removeFromCart, cartTotal, clearCart } = useStore();

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-secondary">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-primary">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Discover our products and add your favourites.</p>
        <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground hover:brightness-110">
          Start Shopping <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const delivery = cartTotal > 100000 ? 0 : 1500;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl">Your Cart</h1>
      <p className="mt-1 text-sm text-muted-foreground">{cart.length} item{cart.length !== 1 ? "s" : ""} in your cart</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cart.map((item) => {
            const p = productById(item.id);
            if (!p) return null;
            const Icon = p.icon;
            return (
              <div key={item.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center">
                <div className={`grid h-24 w-24 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${p.tint}`}>
                  <Icon className="h-10 w-10 text-primary/50" strokeWidth={1.2} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-brand">{p.brand}</div>
                  <div className="line-clamp-2 text-sm font-semibold">{p.name}</div>
                  <div className="mt-1 font-display text-base font-bold text-primary">{formatPKR(p.price)}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center overflow-hidden rounded-full border border-border">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-2 hover:bg-secondary"><Minus className="h-4 w-4" /></button>
                    <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-2 hover:bg-secondary"><Plus className="h-4 w-4" /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="rounded-full p-2 text-destructive hover:bg-destructive/10" aria-label="Remove">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
          <button onClick={clearCart} className="text-sm font-semibold text-destructive hover:underline">Clear cart</button>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <h3 className="font-display text-lg font-bold text-primary">Order Summary</h3>
          <div className="mt-4 space-y-2 text-sm">
            <Row label="Subtotal" value={formatPKR(cartTotal)} />
            <Row label="Delivery" value={delivery === 0 ? "Free" : formatPKR(delivery)} />
            <div className="mt-2 border-t border-border pt-3">
              <Row label="Total" value={formatPKR(cartTotal + delivery)} bold />
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-brand/10 p-3 text-xs text-brand">
            {delivery === 0 ? "🎉 You qualify for free delivery!" : `Spend ${formatPKR(100000 - cartTotal)} more for free delivery.`}
          </div>
          <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-brand hover:text-brand-foreground">
            Proceed to Checkout <ArrowRight className="h-4 w-4" />
          </button>
          <Link to="/shop" className="mt-3 block text-center text-sm font-medium text-muted-foreground hover:text-brand">Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${bold ? "font-display text-base font-bold text-primary" : "text-muted-foreground"}`}>
      <span>{label}</span><span>{value}</span>
    </div>
  );
}

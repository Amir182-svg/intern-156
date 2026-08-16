import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./store-data";

type CartItem = { id: string; qty: number };

type StoreCtx = {
  cart: CartItem[];
  wishlist: string[];
  cartCount: number;
  cartTotal: number;
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  inWishlist: (id: string) => boolean;
  productById: (id: string) => Product | undefined;
};

const Ctx = createContext<StoreCtx | null>(null);

const useLS = <T,>(key: string, initial: T) => {
  const [val, setVal] = useState<T>(initial);
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
      if (raw) setVal(JSON.parse(raw));
    } catch {}
  }, [key]);
  useEffect(() => {
    try {
      if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(val));
    } catch {}
  }, [key, val]);
  return [val, setVal] as const;
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useLS<CartItem[]>("alr_cart", []);
  const [wishlist, setWishlist] = useLS<string[]>("alr_wishlist", []);

  const value = useMemo<StoreCtx>(() => {
    const productById = (id: string) => products.find((p) => p.id === id);
    const cartTotal = cart.reduce((s, i) => s + (productById(i.id)?.price ?? 0) * i.qty, 0);
    const cartCount = cart.reduce((s, i) => s + i.qty, 0);
    return {
      cart,
      wishlist,
      cartCount,
      cartTotal,
      productById,
      addToCart: (id, qty = 1) =>
        setCart((c) => {
          const exists = c.find((i) => i.id === id);
          if (exists) return c.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
          return [...c, { id, qty }];
        }),
      removeFromCart: (id) => setCart((c) => c.filter((i) => i.id !== id)),
      updateQty: (id, qty) =>
        setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))),
      clearCart: () => setCart([]),
      toggleWishlist: (id) =>
        setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
      inWishlist: (id) => wishlist.includes(id),
    };
  }, [cart, wishlist, setCart, setWishlist]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

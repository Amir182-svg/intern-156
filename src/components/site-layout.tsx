import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Search, Heart, ShoppingCart, User, Menu, X, Phone, Mail, MapPin,
  Facebook, Instagram, Youtube, MessageCircle, ChevronRight,
} from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { useStore } from "@/lib/store-context";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/brands", label: "Brands" },
  { to: "/deals", label: "Deals" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <TopBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <div className="hidden bg-primary text-primary-foreground/90 md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:px-6">
        <div className="flex items-center gap-6">
          <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> +92 337 4994880</span>
          <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> amircheemajutt123@gmail.com</span>
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Nationwide Delivery</span>
        </div>
        <div className="flex items-center gap-4">
          <span>100% Genuine Products</span>
          <span className="opacity-40">|</span>
          <span>Easy Returns</span>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { cartCount, wishlist } = useStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <img src="/logo.png" alt="Elite Electronics" className="h-11 w-11 object-contain" />
          <div className="leading-tight">
            <div className="font-display text-base font-bold text-primary sm:text-lg">ELite</div>
            <div className="-mt-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-brand sm:text-[10px]">Electronics</div>
          </div>
        </Link>

        <div className="ml-2 hidden max-w-xl flex-1 items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 lg:flex">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            placeholder="Search fridges, ACs, TVs, brands..."
          />
          <button className="rounded-full bg-brand px-4 py-1.5 text-xs font-semibold text-brand-foreground hover:brightness-110">
            Search
          </button>
        </div>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const active = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to));
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1 md:ml-2">
          <Link to="/wishlist" className="relative rounded-full p-2 hover:bg-secondary" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
          </Link>
          <Link to="/cart" className="relative rounded-full p-2 hover:bg-secondary" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && <Badge>{cartCount}</Badge>}
          </Link>
          <button className="hidden rounded-full p-2 hover:bg-secondary sm:inline-flex" aria-label="Account">
            <User className="h-5 w-5" />
          </button>
          <button
            className="rounded-full p-2 hover:bg-secondary md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="border-t border-border px-4 py-2 lg:hidden">
        <div className="flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Search products..."
          />
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-background p-6 shadow-2xl animate-slide-in-right">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-lg font-bold text-primary">Menu</span>
              <button onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-secondary"
                >
                  {l.label} <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-brand-foreground">
      {children}
    </span>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="" className="h-11 w-11 rounded-lg bg-white/95 p-1 object-contain" />
              <div className="leading-tight">
                <div className="font-display text-lg font-bold">Elite </div>
                <div className="-mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">Electronics</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-primary-foreground/70">
              Your trusted electronics & home appliances store — genuine products, best prices,
              nationwide delivery.
            </p>
            <div className="mt-5 flex gap-2">
  <a
    href="https://www.facebook.com/share/1ESSoL7Czn/"
    target="_blank"
    rel="noopener noreferrer"
    className="grid h-10 w-10 place-items-center rounded-full bg-blue hover:bg-brand transition"
  >
    <img src="/facebook.jpg" alt="Facebook" className="h-7 w-7 object-contain" />
  </a>

  <a
    href="https://www.instagram.com/amir___cheema?igsh=MXF0anQwYWhyc3d4Nw=="
    target="_blank"
    rel="noopener noreferrer"
    className="grid h-10 w-10 place-items-center rounded-full bg-blue hover:bg-brand transition"
  >
    <img src="/instagram.jpg" alt="Instagram" className="h-7 w-7 object-contain" />
  </a>

  <a
    href="https://youtube.com/@amiramir-m8u3v?si=AIUcb56gAIyzdynn"
    target="_blank"
    rel="noopener noreferrer"
    className="grid h-10 w-10 place-items-center rounded-full bg-blue hover:bg-brand transition"
  >
    <img src="/youtube.png" alt="YouTube" className="h-7 w-7 object-contain" />
  </a>

  <a
    href="https://www.linkedin.com/in/muhammad-amir-cheema-a93859394?utm_source=share_via&utm_content=profile&utm_medium=member_android"
    target="_blank"
    rel="noopener noreferrer"
    className="grid h-10 w-10 place-items-center rounded-full bg-blue hover:bg-brand transition"
  >
    <img src="/linkedin.jpg" alt="LinkedIn" className="h-7 w-7 object-contain" />
  </a>
</div>
          </div>

          <FooterCol title="Quick Links" links={[
            ["Home", "/"], ["Shop", "/shop"], ["Categories", "/categories"],
            ["Brands", "/brands"], ["Deals", "/deals"], ["About Us", "/about"],
          ]} />
          <FooterCol title="Customer Service" links={[
            ["Contact", "/contact"], ["FAQs", "/contact"], ["Refund Policy", "/contact"],
            ["Privacy Policy", "/contact"], ["Terms & Conditions", "/contact"], ["Delivery Info", "/contact"],
          ]} />

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider">Newsletter</h4>
            <p className="mt-3 text-sm text-primary-foreground/70">
              Get exclusive deals and product launches straight to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex overflow-hidden rounded-full border border-white/15 bg-white/5 p-1"
            >
              <input
                type="email"
                required
                placeholder="Your email"
                className="flex-1 h-10 w-full bg-transparent px-4 text-sm outline-none placeholder:text-primary-foreground/50"
              />
              <button className="rounded-full bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground hover:brightness-110">
                Subscribe
              </button>
            </form>
            <div className="mt-6 space-y-1.5 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-brand" /> +92 337 4994880</div>
             <div className="flex items-center gap-2">
  <Mail className="h-3.5 w-3.5 text-brand" />
  <a
    href="mailto:amircheemajutt123@gmail.com"
    className="hover:text-brand transition-colors"
  >
    amircheemajutt123@gmail.com
  </a>
</div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-primary-foreground/60 sm:flex-row">
          <div>© {new Date().getFullYear()} Elite Electronics. All rights reserved.</div>
          <div>Made with care for our customers in Pakistan 🇵🇰</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-bold uppercase tracking-wider">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
        {links.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="transition hover:text-brand">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SectionHead({
  eyebrow, title, subtitle, action,
}: { eyebrow?: string; title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow && <span className="text-xs font-semibold uppercase tracking-widest text-brand">{eyebrow}</span>}
        <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

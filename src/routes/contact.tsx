import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, MessageSquareWarning, Lightbulb } from "lucide-react";
import { SectionHead } from "@/components/site-layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Elite Electronics" },
      { name: "description", content: "Reach Elite Electronics via phone, WhatsApp, email or visit our store. Complaint and suggestion boxes available." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <section className="relative overflow-hidden text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">Contact</span>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Get in Touch</h1>
          <p className="mt-3 max-w-xl text-white/80">
            Questions, quotes, or after-sales support — we're here to help you 7 days a week.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard icon={MapPin} title="Store Address" lines={[ "Pakistan","Available online"]} />
          <InfoCard icon={Phone} title="Call Us" lines={["+92 337 4994880", "+92 42 000 0000"]} />
          <InfoCard
  icon={Mail}
  title="Email"
  lines={[
    "amircheemajutt123@gmail.com",
    "mmuhammadamircheema@gmail.com",
  ]}
/>
          <InfoCard icon={Clock} title="Business Hours" lines={["Mon–Sat: 10am – 9pm", "Sunday: 12pm – 8pm"]} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_1fr]">
        <ContactForm />
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <iframe
            title="  Electronics Store Location"
            className="h-full min-h-80 w-full"
            src="https://www.openstreetmap.org/export/embed.html?bbox=74.28%2C31.50%2C74.42%2C31.60&layer=mapnik"
            loading="lazy"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <SectionHead eyebrow="We're Listening" title="Complaint & Suggestion Boxes" subtitle="Your feedback helps us serve you better. We respond within 24 hours." />
        <div className="grid gap-6 md:grid-cols-2">
          <FeedbackCard kind="complaint" icon={MessageSquareWarning} title="Complaint Box" desc="Faced an issue with a product or our service? Let us know and we'll fix it." accent="destructive" />
          <FeedbackCard kind="suggestion" icon={Lightbulb} title="Suggestion Box" desc="Have an idea to make Al Rehmani Electronics better? We'd love to hear it." accent="brand" />
        </div>
      </section>

      <a
        href="https://wa.me/923374994880"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-600"
      >
        <MessageCircle className="h-4 w-4" /> WhatsApp
      </a>
    </>
  );
}

function InfoCard({
  icon: Icon,
  title,
  lines,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lines: string[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <Icon className="h-6 w-6 text-brand" />

      <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>

      <div className="mt-1 space-y-0.5 text-sm">
        {lines.map((line) => (
          <div key={line}>
            {title === "Email" ? (
              <a
                href={`mailto:${line}`}
                className=" hover:underline"
              >
                {line}
              </a>
            ) : (
              line
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-brand text-brand-foreground"><Send className="h-6 w-6" /></div>
        <h3 className="mt-5 font-display text-xl font-bold">Message sent!</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">Thanks for reaching out. Our team will get back to you shortly.</p>
        <button onClick={() => setSent(false)} className="mt-6 text-sm font-semibold text-brand hover:underline">Send another</button>
      </div>
    );
  }
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      className="rounded-2xl border border-border bg-card p-8 shadow-sm"
    >
      <h3 className="font-display text-xl font-bold text-primary">Send Us a Message</h3>
      <p className="mt-1 text-sm text-muted-foreground">We usually respond within a few hours.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Name" required><Input required placeholder="Full name" /></Field>
        <Field label="Phone" required><Input required placeholder="03XX-XXXXXXX" type="tel" /></Field>
      </div>
      <div className="mt-4">
        <Field label="Email"><Input placeholder="you@email.com" type="email" /></Field>
      </div>
      <div className="mt-4">
        <Field label="Message" required>
          <textarea required rows={5} placeholder="How can we help?"
            className="w-full resize-none rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand" />
        </Field>
      </div>
      <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-brand hover:text-brand-foreground">
        Send Message <Send className="h-4 w-4" />
      </button>
    </form>
  );
}

function FeedbackCard({
  kind, icon: Icon, title, desc, accent,
}: { kind: "complaint" | "suggestion"; icon: React.ComponentType<{ className?: string }>; title: string; desc: string; accent: "destructive" | "brand"; }) {
  const [submitted, setSubmitted] = useState(false);
  const accentClass = accent === "brand" ? "bg-brand text-brand-foreground" : "bg-destructive text-destructive-foreground";
  const ring = accent === "brand" ? "focus:ring-brand" : "focus:ring-destructive";
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center">
        <div className={`grid h-14 w-14 place-items-center rounded-full ${accentClass}`}><Icon className="h-6 w-6" /></div>
        <h3 className="mt-5 font-display text-xl font-bold">Thank you!</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">Your {kind} was received. We'll get back to you within 24 hours.</p>
        <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-semibold text-brand hover:underline">Submit another</button>
      </div>
    );
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`grid h-11 w-11 place-items-center rounded-xl ${accentClass}`}><Icon className="h-5 w-5" /></div>
        <div>
          <h3 className="font-display text-xl font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <Field label="Your Name" required><Input required ring={ring} placeholder="Full name" /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone" required><Input required ring={ring} placeholder="03XX-XXXXXXX" type="tel" /></Field>
          <Field label="Email"><Input ring={ring} placeholder="you@email.com" type="email" /></Field>
        </div>
        <Field label={kind === "complaint" ? "Describe your complaint" : "Your suggestion"} required>
          <textarea required rows={4} placeholder={kind === "complaint" ? "Tell us what went wrong..." : "Share your idea..."}
            className={`w-full resize-none rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 ${ring}`} />
        </Field>
        <button className={`inline-flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold hover:brightness-110 ${accentClass}`}>
          Submit {kind === "complaint" ? "Complaint" : "Suggestion"} <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      {children}
    </label>
  );
}

function Input({ ring = "focus:ring-brand", ...props }: React.InputHTMLAttributes<HTMLInputElement> & { ring?: string }) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 ${ring}`}
    />
  );
}

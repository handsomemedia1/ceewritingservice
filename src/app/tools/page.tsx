import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToolsCatalog from '@/features/tools/components/ToolsCatalog';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Academic & Research Tools | Cee Writing Hub',
  description: 'Explore practical academic and research tools, including GPA conversion, sample-size estimation, statistical test selection, and scholarship readiness.',
  alternates: { canonical: '/tools' },
};

export default function ToolsHubPage() {
  return (
    <main className="min-h-screen bg-bg-main text-text-primary">
      <Navbar />
      <section className="relative isolate overflow-hidden border-b border-[var(--border)] px-5 pb-12 pt-32 sm:px-8 sm:pb-16 sm:pt-36 lg:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(197,160,89,0.16), transparent 64%)' }} />
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" /> Cee Writing workspace
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-tight tracking-[-0.04em] text-text-primary sm:text-5xl lg:text-6xl">Your academic toolkit, <span className="text-gold">all in one place.</span></h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">Use focused, easy-to-follow tools to make better research decisions, understand your academic standing, and prepare your next application.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#available-tools" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-gold px-5 py-3 text-sm font-bold text-[#0A0A0A] transition hover:bg-gold-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">Explore available tools <span className="ml-2" aria-hidden="true">↓</span></a>
            <Link href="/research/tools" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-text-primary transition hover:border-gold/40 hover:text-gold">Research tools hub <span className="ml-2" aria-hidden="true">↗</span></Link>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
            <div className="rounded-xl border border-[var(--border)] bg-bg-card/80 p-4"><p className="text-xs font-bold uppercase tracking-wider text-gold">Academic</p><p className="mt-1 text-sm text-muted">GPA and application support</p></div>
            <div className="rounded-xl border border-[var(--border)] bg-bg-card/80 p-4"><p className="text-xs font-bold uppercase tracking-wider text-gold">Research</p><p className="mt-1 text-sm text-muted">Study design and statistics</p></div>
            <div className="rounded-xl border border-[var(--border)] bg-bg-card/80 p-4"><p className="text-xs font-bold uppercase tracking-wider text-gold">Practical</p><p className="mt-1 text-sm text-muted">Simple tools, clear next steps</p></div>
          </div>
        </div>
      </section>
      <div id="available-tools"><ToolsCatalog /></div>
      <Footer />
    </main>
  );
}

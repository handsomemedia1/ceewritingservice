import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToolsCatalog from '@/features/tools/components/ToolsCatalog';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Academic & Research Tools | Cee Writing Hub',
  description: 'Explore practical academic and research tools, including GPA conversion, statistical test selection, and scholarship readiness.',
  alternates: { canonical: '/tools' },
};

const focusAreas = [
  { number: '01', title: 'Academic progress', description: 'Understand your GPA and plan your next step.' },
  { number: '02', title: 'Research decisions', description: 'Move from research questions to clearer methods.' },
  { number: '03', title: 'Global opportunities', description: 'Prepare more confidently for applications.' },
];

export default function ToolsHubPage() {
  return (
    <main className="tools-page min-h-screen bg-[#f7f5ef] text-[#18251f]">
      <Navbar />
      <section className="relative overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36 lg:px-12 lg:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-20 h-[30rem] w-[30rem] rounded-full bg-[#dfe8d8] opacity-70 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#f0dfc5] opacity-60 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d5dfd2] bg-white/70 px-3.5 py-2 text-xs font-bold tracking-wide text-[#365744] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#5b805e]" aria-hidden="true" />
              THE CEE WRITING TOOLKIT
            </div>
            <h1 className="mt-7 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-[-0.055em] text-[#18251f] sm:text-6xl lg:text-[4.5rem]">
              Good research starts with <span className="text-[#557653]">a clearer next step.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#5c665f] sm:text-lg">
              Practical, approachable tools for students and researchers. Make sense of your academic profile, choose research methods, and prepare for what comes next.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#available-tools" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#244633] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(36,70,51,.16)] transition hover:-translate-y-0.5 hover:bg-[#315a40] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244633]">
                Explore the tools <span aria-hidden="true">↘</span>
              </a>
              <Link href="/research" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#cfd6cd] bg-white/65 px-6 py-3 text-sm font-semibold text-[#244633] transition hover:border-[#7f9a7d] hover:bg-white">
                Visit research hub <span className="ml-2" aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[#6b756e]">
              <span className="inline-flex items-center gap-2"><span className="text-[#557653]">✓</span> Straightforward guidance</span>
              <span className="inline-flex items-center gap-2"><span className="text-[#557653]">✓</span> Built for real academic tasks</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div className="absolute -right-3 -top-4 h-full w-full rounded-[2rem] border border-[#d8dfd2] sm:-right-5 sm:-top-5" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[1.75rem] bg-[#203d2c] p-6 text-white shadow-[0_24px_70px_rgba(31,59,42,.20)] sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.18em] text-[#b9cfb4]">Your starting point</p>
                  <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">What are you working on?</h2>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-xl" aria-hidden="true">✳</div>
              </div>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">Choose the area that best matches your goal. There’s a useful place to begin.</p>
              <div className="mt-7 space-y-3">
                {focusAreas.map((area) => (
                  <a key={area.number} href="#available-tools" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.06] p-4 transition hover:border-[#b9cfb4]/60 hover:bg-white/[.10]">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#dce7d6] font-display text-xs font-bold text-[#244633]">{area.number}</span>
                    <span className="min-w-0 flex-1"><span className="block font-semibold text-white">{area.title}</span><span className="mt-1 block text-xs leading-5 text-white/60">{area.description}</span></span>
                    <span className="text-lg text-[#b9cfb4] transition group-hover:translate-x-1" aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-white/60">
                <span>Made for students & researchers</span>
                <span className="font-semibold text-[#dce7d6]">Learn by doing ↗</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e4e2da] bg-white/55 px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-3 sm:gap-8">
          <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e6ede2] text-[#426447]" aria-hidden="true">✳</span><div><p className="text-sm font-bold text-[#25372b]">Clear, focused tools</p><p className="mt-0.5 text-xs text-[#707970]">Less guesswork, more direction</p></div></div>
          <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2e7d7] text-[#936c3b]" aria-hidden="true">↗</span><div><p className="text-sm font-bold text-[#25372b]">Useful next steps</p><p className="mt-0.5 text-xs text-[#707970]">Understand what to do with results</p></div></div>
          <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e6e8f1] text-[#515d86]" aria-hidden="true">⌘</span><div><p className="text-sm font-bold text-[#25372b]">One simple workspace</p><p className="mt-0.5 text-xs text-[#707970]">Academic and research essentials</p></div></div>
        </div>
      </section>

      <div id="available-tools"><ToolsCatalog /></div>
      <Footer />
    </main>
  );
}

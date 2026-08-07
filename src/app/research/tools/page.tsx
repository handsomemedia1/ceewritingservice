import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ResearchToolsPlaceholderPage() {
  return (
    <main className="min-h-screen bg-sage/20 flex flex-col">
      <Navbar />
      <section className="flex-grow flex items-center justify-center py-24">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <div className="text-6xl mb-6">🛠️</div>
          <h1 className="text-4xl font-serif font-bold text-green-dark mb-4">Research Tools</h1>
          <p className="text-lg text-muted mb-8">
            Interactive tools like the Statistical Test Selector and Sample Size Calculator are currently in development. Check back soon!
          </p>
          <Link href="/research" className="px-8 py-3 bg-green-dark text-sage rounded-full font-bold hover:bg-green-dark-mid transition-colors inline-block">
            Return to Research Hub
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}

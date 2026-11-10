import { serializeJsonLd } from '@/lib/jsonLd';

export interface ToolFaqItem {
  question: string;
  answer: string;
}

/** Visible questions and answers for a tool page, with matching FAQ structured data. */
export default function ToolFaq({ items }: { items: ToolFaqItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <section className="mx-auto mt-14 w-full max-w-2xl" aria-labelledby="tool-faq-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <h2 id="tool-faq-heading" className="font-display text-2xl font-bold text-white">Common questions</h2>
      <div className="mt-6 space-y-6">
        {items.map((item) => (
          <div key={item.question} className="border-t border-white/[0.08] pt-5">
            <h3 className="font-display text-lg font-bold text-[#EAEAEA]">{item.question}</h3>
            <p className="mt-2 leading-relaxed text-[#AAAAAA]">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

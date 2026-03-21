export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Cee Writing Service",
    "url": "https://ceewriting.com",
    "logo": "https://ceewriting.com/logo.png",
    "description": "Nigeria's trusted professional writing service. Plagiarism checks with real Turnitin, AI humanizing, CV writing, SOPs, business proposals, proofreading and more.",
    "telephone": "+2349056752549",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NG"
    },
    "areaServed": ["Nigeria", "United Kingdom", "United States", "Canada"],
    "sameAs": [],
    "priceRange": "₦₦",
    "openingHours": "Mo-Su 08:00-22:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Writing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Plagiarism Check (Turnitin)",
            "description": "Official Turnitin plagiarism and AI detection report"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Content Humanizing",
            "description": "Professional rewriting of AI-generated content to pass AI detection"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CV and Resume Writing",
            "description": "Professional CV and resume writing for job seekers"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Proofreading and Editing",
            "description": "Grammar, structure and flow correction for academic and business documents"
          }
        }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is your Turnitin access real?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We use a legitimate institutional Turnitin account. The report we send you is an official PDF from Turnitin itself."
        }
      },
      {
        "@type": "Question",
        "name": "How long does an order take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most orders are delivered within 24 hours. Plagiarism checks are usually done within a few hours."
        }
      },
      {
        "@type": "Question",
        "name": "Is my document kept confidential?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. We treat every document with full confidentiality. We never share, reuse, publish or distribute your work."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

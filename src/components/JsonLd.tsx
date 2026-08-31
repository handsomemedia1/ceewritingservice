/**
 * Global JSON-LD structured data — single authoritative organization entity.
 *
 * This is the canonical definition of Cee Writing Service for the entity graph.
 * All other schemas on individual pages reference this via @id.
 *
 * Intentionally excludes:
 *   - aggregateRating: not substantiated by visible on-page reviews
 *   - FAQPage: scoped only to /faq page (which has its own rich FAQ schema)
 */
export default function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://ceewriting.com/#organization',
    'name': 'Cee Writing Service',
    'url': 'https://ceewriting.com',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://ceewriting.com/logo.png',
      'width': 512,
      'height': 512,
    },
    'description': 'Professional academic writing, data analysis using SPSS, R, and Python, plagiarism checks via Turnitin, CV writing, Statement of Purpose, and scholarship application support. Trusted by students and professionals globally.',
    'telephone': '+2349056752549',
    'email': 'ceewritingservices@gmail.com',
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'NG',
    },
    'areaServed': [
      'United States',
      'United Kingdom',
      'Canada',
      'United Arab Emirates',
      'Kuwait',
      'Nigeria',
    ],
    'sameAs': [
      'https://www.linkedin.com/company/cee-writing-service/',
      'https://t.me/ceewritingservice',
    ],
    'knowsAbout': [
      'Academic Writing',
      'Research Methodology',
      'Quantitative Research',
      'Qualitative Research',
      'Data Analysis',
      'SPSS',
      'R Programming',
      'Python for Data Analysis',
      'Stata',
      'Plagiarism Detection',
      'Turnitin',
      'CV Writing',
      'Statement of Purpose',
      'Scholarship Applications',
      'Literature Review',
      'Thesis Writing',
      'Dissertation Support',
      'APA 7th Edition',
    ],
    'openingHours': 'Mo-Su 08:00-22:00',
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Academic and Professional Writing Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Plagiarism Check (Turnitin)',
            'description': 'Official Turnitin plagiarism and AI detection report from a legitimate institutional account',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'AI Content Humanising',
            'description': 'Professional rewriting of AI-generated academic content to reduce AI detection scores',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'CV and Resume Writing',
            'description': 'Professional CV and resume writing for job seekers and scholarship applicants',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Data Analysis and Research',
            'description': 'Advanced data analysis using SPSS, R, Python, and Stata with in-depth academic and business research',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Statement of Purpose Writing',
            'description': 'Tailored SOP writing for postgraduate admissions and international scholarship applications',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}

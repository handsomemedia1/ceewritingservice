/**
 * Facts behind the Privacy Policy, kept as data so the policy page, the AI knowledge catalog
 * and any future records of processing all stay consistent.
 *
 * Retention periods are the policy the business has committed to. If practice changes,
 * change it here and bump PRIVACY_LAST_UPDATED.
 */

export const PRIVACY_LAST_UPDATED = '26 November 2026';
export const PRIVACY_CONTACT_EMAIL = 'ceewritingservices@gmail.com';
export const NDPC_URL = 'https://ndpc.gov.ng';

export interface ProcessingActivity {
  activity: string;
  data: string;
  purpose: string;
  lawfulBasis: string;
  retention: string;
}

export const PROCESSING: ProcessingActivity[] = [
  {
    activity: 'Orders and enquiries',
    data: 'Name, email, phone or WhatsApp number, order details, and documents you send us (such as CVs, drafts or datasets).',
    purpose: 'To quote for, carry out and deliver the work you ask for, and to communicate with you about it.',
    lawfulBasis: 'Contract (NDPA s.25(1)(b)): needed to provide the service you request.',
    retention: 'Documents are deleted 12 months after delivery. Order records are kept for 6 years to meet tax and accounting obligations.',
  },
  {
    activity: 'Scholarship readiness check',
    data: 'Name, email, phone, country, education history, grades, language test scores, work experience and your answers to the assessment.',
    purpose: 'To calculate your readiness score and, if you agreed, contact you about your results and relevant support.',
    lawfulBasis: 'Consent (NDPA s.25(1)(a)), given on the form. You can withdraw it at any time.',
    retention: '24 months after your assessment, or sooner if you withdraw consent.',
  },
  {
    activity: 'Newsletter and alerts',
    data: 'Email address and where you signed up.',
    purpose: 'To send research guides, scholarship alerts and updates.',
    lawfulBasis: 'Consent (NDPA s.25(1)(a)), given when you subscribe.',
    retention: 'Until you unsubscribe or ask us to remove you.',
  },
  {
    activity: 'Writer and staff accounts',
    data: 'Name, email, login details, assigned orders and submitted work.',
    purpose: 'To give approved writers secure access to their assigned work.',
    lawfulBasis: 'Contract (NDPA s.25(1)(b)).',
    retention: 'For as long as the account is active, then 12 months.',
  },
  {
    activity: 'Telegram assistant',
    data: 'Messages you send to our Telegram bot.',
    purpose: 'To generate a reply to your question.',
    lawfulBasis: 'Consent (NDPA s.25(1)(a)): you choose to message the bot.',
    retention: 'We do not store bot conversations. Messages are processed by Telegram and our AI provider to produce a reply.',
  },
  {
    activity: 'Website analytics',
    data: 'Pages visited, device and browser type, approximate location and an anonymised IP address.',
    purpose: 'To understand how the site is used and improve it.',
    lawfulBasis: 'Consent (NDPA s.25(1)(a)): only if you accept analytics cookies.',
    retention: '14 months in Google Analytics.',
  },
  {
    activity: 'Advertising measurement',
    data: 'Whether you arrived from one of our ads and whether you then contacted us.',
    purpose: 'To measure which ads are useful.',
    lawfulBasis: 'Consent (NDPA s.25(1)(a)): only if you accept advertising cookies.',
    retention: 'As set by Google Ads, up to 540 days.',
  },
  {
    activity: 'Site security and performance',
    data: 'Technical request data such as IP address and browser, processed by our hosting provider.',
    purpose: 'To deliver pages, protect the site from abuse and monitor performance.',
    lawfulBasis: 'Legitimate interests (NDPA s.25(1)(v)) in running a secure, working website.',
    retention: 'Short-term logs kept by the hosting provider.',
  },
];

export interface Processor {
  name: string;
  role: string;
  location: string;
}

export const PROCESSORS: Processor[] = [
  { name: 'Vercel', role: 'Website hosting and performance measurement', location: 'United States and global edge network' },
  { name: 'Supabase', role: 'Database, file storage and accounts', location: 'Cloud infrastructure outside Nigeria' },
  { name: 'Google', role: 'Analytics, advertising measurement and email (only with consent for analytics and ads)', location: 'United States' },
  { name: 'Groq', role: 'AI processing for the Telegram assistant and internal writing tools', location: 'United States' },
  { name: 'Telegram', role: 'Our channel and assistant, when you choose to use them', location: 'Outside Nigeria' },
  { name: 'WhatsApp (Meta)', role: 'Messaging, when you contact us on WhatsApp', location: 'Outside Nigeria' },
];

export interface CookieEntry {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  category: 'Essential' | 'Analytics' | 'Advertising';
}

export const COOKIES: CookieEntry[] = [
  { name: 'sb-* (auth)', provider: 'Cee Writing (Supabase)', purpose: 'Keeps staff and writers signed in to their dashboards.', duration: 'Session, refreshed while signed in', category: 'Essential' },
  { name: 'cee_consent', provider: 'Cee Writing', purpose: 'Remembers your cookie choices.', duration: 'Until you change it', category: 'Essential' },
  { name: 'user_currency', provider: 'Cee Writing', purpose: 'Remembers the currency you chose for prices.', duration: 'Until you clear it', category: 'Essential' },
  { name: 'tg_banner_dismissed_v2', provider: 'Cee Writing', purpose: 'Remembers that you closed the Telegram prompt.', duration: 'Browser session', category: 'Essential' },
  { name: '_ga, _ga_*', provider: 'Google Analytics', purpose: 'Distinguishes visitors to produce usage statistics.', duration: 'Up to 2 years', category: 'Analytics' },
  { name: '_gcl_*', provider: 'Google Ads', purpose: 'Links a visit to an ad you clicked, to measure ad results.', duration: 'Up to 90 days', category: 'Advertising' },
];

export const RIGHTS: Array<{ right: string; detail: string }> = [
  { right: 'Be informed', detail: 'Know what we collect, why, and who we share it with. This policy is how we do that.' },
  { right: 'Access', detail: 'Get a copy of the personal data we hold about you.' },
  { right: 'Rectification', detail: 'Ask us to correct data that is wrong or incomplete.' },
  { right: 'Erasure', detail: 'Ask us to delete your data where we no longer need it or you withdraw consent.' },
  { right: 'Restriction', detail: 'Ask us to pause using your data while a concern is resolved.' },
  { right: 'Data portability', detail: 'Receive data you gave us in a common, machine-readable format.' },
  { right: 'Object', detail: 'Object to processing based on our legitimate interests, and to direct marketing at any time.' },
  { right: 'Withdraw consent', detail: 'Withdraw consent at any time, as easily as you gave it. This does not affect processing already carried out.' },
  { right: 'Automated decisions', detail: 'Not be subject to decisions with legal or similarly significant effects made solely by automated means. Our scholarship readiness score is guidance only and does not decide anything about you.' },
  { right: 'Complain', detail: 'Complain to the Nigeria Data Protection Commission (NDPC) if you are unhappy with how we handle your data.' },
];

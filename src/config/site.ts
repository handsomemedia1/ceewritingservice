export const SITE_URL = 'https://ceewriting.com';
export const SITE_NAME = 'Cee Writing';
export const SITE_EMAIL = 'ceewritingservices@gmail.com';
export const SITE_PHONE = '+2349056752549';
export const WHATSAPP_URL = 'https://wa.me/2349056752549';
export const TELEGRAM_CHANNEL_URL = 'https://t.me/ceewritingservice';
export const DEFAULT_OG_IMAGE = '/images/og-default.png';

/** Public pages are cached and refreshed on this interval (seconds). */
export const CONTENT_REVALIDATE_SECONDS = 1800;

/** WhatsApp chat link with a pre-filled message, so visitors only have to tap Send. */
export function whatsappLink(message: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

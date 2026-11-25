/**
 * One source of truth for how a service's price is described. Visible text, structured data
 * and the AI feeds all use this, so search engines always see the same price visitors do.
 */

interface PricedService {
  price?: number | null;
  max_price?: number | null;
  currency?: string | null;
  pricing_type?: string | null;
  pricing_unit?: string | null;
}

export interface ServicePrice {
  low: number;
  high: number | null;
  currency: string;
  /** e.g. "1000 words" for per-unit pricing. */
  unit: string | null;
  /** Human-readable, e.g. "₦15,000 – ₦30,000" or "₦5,000 per 1,000 words". */
  label: string;
}

const SYMBOLS: Record<string, string> = { NGN: '₦', USD: '$', GBP: '£', EUR: '€' };

function money(amount: number, currency: string): string {
  return `${SYMBOLS[currency] ?? `${currency} `}${amount.toLocaleString('en-US')}`;
}

function formatUnit(unit: string): string {
  return unit.replace(/^(\d+)/, (n) => Number(n).toLocaleString('en-US'));
}

export function getServicePrice(service: PricedService): ServicePrice | null {
  const low = Number(service.price);
  if (!Number.isFinite(low) || low <= 0) return null;

  const currency = service.currency || 'NGN';
  const unit = service.pricing_type === 'per_unit' && service.pricing_unit ? service.pricing_unit : null;
  const highValue = Number(service.max_price);
  const high = !unit && Number.isFinite(highValue) && highValue > low ? highValue : null;

  const label = unit
    ? `${money(low, currency)} per ${formatUnit(unit)}`
    : high
      ? `${money(low, currency)} – ${money(high, currency)}`
      : money(low, currency);

  return { low, high, currency, unit, label };
}

/** schema.org offer that matches the visible price. */
export function priceOffer(price: ServicePrice, url: string) {
  if (price.unit) {
    const [quantity, ...unitWords] = price.unit.split(' ');
    return {
      '@type': 'Offer',
      url,
      priceCurrency: price.currency,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: price.low,
        priceCurrency: price.currency,
        referenceQuantity: { '@type': 'QuantitativeValue', value: Number(quantity) || 1, unitText: unitWords.join(' ') || price.unit },
      },
    };
  }
  if (price.high) {
    return { '@type': 'AggregateOffer', url, priceCurrency: price.currency, lowPrice: price.low, highPrice: price.high };
  }
  return { '@type': 'Offer', url, priceCurrency: price.currency, price: price.low };
}

/** A direct, quotable answer to "how much does it cost?" for search and AI assistants. */
export function priceAnswer(serviceName: string, price: ServicePrice): string {
  return `${serviceName} costs ${price.label} at Cee Writing. The exact price depends on length, complexity and deadline, and is confirmed with you before any work starts.`;
}

export type CurrencyCode = 'GHS' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  label: string;
  rateFromUSD: number; // Base prices in servicesData are in USD; convert cleanly to GHS, EUR, GBP
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  GHS: {
    code: 'GHS',
    symbol: 'GH₵',
    label: 'Ghana Cedi (GH₵)',
    rateFromUSD: 15.4,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    label: 'US Dollar ($)',
    rateFromUSD: 1,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    label: 'Euro (€)',
    rateFromUSD: 0.92,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    label: 'British Pound (£)',
    rateFromUSD: 0.79,
  },
};

export function formatCurrency(amountUSD: number, currency: CurrencyCode): string {
  const cfg = CURRENCIES[currency];
  const converted = Math.round(amountUSD * cfg.rateFromUSD);
  return `${cfg.symbol}${converted.toLocaleString()}`;
}

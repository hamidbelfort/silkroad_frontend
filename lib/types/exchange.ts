// types/exchange.ts

export interface ExchangeRate {
  id: string;
  basePrice: number;
  buyPrice: number;
  sellPrice: number;
  profitMargin: number;
  createdAt: string;
}

export interface ExchangeRateHistory {
  basePrice: number;
  createdAt: string;
}

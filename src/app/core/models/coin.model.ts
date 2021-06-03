export interface CoinListPayload {
  id: string;
  symbol: string;
  name: string;
}

export interface CoinMetadata { [key: string]: string };

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  usd: string;
  lastHour: number;
}

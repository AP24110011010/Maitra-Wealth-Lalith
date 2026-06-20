import { useQuery } from '@tanstack/react-query';

export function useGetStockDetails(symbol: string) {
  return useQuery({
    queryKey: ['stock', symbol],
    queryFn: async () => {
      return {
        symbol,
        name: `${symbol} Corp`,
        exchange: 'NSE',
        sector: 'Technology',
        currentPrice: 150.25,
        change: 2.5,
        changePercent: 1.6,
        open: 148.0,
        high: 152.0,
        low: 147.5,
        volume: 1200500,
        marketCap: 50000000000,
        pe: 25.4,
        eps: 5.9,
        weekHigh52: 180.0,
        weekLow52: 120.0,
        dividendYield: 1.2,
        bookValue: 45.0,
        roe: 15.5,
        about: 'A technology company that does technology things.'
      };
    }
  });
}

export function useGetChartData(symbol: string, period: string) {
  return useQuery({
    queryKey: ['chart', symbol, period],
    queryFn: async () => {
      return {
        candles: [
          { time: '10:00', close: 148 },
          { time: '11:00', close: 149 },
          { time: '12:00', close: 150 },
          { time: '13:00', close: 151 },
        ]
      };
    }
  });
}

export function useSearchStocks(query: { q: string }) {
  return useQuery({
    queryKey: ['search', query.q],
    queryFn: async () => {
      if (!query.q) return [];
      return [
        { symbol: 'AAPL', name: 'Apple Inc.', currentPrice: 150.25, change: 2.5, changePercent: 1.6 },
        { symbol: 'MSFT', name: 'Microsoft Corp.', currentPrice: 250.0, change: -1.5, changePercent: -0.6 }
      ];
    }
  });
}

export function useGetMarketMovers() {
  return useQuery({
    queryKey: ['movers'],
    queryFn: async () => {
      const stock = (sym: string, name: string, price: number, cp: number) => ({
        symbol: sym,
        name,
        currentPrice: price,
        changePercent: cp,
        change: price * (cp / 100)
      });
      return {
        gainers: [stock('TATA', 'Tata Motors', 500, 5.2), stock('RELIANCE', 'Reliance Ind', 2500, 3.1)],
        losers: [stock('HDFC', 'HDFC Bank', 1500, -2.1), stock('INFY', 'Infosys', 1200, -1.5)],
        mostActive: [stock('SBI', 'State Bank', 600, 1.2), stock('ITC', 'ITC Ltd', 400, 0.5)]
      };
    }
  });
}

export function useGetMarketIndices() {
  return useQuery({
    queryKey: ['indices'],
    queryFn: async () => {
      return [
        { name: 'NIFTY 50', value: 22000.5, change: 150.2, changePercent: 0.5 },
        { name: 'SENSEX', value: 72000.8, change: 500.5, changePercent: 0.8 },
        { name: 'BANKNIFTY', value: 46000.2, change: -120.5, changePercent: -0.3 }
      ];
    }
  });
}

import { useState, useEffect } from 'react';
import { getCompany } from '@/lib/mock-data/stocks';

type Timeframe = '1D' | '1W' | '1M' | '6M' | '1Y' | '5Y' | 'MAX';

export interface ChartDataPoint {
  label: string;
  price: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  timestamp: number;
}

interface UseStockDataResult {
  data: ChartDataPoint[];
  isLoading: boolean;
  isError: boolean;
  isFallback: boolean;
}

const CACHE: Record<string, ChartDataPoint[]> = {};

function formatSymbol(symbol: string) {
  if (!symbol.includes('.') && symbol !== 'AAPL' && symbol !== 'GOOGL') {
    return `${symbol}.NS`;
  }
  return symbol;
}

export function useStockData(symbol: string, timeframe: Timeframe): UseStockDataResult {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const fetchLive = async () => {
      setIsLoading(true);
      setIsError(false);
      setIsFallback(false);

      const cacheKey = `${symbol}-${timeframe}`;
      if (CACHE[cacheKey]) {
        setData(CACHE[cacheKey]);
        setIsLoading(false);
        return;
      }

      try {
        const querySymbol = formatSymbol(symbol);
        
        let interval = '1d';
        let range = '1mo';
        
        if (timeframe === '1D') {
          interval = '5m';
          range = '1d';
        } else if (timeframe === '1W') {
          interval = '15m';
          range = '5d';
        } else if (timeframe === '1M') {
          interval = '1d';
          range = '1mo';
        } else if (timeframe === '6M') {
          interval = '1d';
          range = '6mo';
        } else if (timeframe === '1Y') {
          interval = '1d';
          range = '1y';
        } else if (timeframe === '5Y') {
          interval = '1wk';
          range = '5y';
        } else {
          interval = '1mo';
          range = 'max';
        }

        const url = `/api/yahoo/v8/finance/chart/${querySymbol}?interval=${interval}&range=${range}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        const json = await response.json();
        const result = json.chart.result[0];
        
        if (!result.timestamp || !result.indicators.quote[0].close) {
          throw new Error('Invalid data format');
        }

        const timestamps: number[] = result.timestamp;
        const quotes = result.indicators.quote[0];
        
        const chartData: ChartDataPoint[] = [];
        
        for (let i = 0; i < timestamps.length; i++) {
          if (quotes.close[i] === null) continue;
          
          const date = new Date(timestamps[i] * 1000);
          let label = date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
          if (timeframe === '1D' || timeframe === '1W') {
            label = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
            if (timeframe === '1W') {
               label = `${date.toLocaleDateString('en-IN', { weekday: 'short' })} ${label}`;
            }
          }

          chartData.push({
            label,
            price: quotes.close[i],
            open: quotes.open[i] || quotes.close[i],
            high: quotes.high[i] || quotes.close[i],
            low: quotes.low[i] || quotes.close[i],
            close: quotes.close[i],
            volume: quotes.volume[i] || 0,
            timestamp: timestamps[i],
          });
        }

        if (isMounted) {
          CACHE[cacheKey] = chartData;
          setData(chartData);
          setIsLoading(false);
        }

      } catch (err) {
        console.warn("Failed to fetch live data, falling back to mock data", err);
        if (isMounted) {
          handleFallback();
        }
      }
    };

    const handleFallback = () => {
      setIsFallback(true);
      const company = getCompany(symbol);
      if (!company) {
        setIsError(true);
        setIsLoading(false);
        return;
      }

      let fallbackData: ChartDataPoint[] = [];

      if (timeframe === '1D') {
        const today = new Date();
        today.setHours(9, 15, 0, 0); // Indian market open
        fallbackData = company.intradayPrices.map((p, i) => ({
          label: p.time,
          price: p.price,
          open: p.open || p.price,
          high: p.high || p.price,
          low: p.low || p.price,
          close: p.close || p.price,
          volume: p.volume || 0,
          timestamp: Math.floor(today.getTime() / 1000) + (i * 300), // Approximate 5m increments
        }));
      } else {
        const daysMap: Record<string, number> = {
          '1W': 7, '1M': 30, '6M': 180, '1Y': 365, '5Y': 365, 'MAX': 365,
        };
        const days = daysMap[timeframe] || 30;
        const prices = company.historicalPrices;
        fallbackData = prices.slice(-days).map((p, i) => {
          const date = new Date(p.date);
          return {
            label: p.date,
            price: p.close,
            open: p.open || p.close,
            high: p.high || p.close,
            low: p.low || p.close,
            close: p.close,
            volume: p.volume || 0,
            timestamp: Math.floor(date.getTime() / 1000),
          };
        });
      }
      
      setData(fallbackData);
      setIsLoading(false);
    };

    fetchLive();

    return () => {
      isMounted = false;
    };
  }, [symbol, timeframe]);

  return { data, isLoading, isError, isFallback };
}

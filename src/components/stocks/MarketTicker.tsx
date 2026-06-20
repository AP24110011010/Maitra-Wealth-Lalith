import React, { useEffect, useState, useRef, useMemo } from 'react';
import { MarketDataProviderFactory } from '@/lib/services/MarketDataProvider';
import type { Company } from '@/lib/mock-data/stocks';

/**
 * Infinite horizontally-scrolling market ticker using pure CSS transforms.
 * Shows top stocks with price and change, scrolls seamlessly, pauses on hover.
 */
const MarketTicker: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const provider = MarketDataProviderFactory.create();
    provider.getAllCompanies().then(data => {
      // Pick the 15 most-active for the ticker
      const sorted = [...data].sort((a, b) => b.volume - a.volume).slice(0, 15);
      setCompanies(sorted);
    });
  }, []);

  // Indices to show alongside stocks
  const indices = useMemo(() => [
    { name: 'NIFTY 50', value: 24261.60, change: 112.40, pct: 0.47 },
    { name: 'SENSEX', value: 79958.00, change: 345.20, pct: 0.43 },
    { name: 'BANKNIFTY', value: 52360.20, change: -110.50, pct: -0.21 },
    { name: 'FINNIFTY', value: 23620.10, change: 42.80, pct: 0.18 },
  ], []);

  const tickerItems = useMemo(() => {
    const items = [
      ...indices.map(idx => ({
        symbol: idx.name,
        price: idx.value,
        change: idx.change,
        changePct: idx.pct,
        isIndex: true,
      })),
      ...companies.map(c => ({
        symbol: c.symbol,
        price: c.price,
        change: c.change,
        changePct: c.changePct,
        isIndex: false,
      })),
    ];
    // Triple for seamless infinite scroll
    return [...items, ...items, ...items];
  }, [companies, indices]);

  if (companies.length === 0) {
    return (
      <div className="w-full h-12 bg-[#0a1628] animate-pulse rounded" />
    );
  }

  return (
    <div
      ref={containerRef}
      className="ticker-container"
    >
      <div className="ticker-track">
        {tickerItems.map((item, idx) => (
          <div
            key={idx}
            className="ticker-item"
          >
            <span className={`ticker-symbol ${item.isIndex ? 'ticker-index' : ''}`}>
              {item.symbol}
            </span>
            <span className="ticker-price">
              ₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className={`ticker-change ${item.change >= 0 ? 'ticker-up' : 'ticker-down'}`}>
              {item.change >= 0 ? '▲' : '▼'} {Math.abs(item.change).toFixed(2)} ({Math.abs(item.changePct).toFixed(2)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(MarketTicker);

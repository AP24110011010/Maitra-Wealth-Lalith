import React, { useEffect, useState, useMemo } from 'react';
import StockSearch from '@/components/stocks/StockSearch';
import MarketTicker from '@/components/stocks/MarketTicker';
import TrendingSection from '@/components/stocks/TrendingSection';
import StocksTable from '@/components/stocks/StocksTable';
import { MarketDataProviderFactory } from '@/lib/services/MarketDataProvider';
import type { Company } from '@/lib/mock-data/stocks';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { MOCK_COMPANIES } from '@/lib/mock-data/stocks';
import { useLocation } from 'wouter';
import { Bookmark, Clock, BarChart3 } from 'lucide-react';

/**
 * /stocks landing page – Explore Markets.
 * Premium dark-themed page with ticker, search, trending sections,
 * watchlist, recently viewed, and sortable stock table.
 */
const StocksPage: React.FC = () => {
  const [trending, setTrending] = useState<Record<string, Company[]>>({});
  const [loading, setLoading] = useState(true);
  const { watchlist } = useWatchlist();
  const { recent } = useRecentlyViewed();
  const [, setLocation] = useLocation();

  useEffect(() => {
    const provider = MarketDataProviderFactory.create();
    const types = ['gainers', 'losers', 'mostActive'] as const;
    Promise.all(types.map(t => provider.getTrending(t))).then(results => {
      const map: Record<string, Company[]> = {};
      types.forEach((t, i) => (map[t] = results[i]));
      setTrending(map);
      setLoading(false);
    });
  }, []);

  const watchlistCompanies = useMemo(
    () => watchlist.map(sym => MOCK_COMPANIES.find(c => c.symbol === sym)).filter(Boolean) as Company[],
    [watchlist],
  );

  const recentCompanies = useMemo(
    () => recent.map(sym => MOCK_COMPANIES.find(c => c.symbol === sym)).filter(Boolean) as Company[],
    [recent],
  );

  return (
    <div className="explore-markets">
      {/* Market Ticker */}
      <MarketTicker />

      {/* Hero */}
      <section className="explore-hero border-b border-white/5 relative overflow-visible bg-[#030712] pt-6 pb-8 h-auto min-h-fit">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,107,0,0.08)_0%,transparent_50%),linear-gradient(180deg,transparent_0%,#030712_100%)] pointer-events-none"></div>
        
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-normal">
            Explore Markets
          </h1>
          <p className="text-[15px] text-slate-400 mb-6 max-w-xl">
            Track leading Indian stocks with real-time insights and market performance.
          </p>
          <div className="w-full max-w-2xl">
            <StockSearch />
          </div>
        </div>
      </section>

      <div className="explore-content">
        {/* Trending Sections */}
        {loading ? (
          <div className="trending-grid">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="trending-section-skeleton">
                <div className="skeleton-bar" style={{ width: '40%', height: 20, marginBottom: 16 }} />
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="skeleton-bar" style={{ height: 48, marginBottom: 8 }} />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="trending-grid">
            {Object.entries(trending).map(([type, list]) => {
              const titles: Record<string, string> = {
                gainers: 'Top Gainers',
                losers: 'Top Losers',
                mostActive: 'Most Active'
              };
              return (
                <TrendingSection
                  key={type}
                  type={type as any}
                  title={titles[type] || type}
                  companies={list}
                />
              );
            })}
          </div>
        )}

        {/* Watchlist */}
        {watchlistCompanies.length > 0 && (
          <section className="explore-section">
            <div className="explore-section-header">
              <Bookmark className="w-5 h-5 text-primary" />
              <h2>Your Watchlist</h2>
            </div>
            <div className="watchlist-grid">
              {watchlistCompanies.map(c => (
                <div
                  key={c.symbol}
                  className="watchlist-card"
                  onClick={() => setLocation(`/stocks/${c.symbol}`)}
                >
                  <div className="watchlist-badge">{c.symbol.substring(0, 2)}</div>
                  <div className="watchlist-info">
                    <span className="watchlist-symbol">{c.symbol}</span>
                    <span className="watchlist-price">₹{c.price.toFixed(2)}</span>
                  </div>
                  <span className={`watchlist-change ${c.changePct >= 0 ? 'positive' : 'negative'}`}>
                    {c.changePct >= 0 ? '+' : ''}{c.changePct.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentCompanies.length > 0 && (
          <section className="explore-section">
            <div className="explore-section-header">
              <Clock className="w-5 h-5 text-slate-400" />
              <h2>Recently Viewed</h2>
            </div>
            <div className="watchlist-grid">
              {recentCompanies.slice(0, 8).map(c => (
                <div
                  key={c.symbol}
                  className="watchlist-card"
                  onClick={() => setLocation(`/stocks/${c.symbol}`)}
                >
                  <div className="watchlist-badge">{c.symbol.substring(0, 2)}</div>
                  <div className="watchlist-info">
                    <span className="watchlist-symbol">{c.symbol}</span>
                    <span className="watchlist-price">₹{c.price.toFixed(2)}</span>
                  </div>
                  <span className={`watchlist-change ${c.changePct >= 0 ? 'positive' : 'negative'}`}>
                    {c.changePct >= 0 ? '+' : ''}{c.changePct.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Stocks Table */}
        <section className="explore-section">
          <div className="explore-section-header">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2>All Stocks</h2>
          </div>
          <StocksTable />
        </section>
      </div>
    </div>
  );
};

export default StocksPage;

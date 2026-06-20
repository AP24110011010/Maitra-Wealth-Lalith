import React, { useState, useMemo, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { ArrowLeft, Bookmark, BookmarkCheck, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  BarChart, Bar, PieChart, Pie, Cell, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { getCompany, MOCK_COMPANIES } from '@/lib/mock-data/stocks';
import type { Company } from '@/lib/mock-data/stocks';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import TradingViewChart from '@/components/stocks/TradingViewChart';
import CandlestickChartFallback from '@/components/stocks/CandlestickChartFallback';
import { ChevronDown, ChevronUp, LineChart, CandlestickChart } from 'lucide-react';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

const TIMEFRAMES = ['1D', '1W', '1M', '6M', '1Y', '5Y', 'MAX'] as const;
type Timeframe = (typeof TIMEFRAMES)[number];

const PIE_COLORS = ['#14E6C9', '#3B82F6', '#F59E0B', '#EF4444'];

function formatINR(n: number): string {
  if (n >= 1_00_00_00_00_000) return '₹' + (n / 1_00_00_00_00_000).toFixed(2) + ' L Cr';
  if (n >= 1_00_00_00_000) return '₹' + (n / 1_00_00_00_000).toFixed(2) + ' K Cr';
  if (n >= 1_00_00_000) return '₹' + (n / 1_00_00_000).toFixed(2) + ' Cr';
  return '₹' + n.toLocaleString('en-IN');
}

function formatVolume(vol: number) {
  if (vol >= 10_000_000) return (vol / 10_000_000).toFixed(2) + ' Cr';
  if (vol >= 100_000) return (vol / 100_000).toFixed(2) + ' L';
  if (vol >= 1_000) return (vol / 1_000).toFixed(1) + 'K';
  return vol.toString();
}

export default function StockDetails() {
  const [, params] = useRoute('/stocks/:symbol');
  const symbol = params?.symbol ? decodeURIComponent(params.symbol).toUpperCase() : 'RELIANCE';
  const [timeframe, setTimeframe] = useState<Timeframe>('1Y');
  const [chartMode, setChartMode] = useState<'line' | 'candles'>('line');
  const [activeTab, setActiveTab] = useState<'overview' | 'fundamentals' | 'financials' | 'shareholding' | 'about'>('overview');
  const [finToggle, setFinToggle] = useState<'quarterly' | 'annual'>('quarterly');
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const { toggle, isInWatchlist } = useWatchlist();
  const { add: addRecentlyViewed } = useRecentlyViewed();

  const company = useMemo(() => getCompany(symbol), [symbol]);

  // Track recently viewed
  useEffect(() => {
    if (company) addRecentlyViewed(company.symbol);
  }, [company, addRecentlyViewed]);

  if (!company) {
    return (
      <div className="detail-not-found">
        <h2>Stock Not Found</h2>
        <p>No data available for symbol "{symbol}".</p>
        <Link href="/stocks" className="detail-back-btn inline-block mt-4 text-[#14E6C9] hover:underline">
          ← Back to Markets
        </Link>
      </div>
    );
  }

  const isPositive = company.change >= 0;
  const watched = isInWatchlist(company.symbol);

  const [isChartLoading, setIsChartLoading] = useState(false);

  // Chart data filtered by timeframe
  const chartData = useMemo(() => {
    if (timeframe === '1D') {
      return company.intradayPrices.map(p => ({
        label: p.time,
        price: p.price,
        open: p.open || p.price,
        high: p.high || p.price,
        low: p.low || p.price,
        close: p.close || p.price,
        volume: p.volume || 0,
      }));
    }
    const prices = company.historicalPrices;
    const daysMap: Record<Timeframe, number> = {
      '1D': 1, '1W': 7, '1M': 30, '3M': 90, '6M': 180, '1Y': 365, '5Y': 365, 'MAX': 365,
    };
    const days = daysMap[timeframe];
    return prices.slice(-days).map(p => ({
      label: p.date,
      price: p.close,
      open: p.open,
      high: p.high,
      low: p.low,
      close: p.close,
      volume: p.volume,
    }));
  }, [company, timeframe]);

  // Simulate loading on timeframe change
  useEffect(() => {
    setIsChartLoading(true);
    const timer = setTimeout(() => setIsChartLoading(false), 300);
    return () => clearTimeout(timer);
  }, [timeframe]);

  // Financial data
  const financialData = useMemo(() => {
    const fin = company.financials;
    if (finToggle === 'annual') {
      // Aggregate quarterly to annual (sum by year)
      const years: Record<string, { revenue: number; netProfit: number; ebitda: number; eps: number; count: number }> = {};
      fin.revenue.forEach((r, i) => {
        const year = r.period.split(' ')[1];
        if (!years[year]) years[year] = { revenue: 0, netProfit: 0, ebitda: 0, eps: 0, count: 0 };
        years[year].revenue += r.value;
        years[year].netProfit += fin.netProfit[i]?.value || 0;
        years[year].ebitda += fin.ebitda[i]?.value || 0;
        years[year].eps += fin.epsHistory[i]?.value || 0;
        years[year].count++;
      });
      return Object.entries(years).map(([year, d]) => ({
        period: year,
        revenue: d.revenue,
        netProfit: d.netProfit,
        ebitda: d.ebitda,
        eps: parseFloat((d.eps / d.count).toFixed(2)),
      }));
    }
    return fin.revenue.map((r, i) => ({
      period: r.period,
      revenue: r.value,
      netProfit: fin.netProfit[i]?.value || 0,
      ebitda: fin.ebitda[i]?.value || 0,
      eps: fin.epsHistory[i]?.value || 0,
    }));
  }, [company, finToggle]);

  // Shareholding
  const shareholdingData = useMemo(
    () => [
      { name: 'Promoters', value: company.shareholding.promoter },
      { name: 'FIIs', value: company.shareholding.fii },
      { name: 'DIIs', value: company.shareholding.dii },
      { name: 'Public', value: company.shareholding.public },
    ],
    [company],
  );

  // Related stocks (same sector, excluding self)
  const relatedStocks = useMemo(
    () => MOCK_COMPANIES.filter(c => c.sector === company.sector && c.symbol !== company.symbol).slice(0, 6),
    [company],
  );

  const primaryMetrics = [
    { label: 'Open', value: `₹${company.open.toFixed(2)}` },
    { label: 'Prev Close', value: `₹${company.previousClose.toFixed(2)}` },
    { label: 'Day High', value: `₹${company.high.toFixed(2)}` },
    { label: 'Day Low', value: `₹${company.low.toFixed(2)}` },
    { label: '52W High', value: `₹${company.fiftyTwoWeekHigh.toFixed(2)}` },
    { label: '52W Low', value: `₹${company.fiftyTwoWeekLow.toFixed(2)}` },
    { label: 'Market Cap', value: formatINR(company.marketCap) },
    { label: 'P/E Ratio', value: company.peRatio.toFixed(2) },
  ];

  const secondaryMetrics = [
    { label: 'Volume', value: formatVolume(company.volume) },
    { label: 'EPS', value: `₹${company.eps.toFixed(2)}` },
    { label: 'ROE', value: `${company.roe.toFixed(2)}%` },
    { label: 'ROCE', value: `${company.roce.toFixed(2)}%` },
    { label: 'Dividend Yield', value: `${company.dividendYield.toFixed(2)}%` },
    { label: 'Book Value', value: `₹${company.bookValue.toFixed(2)}` },
    { label: 'Face Value', value: `₹${company.faceValue}` },
    { label: 'Debt/Equity', value: company.debtToEquity.toFixed(2) },
  ];

  const fundamentals = [...primaryMetrics, ...secondaryMetrics];

  return (
    <div className="detail-page">
      <div className="detail-container">
        {/* Breadcrumb */}
        <Link href="/stocks">
          <button className="detail-breadcrumb">
            <ArrowLeft className="w-4 h-4" /> Back to Markets
          </button>
        </Link>

        <div className="detail-grid">
          {/* Main Column */}
          <div className="detail-main">
            {/* Hero Section */}
            <div className="detail-hero">
              <h1 className="detail-company-name">{company.name} ({company.symbol})</h1>
              
              <div className="detail-price-section">
                <h2 className="detail-price">
                  ₹{company.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
                <div className={`detail-change ${isPositive ? 'positive' : 'negative'}`}>
                  {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  {isPositive ? '+' : ''}{company.change.toFixed(2)} ({isPositive ? '+' : ''}{company.changePct.toFixed(2)}%)
                </div>
              </div>

              <div className="detail-actions">
                <button className="detail-buy-btn">BUY</button>
                <button className="detail-sell-btn">SELL</button>
                <button
                  className={`detail-watchlist-btn ${watched ? 'active' : ''}`}
                  onClick={() => toggle(company.symbol)}
                >
                  {watched ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  {watched ? 'Watching' : 'Watchlist'}
                </button>
              </div>
            </div>

            {/* Chart Header Toggles */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex bg-[#0F172A] border border-white/10 rounded-lg p-1">
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    chartMode === 'line' ? 'bg-[#14E6C9]/20 text-[#14E6C9]' : 'text-slate-400 hover:text-white'
                  }`}
                  onClick={() => setChartMode('line')}
                >
                  <LineChart className="w-4 h-4" /> Line
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    chartMode === 'candles' ? 'bg-[#14E6C9]/20 text-[#14E6C9]' : 'text-slate-400 hover:text-white'
                  }`}
                  onClick={() => setChartMode('candles')}
                >
                  <CandlestickChart className="w-4 h-4" /> Candles
                </button>
              </div>
            </div>

            {/* Chart */}
            <div className="detail-chart-card">
              <ErrorBoundary>
                <TradingViewChart 
                symbol={company.symbol} 
                chartMode={chartMode}
                timeframe={timeframe}
                fallbackComponent={
                  <>
                    <div className="detail-timeframes">
                      {TIMEFRAMES.map(tf => (
                        <button
                          key={tf}
                          className={`detail-tf-btn ${timeframe === tf ? 'active' : ''}`}
                          onClick={() => setTimeframe(tf)}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>
                    <div className="detail-chart-area" style={{ height: '500px', position: 'relative' }}>
                      {isChartLoading && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0F172A]/80 backdrop-blur-sm rounded-xl">
                          <div className="w-8 h-8 border-4 border-[#14E6C9] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                      <CandlestickChartFallback data={chartData} mode={chartMode} />
                    </div>
                  </>
                } 
              />
              </ErrorBoundary>
            </div>

            {/* Tabs */}
            <div className="detail-tabs">
              {(['overview', 'fundamentals', 'financials', 'shareholding', 'about'] as const).map(tab => (
                <button
                  key={tab}
                  className={`detail-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="detail-tab-content">
              {activeTab === 'overview' && (
                <div className="detail-overview">
                  <div className="detail-fundamentals-grid">
                    {primaryMetrics.map(f => (
                      <div key={f.label} className="detail-metric">
                        <span className="detail-metric-label">{f.label}</span>
                        <span className="detail-metric-value">{f.value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="detail-more-details-wrapper">
                    <button 
                      className="detail-more-details-btn"
                      onClick={() => setShowMoreDetails(!showMoreDetails)}
                    >
                      {showMoreDetails ? 'Less Details' : 'More Details'}
                      {showMoreDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    
                    {showMoreDetails && (
                      <div className="detail-fundamentals-grid mt-4">
                        {secondaryMetrics.map(f => (
                          <div key={f.label} className="detail-metric">
                            <span className="detail-metric-label">{f.label}</span>
                            <span className="detail-metric-value">{f.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'fundamentals' && (
                <div className="detail-fundamentals">
                  {/* Performance bars */}
                  <div className="detail-perf-section">
                    <h3>Today's Range</h3>
                    <div className="detail-range-bar">
                      <div className="detail-range-labels">
                        <span>₹{company.low.toFixed(2)}</span>
                        <span>₹{company.high.toFixed(2)}</span>
                      </div>
                      <div className="detail-range-track">
                        <div
                          className="detail-range-marker"
                          style={{
                            left: `${((company.price - company.low) / (company.high - company.low)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="detail-perf-section">
                    <h3>52 Week Range</h3>
                    <div className="detail-range-bar">
                      <div className="detail-range-labels">
                        <span>₹{company.fiftyTwoWeekLow.toFixed(2)}</span>
                        <span>₹{company.fiftyTwoWeekHigh.toFixed(2)}</span>
                      </div>
                      <div className="detail-range-track">
                        <div
                          className="detail-range-marker"
                          style={{
                            left: `${((company.price - company.fiftyTwoWeekLow) / (company.fiftyTwoWeekHigh - company.fiftyTwoWeekLow)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="detail-fundamentals-grid">
                    {fundamentals.map(f => (
                      <div key={f.label} className="detail-metric">
                        <span className="detail-metric-label">{f.label}</span>
                        <span className="detail-metric-value">{f.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'financials' && (
                <div className="detail-financials">
                  <div className="detail-fin-toggle">
                    <button
                      className={finToggle === 'quarterly' ? 'active' : ''}
                      onClick={() => setFinToggle('quarterly')}
                    >
                      Quarterly
                    </button>
                    <button
                      className={finToggle === 'annual' ? 'active' : ''}
                      onClick={() => setFinToggle('annual')}
                    >
                      Annual
                    </button>
                  </div>

                  <div className="detail-fin-charts">
                    <div className="detail-fin-chart-card">
                      <h4>Revenue & Net Profit</h4>
                      <ErrorBoundary>
                        <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={financialData}>
                          <XAxis dataKey="period" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }}
                          />
                          <Bar dataKey="revenue" fill="#14E6C9" radius={[4, 4, 0, 0]} name="Revenue" />
                          <Bar dataKey="netProfit" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Net Profit" />
                        </BarChart>
                      </ResponsiveContainer>
                      </ErrorBoundary>
                    </div>
                    <div className="detail-fin-chart-card">
                      <h4>EBITDA & EPS</h4>
                      <ErrorBoundary>
                        <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={financialData}>
                          <XAxis dataKey="period" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }}
                          />
                          <Bar dataKey="ebitda" fill="#F59E0B" radius={[4, 4, 0, 0]} name="EBITDA" />
                          <Bar dataKey="eps" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="EPS" />
                        </BarChart>
                      </ResponsiveContainer>
                      </ErrorBoundary>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'shareholding' && (
                <div className="detail-shareholding">
                  <div className="detail-pie-wrapper">
                    <ErrorBoundary>
                      <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <Pie
                          data={shareholdingData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={130}
                          paddingAngle={3}
                          dataKey="value"
                          animationBegin={0}
                          animationDuration={1000}
                          label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                        >
                          {shareholdingData.map((_, idx) => (
                            <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend
                          verticalAlign="bottom"
                          iconType="circle"
                          formatter={(value) => <span style={{ color: '#E5E7EB' }}>{value}</span>}
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }}
                          formatter={(value: number) => [`${value.toFixed(2)}%`, '']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    </ErrorBoundary>
                  </div>
                  <div className="detail-sh-breakdown">
                    {shareholdingData.map((s, i) => (
                      <div key={s.name} className="detail-sh-item">
                        <div className="detail-sh-dot" style={{ backgroundColor: PIE_COLORS[i] }} />
                        <span className="detail-sh-name">{s.name}</span>
                        <span className="detail-sh-val">{s.value.toFixed(2)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'about' && (
                <div className="detail-about">
                  <h3>About {company.name}</h3>
                  <p>{company.description}</p>
                  <div className="detail-about-meta">
                    <div><strong>Sector:</strong> {company.sector}</div>
                    <div><strong>Industry:</strong> {company.industry}</div>
                    <div><strong>Exchange:</strong> NSE</div>
                    <div><strong>Face Value:</strong> ₹{company.faceValue}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Related Stocks */}
            {relatedStocks.length > 0 && (
              <div className="detail-related">
                <h3>Related Stocks in {company.sector}</h3>
                <div className="detail-related-grid">
                  {relatedStocks.map(s => (
                    <Link key={s.symbol} href={`/stocks/${s.symbol}`}>
                      <div className="detail-related-card">
                        <div className="detail-related-badge">{s.symbol.substring(0, 2)}</div>
                        <div className="detail-related-info">
                          <span className="detail-related-symbol">{s.symbol}</span>
                          <span className="detail-related-price">₹{s.price.toFixed(2)}</span>
                        </div>
                        <span className={`detail-related-change ${s.changePct >= 0 ? 'positive' : 'negative'}`}>
                          {s.changePct >= 0 ? '+' : ''}{s.changePct.toFixed(2)}%
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="detail-sidebar">
            {/* Key Metrics */}
            <div className="detail-sidebar-card">
              <h3>Key Metrics</h3>
              <div className="detail-sidebar-metrics">
                {fundamentals.slice(0, 10).map(f => (
                  <div key={f.label} className="detail-sidebar-metric">
                    <span>{f.label}</span>
                    <span>{f.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Range */}
            <div className="detail-sidebar-card">
              <h3>Performance</h3>
              <div className="detail-range-bar" style={{ marginBottom: 16 }}>
                <div className="detail-range-labels">
                  <span className="text-xs">Day Low: ₹{company.low.toFixed(2)}</span>
                  <span className="text-xs">Day High: ₹{company.high.toFixed(2)}</span>
                </div>
                <div className="detail-range-track">
                  <div
                    className="detail-range-marker"
                    style={{
                      left: `${Math.min(100, Math.max(0, ((company.price - company.low) / (company.high - company.low)) * 100))}%`,
                    }}
                  />
                </div>
              </div>
              <div className="detail-range-bar">
                <div className="detail-range-labels">
                  <span className="text-xs">52W Low: ₹{company.fiftyTwoWeekLow.toFixed(2)}</span>
                  <span className="text-xs">52W High: ₹{company.fiftyTwoWeekHigh.toFixed(2)}</span>
                </div>
                <div className="detail-range-track">
                  <div
                    className="detail-range-marker"
                    style={{
                      left: `${Math.min(100, Math.max(0, ((company.price - company.fiftyTwoWeekLow) / (company.fiftyTwoWeekHigh - company.fiftyTwoWeekLow)) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

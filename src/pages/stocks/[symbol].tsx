import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useRoute, Link } from 'wouter';
import { ArrowLeft, Bookmark, BookmarkCheck, ChevronDown, ChevronUp, LineChart, CandlestickChart, Info } from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, Cell, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, CartesianGrid, ReferenceLine
} from 'recharts';
import { getCompany, MOCK_COMPANIES } from '@/lib/mock-data/stocks';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import CandlestickChartFallback from '@/components/stocks/CandlestickChartFallback';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { useStockData } from '@/hooks/useStockData';
import VoiceGuide, { VoiceGuideRef } from '@/components/stocks/VoiceGuide';

const TIMEFRAMES = ['1D', '1W', '1M', '6M', '1Y', '5Y', 'MAX'] as const;
type Timeframe = (typeof TIMEFRAMES)[number];

const PIE_COLORS = ['#14E6C9', '#3B82F6', '#F59E0B', '#EF4444'];

function formatINR(n: number | undefined): string {
  if (typeof n !== 'number') return 'N/A';
  if (n >= 1_00_00_00_00_000) return '₹' + (n / 1_00_00_00_00_000).toFixed(2) + ' L Cr';
  if (n >= 1_00_00_00_000) return '₹' + (n / 1_00_00_00_000).toFixed(2) + ' K Cr';
  if (n >= 1_00_00_000) return '₹' + (n / 1_00_00_000).toFixed(2) + ' Cr';
  return '₹' + n.toLocaleString('en-IN');
}

function formatVolume(vol: number | undefined) {
  if (typeof vol !== 'number') return 'N/A';
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
  const voiceGuideRef = useRef<VoiceGuideRef>(null);

  const company = useMemo(() => getCompany(symbol), [symbol]);

  // Track recently viewed safely
  useEffect(() => {
    if (company?.symbol) {
      addRecentlyViewed(company.symbol);
    }
  }, [company?.symbol, addRecentlyViewed]);

  const { data: chartData, isLoading: isChartLoading, isFallback } = useStockData(symbol, timeframe);

  // Voice Guide timeframe announcement
  const initialMount = useRef(true);
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }
    
    let timeframeSummary = '';
    switch(timeframe) {
      case '1D': timeframeSummary = "Today's trading session shows moderate momentum."; break;
      case '1W': timeframeSummary = "The stock has remained relatively stable during the past week."; break;
      case '1M': timeframeSummary = "The stock has experienced moderate fluctuations over the last month."; break;
      case '6M': timeframeSummary = "The medium-term trend indicates sustained movement with periodic corrections."; break;
      case '1Y': timeframeSummary = "The long-term trend remains positive despite normal market volatility."; break;
      case '5Y': timeframeSummary = "The 5-year outlook demonstrates significant structural performance."; break;
      case 'MAX': timeframeSummary = "The maximum historical timeframe shows the complete market lifecycle."; break;
    }
    
    try {
      voiceGuideRef.current?.announce(timeframeSummary);
    } catch (e) {
      console.error("Voice Guide announcement failed:", e);
    }
  }, [timeframe]);

  // Financial data memoized safely
  const financialData = useMemo(() => {
    if (!company?.financials) return [];
    try {
      const fin = company.financials;
      if (finToggle === 'annual') {
        const years: Record<string, { revenue: number; netProfit: number; ebitda: number; eps: number; count: number }> = {};
        fin.revenue?.forEach((r, i) => {
          const year = r?.period?.split(' ')[1] || 'Unknown';
          if (!years[year]) years[year] = { revenue: 0, netProfit: 0, ebitda: 0, eps: 0, count: 0 };
          years[year].revenue += r?.value || 0;
          years[year].netProfit += fin.netProfit?.[i]?.value || 0;
          years[year].ebitda += fin.ebitda?.[i]?.value || 0;
          years[year].eps += fin.epsHistory?.[i]?.value || 0;
          years[year].count++;
        });
        return Object.entries(years).map(([year, d]) => ({
          period: year,
          revenue: d.revenue,
          netProfit: d.netProfit,
          ebitda: d.ebitda,
          eps: d.count > 0 ? parseFloat((d.eps / d.count).toFixed(2)) : 0,
        }));
      }
      return fin.revenue?.map((r, i) => ({
        period: r?.period || '',
        revenue: r?.value || 0,
        netProfit: fin.netProfit?.[i]?.value || 0,
        ebitda: fin.ebitda?.[i]?.value || 0,
        eps: fin.epsHistory?.[i]?.value || 0,
      })) || [];
    } catch (e) {
      return [];
    }
  }, [company?.financials, finToggle]);

  // Shareholding memoized safely
  const shareholdingData = useMemo(() => {
    if (!company?.shareholding) return [];
    return [
      { name: 'Promoters', value: company.shareholding.promoter || 0 },
      { name: 'FIIs', value: company.shareholding.fii || 0 },
      { name: 'DIIs', value: company.shareholding.dii || 0 },
      { name: 'Public', value: company.shareholding.public || 0 },
    ];
  }, [company?.shareholding]);

  // Related stocks memoized safely
  const relatedStocks = useMemo(() => {
    if (!company?.sector) return [];
    return MOCK_COMPANIES.filter(c => c.sector === company.sector && c.symbol !== company.symbol).slice(0, 6);
  }, [company?.sector, company?.symbol]);

  // --- EARLY RETURN AFTER HOOKS ---
  if (!company) {
    return (
      <div className="detail-not-found flex flex-col items-center justify-center pt-[150px] min-h-[500px]">
        <h2 className="text-2xl font-bold text-white mb-2">Stock Not Found</h2>
        <p className="text-slate-400">No data available for symbol "{symbol}".</p>
        <Link href="/stocks" className="inline-block mt-6 text-[#14E6C9] hover:underline px-6 py-2 border border-[#14E6C9]/20 rounded-full bg-[#14E6C9]/10">
          ← Back to Markets
        </Link>
      </div>
    );
  }

  // Derived properties safely
  const change = company.change ?? 0;
  const changePct = company.changePct ?? 0;
  const price = company.price ?? 0;
  const isPositive = change >= 0;
  const watched = isInWatchlist(company.symbol);

  const primaryMetrics = [
    { label: 'Open', value: `₹${(company.open ?? 0).toFixed(2)}` },
    { label: 'Prev Close', value: `₹${(company.previousClose ?? 0).toFixed(2)}` },
    { label: 'Day High', value: `₹${(company.high ?? 0).toFixed(2)}` },
    { label: 'Day Low', value: `₹${(company.low ?? 0).toFixed(2)}` },
    { label: '52W High', value: `₹${(company.fiftyTwoWeekHigh ?? 0).toFixed(2)}` },
    { label: '52W Low', value: `₹${(company.fiftyTwoWeekLow ?? 0).toFixed(2)}` },
    { label: 'Market Cap', value: formatINR(company.marketCap) },
    { label: 'P/E Ratio', value: (company.peRatio ?? 0).toFixed(2) },
  ];

  const secondaryMetrics = [
    { label: 'Volume', value: formatVolume(company.volume) },
    { label: 'EPS', value: `₹${(company.eps ?? 0).toFixed(2)}` },
    { label: 'ROE', value: `${(company.roe ?? 0).toFixed(2)}%` },
    { label: 'ROCE', value: `${(company.roce ?? 0).toFixed(2)}%` },
    { label: 'Dividend Yield', value: `${(company.dividendYield ?? 0).toFixed(2)}%` },
    { label: 'Book Value', value: `₹${(company.bookValue ?? 0).toFixed(2)}` },
    { label: 'Face Value', value: `₹${company.faceValue ?? 10}` },
    { label: 'Debt/Equity', value: (company.debtToEquity ?? 0).toFixed(2) },
  ];

  const fundamentals = [...primaryMetrics, ...secondaryMetrics];

  return (
    <ErrorBoundary>
      <div className="detail-page min-h-screen pb-16 bg-[#030712]">
        <div className="max-w-[1450px] mx-auto">
          {/* Sticky Header */}
          <div className="sticky top-[64px] z-[60] bg-[#030712]/95 backdrop-blur-xl border-b border-white/5 py-2 mb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-8">
            <Link href="/stocks">
              <button className="text-[12px] font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1 mb-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Markets
              </button>
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 lg:gap-4">
              <div className="flex items-baseline gap-3">
                <h1 className="text-[28px] leading-none font-bold text-white tracking-tight">
                  {company.name ?? "Unknown"} <span className="text-[18px] text-slate-400 font-medium tracking-normal ml-1">({company.symbol})</span>
                </h1>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-1">
                <div className="detail-price-section flex items-baseline gap-3">
                  <h2 className="text-[34px] leading-none font-bold text-white tracking-tight">
                    ₹{price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h2>
                  <div className={`flex items-center gap-1 font-semibold px-2 py-0.5 rounded text-[13px] ${isPositive ? 'text-[#10B981] bg-[#10B981]/10' : 'text-[#EF4444] bg-[#EF4444]/10'}`}>
                    {isPositive ? '▲' : '▼'} {Math.abs(change).toFixed(2)} ({isPositive ? '+' : ''}{changePct.toFixed(2)}%)
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button className="bg-[#10B981] hover:bg-[#0ea5e9] text-white px-5 py-1.5 rounded-lg text-[13px] font-semibold transition-colors">
                    BUY
                  </button>
                  <button className="bg-[#EF4444]/10 border border-[#EF4444]/20 hover:bg-[#EF4444]/20 text-[#EF4444] px-5 py-1.5 rounded-lg text-[13px] font-semibold transition-colors">
                    SELL
                  </button>
                  <button
                    className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors border ${watched ? 'bg-[#14E6C9]/10 border-[#14E6C9]/20 text-[#14E6C9]' : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
                    onClick={() => toggle(company.symbol)}
                    title={watched ? "Remove from Watchlist" : "Add to Watchlist"}
                  >
                    {watched ? <BookmarkCheck className="w-[16px] h-[16px]" /> : <Bookmark className="w-[16px] h-[16px]" />}
                  </button>
                  <VoiceGuide ref={voiceGuideRef} company={company} timeframe={timeframe} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8">
            {/* Main Column */}
            <div className="flex-1 min-w-0">
              {/* Unified Chart Area */}
              <div className="w-full mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
                    {TIMEFRAMES.map(tf => (
                      <button
                        key={tf}
                        onClick={() => setTimeframe(tf)}
                        className={`px-3.5 py-1 rounded-full text-[12px] font-semibold transition-colors border ${
                          timeframe === tf 
                            ? 'bg-[#14E6C9]/10 border-[#14E6C9]/20 text-[#14E6C9]' 
                            : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>

                  <div className="flex bg-[#0F172A] border border-white/5 rounded-full p-0.5 shrink-0">
                    <button
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium transition-colors ${
                        chartMode === 'line' ? 'bg-[#14E6C9] text-[#030712]' : 'text-slate-400 hover:text-white'
                      }`}
                      onClick={() => setChartMode('line')}
                    >
                      <LineChart className="w-3.5 h-3.5" /> Line
                    </button>
                    <button
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium transition-colors ${
                        chartMode === 'candles' ? 'bg-[#14E6C9] text-[#030712]' : 'text-slate-400 hover:text-white'
                      }`}
                      onClick={() => setChartMode('candles')}
                    >
                      <CandlestickChart className="w-3.5 h-3.5" /> Candles
                    </button>
                  </div>
                </div>

                <div className="h-[300px] sm:h-[360px] lg:h-[420px] w-full bg-[#0F172A]/80 rounded-xl border border-white/5 p-4 sm:p-5 relative">
                  <ErrorBoundary>
                    {isFallback && (
                      <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-[#0F172A]/80 border border-amber-500/20 backdrop-blur-md rounded-full">
                        <Info className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-[11px] font-medium text-amber-200">Using cached data</span>
                      </div>
                    )}
                    
                    {isChartLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#0F172A]/80 z-10 rounded-xl backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-8 h-8 border-4 border-[#14E6C9]/20 border-t-[#14E6C9] rounded-full animate-spin"></div>
                          <span className="text-sm font-medium text-slate-400">Loading market data...</span>
                        </div>
                      </div>
                    )}

                    {!isChartLoading && (!chartData || chartData.length === 0) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#0F172A] z-10 rounded-xl flex-col gap-3">
                        <Info className="w-8 h-8 text-slate-500" />
                        <span className="text-sm font-medium text-slate-400">No chart data available</span>
                      </div>
                    )}

                    {!isChartLoading && chartData && chartData.length > 0 && chartMode === 'line' && (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={isPositive ? '#10B981' : '#EF4444'} stopOpacity={0.3} />
                              <stop offset="95%" stopColor={isPositive ? '#10B981' : '#EF4444'} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis
                            dataKey={timeframe === '1D' ? 'time' : 'date'}
                            stroke="rgba(255,255,255,0.4)"
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            minTickGap={30}
                          />
                          <YAxis
                            domain={['auto', 'auto']}
                            stroke="rgba(255,255,255,0.4)"
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(val) => `₹${val}`}
                            width={60}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#0F172A',
                              border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '8px',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
                              color: '#fff',
                            }}
                            itemStyle={{ color: '#fff' }}
                            formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Price']}
                            labelStyle={{ color: '#94A3B8', marginBottom: '4px' }}
                          />
                          <ReferenceLine
                            y={timeframe === '1D' ? (company.previousClose ?? 0) : chartData[0]?.close}
                            stroke="rgba(255,255,255,0.2)"
                            strokeDasharray="3 3"
                          />
                          <Area
                            type="monotone"
                            dataKey="close"
                            stroke={isPositive ? '#10B981' : '#EF4444'}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                            isAnimationActive={false}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}

                    {!isChartLoading && chartData && chartData.length > 0 && chartMode === 'candles' && (
                      <CandlestickChartFallback data={chartData} isPositive={isPositive} />
                    )}
                  </ErrorBoundary>
                </div>
              </div>

              {/* Tabs */}
              <div className="w-full">
                <div className="flex gap-5 border-b border-white/10 mb-5 overflow-x-auto scrollbar-hide whitespace-nowrap">
                  {['overview', 'fundamentals', 'financials', 'shareholding', 'about'].map(tab => (
                    <button
                      key={tab}
                      className={`pb-2.5 text-[13px] font-semibold transition-colors relative ${activeTab === tab ? 'text-[#14E6C9]' : 'text-slate-400 hover:text-slate-200'}`}
                      onClick={() => setActiveTab(tab as any)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {activeTab === tab && (
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#14E6C9] rounded-t-full"></div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="tab-content min-h-[300px]">
                  {activeTab === 'overview' && (
                    <div className="space-y-5">
                      <p className="text-slate-300 leading-relaxed text-[14px]">
                        {showMoreDetails ? company.description : `${(company.description || '').substring(0, 150)}...`}
                        <button className="text-[#14E6C9] ml-2 hover:underline font-medium" onClick={() => setShowMoreDetails(!showMoreDetails)}>
                          {showMoreDetails ? 'Read Less' : 'Read More'}
                        </button>
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {fundamentals.slice(0, 8).map(m => (
                          <div key={m.label} className="bg-[#0F172A]/80 p-3.5 rounded-lg border border-white/5 flex flex-col gap-1">
                            <span className="text-slate-400 text-[11px] uppercase tracking-wider">{m.label}</span>
                            <span className="text-white font-medium text-[14px]">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'fundamentals' && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {fundamentals.map(m => (
                        <div key={m.label} className="bg-[#0F172A]/80 p-3.5 rounded-lg border border-white/5 flex flex-col gap-1">
                          <span className="text-slate-400 text-[11px] uppercase tracking-wider">{m.label}</span>
                          <span className="text-white font-medium text-[14px]">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'financials' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-[15px] font-bold text-white">Revenue & Profit</h3>
                        <div className="flex bg-[#0F172A] border border-white/5 rounded-lg p-0.5">
                          <button
                            className={`px-3 py-1 rounded-md text-[12px] font-medium transition-all ${
                              finToggle === 'quarterly' ? 'bg-[#14E6C9] text-[#030712]' : 'text-slate-400 hover:text-white'
                            }`}
                            onClick={() => setFinToggle('quarterly')}
                          >
                            Quarterly
                          </button>
                          <button
                            className={`px-3 py-1 rounded-md text-[12px] font-medium transition-all ${
                              finToggle === 'annual' ? 'bg-[#14E6C9] text-[#030712]' : 'text-slate-400 hover:text-white'
                            }`}
                            onClick={() => setFinToggle('annual')}
                          >
                            Annual
                          </button>
                        </div>
                      </div>
                      <div className="h-[280px] w-full bg-[#0F172A]/80 rounded-xl p-4 border border-white/5">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={financialData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="period" stroke="rgba(255,255,255,0.4)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis stroke="rgba(255,255,255,0.4)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${(val/1000).toFixed(0)}k`} />
                            <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            <Bar dataKey="revenue" name="Revenue (Cr)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="netProfit" name="Net Profit (Cr)" fill="#10B981" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {activeTab === 'shareholding' && (
                    <div className="flex flex-col md:flex-row gap-8 items-center justify-center p-6 bg-[#0F172A] rounded-xl border border-white/5">
                      <div className="h-[250px] w-full md:w-1/2">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={shareholdingData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={2}
                              dataKey="value"
                              stroke="none"
                            >
                              {shareholdingData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} formatter={(value: number) => [`${value}%`, 'Holding']} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="w-full md:w-1/2 space-y-4">
                        {shareholdingData.map((item, i) => (
                          <div key={item.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}></div>
                              <span className="font-medium text-slate-200">{item.name}</span>
                            </div>
                            <span className="font-bold text-white">{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'about' && (
                    <div className="space-y-4">
                      <div className="bg-[#0F172A]/80 p-5 rounded-xl border border-white/5">
                        <h3 className="text-[16px] font-bold mb-3 text-white">About {company.name ?? "Company"}</h3>
                        <p className="text-slate-300 leading-relaxed text-[14px]">{company.description ?? "No description available."}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-[#0F172A]/80 p-4 rounded-xl border border-white/5">
                          <span className="text-slate-400 text-[12px] block mb-1">Sector</span>
                          <span className="text-white font-medium text-[15px]">{company.sector ?? "Unknown"}</span>
                        </div>
                        <div className="bg-[#0F172A]/80 p-4 rounded-xl border border-white/5">
                          <span className="text-slate-400 text-[12px] block mb-1">Industry</span>
                          <span className="text-white font-medium text-[15px]">{company.industry ?? "Unknown"}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-[320px] shrink-0">
              <div className="bg-[#0F172A]/80 rounded-xl border border-white/5 p-5 mb-5 sticky top-[150px]">
                <h3 className="text-[15px] font-bold text-white mb-4">Key Metrics</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-[11px] uppercase tracking-wider mb-0.5">P/E Ratio</span>
                    <span className="text-white font-medium text-[14px]">{(company.peRatio ?? 0).toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-[11px] uppercase tracking-wider mb-0.5">Market Cap</span>
                    <span className="text-white font-medium text-[14px]">{formatINR(company.marketCap)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-[11px] uppercase tracking-wider mb-0.5">Div Yield</span>
                    <span className="text-white font-medium text-[14px]">{(company.dividendYield ?? 0).toFixed(2)}%</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-[11px] uppercase tracking-wider mb-0.5">Book Value</span>
                    <span className="text-white font-medium text-[14px]">₹{(company.bookValue ?? 0).toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-[11px] uppercase tracking-wider mb-0.5">52W High</span>
                    <span className="text-[#10B981] font-medium text-[14px]">₹{(company.fiftyTwoWeekHigh ?? 0).toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-[11px] uppercase tracking-wider mb-0.5">52W Low</span>
                    <span className="text-[#EF4444] font-medium text-[14px]">₹{(company.fiftyTwoWeekLow ?? 0).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-3">Similar Stocks</h3>
                  <div className="flex flex-col gap-2">
                    {relatedStocks.map(s => (
                      <Link key={s.symbol} href={`/stocks/${s.symbol}`}>
                        <div className="cursor-pointer hover:bg-white/[0.08] transition-colors p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-[13px] text-white">{s.symbol}</span>
                            <span className="font-semibold text-white text-[13px]">₹{(s.price ?? 0).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-slate-400 truncate max-w-[120px]">{s.name ?? "Unknown"}</span>
                            <span className={(s.changePct ?? 0) >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}>
                              {(s.changePct ?? 0) >= 0 ? '+' : ''}{(s.changePct ?? 0).toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

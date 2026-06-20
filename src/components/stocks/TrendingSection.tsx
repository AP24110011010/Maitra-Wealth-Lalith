import React from 'react';
import type { Company } from '@/lib/mock-data/stocks';
import { useLocation } from 'wouter';
import { TrendingUp, TrendingDown, Activity, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface TrendingSectionProps {
  title: string;
  type: 'gainers' | 'losers' | 'mostActive' | '52wHigh' | '52wLow';
  companies: Company[];
}

const ICONS: Record<string, React.ReactNode> = {
  gainers: <TrendingUp className="w-5 h-5 text-green-400" />,
  losers: <TrendingDown className="w-5 h-5 text-red-400" />,
  mostActive: <Activity className="w-5 h-5 text-blue-400" />,
  '52wHigh': <ArrowUpCircle className="w-5 h-5 text-emerald-400" />,
  '52wLow': <ArrowDownCircle className="w-5 h-5 text-orange-400" />,
};

const TITLES: Record<string, string> = {
  gainers: 'Top Gainers',
  losers: 'Top Losers',
  mostActive: 'Most Active',
  '52wHigh': '52 Week High',
  '52wLow': '52 Week Low',
};

/**
 * Displays a trending section (Gainers, Losers, Most Active, 52W High/Low).
 * Each stock card is clickable and navigates to its detail page.
 */
const TrendingSection: React.FC<TrendingSectionProps> = ({ type, companies }) => {
  const [, setLocation] = useLocation();

  const formatVolume = (vol: number) => {
    if (vol >= 10_000_000) return (vol / 10_000_000).toFixed(1) + 'Cr';
    if (vol >= 100_000) return (vol / 100_000).toFixed(1) + 'L';
    if (vol >= 1_000) return (vol / 1_000).toFixed(1) + 'K';
    return vol.toString();
  };

  return (
    <div className="trending-section">
      <div className="trending-header">
        {ICONS[type]}
        <h3>{TITLES[type] || type}</h3>
      </div>
      <div className="trending-list">
        {companies.slice(0, 5).map(c => (
          <div
            key={c.symbol}
            className="trending-card"
            onClick={() => setLocation(`/stocks/${c.symbol}`)}
          >
            <div className="trending-card-left">
              <div className="trending-badge">
                {c.symbol.substring(0, 2)}
              </div>
              <div className="trending-info">
                <span className="trending-symbol">{c.symbol}</span>
                <span className="trending-name">{c.name.length > 20 ? c.name.substring(0, 20) + '…' : c.name}</span>
              </div>
            </div>
            <div className="trending-card-right">
              <span className="trending-price">₹{c.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span className={`trending-change ${c.changePct >= 0 ? 'positive' : 'negative'}`}>
                {c.changePct >= 0 ? '+' : ''}{c.changePct.toFixed(2)}%
              </span>
              {type === 'mostActive' && (
                <span className="trending-volume">Vol: {formatVolume(c.volume)}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(TrendingSection);

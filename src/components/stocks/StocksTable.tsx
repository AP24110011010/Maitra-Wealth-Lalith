import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useLocation } from 'wouter';
import { MarketDataProviderFactory } from '@/lib/services/MarketDataProvider';
import type { Company } from '@/lib/mock-data/stocks';
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

type SortKey = 'symbol' | 'name' | 'price' | 'changePct' | 'volume' | 'marketCap' | 'peRatio' | 'sector';

const PAGE_SIZE = 15;

/**
 * Premium sortable stock table with:
 * - Sticky header
 * - Hover effects
 * - Skeleton loading
 * - Pagination
 * - Responsive horizontal scroll on mobile
 */
const StocksTable: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>('marketCap');
  const [asc, setAsc] = useState(false);
  const [page, setPage] = useState(0);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const provider = MarketDataProviderFactory.create();
    provider.getAllCompanies().then(data => {
      setCompanies(data);
      setLoading(false);
    });
  }, []);

  const sorted = useMemo(() => {
    const copy = [...companies];
    copy.sort((a, b) => {
      const av = a[sortKey] as any;
      const bv = b[sortKey] as any;
      if (typeof av === 'number' && typeof bv === 'number') {
        return asc ? av - bv : bv - av;
      }
      return asc
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return copy;
  }, [companies, sortKey, asc]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paged = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const toggleSort = useCallback((key: SortKey) => {
    setSortKey(prev => {
      if (prev === key) {
        setAsc(a => !a);
        return prev;
      }
      setAsc(key === 'symbol' || key === 'name' || key === 'sector');
      return key;
    });
    setPage(0);
  }, []);

  const formatMarketCap = (mc: number) => {
    if (mc >= 1_00_00_00_00_000) return '₹' + (mc / 1_00_00_00_00_000).toFixed(2) + 'L Cr';
    if (mc >= 1_00_00_00_000) return '₹' + (mc / 1_00_00_00_000).toFixed(2) + 'K Cr';
    if (mc >= 1_00_00_000) return '₹' + (mc / 1_00_00_000).toFixed(2) + 'Cr';
    return '₹' + mc.toLocaleString('en-IN');
  };

  const formatVolume = (vol: number) => {
    if (vol >= 10_000_000) return (vol / 10_000_000).toFixed(2) + 'Cr';
    if (vol >= 100_000) return (vol / 100_000).toFixed(2) + 'L';
    if (vol >= 1_000) return (vol / 1_000).toFixed(1) + 'K';
    return vol.toString();
  };

  const SortHeader: React.FC<{ label: string; field: SortKey; align?: string }> = ({ label, field, align = 'left' }) => (
    <th
      className={`stocks-th ${align === 'right' ? 'text-right' : 'text-left'}`}
      onClick={() => toggleSort(field)}
    >
      <span className="stocks-th-inner">
        {label}
        <ArrowUpDown className={`w-3 h-3 ${sortKey === field ? 'text-[#14E6C9]' : 'text-slate-600'}`} />
      </span>
    </th>
  );

  return (
    <div className="stocks-table-wrapper">
      <div className="stocks-table-header">
        <h2>All Stocks</h2>
        <span className="stocks-table-count">{companies.length} companies</span>
      </div>

      <div className="stocks-table-scroll">
        <table className="stocks-table">
          <thead>
            <tr>
              <th className="stocks-th text-left" style={{ width: 40 }}>#</th>
              <SortHeader label="Symbol" field="symbol" />
              <SortHeader label="Company" field="name" />
              <SortHeader label="Sector" field="sector" />
              <SortHeader label="Price" field="price" align="right" />
              <SortHeader label="Change %" field="changePct" align="right" />
              <SortHeader label="Volume" field="volume" align="right" />
              <SortHeader label="Market Cap" field="marketCap" align="right" />
              <SortHeader label="P/E" field="peRatio" align="right" />
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <tr key={i} className="stocks-row-skeleton">
                    {Array.from({ length: 9 }).map((_, j) => (
                      <td key={j} className="stocks-td">
                        <div className="skeleton-bar" />
                      </td>
                    ))}
                  </tr>
                ))
              : paged.map((c, i) => (
                  <tr
                    key={c.symbol}
                    className="stocks-row"
                    onClick={() => setLocation(`/stocks/${c.symbol}`)}
                  >
                    <td className="stocks-td text-slate-500">{page * PAGE_SIZE + i + 1}</td>
                    <td className="stocks-td">
                      <div className="stocks-symbol-cell">
                        <div className="stocks-badge">{c.symbol.substring(0, 2)}</div>
                        <span className="stocks-symbol">{c.symbol}</span>
                      </div>
                    </td>
                    <td className="stocks-td stocks-name">{c.name}</td>
                    <td className="stocks-td stocks-sector">{c.sector}</td>
                    <td className="stocks-td text-right font-semibold text-white">
                      ₹{c.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className={`stocks-td text-right font-semibold ${c.changePct >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {c.changePct >= 0 ? '+' : ''}{c.changePct.toFixed(2)}%
                    </td>
                    <td className="stocks-td text-right text-slate-400">{formatVolume(c.volume)}</td>
                    <td className="stocks-td text-right text-slate-300">{formatMarketCap(c.marketCap)}</td>
                    <td className="stocks-td text-right text-slate-400">{c.peRatio.toFixed(1)}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="stocks-pagination">
          <button
            className="stocks-page-btn"
            disabled={page === 0}
            onClick={() => setPage(p => p - 1)}
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>
          <span className="stocks-page-info">
            Page {page + 1} of {totalPages}
          </span>
          <button
            className="stocks-page-btn"
            disabled={page >= totalPages - 1}
            onClick={() => setPage(p => p + 1)}
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(StocksTable);

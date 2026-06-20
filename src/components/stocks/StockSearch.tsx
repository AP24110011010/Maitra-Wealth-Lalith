import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Fuse from 'fuse.js';
import { MOCK_COMPANIES, Company } from '@/lib/mock-data/stocks';
import { useLocation } from 'wouter';
import { Search, Clock, TrendingUp, X } from 'lucide-react';

const RECENT_KEY = 'maitra_recent_searches';
const MAX_RECENT = 10;

function getRecents(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw).slice(0, MAX_RECENT) : [];
  } catch {
    return [];
  }
}

function addRecent(symbol: string) {
  const stored = getRecents();
  const updated = [symbol, ...stored.filter(s => s !== symbol)].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
}

/**
 * Premium stock search bar with:
 * - Fuse.js fuzzy search
 * - 300ms debounce
 * - Keyboard navigation (↑ ↓ Enter Escape)
 * - Highlighted matched characters
 * - Recent searches from localStorage
 * - Click-away to close
 */
const StockSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<Company[]>([]);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(getRecents());
  const [, setLocation] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(MOCK_COMPANIES, {
        keys: ['symbol', 'name', 'sector', 'industry'],
        threshold: 0.3,
        includeScore: true,
        includeMatches: true,
      }),
    [],
  );

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Search
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }
    const fuseResults = fuse.search(debouncedQuery);
    setResults(fuseResults.slice(0, 10).map(r => r.item as Company));
    setHighlightIdx(-1);
  }, [debouncedQuery, fuse]);

  // Click-away handler
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = useCallback(
    (symbol: string) => {
      addRecent(symbol);
      setRecentSearches(getRecents());
      setQuery('');
      setShowDropdown(false);
      setLocation(`/stocks/${symbol}`);
    },
    [setLocation],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const items = query.trim() ? results : recentSearches.map(s => ({ symbol: s } as Company));
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIdx(prev => Math.min(prev + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIdx(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightIdx >= 0 && items[highlightIdx]) {
        handleSelect(items[highlightIdx].symbol);
      } else if (results.length > 0) {
        handleSelect(results[0].symbol);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  const highlightMatch = (text: string) => {
    if (!query.trim()) return text;
    try {
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const parts = text.split(regex);
      return (
        <>
          {parts.map((part, i) =>
            regex.test(part) ? (
              <span key={i} className="text-[#14E6C9] font-semibold">{part}</span>
            ) : (
              <span key={i}>{part}</span>
            ),
          )}
        </>
      );
    } catch {
      return text;
    }
  };

  const showRecents = showDropdown && !query.trim() && recentSearches.length > 0;
  const showResults = showDropdown && query.trim() && results.length > 0;

  return (
    <div ref={containerRef} className="search-container">
      <div className="search-input-wrapper">
        <Search className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search stocks, e.g. Reliance, TCS, Infosys..."
          className="search-input"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
          autoComplete="off"
        />
        {query && (
          <button
            className="search-clear"
            onClick={() => { setQuery(''); inputRef.current?.focus(); }}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Recent Searches */}
      {showRecents && (
        <div className="search-dropdown">
          <div className="search-dropdown-header">
            <Clock className="w-3.5 h-3.5" />
            <span>Recent Searches</span>
          </div>
          {recentSearches.map((sym, idx) => (
            <div
              key={sym}
              className={`search-dropdown-item ${idx === highlightIdx ? 'search-dropdown-item-active' : ''}`}
              onMouseEnter={() => setHighlightIdx(idx)}
              onClick={() => handleSelect(sym)}
            >
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-medium">{sym}</span>
            </div>
          ))}
        </div>
      )}

      {/* Search Results */}
      {showResults && (
        <div className="search-dropdown">
          <div className="search-dropdown-header">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Results</span>
          </div>
          {results.map((item, idx) => (
            <div
              key={item.symbol}
              className={`search-dropdown-item ${idx === highlightIdx ? 'search-dropdown-item-active' : ''}`}
              onMouseEnter={() => setHighlightIdx(idx)}
              onClick={() => handleSelect(item.symbol)}
              style={{ alignItems: 'center' }}
            >
              <div className="search-result-badge">
                {item.symbol.substring(0, 2)}
              </div>
              <div className="search-result-info">
                <span className="search-result-name" style={{ fontSize: '14px', color: '#fff', fontWeight: 500 }}>
                  {highlightMatch(item.name)}
                </span>
                <span className="search-result-symbol" style={{ fontSize: '12px', color: '#64748B', fontWeight: 400 }}>
                  {highlightMatch(item.symbol)} &bull; NSE
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginLeft: 'auto' }}>
                <span style={{ color: '#fff', fontSize: '14px', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                  ₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span style={{ color: item.change >= 0 ? '#10B981' : '#EF4444', fontSize: '12px', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
                  {item.change >= 0 ? '+' : ''}{item.changePct.toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No results */}
      {showDropdown && query.trim() && debouncedQuery && results.length === 0 && (
        <div className="search-dropdown">
          <div className="search-dropdown-empty">
            No stocks found for "{query}"
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(StockSearch);

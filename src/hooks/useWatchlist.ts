import { useState, useCallback } from 'react';

const WATCHLIST_KEY = 'maitra_watchlist';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(WATCHLIST_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const toggle = useCallback((symbol: string) => {
    setWatchlist(prev => {
      const next = prev.includes(symbol)
        ? prev.filter(s => s !== symbol)
        : [symbol, ...prev];
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isInWatchlist = useCallback(
    (symbol: string) => watchlist.includes(symbol),
    [watchlist],
  );

  return { watchlist, toggle, isInWatchlist };
}

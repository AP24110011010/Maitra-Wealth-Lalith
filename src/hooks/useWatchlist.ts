import { useState, useEffect, useCallback } from "react";

const WATCHLIST_KEY = "maitra_watchlist";

export function useWatchlist() {
  // Initialise with an empty array – SSR safe
  const [watchlist, setWatchlist] = useState<string[]>([]);

  // Hydrate from localStorage on client side only
  useEffect(() => {
    try {
      const raw = localStorage.getItem(WATCHLIST_KEY);
      if (raw) {
        setWatchlist(JSON.parse(raw));
      }
    } catch {
      // Silently ignore parsing/storage errors
    }
  }, []);

  // Toggle a symbol in the watchlist and persist the change
  const toggle = useCallback((symbol: string) => {
    setWatchlist(prev => {
      const next = prev.includes(symbol)
        ? prev.filter(s => s !== symbol)
        : [symbol, ...prev];
      try {
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(next));
      } catch {
        // ignore storage failures
      }
      return next;
    });
  }, []);

  // Check if symbol is in watchlist
  const isInWatchlist = useCallback((symbol: string) => {
    return watchlist.includes(symbol);
  }, [watchlist]);

  // Public API
  return { watchlist, toggle, isInWatchlist };
}

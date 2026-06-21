import { useState, useCallback, useEffect } from 'react';

const RECENT_KEY = 'maitra_recently_viewed';
const MAX = 20;

export function useRecentlyViewed() {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) {
        setRecent(JSON.parse(raw));
      }
    } catch {
      // Ignore errors
    }
  }, []);

  const add = useCallback((symbol: string) => {
    setRecent(prev => {
      const next = [symbol, ...prev.filter(s => s !== symbol)].slice(0, MAX);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {
        // Ignore errors
      }
      return next;
    });
  }, []);

  return { recent, add };
}

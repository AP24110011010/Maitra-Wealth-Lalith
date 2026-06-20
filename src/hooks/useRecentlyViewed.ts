import { useState, useCallback } from 'react';

const RECENT_KEY = 'maitra_recently_viewed';
const MAX = 20;

export function useRecentlyViewed() {
  const [recent, setRecent] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const add = useCallback((symbol: string) => {
    setRecent(prev => {
      const next = [symbol, ...prev.filter(s => s !== symbol)].slice(0, MAX);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { recent, add };
}

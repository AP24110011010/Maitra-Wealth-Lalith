import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export function useStocks() {
  const { toast } = useToast();
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedWatchlist = localStorage.getItem('maitra_watchlist');
      if (savedWatchlist) setWatchlist(JSON.parse(savedWatchlist));
      
      const savedRecent = localStorage.getItem('maitra_recent');
      if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));
    } catch (e) {
      console.error("Failed to parse stock preferences", e);
    }
  }, []);

  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev => {
      let next;
      if (prev.includes(symbol)) {
        next = prev.filter(s => s !== symbol);
        toast({
          title: "Removed from Watchlist",
          description: `${symbol} has been removed from your watchlist.`,
        });
      } else {
        next = [...prev, symbol];
        toast({
          title: "Added to Watchlist",
          description: `${symbol} has been added to your watchlist.`,
        });
      }
      localStorage.setItem('maitra_watchlist', JSON.stringify(next));
      return next;
    });
  };

  const addRecentlyViewed = (symbol: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(s => s !== symbol);
      const next = [symbol, ...filtered].slice(0, 10); // Keep last 10
      localStorage.setItem('maitra_recent', JSON.stringify(next));
      return next;
    });
  };

  return {
    watchlist,
    toggleWatchlist,
    isWatchlisted: (symbol: string) => watchlist.includes(symbol),
    recentlyViewed,
    addRecentlyViewed
  };
}

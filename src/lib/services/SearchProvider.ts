import Fuse from 'fuse.js';
import { SEARCHABLE_COMPANIES } from '@/lib/mock-data/stocks';
import { Company } from '@/lib/mock-data/stocks';

/**
 * Service that provides fuzzy search over the list of companies.
 * It keeps an in‑memory Fuse index for instant responses.
 */
export class SearchProvider {
  private fuse: Fuse<Company>;
  private recentKey = 'maitra_recent_searches';
  private maxRecent = 10;

  constructor() {
    const options: Fuse.IFuseOptions<Company> = {
      keys: ['symbol', 'name', 'sector', 'industry'],
      threshold: 0.3,
      includeScore: true,
    };
    this.fuse = new Fuse(SEARCHABLE_COMPANIES as any, options);
  }

  /** Search query and return top matches (max 10). */
  search(query: string): Company[] {
    if (!query) return [];
    const results = this.fuse.search(query);
    return results.slice(0, 10).map(r => r.item);
  }

  /** Store a recent search term (symbol). */
  addRecent(symbol: string) {
    const stored = this.getRecents();
    const updated = [symbol, ...stored.filter(s => s !== symbol)].slice(0, this.maxRecent);
    localStorage.setItem(this.recentKey, JSON.stringify(updated));
  }

  /** Retrieve recent searches (most recent first). */
  getRecents(): string[] {
    const raw = localStorage.getItem(this.recentKey);
    if (!raw) return [];
    try {
      const arr = JSON.parse(raw) as string[];
      return arr.slice(0, this.maxRecent);
    } catch {
      return [];
    }
  }
}

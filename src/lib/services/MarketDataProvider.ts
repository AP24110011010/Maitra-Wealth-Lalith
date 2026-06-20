import { MOCK_COMPANIES, getCompany, Company } from '@/lib/mock-data/stocks';

/**
 * Simple interface for a market data provider.
 * Implementations may fetch live data from an external API or fall back to mock data.
 */
export interface IMarketDataProvider {
  /** Returns a list of all companies (basic info for search). */
  getAllCompanies(): Promise<Company[]>;

  /** Returns detailed data for a single symbol. */
  getCompanyDetails(symbol: string): Promise<Company | undefined>;

  /** Returns trending data for a given type (e.g., 'gainers', 'losers'). */
  getTrending(type: string): Promise<Company[]>;
}

/**
 * Mock provider that simply returns the deterministic dataset.
 */
export class MockMarketDataProvider implements IMarketDataProvider {
  async getAllCompanies(): Promise<Company[]> {
    // In a real implementation this could be paginated.
    return MOCK_COMPANIES;
  }

  async getCompanyDetails(symbol: string): Promise<Company | undefined> {
    return getCompany(symbol);
  }

  async getTrending(type: string): Promise<Company[]> {
    // Very naive trending logic based on price change percentages.
    const companies = MOCK_COMPANIES.slice();
    if (type === 'gainers') {
      return companies.sort((a, b) => b.changePct - a.changePct).slice(0, 10);
    }
    if (type === 'losers') {
      return companies.sort((a, b) => a.changePct - b.changePct).slice(0, 10);
    }
    if (type === 'mostActive') {
      return companies.sort((a, b) => b.volume - a.volume).slice(0, 10);
    }
    if (type === '52wHigh') {
      return companies.sort((a, b) => b.fiftyTwoWeekHigh - a.fiftyTwoWeekHigh).slice(0, 10);
    }
    if (type === '52wLow') {
      return companies.sort((a, b) => a.fiftyTwoWeekLow - b.fiftyTwoWeekLow).slice(0, 10);
    }
    return [];
  }
}

/**
 * Live provider placeholder – attempts to fetch from a free public endpoint.
 * If any request fails, it throws and the fallback provider will be used.
 * Currently not implemented to avoid brittle scraping; kept for future integration.
 */
export class LiveMarketDataProvider implements IMarketDataProvider {
  private async fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 3000): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      return response;
    } catch (err) {
      clearTimeout(id);
      throw err;
    }
  }

  async getAllCompanies(): Promise<Company[]> {
    try {
      // In a real scenario, this would point to your licensed API endpoint.
      // const res = await this.fetchWithTimeout('https://api.example.com/v1/companies');
      // if (!res.ok) throw new Error('API failed');
      // return await res.json();
      throw new Error('Live data source not configured');
    } catch (err) {
      console.warn('Live API fetch failed, falling back to mock data', err);
      const mock = new MockMarketDataProvider();
      return mock.getAllCompanies();
    }
  }

  async getCompanyDetails(symbol: string): Promise<Company | undefined> {
    try {
      // const res = await this.fetchWithTimeout(`https://api.example.com/v1/quotes/${symbol}`);
      // if (!res.ok) throw new Error('API failed');
      // return await res.json();
      throw new Error('Live data source not configured');
    } catch (err) {
      console.warn(`Live API fetch failed for ${symbol}, falling back to mock data`, err);
      const mock = new MockMarketDataProvider();
      return mock.getCompanyDetails(symbol);
    }
  }

  async getTrending(type: string): Promise<Company[]> {
    try {
      // const res = await this.fetchWithTimeout(`https://api.example.com/v1/trending/${type}`);
      // if (!res.ok) throw new Error('API failed');
      // return await res.json();
      throw new Error('Live data source not configured');
    } catch (err) {
      console.warn(`Live API fetch failed for trending ${type}, falling back to mock data`, err);
      const mock = new MockMarketDataProvider();
      return mock.getTrending(type);
    }
  }
}

/**
 * Factory that returns the appropriate provider based on environment.
 */
export class MarketDataProviderFactory {
  static create(): IMarketDataProvider {
    // Return LiveMarketDataProvider which internally handles fallbacks.
    // In the future, this can be toggled via an environment variable (e.g., process.env.USE_LIVE_DATA).
    return new LiveMarketDataProvider();
  }
}

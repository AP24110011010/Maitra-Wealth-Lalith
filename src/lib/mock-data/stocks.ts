import seedrandom from 'seedrandom';

// ---------------------------------------------------------------------------
// Deterministic PRNG helpers
// ---------------------------------------------------------------------------
function prng(seed: string) {
  const rng = seedrandom(seed);
  return () => rng();
}

export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// ---------------------------------------------------------------------------
// Price series generator – produces 365 days of OHLCV data
// ---------------------------------------------------------------------------
function generatePriceSeries(
  symbol: string,
  days: number,
  basePrice: number,
  volatility: number = 0.02,
) {
  const rand = prng(`price-${symbol}`);
  const series: {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }[] = [];
  let base = basePrice;
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(2025, 0, 1); // fixed epoch for determinism
    date.setDate(date.getDate() + (days - 1 - i));
    const drift = Math.sin(i / 14) * volatility * 0.5 + (rand() - 0.48) * volatility;
    const open = parseFloat((base * (1 + drift)).toFixed(2));
    const high = parseFloat((open * (1 + 0.005 + rand() * 0.015)).toFixed(2));
    const low = parseFloat((open * (1 - 0.005 - rand() * 0.015)).toFixed(2));
    const close = parseFloat((low + (high - low) * rand()).toFixed(2));
    const volume = Math.round(1_000_000 * (0.5 + rand() * 1.5));
    series.push({
      date: date.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
      volume,
    });
    base = close;
  }
  return series;
}

// ---------------------------------------------------------------------------
// Intraday price generator – produces 5-minute data points for 1D chart
// ---------------------------------------------------------------------------
function generateIntradayPrices(symbol: string, openPrice: number, closePrice: number, points: number = 75) {
  const rand = prng(`intraday-${symbol}`);
  const series: { time: string; open: number; high: number; low: number; close: number; volume: number; price: number }[] = [];
  
  let currentPrice = openPrice;
  const targetDiff = closePrice - openPrice;
  
  const startTime = new Date(2025, 0, 1, 9, 15, 0);

  for (let i = 0; i < points; i++) {
    const time = new Date(startTime.getTime() + i * 5 * 60000);
    const timeStr = time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
    
    const progress = i / (points - 1 || 1);
    const expectedPathPrice = openPrice + targetDiff * progress;
    
    const maxNoise = openPrice * 0.005;
    const noise = (rand() - 0.5) * maxNoise;
    
    let nextPrice = expectedPathPrice + noise;
    if (i === 0) nextPrice = openPrice;
    if (i === points - 1) nextPrice = closePrice;

    // Generate OHLC from currentPrice to nextPrice
    const candleOpen = currentPrice;
    const candleClose = nextPrice;
    const minP = Math.min(candleOpen, candleClose);
    const maxP = Math.max(candleOpen, candleClose);
    
    const candleHigh = parseFloat((maxP + rand() * (maxP * 0.002)).toFixed(2));
    const candleLow = parseFloat((minP - rand() * (minP * 0.002)).toFixed(2));
    const volume = Math.round(10000 + rand() * 50000);

    series.push({ 
      time: timeStr, 
      open: parseFloat(candleOpen.toFixed(2)), 
      high: candleHigh, 
      low: candleLow, 
      close: parseFloat(candleClose.toFixed(2)), 
      price: parseFloat(candleClose.toFixed(2)), // Keep price for backward compatibility
      volume 
    });
    
    currentPrice = nextPrice;
  }
  
  return series;
}

// ---------------------------------------------------------------------------
// Financial history generator – quarterly data for last 3 years
// ---------------------------------------------------------------------------
function generateFinancials(symbol: string, baseRevenue: number) {
  const rand = prng(`fin-${symbol}`);
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const years = [2022, 2023, 2024];

  const revenue: { period: string; value: number }[] = [];
  const netProfit: { period: string; value: number }[] = [];
  const ebitda: { period: string; value: number }[] = [];
  const epsHistory: { period: string; value: number }[] = [];

  let revBase = baseRevenue * 0.85;
  years.forEach(year => {
    quarters.forEach(q => {
      const label = `${q} ${year}`;
      const growth = 1 + (rand() * 0.08 - 0.02); // -2% to +6% quarter-on-quarter
      revBase = Math.round(revBase * growth);
      const np = Math.round(revBase * (0.08 + rand() * 0.12));
      const eb = Math.round(revBase * (0.15 + rand() * 0.1));
      const ep = parseFloat((np / (100 + rand() * 500)).toFixed(2));
      revenue.push({ period: label, value: revBase });
      netProfit.push({ period: label, value: np });
      ebitda.push({ period: label, value: eb });
      epsHistory.push({ period: label, value: ep });
    });
  });

  return { revenue, netProfit, ebitda, epsHistory };
}

// ---------------------------------------------------------------------------
// Shareholding generator
// ---------------------------------------------------------------------------
function generateShareholding(symbol: string) {
  const rand = prng(`sh-${symbol}`);
  const promoter = parseFloat((30 + rand() * 30).toFixed(2)); // 30–60%
  const fii = parseFloat((10 + rand() * 25).toFixed(2));
  const dii = parseFloat((5 + rand() * 20).toFixed(2));
  const total = promoter + fii + dii;
  const pub = parseFloat(Math.max(100 - total, 5).toFixed(2));
  return { promoter, fii, dii, public: pub };
}

// ---------------------------------------------------------------------------
// Company generator
// ---------------------------------------------------------------------------
function generateCompany(def: CompanyDef) {
  const { symbol, name, sector, industry, about, basePrice, baseRevenue, faceValue } = def;
  const rand = prng(`company-${symbol}`);
  const priceSeries = generatePriceSeries(symbol, 365, basePrice);
  const latest = priceSeries[priceSeries.length - 1];
  const prev = priceSeries[priceSeries.length - 2];
  const change = parseFloat((latest.close - prev.close).toFixed(2));
  const changePct = parseFloat(((change / prev.close) * 100).toFixed(2));
  const allHighs = priceSeries.map(p => p.high);
  const allLows = priceSeries.map(p => p.low);
  const fiftyTwoWeekHigh = Math.max(...allHighs);
  const fiftyTwoWeekLow = Math.min(...allLows);

  // Market cap = price × shares outstanding (deterministic via rand)
  const sharesOutstanding = 500_000_000 + Math.round(rand() * 5_000_000_000);
  const marketCap = Math.round(latest.close * sharesOutstanding);

  const pe = parseFloat((10 + rand() * 40).toFixed(2));
  const eps = parseFloat((latest.close / pe).toFixed(2));
  const roe = parseFloat((8 + rand() * 25).toFixed(2));
  const roce = parseFloat((8 + rand() * 25).toFixed(2));
  const dividendYield = parseFloat((rand() * 4).toFixed(2));
  const bookValue = parseFloat((50 + rand() * 500).toFixed(2));
  const debtToEquity = parseFloat((rand() * 1.5).toFixed(2));

  return {
    symbol,
    name,
    sector,
    industry,
    about,
    logo: null as null,
    price: latest.close,
    change,
    changePct,
    open: latest.open,
    high: latest.high,
    low: latest.low,
    previousClose: prev.close,
    fiftyTwoWeekHigh,
    fiftyTwoWeekLow,
    volume: latest.volume,
    marketCap,
    peRatio: pe,
    eps,
    roe,
    roce,
    dividendYield,
    bookValue,
    faceValue: faceValue ?? 10,
    debtToEquity,
    description: about,
    historicalPrices: priceSeries,
    intradayPrices: generateIntradayPrices(symbol, prev.close, latest.close, 75),
    financials: generateFinancials(symbol, baseRevenue),
    shareholding: generateShareholding(symbol),
  };
}

// ---------------------------------------------------------------------------
// Company definition type
// ---------------------------------------------------------------------------
interface CompanyDef {
  symbol: string;
  name: string;
  sector: string;
  industry: string;
  about: string;
  basePrice: number;
  baseRevenue: number;
  faceValue?: number;
}

// ---------------------------------------------------------------------------
// 55 major NSE-listed companies
// ---------------------------------------------------------------------------
const COMPANY_DEFS: CompanyDef[] = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    sector: 'Energy',
    industry: 'Oil & Gas Refining',
    about: 'Reliance Industries is an Indian multinational conglomerate with businesses spanning energy, petrochemicals, natural gas, retail, telecommunications, mass media, and textiles. It is the largest private-sector company in India by revenue.',
    basePrice: 2930,
    baseRevenue: 220000,
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services Ltd.',
    sector: 'Technology',
    industry: 'IT Services & Consulting',
    about: 'TCS is an Indian multinational IT services and consulting company headquartered in Mumbai. It is a subsidiary of the Tata Group and one of the largest IT services companies globally by market capitalisation and revenue.',
    basePrice: 4000,
    baseRevenue: 60000,
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd.',
    sector: 'Technology',
    industry: 'IT Services & Consulting',
    about: 'Infosys Limited is an Indian multinational IT company that provides business consulting, information technology, and outsourcing services. It is the second-largest Indian IT company by revenue.',
    basePrice: 1900,
    baseRevenue: 40000,
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    sector: 'Financial Services',
    industry: 'Private Banking',
    about: 'HDFC Bank is India\'s largest private-sector bank by assets. It offers a wide range of banking products and financial services to corporate and retail customers.',
    basePrice: 1616,
    baseRevenue: 55000,
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Ltd.',
    sector: 'Financial Services',
    industry: 'Private Banking',
    about: 'ICICI Bank is a leading private-sector bank in India offering a diversified portfolio of financial products and services to retail, SME, and corporate clients.',
    basePrice: 1250,
    baseRevenue: 45000,
  },
  {
    symbol: 'SBIN',
    name: 'State Bank of India',
    sector: 'Financial Services',
    industry: 'Public Banking',
    about: 'SBI is an Indian multinational public-sector bank and the largest bank in India by assets, deposits, branches, customers, and employees.',
    basePrice: 830,
    baseRevenue: 80000,
  },
  {
    symbol: 'ITC',
    name: 'ITC Ltd.',
    sector: 'Consumer Goods',
    industry: 'FMCG & Tobacco',
    about: 'ITC is a diversified conglomerate with businesses spanning FMCG, hotels, paperboards, packaging, agri-business, and IT. Its FMCG brands include Aashirvaad, Sunfeast, Bingo!, and Classmate.',
    basePrice: 480,
    baseRevenue: 18000,
  },
  {
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel Ltd.',
    sector: 'Telecommunications',
    industry: 'Telecom Services',
    about: 'Bharti Airtel is a leading global telecommunications company operating in 18 countries across Asia and Africa. In India it is the second-largest mobile network operator.',
    basePrice: 1700,
    baseRevenue: 38000,
  },
  {
    symbol: 'LT',
    name: 'Larsen & Toubro Ltd.',
    sector: 'Industrials',
    industry: 'Engineering & Construction',
    about: 'L&T is an Indian multinational engaged in EPC projects, hi-tech manufacturing, and services. It operates in over 50 countries spanning technology, engineering, construction, manufacturing, and financial services.',
    basePrice: 3600,
    baseRevenue: 55000,
  },
  {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd.',
    sector: 'Automobile',
    industry: 'Passenger & Commercial Vehicles',
    about: 'Tata Motors is a leading Indian automobile manufacturer and a subsidiary of the Tata Group. It owns Jaguar Land Rover and is a major player in electric vehicles in India.',
    basePrice: 950,
    baseRevenue: 42000,
  },
  {
    symbol: 'WIPRO',
    name: 'Wipro Ltd.',
    sector: 'Technology',
    industry: 'IT Services & Consulting',
    about: 'Wipro is a leading technology services and consulting company focused on building innovative solutions that address clients\' most complex digital transformation needs.',
    basePrice: 560,
    baseRevenue: 22000,
  },
  {
    symbol: 'BAJFINANCE',
    name: 'Bajaj Finance Ltd.',
    sector: 'Financial Services',
    industry: 'Non-Banking Financial Company',
    about: 'Bajaj Finance is one of the most diversified NBFCs in India with a strong presence across consumer lending, SME lending, commercial lending, and rural lending.',
    basePrice: 7800,
    baseRevenue: 14000,
  },
  {
    symbol: 'MARUTI',
    name: 'Maruti Suzuki India Ltd.',
    sector: 'Automobile',
    industry: 'Passenger Vehicles',
    about: 'Maruti Suzuki is India\'s largest automobile manufacturer by sales volume. It is a subsidiary of Suzuki Motor Corporation and commands over 40% of the Indian passenger car market.',
    basePrice: 12500,
    baseRevenue: 35000,
  },
  {
    symbol: 'SUNPHARMA',
    name: 'Sun Pharmaceutical Industries Ltd.',
    sector: 'Healthcare',
    industry: 'Pharmaceuticals',
    about: 'Sun Pharma is the world\'s fourth-largest specialty generic pharmaceutical company and India\'s top pharmaceutical company by domestic and US prescription market share.',
    basePrice: 1800,
    baseRevenue: 12000,
  },
  {
    symbol: 'TITAN',
    name: 'Titan Company Ltd.',
    sector: 'Consumer Goods',
    industry: 'Jewellery & Watches',
    about: 'Titan Company is an Indian luxury goods company and a subsidiary of the Tata Group. It is known for its Tanishq jewellery brand, Titan watches, and Titan Eye+ optical retail chain.',
    basePrice: 3500,
    baseRevenue: 12000,
  },
  {
    symbol: 'ULTRACEMCO',
    name: 'UltraTech Cement Ltd.',
    sector: 'Materials',
    industry: 'Cement & Building Materials',
    about: 'UltraTech Cement is India\'s largest manufacturer of grey cement, ready-mix concrete, and white cement. It is a subsidiary of the Aditya Birla Group.',
    basePrice: 11500,
    baseRevenue: 17000,
  },
  {
    symbol: 'NESTLEIND',
    name: 'Nestlé India Ltd.',
    sector: 'Consumer Goods',
    industry: 'Packaged Foods',
    about: 'Nestlé India manufactures and markets food products including Maggi noodles, Nescafé coffee, KitKat, and Milkmaid. It is a subsidiary of the Swiss Nestlé S.A.',
    basePrice: 2500,
    baseRevenue: 5000,
    faceValue: 10,
  },
  {
    symbol: 'HINDUNILVR',
    name: 'Hindustan Unilever Ltd.',
    sector: 'Consumer Goods',
    industry: 'Personal Care & Home Products',
    about: 'HUL is India\'s largest FMCG company. Its brands include Surf Excel, Rin, Dove, Lux, Lifebuoy, Knorr, and Kwality Wall\'s, reaching millions of Indian households.',
    basePrice: 2650,
    baseRevenue: 15000,
  },
  {
    symbol: 'M&M',
    name: 'Mahindra & Mahindra Ltd.',
    sector: 'Automobile',
    industry: 'SUVs & Farm Equipment',
    about: 'M&M is a leading Indian multinational automotive manufacturer known for its SUVs, trucks, and tractors. It is the world\'s largest tractor manufacturer by volume.',
    basePrice: 2800,
    baseRevenue: 35000,
  },
  {
    symbol: 'ASIANPAINT',
    name: 'Asian Paints Ltd.',
    sector: 'Materials',
    industry: 'Decorative Paints',
    about: 'Asian Paints is India\'s leading paint company and Asia\'s largest paint manufacturer. It operates in 15 countries and has 26 paint manufacturing facilities globally.',
    basePrice: 2900,
    baseRevenue: 10000,
  },
  {
    symbol: 'KOTAKBANK',
    name: 'Kotak Mahindra Bank Ltd.',
    sector: 'Financial Services',
    industry: 'Private Banking',
    about: 'Kotak Mahindra Bank is an Indian banking and financial services company headquartered in Mumbai. It offers banking products and financial services for corporate and retail customers.',
    basePrice: 1800,
    baseRevenue: 22000,
  },
  {
    symbol: 'AXISBANK',
    name: 'Axis Bank Ltd.',
    sector: 'Financial Services',
    industry: 'Private Banking',
    about: 'Axis Bank is the third-largest private-sector bank in India. It offers financial services to large and mid-corporate, SME, and retail businesses.',
    basePrice: 1200,
    baseRevenue: 28000,
  },
  {
    symbol: 'TECHM',
    name: 'Tech Mahindra Ltd.',
    sector: 'Technology',
    industry: 'IT Services & Consulting',
    about: 'Tech Mahindra is an Indian multinational technology company providing IT and business process outsourcing services. It is a subsidiary of the Mahindra Group.',
    basePrice: 1700,
    baseRevenue: 13000,
  },
  {
    symbol: 'NTPC',
    name: 'NTPC Ltd.',
    sector: 'Energy',
    industry: 'Power Generation',
    about: 'NTPC is India\'s largest energy conglomerate and power company. It has an installed capacity of over 70 GW and is expanding into renewable energy.',
    basePrice: 380,
    baseRevenue: 45000,
  },
  {
    symbol: 'POWERGRID',
    name: 'Power Grid Corporation of India Ltd.',
    sector: 'Energy',
    industry: 'Power Transmission',
    about: 'Power Grid Corporation is a central transmission utility under the Ministry of Power. It owns and operates one of the largest transmission networks in the world.',
    basePrice: 330,
    baseRevenue: 12000,
  },
  {
    symbol: 'ADANIPORTS',
    name: 'Adani Ports & SEZ Ltd.',
    sector: 'Industrials',
    industry: 'Ports & Logistics',
    about: 'Adani Ports is the largest private multi-port operator in India. It develops, operates, and maintains port infrastructure and has an integrated logistics platform.',
    basePrice: 1400,
    baseRevenue: 8000,
  },
  {
    symbol: 'COALINDIA',
    name: 'Coal India Ltd.',
    sector: 'Energy',
    industry: 'Mining - Coal',
    about: 'Coal India is the world\'s largest coal-producing company. It is a state-owned enterprise under the Ministry of Coal, Government of India.',
    basePrice: 480,
    baseRevenue: 35000,
  },
  {
    symbol: 'ONGC',
    name: 'Oil & Natural Gas Corporation Ltd.',
    sector: 'Energy',
    industry: 'Oil & Gas Exploration',
    about: 'ONGC is India\'s largest crude oil and natural gas company, contributing around 71% of India\'s domestic production. It is a Maharatna PSU.',
    basePrice: 280,
    baseRevenue: 50000,
  },
  {
    symbol: 'JSWSTEEL',
    name: 'JSW Steel Ltd.',
    sector: 'Materials',
    industry: 'Steel Manufacturing',
    about: 'JSW Steel is India\'s leading integrated steel manufacturer with a capacity of 28.5 MTPA. It is part of the JSW Group and exports to over 100 countries.',
    basePrice: 950,
    baseRevenue: 18000,
  },
  {
    symbol: 'TATASTEEL',
    name: 'Tata Steel Ltd.',
    sector: 'Materials',
    industry: 'Steel Manufacturing',
    about: 'Tata Steel is among the top steel-producing companies globally. It is a subsidiary of the Tata Group with operations in 26 countries and commercial presence in over 50.',
    basePrice: 160,
    baseRevenue: 25000,
  },
  {
    symbol: 'HCLTECH',
    name: 'HCL Technologies Ltd.',
    sector: 'Technology',
    industry: 'IT Services & Consulting',
    about: 'HCL Technologies is a leading global IT services company helping enterprises reimagine their businesses for the digital age. It operates in 52 countries.',
    basePrice: 1800,
    baseRevenue: 26000,
  },
  {
    symbol: 'BAJAJFINSV',
    name: 'Bajaj Finserv Ltd.',
    sector: 'Financial Services',
    industry: 'Financial Holding Company',
    about: 'Bajaj Finserv is a financial services conglomerate focused on lending, asset management, wealth management, and insurance through its subsidiaries.',
    basePrice: 1900,
    baseRevenue: 22000,
  },
  {
    symbol: 'HDFCLIFE',
    name: 'HDFC Life Insurance Co. Ltd.',
    sector: 'Financial Services',
    industry: 'Life Insurance',
    about: 'HDFC Life is a leading long-term life insurance solutions provider in India, offering a range of individual and group insurance products.',
    basePrice: 680,
    baseRevenue: 15000,
  },
  {
    symbol: 'SBILIFE',
    name: 'SBI Life Insurance Co. Ltd.',
    sector: 'Financial Services',
    industry: 'Life Insurance',
    about: 'SBI Life Insurance is one of the most trusted private life insurance companies in India, jointly ventured between SBI and BNP Paribas Cardif.',
    basePrice: 1600,
    baseRevenue: 18000,
  },
  {
    symbol: 'BAJAJ-AUTO',
    name: 'Bajaj Auto Ltd.',
    sector: 'Automobile',
    industry: 'Two & Three Wheelers',
    about: 'Bajaj Auto is one of the world\'s largest manufacturers of motorcycles and three-wheelers. Brands include Pulsar, Dominar, and auto-rickshaws.',
    basePrice: 9500,
    baseRevenue: 12000,
  },
  {
    symbol: 'INDUSINDBK',
    name: 'IndusInd Bank Ltd.',
    sector: 'Financial Services',
    industry: 'Private Banking',
    about: 'IndusInd Bank is a new-generation Indian bank providing a wide range of deposit products, loans, cards, and wealth management services.',
    basePrice: 1550,
    baseRevenue: 12000,
  },
  {
    symbol: 'GRASIM',
    name: 'Grasim Industries Ltd.',
    sector: 'Materials',
    industry: 'Cement & Chemicals',
    about: 'Grasim Industries is a flagship company of the Aditya Birla Group with businesses in viscose staple fibre, cement (through UltraTech), chemicals, and textiles.',
    basePrice: 2700,
    baseRevenue: 28000,
  },
  {
    symbol: 'CIPLA',
    name: 'Cipla Ltd.',
    sector: 'Healthcare',
    industry: 'Pharmaceuticals',
    about: 'Cipla is a leading global pharmaceutical company using technology and innovation to meet the everyday needs of patients. It offers treatments in respiratory, anti-retroviral, and oncology.',
    basePrice: 1500,
    baseRevenue: 6500,
  },
  {
    symbol: 'DRREDDY',
    name: "Dr. Reddy's Laboratories Ltd.",
    sector: 'Healthcare',
    industry: 'Pharmaceuticals',
    about: "Dr. Reddy's is a multinational pharmaceutical company that manufactures and markets a wide range of pharmaceuticals. It was the first Indian pharma company to be listed on NYSE.",
    basePrice: 6500,
    baseRevenue: 7000,
  },
  {
    symbol: 'BRITANNIA',
    name: 'Britannia Industries Ltd.',
    sector: 'Consumer Goods',
    industry: 'Packaged Foods',
    about: 'Britannia Industries is one of India\'s leading food companies with a 100-year legacy. Its brands include Good Day, Tiger, NutriChoice, Milk Bikis, and Marie Gold.',
    basePrice: 5500,
    baseRevenue: 4500,
  },
  {
    symbol: 'DIVISLAB',
    name: "Divi's Laboratories Ltd.",
    sector: 'Healthcare',
    industry: 'Pharmaceuticals & APIs',
    about: "Divi's Laboratories is a leading manufacturer of APIs, intermediates, and nutraceutical ingredients. It supplies active pharmaceutical ingredients to global pharma companies.",
    basePrice: 5800,
    baseRevenue: 2200,
  },
  {
    symbol: 'EICHERMOT',
    name: 'Eicher Motors Ltd.',
    sector: 'Automobile',
    industry: 'Motorcycles',
    about: 'Eicher Motors is the parent company of Royal Enfield, the global leader in the mid-size motorcycle segment. It also has a joint venture with Volvo for commercial vehicles.',
    basePrice: 4800,
    baseRevenue: 4000,
  },
  {
    symbol: 'HEROMOTOCO',
    name: 'Hero MotoCorp Ltd.',
    sector: 'Automobile',
    industry: 'Two Wheelers',
    about: 'Hero MotoCorp is the world\'s largest manufacturer of two-wheelers. It sells over 5 million units per year across India and international markets.',
    basePrice: 5200,
    baseRevenue: 10000,
  },
  {
    symbol: 'APOLLOHOSP',
    name: 'Apollo Hospitals Enterprise Ltd.',
    sector: 'Healthcare',
    industry: 'Hospitals & Healthcare',
    about: 'Apollo Hospitals is the largest for-profit private hospital network in India with over 70 hospitals, 5000+ pharmacies, and telemedicine centres across the country.',
    basePrice: 6800,
    baseRevenue: 5000,
  },
  {
    symbol: 'TATACONSUM',
    name: 'Tata Consumer Products Ltd.',
    sector: 'Consumer Goods',
    industry: 'Food & Beverages',
    about: 'Tata Consumer Products is a consumer goods company unifying Tata\'s food and beverage interests. Key brands include Tata Tea, Tetley, Tata Salt, and Tata Sampann.',
    basePrice: 1100,
    baseRevenue: 4000,
  },
  {
    symbol: 'HINDALCO',
    name: 'Hindalco Industries Ltd.',
    sector: 'Materials',
    industry: 'Aluminium & Copper',
    about: 'Hindalco is one of the world\'s largest aluminium and copper producers. It is a flagship company of the Aditya Birla Group and owns Novelis Inc.',
    basePrice: 680,
    baseRevenue: 22000,
  },
  {
    symbol: 'ADANIENT',
    name: 'Adani Enterprises Ltd.',
    sector: 'Industrials',
    industry: 'Diversified Conglomerate',
    about: 'Adani Enterprises is the flagship company of the Adani Group with interests in mining, data centres, airports, roads, solar manufacturing, and defence.',
    basePrice: 3200,
    baseRevenue: 30000,
  },
  {
    symbol: 'WIPRO',
    name: 'Wipro Ltd.',
    sector: 'Technology',
    industry: 'IT Services & Consulting',
    about: 'Wipro Limited is a leading technology services and consulting company focused on building innovative solutions that address clients\' most complex digital transformation needs.',
    basePrice: 560,
    baseRevenue: 22000,
  },
  {
    symbol: 'IOC',
    name: 'Indian Oil Corporation Ltd.',
    sector: 'Energy',
    industry: 'Oil Marketing',
    about: 'Indian Oil Corporation is the largest oil refining and marketing company in India. It is a Maharatna PSU and Fortune Global 500 company.',
    basePrice: 170,
    baseRevenue: 80000,
  },
  {
    symbol: 'BPCL',
    name: 'Bharat Petroleum Corporation Ltd.',
    sector: 'Energy',
    industry: 'Oil Marketing',
    about: 'BPCL is a government-owned oil and gas corporation engaged in refining crude oil and marketing petroleum products across India and internationally.',
    basePrice: 350,
    baseRevenue: 50000,
  },
  {
    symbol: 'IRCTC',
    name: 'Indian Railway Catering & Tourism Corp. Ltd.',
    sector: 'Services',
    industry: 'Travel & Tourism',
    about: 'IRCTC is a subsidiary of Indian Railways handling catering, tourism, and online ticketing. It operates the popular irctc.co.in platform for rail bookings.',
    basePrice: 850,
    baseRevenue: 3500,
  },
  {
    symbol: 'RECLTD',
    name: 'REC Ltd.',
    sector: 'Financial Services',
    industry: 'Infrastructure Finance',
    about: 'REC Limited is a Navratna NBFC focusing on financing and promotion of power projects across India. It provides loans to state electricity boards and private power developers.',
    basePrice: 550,
    baseRevenue: 12000,
  },
  {
    symbol: 'VEDL',
    name: 'Vedanta Ltd.',
    sector: 'Materials',
    industry: 'Mining & Metals',
    about: 'Vedanta is a diversified natural resources company with operations in zinc, lead, silver, copper, iron ore, aluminium, and oil & gas across India, South Africa, and Namibia.',
    basePrice: 470,
    baseRevenue: 35000,
  },
  {
    symbol: 'DABUR',
    name: 'Dabur India Ltd.',
    sector: 'Consumer Goods',
    industry: 'Ayurvedic & Personal Care',
    about: 'Dabur is India\'s largest Ayurvedic medicine and natural consumer products company. It owns brands like Dabur Chyawanprash, Vatika, Réal juice, and Hajmola.',
    basePrice: 580,
    baseRevenue: 3000,
  },
  {
    symbol: 'PIDILITIND',
    name: 'Pidilite Industries Ltd.',
    sector: 'Materials',
    industry: 'Adhesives & Chemicals',
    about: 'Pidilite Industries is the market leader in adhesives and sealants in India. Its flagship brand Fevicol is synonymous with adhesives in the Indian market.',
    basePrice: 3100,
    baseRevenue: 3500,
  },
];

// Remove duplicate WIPRO entry – keep only the first one
const uniqueDefs: CompanyDef[] = [];
const seen = new Set<string>();
for (const def of COMPANY_DEFS) {
  if (!seen.has(def.symbol)) {
    seen.add(def.symbol);
    uniqueDefs.push(def);
  }
}

// ---------------------------------------------------------------------------
// Exported data
// ---------------------------------------------------------------------------
export const MOCK_COMPANIES = uniqueDefs.map(def => generateCompany(def));

export type Company = (typeof MOCK_COMPANIES)[number];

/** Retrieve a company by symbol (case-insensitive). */
export function getCompany(symbol: string): Company | undefined {
  return MOCK_COMPANIES.find(
    c => c.symbol.toUpperCase() === symbol.toUpperCase(),
  );
}

/** Flat list for search providers. */
export const SEARCHABLE_COMPANIES = MOCK_COMPANIES.map(c => ({
  symbol: c.symbol,
  name: c.name,
  sector: c.sector,
  industry: c.industry,
}));

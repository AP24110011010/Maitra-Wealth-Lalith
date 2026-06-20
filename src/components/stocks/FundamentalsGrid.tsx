import React from 'react';
import { StockData } from '@/lib/mock-data/stocks';

export function FundamentalsGrid({ stock }: { stock: StockData }) {
  const data = [
    { label: "Market Cap", value: `₹${stock.fundamentals.marketCap}` },
    { label: "P/E Ratio", value: stock.fundamentals.peRatio.toFixed(2) },
    { label: "Industry P/E", value: stock.fundamentals.industryPe.toFixed(2) },
    { label: "P/B Ratio", value: stock.fundamentals.pbRatio.toFixed(2) },
    { label: "ROE", value: `${stock.fundamentals.roe.toFixed(2)}%` },
    { label: "ROCE", value: `${stock.fundamentals.roce.toFixed(2)}%` },
    { label: "EPS (TTM)", value: `₹${stock.fundamentals.eps.toFixed(2)}` },
    { label: "Dividend Yield", value: `${stock.fundamentals.divYield.toFixed(2)}%` },
    { label: "Book Value", value: `₹${stock.fundamentals.bookValue.toFixed(2)}` },
    { label: "Face Value", value: `₹${stock.fundamentals.faceValue.toFixed(2)}` },
    { label: "Debt to Equity", value: stock.fundamentals.debtToEquity.toFixed(2) },
    { label: "Volume", value: stock.volume.toLocaleString() },
  ];

  return (
    <div className="bg-[#0F172A] border border-white/5 rounded-3xl p-6 md:p-8">
      <h3 className="text-xl font-bold text-white mb-6">Fundamentals</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-4">
        {data.map((item, idx) => (
          <div key={idx}>
            <p className="text-sm text-slate-400 mb-1">{item.label}</p>
            <p className="font-bold text-white text-lg">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

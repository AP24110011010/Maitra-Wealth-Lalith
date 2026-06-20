import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { StockData } from '@/lib/mock-data/stocks';

interface Props {
  stock: StockData;
}

export function FinancialCharts({ stock }: Props) {
  const [period, setPeriod] = useState<'Quarterly' | 'Annual'>('Annual');
  const [metric, setMetric] = useState<'revenue' | 'profit' | 'ebitda' | 'eps'>('revenue');

  const data = period === 'Quarterly' ? stock.financialsQuarterly : stock.financialsAnnual;

  const getMetricColor = () => {
    switch(metric) {
      case 'revenue': return '#3B82F6'; // Blue
      case 'profit': return '#14E6C9'; // Teal/Maitra
      case 'ebitda': return '#8B5CF6'; // Purple
      case 'eps': return '#F59E0B'; // Amber
      default: return '#14E6C9';
    }
  };

  const getMetricLabel = () => {
    switch(metric) {
      case 'revenue': return 'Revenue (Cr)';
      case 'profit': return 'Net Profit (Cr)';
      case 'ebitda': return 'EBITDA (Cr)';
      case 'eps': return 'EPS (₹)';
    }
  };

  return (
    <div className="bg-[#0F172A] border border-white/5 rounded-3xl p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h3 className="text-xl font-bold text-white">Financials</h3>
        
        <div className="flex bg-[#050B18] rounded-lg p-1 border border-white/10">
          <button 
            onClick={() => setPeriod('Quarterly')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${period === 'Quarterly' ? 'bg-[#1F2937] text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Quarterly
          </button>
          <button 
            onClick={() => setPeriod('Annual')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${period === 'Annual' ? 'bg-[#1F2937] text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Annual
          </button>
        </div>
      </div>

      <div className="flex gap-2 sm:gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { id: 'revenue', label: 'Revenue' },
          { id: 'profit', label: 'Profit' },
          { id: 'ebitda', label: 'EBITDA' },
          { id: 'eps', label: 'EPS' }
        ].map(m => (
          <button
            key={m.id}
            onClick={() => setMetric(m.id as any)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
              metric === m.id
                ? 'bg-white/10 text-white border-b-2 border-[#14E6C9]'
                : 'bg-transparent text-slate-400 border-b-2 border-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="period" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 12 }}
              tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(0)}k` : val}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ backgroundColor: '#050B18', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
              itemStyle={{ color: getMetricColor(), fontWeight: 'bold' }}
              labelStyle={{ color: '#94A3B8', marginBottom: '4px' }}
              formatter={(value: number) => [`${metric === 'eps' ? '₹' : '₹'}${value.toLocaleString()}${metric === 'eps' ? '' : ' Cr'}`, getMetricLabel()]}
            />
            <Bar 
              dataKey={metric} 
              radius={[4, 4, 0, 0]}
              maxBarSize={60}
              isAnimationActive={true}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry[metric]! >= 0 ? getMetricColor() : '#EF4444'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

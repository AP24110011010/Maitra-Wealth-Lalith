import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { StockData } from '@/lib/mock-data/stocks';

export function ShareholdingPattern({ stock }: { stock: StockData }) {
  const sh = stock.shareholding;
  const data = [
    { name: 'Promoters', value: sh.promoters, color: '#14E6C9' }, // Teal
    { name: 'Foreign Institutions', value: sh.fii, color: '#3B82F6' }, // Blue
    { name: 'Mutual Funds / DII', value: sh.dii, color: '#8B5CF6' }, // Purple
    { name: 'Retail / Public', value: sh.public, color: '#F59E0B' }, // Amber
    { name: 'Others', value: sh.others, color: '#64748B' }, // Slate
  ].filter(d => d.value > 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#050B18] border border-white/10 p-3 rounded-xl shadow-2xl">
          <p className="text-white font-medium">{payload[0].name}</p>
          <p className="text-lg font-bold" style={{ color: payload[0].payload.color }}>
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#0F172A] border border-white/5 rounded-3xl p-6 md:p-8">
      <h3 className="text-xl font-bold text-white mb-6">Shareholding Pattern</h3>
      
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-[200px] h-[200px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
                isAnimationActive={true}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 w-full flex flex-col gap-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-slate-300 group-hover:text-white transition-colors">{item.name}</span>
              </div>
              <span className="font-bold text-white">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

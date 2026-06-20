import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { generateHistoricalData } from '@/lib/mock-data/stocks';

interface ChartProps {
  symbol: string;
  isPositive: boolean;
  prevClose: number;
}

const TIMEFRAMES = ["1D", "1W", "1M", "3M", "6M", "1Y", "5Y", "MAX"];

export function InteractivePriceChart({ symbol, isPositive, prevClose }: ChartProps) {
  const [timeframe, setTimeframe] = useState("1D");
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const color = isPositive ? "#14E6C9" : "#EF4444"; // Maitra Accent or Red

  useEffect(() => {
    setIsLoading(true);
    // Simulate network request delay for realism and to show skeletons
    const timer = setTimeout(() => {
      setData(generateHistoricalData(symbol, timeframe));
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [symbol, timeframe]);

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0F172A] border border-white/10 p-3 rounded-xl shadow-2xl backdrop-blur-md">
          <p className="text-white font-bold text-lg">₹{payload[0].value.toFixed(2)}</p>
          <p className="text-slate-400 text-xs mt-1">{payload[0].payload.dateStr} {timeframe === '1D' ? payload[0].payload.timeStr : ''}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      {/* Timeframe Selectors */}
      <div className="flex justify-start md:justify-end gap-1 sm:gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {TIMEFRAMES.map(tf => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              timeframe === tf 
                ? 'bg-white/10 text-white shadow-inner' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Chart Area */}
      <div className="w-full h-[350px] sm:h-[450px] relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#0F172A]/50 backdrop-blur-sm rounded-2xl">
            <div className="w-8 h-8 border-4 border-[#14E6C9] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
            <XAxis dataKey={timeframe === '1D' ? 'timeStr' : 'dateStr'} hide />
            <YAxis domain={['dataMin - (dataMin * 0.01)', 'dataMax + (dataMax * 0.01)']} hide />
            
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1, strokeDasharray: '4 4' }} />
            
            {/* Base line for 1D chart to show absolute change visually */}
            {timeframe === '1D' && (
              <ReferenceLine y={prevClose} stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
            )}

            <Area
              type="monotone"
              dataKey="price"
              stroke={color}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorPrice)"
              activeDot={{ r: 6, fill: color, stroke: "#050B18", strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

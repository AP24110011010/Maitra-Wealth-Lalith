import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ComposedChart, Bar } from 'recharts';

interface ChartData {
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface CandlestickChartFallbackProps {
  data: ChartData[];
  mode: 'line' | 'candles';
}

const CandlestickShape = (props: any) => {
  const { x, y, width, height, open, close, high, low } = props;
  const isGrowing = close >= open;
  const color = isGrowing ? '#14E6C9' : '#EF4444';
  
  // yAxis scale maps high values to smaller y coordinates (top is 0)
  // So the highest point (max price) has the lowest y coordinate.
  // Wait, recharts payload has the raw values, we need to map them.
  // Since we use ComposedChart and Bar dataKey="close", `y` is the y-coord of `close`.
  // To draw correctly, we should use the axis scale from props if available.
  // Actually, Recharts provides `yAxis` scale function inside props if we dig into it, but an easier way is:
  // pass an array [low, high] to dataKey? No, for candlestick, the easiest is to use a Custom Shape on a BarChart where dataKey is `[open, close]`. 
  // If dataKey={['open', 'close']}, then `y` is the upper coordinate and `height` is the absolute difference.
  
  // Let's assume dataKey={['open', 'close']}
  // So y is min(y_open, y_close) and height is |y_open - y_close|.
  // We still need to draw the wick. We need the y-coordinates for high and low.
  // `yAxis.scale(val)` gives the y coordinate.
  
  // Let's get the scale:
  const { yAxis, xAxis } = props;
  if (!yAxis || !xAxis) return null;
  
  const yHigh = yAxis.scale(high);
  const yLow = yAxis.scale(low);
  const yOpen = yAxis.scale(open);
  const yClose = yAxis.scale(close);
  
  const wickX = x + width / 2;
  
  // Handle edge case where open == close (flat body)
  const bodyHeight = Math.max(Math.abs(yOpen - yClose), 1);
  const bodyY = Math.min(yOpen, yClose);

  return (
    <g>
      {/* Wick */}
      <line x1={wickX} y1={yHigh} x2={wickX} y2={yLow} stroke={color} strokeWidth={1} />
      {/* Body */}
      <rect 
        x={x} 
        y={bodyY} 
        width={width} 
        height={bodyHeight} 
        fill={color} 
        stroke={color} 
        strokeWidth={1} 
      />
    </g>
  );
};

const CustomCandlestickTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#0F172A] border border-white/10 rounded-xl p-3 shadow-xl text-xs text-white">
        <div className="text-slate-400 mb-2">{data.label}</div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <span className="text-slate-400">Open:</span>
          <span className="font-medium">₹{data.open.toFixed(2)}</span>
          <span className="text-slate-400">High:</span>
          <span className="font-medium">₹{data.high.toFixed(2)}</span>
          <span className="text-slate-400">Low:</span>
          <span className="font-medium">₹{data.low.toFixed(2)}</span>
          <span className="text-slate-400">Close:</span>
          <span className="font-medium">₹{data.close.toFixed(2)}</span>
          <span className="text-slate-400">Vol:</span>
          <span className="font-medium">{data.volume >= 1000 ? (data.volume/1000).toFixed(1) + 'K' : data.volume}</span>
        </div>
      </div>
    );
  }
  return null;
};

const CandlestickChartFallback: React.FC<CandlestickChartFallbackProps> = ({ data, mode }) => {
  if (!data || data.length === 0) return null;

  if (mode === 'line') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14E6C9" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#14E6C9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="label"
            tick={{ fill: '#64748B', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
            minTickGap={30}
          />
          <YAxis
            domain={['dataMin', 'dataMax']}
            tick={{ fill: '#64748B', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={60}
            tickFormatter={(v) => `₹${v}`}
            scale="linear"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F172A',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: '#fff',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            }}
            labelStyle={{ color: '#94A3B8', marginBottom: 4 }}
            formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Price']}
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="close"
            stroke="#14E6C9"
            strokeWidth={2.5}
            fill="url(#priceGrad)"
            animationDuration={800}
            animationEasing="ease-in-out"
            isAnimationActive={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  // Candles mode
  // We need to calculate domain for candles to include high and low
  const dataMin = Math.min(...data.map((d) => d.low));
  const dataMax = Math.max(...data.map((d) => d.high));
  // Add some padding
  const padding = (dataMax - dataMin) * 0.05;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <XAxis
          dataKey="label"
          tick={{ fill: '#64748B', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
          minTickGap={30}
        />
        <YAxis
          domain={[dataMin - padding, dataMax + padding]}
          tick={{ fill: '#64748B', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={60}
          tickFormatter={(v) => `₹${v.toFixed(0)}`}
        />
        <Tooltip content={<CustomCandlestickTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }} />
        {/* dataKey takes [open, close] so that YAxis scales properly and Bar gets the right body height automatically. The custom shape draws the rest. */}
        <Bar dataKey={(d) => [d.open, d.close]} shape={<CandlestickShape />} isAnimationActive={true} animationDuration={800} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CandlestickChartFallback;

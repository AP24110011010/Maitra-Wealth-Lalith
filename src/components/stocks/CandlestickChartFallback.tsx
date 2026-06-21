import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, CrosshairMode, IChartApi, ISeriesApi, CandlestickSeries } from 'lightweight-charts';

interface ChartData {
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  timestamp: number; // UNIX timestamp in seconds
}

interface CandlestickChartFallbackProps {
  data: ChartData[];
  mode: 'line' | 'candles';
}

const CandlestickChartFallback: React.FC<CandlestickChartFallbackProps> = ({ data, mode }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({ 
          width: chartContainerRef.current.clientWidth 
        });
      }
    };

    // Extract and validate OHLC data, convert to lightweight-charts format
    const validData = data
      .filter(d => 
        d.timestamp !== undefined && 
        !isNaN(d.timestamp) &&
        d.open !== undefined &&
        d.high !== undefined &&
        d.low !== undefined &&
        d.close !== undefined
      )
      .map(d => {
        // Enforce lightweight-charts strict OHLC rules
        const open = d.open;
        const close = d.close;
        const maxPrice = Math.max(open, close);
        const minPrice = Math.min(open, close);
        
        return {
          time: d.timestamp as any,
          open: open,
          close: close,
          high: Math.max(d.high, maxPrice),
          low: Math.min(d.low, minPrice),
        };
      });

    // Lightweight charts strictly requires ascending, unique time values.
    const uniqueData = Array.from(new Map(validData.map(item => [item.time, item])).values());
    uniqueData.sort((a, b) => a.time - b.time);

    if (uniqueData.length === 0) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#64748B',
        fontSize: 11,
        fontFamily: 'Inter, sans-serif',
      },
      grid: {
        vertLines: { color: 'rgba(255,255,255,0.03)' },
        horzLines: { color: 'rgba(255,255,255,0.03)' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          width: 1,
          color: 'rgba(255,255,255,0.2)',
          style: 3, // dashed
          labelBackgroundColor: '#0F172A',
        },
        horzLine: {
          width: 1,
          color: 'rgba(255,255,255,0.2)',
          style: 3,
          labelBackgroundColor: '#0F172A',
        },
      },
      rightPriceScale: {
        borderColor: 'rgba(255,255,255,0.1)',
        autoScale: true,
      },
      timeScale: {
        borderColor: 'rgba(255,255,255,0.1)',
        timeVisible: true,
        secondsVisible: false,
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
    });

    chartRef.current = chart;

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#14E6C9',
      downColor: '#EF4444',
      borderVisible: false,
      wickUpColor: '#14E6C9',
      wickDownColor: '#EF4444',
    });

    seriesRef.current = candlestickSeries;

    try {
       console.log("Setting Candlestick Data:", uniqueData.slice(0, 5));
       candlestickSeries.setData(uniqueData);
       chart.timeScale().fitContent();
    } catch(e) {
       console.error("Lightweight charts error setting data:", e, uniqueData);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [data]);

  return (
    <div className="w-full h-full relative">
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
};

export default CandlestickChartFallback;

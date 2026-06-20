import React, { useEffect, useRef, useState } from 'react';

// Declare TradingView namespace for TypeScript
declare global {
  interface Window {
    TradingView: any;
  }
}

interface TradingViewChartProps {
  symbol: string;
  chartMode: 'line' | 'candles';
  timeframe: string;
  fallbackComponent: React.ReactNode;
}

const getTimeframeInterval = (tf: string) => {
  switch (tf) {
    case '1D': return '5'; // 5 minutes
    case '1W': return '60'; // 1 hour
    case '1M': return 'D';
    case '3M': return 'D';
    case '6M': return 'D';
    case '1Y': return 'D';
    case '5Y': return 'W';
    case 'MAX': return 'M';
    default: return 'D';
  }
};

const TradingViewChart: React.FC<TradingViewChartProps> = ({ symbol, chartMode, timeframe, fallbackComponent }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let script: HTMLScriptElement | null = null;
    let timeoutId: ReturnType<typeof setTimeout>;

    const initWidget = () => {
      if (typeof window.TradingView === 'undefined') {
        setLoadError(true);
        setIsLoading(false);
        return;
      }

      if (containerRef.current) {
        // Clear previous widget content completely to prevent multiple widgets piling up
        containerRef.current.innerHTML = '';
      }

      try {
        new window.TradingView.widget({
          autosize: true,
          symbol: `BSE:${symbol}`,
          interval: getTimeframeInterval(timeframe),
          timezone: 'Asia/Kolkata',
          theme: 'dark',
          style: chartMode === 'candles' ? '1' : '2',
          locale: 'en',
          enable_publishing: false,
          backgroundColor: '#050B18',
          gridColor: 'rgba(255, 255, 255, 0.06)',
          hide_top_toolbar: true,
          hide_legend: true,
          save_image: false,
          container_id: containerRef.current?.id,
        });
        setIsLoading(false);
      } catch (err) {
        console.error('TradingView Widget Error:', err);
        setLoadError(true);
        setIsLoading(false);
      }
    };

    const loadScript = () => {
      // Check if already loaded
      if (document.getElementById('tradingview-widget-script')) {
        initWidget();
        return;
      }

      script = document.createElement('script');
      script.id = 'tradingview-widget-script';
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = () => {
        clearTimeout(timeoutId);
        initWidget();
      };
      script.onerror = () => {
        clearTimeout(timeoutId);
        setLoadError(true);
        setIsLoading(false);
      };
      document.body.appendChild(script);

      // Fallback timeout in case script hangs
      timeoutId = setTimeout(() => {
        setLoadError(true);
        setIsLoading(false);
      }, 5000);
    };

    setLoadError(false);
    setIsLoading(true);
    loadScript();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [symbol, chartMode, timeframe]);

  if (loadError) {
    return <>{fallbackComponent}</>;
  }

  return (
    <div style={{ height: '500px', position: 'relative', width: '100%' }}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0F172A]/80 backdrop-blur-sm rounded-xl">
          <div className="w-8 h-8 border-4 border-[#14E6C9] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div 
        id={`tv_chart_${symbol.toLowerCase()}`} 
        ref={containerRef} 
        style={{ height: '100%', width: '100%', borderRadius: '12px', overflow: 'hidden' }} 
      />
    </div>
  );
};

export default TradingViewChart;

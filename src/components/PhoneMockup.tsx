import React from 'react';

interface PhoneMockupProps {
  screenshotSrc?: string;
  className?: string;
}

export function PhoneMockup({ screenshotSrc, className = '' }: PhoneMockupProps) {
  return (
    <div className={`relative mx-auto border-[#1F2937] bg-[#1F2937] border-[12px] rounded-[3rem] h-[650px] w-[320px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] transform perspective-1000 ${className}`}>
      {/* Outer Glow / Bevel Simulation */}
      <div className="absolute -inset-[1px] rounded-[2.8rem] border border-white/20 pointer-events-none z-30"></div>

      {/* Notch */}
      <div className="w-[120px] h-[28px] bg-[#1F2937] top-0 rounded-b-3xl left-1/2 -translate-x-1/2 absolute z-20 flex items-center justify-end px-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[#0A0A0A] border border-white/5 shadow-inner"></div>
      </div>
      
      {/* Left buttons */}
      <div className="h-[46px] w-[4px] bg-[#374151] absolute -left-[14px] top-[124px] rounded-l-md shadow-md"></div>
      <div className="h-[46px] w-[4px] bg-[#374151] absolute -left-[14px] top-[178px] rounded-l-md shadow-md"></div>
      
      {/* Right button */}
      <div className="h-[64px] w-[4px] bg-[#374151] absolute -right-[14px] top-[142px] rounded-r-md shadow-md"></div>
      
      {/* Screen container */}
      <div className="rounded-[2.2rem] overflow-hidden w-full h-full bg-background relative z-10 border border-black shadow-inner">
        
        {/* Subtle Glare overlay */}
        <div className="absolute top-0 right-0 w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-y-1/2 translate-x-1/4 -rotate-45 pointer-events-none z-50"></div>

        {screenshotSrc ? (
          <img src={screenshotSrc} className="w-full h-full object-cover" alt="App Screenshot" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-primary/20 blur-[60px] pointer-events-none"></div>

            {/* Realistic Trading App UI */}
            <div className="w-full h-full flex flex-col relative z-10 px-4 pt-14 pb-2">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(0,208,156,0.2)]">
                     <div className="w-5 h-5 rounded-full bg-primary"></div>
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[10px] text-slate-400 font-medium">Portfolio Value</span>
                     <span className="text-sm font-bold text-white tracking-tight">₹ 14,82,504.00</span>
                   </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full border border-white/40"></div>
                </div>
              </div>
              
              {/* Performance Card */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl mb-6 flex flex-col relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] pointer-events-none"></div>
                 <div className="text-[11px] text-slate-400 mb-1">Today's Profit</div>
                 <div className="text-xl font-bold text-green-400 mb-4">+ ₹ 12,450.50 (0.84%)</div>
                 <div className="flex gap-2">
                   <div className="h-1.5 flex-[4] rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                   <div className="h-1.5 flex-[1] rounded-full bg-white/10"></div>
                   <div className="h-1.5 flex-[2] rounded-full bg-white/10"></div>
                 </div>
              </div>

              {/* Watchlist Section */}
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-sm font-bold text-white">Watchlist</h3>
                <span className="text-[10px] text-primary font-bold">View All</span>
              </div>
              
              <div className="space-y-3 flex-1 overflow-y-auto scrollbar-hide">
                {[
                  { symbol: "RELIANCE", name: "Reliance Ind.", price: "2,930.15", change: "+1.24%", up: true },
                  { symbol: "HDFCBANK", name: "HDFC Bank Ltd.", price: "1,615.50", change: "-0.45%", up: false },
                  { symbol: "TCS", name: "Tata Consultancy", price: "3,980.20", change: "+0.80%", up: true },
                  { symbol: "INFY", name: "Infosys Ltd.", price: "1,490.00", change: "-1.10%", up: false },
                  { symbol: "SBI", name: "State Bank India", price: "831.20", change: "+5.05%", up: true },
                ].map((stock, i) => (
                  <div key={i} className="w-full rounded-2xl bg-white/[0.03] border border-white/5 p-3 flex justify-between items-center transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center font-bold text-[10px] text-white">
                        {stock.symbol.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white">{stock.symbol}</span>
                        <span className="text-[9px] text-slate-500">{stock.name}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold text-white">{stock.price}</span>
                      <span className={`text-[10px] font-bold ${stock.up ? "text-green-400" : "text-red-400"}`}>
                        {stock.up ? "▲" : "▼"} {stock.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Bottom Nav Placeholder */}
            <div className="h-[80px] w-full flex justify-around items-center px-6 bg-background/80 backdrop-blur-md border-t border-white/5 relative z-10 pb-4 pt-2">
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-6 h-6 rounded bg-primary shadow-[0_0_10px_rgba(0,208,156,0.5)]"></div>
                <div className="w-8 h-1 rounded-full bg-primary"></div>
              </div>
              <div className="flex flex-col items-center gap-1.5 opacity-50">
                <div className="w-6 h-6 rounded bg-white/40"></div>
                <div className="w-8 h-1 rounded-full bg-transparent"></div>
              </div>
              <div className="flex flex-col items-center gap-1.5 opacity-50">
                <div className="w-6 h-6 rounded bg-white/40"></div>
                <div className="w-8 h-1 rounded-full bg-transparent"></div>
              </div>
              <div className="flex flex-col items-center gap-1.5 opacity-50">
                <div className="w-6 h-6 rounded bg-white/40"></div>
                <div className="w-8 h-1 rounded-full bg-transparent"></div>
              </div>
            </div>
            
            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/30 rounded-full z-20"></div>
          </div>
        )}
      </div>
    </div>
  );
}

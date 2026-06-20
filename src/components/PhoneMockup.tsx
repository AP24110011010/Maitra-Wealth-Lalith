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

            {/* Abstract placeholder layout */}
            <div className="w-full px-5 pt-16 pb-4 space-y-6 flex-1 relative z-10">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(0,208,156,0.3)]">
                     <div className="w-6 h-6 rounded-full bg-primary"></div>
                   </div>
                   <div className="space-y-1.5">
                     <div className="w-16 h-3 rounded bg-white/20"></div>
                     <div className="w-10 h-2 rounded bg-white/10"></div>
                   </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10"></div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl">
                 <div className="w-20 h-3 rounded bg-white/40 mb-2"></div>
                 <div className="w-3/4 h-8 rounded-lg bg-white/80 mb-4"></div>
                 <div className="flex gap-2">
                   <div className="h-2 flex-1 rounded bg-primary"></div>
                   <div className="h-2 flex-1 rounded bg-white/10"></div>
                   <div className="h-2 flex-1 rounded bg-white/10"></div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="h-28 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-3 shadow-lg">
                   <div className="w-8 h-8 rounded-full bg-primary/20 mb-3"></div>
                   <div className="w-full h-2 rounded bg-white/20 mb-2"></div>
                   <div className="w-1/2 h-2 rounded bg-white/10"></div>
                </div>
                <div className="h-28 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-3 shadow-lg">
                   <div className="w-8 h-8 rounded-full bg-purple-500/20 mb-3"></div>
                   <div className="w-full h-2 rounded bg-white/20 mb-2"></div>
                   <div className="w-1/2 h-2 rounded bg-white/10"></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center px-4 gap-3">
                   <div className="w-8 h-8 rounded bg-white/10"></div>
                   <div className="w-1/2 h-3 rounded bg-white/20"></div>
                </div>
                <div className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center px-4 gap-3">
                   <div className="w-8 h-8 rounded bg-white/10"></div>
                   <div className="w-1/2 h-3 rounded bg-white/20"></div>
                </div>
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

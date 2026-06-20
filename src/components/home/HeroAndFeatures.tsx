import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneMockup } from "@/components/PhoneMockup";
import { AreaChart, Area, ResponsiveContainer, CartesianGrid, YAxis } from "recharts";
import { fadeIn } from "@/lib/animations";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { 
  Search, Play, Apple, QrCode, UserPlus, 
  LineChart, ArrowRight, ShieldCheck, Zap, Globe, Shield, Award, Users
} from "lucide-react";

const mockChartData = [
  { time: '09:15', price: 2890 },
  { time: '10:00', price: 2910 },
  { time: '11:00', price: 2905 },
  { time: '12:00', price: 2925 },
  { time: '13:00', price: 2915 },
  { time: '14:00', price: 2940 },
  { time: '15:00', price: 2920 },
  { time: '15:30', price: 2930.15 },
];

export function HeroSection() {
  return (
    <AnimatedSection className="relative w-full min-h-[calc(100vh-76px)] flex items-start pt-8 pb-12 overflow-hidden bg-[#050B18]">
      {/* Abstract Financial Geometry Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-transparent opacity-60 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#14E6C9]/10 via-background to-transparent opacity-40 blur-3xl pointer-events-none"></div>
      
      {/* Grid Pattern with Vignette */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none"></div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col items-start text-left">
            <motion.div variants={fadeIn} className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass mb-8 border-primary/30">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-sm font-semibold tracking-wide text-white uppercase">The Future of Wealth Management</span>
            </motion.div>

            <motion.h1 
              variants={fadeIn} 
              className="text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold text-white mb-8 tracking-tight leading-[1.1]"
            >
              Trade, Invest, <br />& Grow with <br />
              <span className="bg-gradient-to-r from-[#14E6C9] to-[#3DD9FF] bg-clip-text text-transparent">Maitra.</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeIn} 
              className="text-lg text-[#B8C2D0] font-light mb-12 max-w-[550px] leading-relaxed"
            >
              Experience an institutional-grade platform designed for retail investors. Fast, secure, and built for your financial success.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4 mb-12">
              <Link href="/open-account">
                <Button size="lg" className="h-12 px-8 text-base font-bold bg-gradient-to-r from-[#14E6C9] to-[#0FD4B8] text-slate-900 shadow-[0_0_20px_rgba(20,230,201,0.3)] rounded-full flex items-center gap-3 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(20,230,201,0.5)] transition-all duration-250">
                  Open Demat Account <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/stocks">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base font-medium border border-white/10 text-white bg-white/5 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] rounded-full flex items-center gap-3 hover:scale-[1.03] transition-all duration-250 backdrop-blur-md">
                  <LineChart className="w-4 h-4" /> Explore Markets
                </Button>
              </Link>
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 cursor-pointer transition-all hover:scale-[1.03]">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 cursor-pointer transition-all hover:scale-[1.03]">
                  <Apple className="w-5 h-5" />
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="w-full max-w-[550px] relative border border-white/10 bg-white/5 backdrop-blur-md rounded-full p-1.5 pl-5 flex items-center shadow-xl">
              <Search className="h-4 w-4 text-slate-400 mr-2 shrink-0" />
              <input 
                placeholder="Search Reliance, TCS, HDFC..." 
                className="w-full bg-transparent text-white placeholder:text-[#B8C2D0] focus:outline-none text-base"
              />
              <Button className="rounded-full px-5 h-10 bg-gradient-to-r from-[#14E6C9] to-[#0FD4B8] text-slate-900 hover:scale-[1.03] transition-all duration-250 shrink-0 ml-2 shadow-[0_0_15px_rgba(20,230,201,0.2)] font-semibold text-sm">Search</Button>
            </motion.div>
          </div>

          {/* Right Column: Premium Phones Mockup */}
          <motion.div variants={fadeIn} className="relative hidden lg:flex justify-center items-center h-[600px]">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#14E6C9]/20 blur-[100px] rounded-full pointer-events-none"></div>
            
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-32 top-5 transform rotate-[-8deg] scale-[0.70] opacity-80"
            >
              <PhoneMockup />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute right-0 top-20 z-10 drop-shadow-2xl scale-[0.80]"
            >
              <PhoneMockup />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function MarketTicker() {
  const indices = [
    { name: "NIFTY 50", value: 24261.60, change: 12.40, changePercent: 0.05 },
    { name: "SENSEX", value: 79958.00, change: 45.20, changePercent: 0.06 },
    { name: "BANKNIFTY", value: 52360.20, change: -110.50, changePercent: -0.21 },
    { name: "FINNIFTY", value: 23620.10, change: -42.80, changePercent: -0.18 },
    { name: "MIDCPNIFTY", value: 12150.40, change: 85.30, changePercent: 0.71 }
  ];
  
  return (
    <div className="w-full glass-card border-x-0 rounded-none text-slate-300 text-sm py-5 overflow-hidden flex whitespace-nowrap z-20 relative group">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
          will-change: transform;
        }
      `}} />
      <div className="flex w-max animate-infinite-scroll group-hover:[animation-play-state:paused]">
        {[0, 1].map((block) => (
          <div key={block} className="flex shrink-0 gap-16 pr-16">
            {[...indices, ...indices, ...indices, ...indices].map((idx, i) => (
              <div key={i} className="flex items-center gap-4 font-medium tracking-wide shrink-0">
                <span className="text-white font-bold">{idx.name}</span>
                <span className="text-slate-300">{idx.value.toFixed(2)}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${idx.change >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                  {idx.change >= 0 ? "+" : ""}{idx.change.toFixed(2)} ({idx.changePercent.toFixed(2)}%)
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrustIndicators() {
  return (
    <AnimatedSection className="py-14 bg-background border-b border-white/5">
      <div className="container mx-auto px-4 max-w-[1440px]">
        <motion.div variants={fadeIn} className="flex flex-col items-center justify-center">
          <p className="text-slate-500 uppercase tracking-widest text-sm font-semibold mb-10">Trusted by Regulatory Bodies & 100,000+ Investors</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholders for logos */}
            <div className="flex items-center gap-3"><Shield className="w-8 h-8 text-slate-400"/><span className="text-2xl font-bold text-slate-400">SEBI</span></div>
            <div className="flex items-center gap-3"><Globe className="w-8 h-8 text-slate-400"/><span className="text-2xl font-bold text-slate-400">NSE</span></div>
            <div className="flex items-center gap-3"><Award className="w-8 h-8 text-slate-400"/><span className="text-2xl font-bold text-slate-400">BSE</span></div>
            <div className="flex items-center gap-3"><Zap className="w-8 h-8 text-slate-400"/><span className="text-2xl font-bold text-slate-400">MCX</span></div>
            <div className="flex items-center gap-3"><Users className="w-8 h-8 text-slate-400"/><span className="text-2xl font-bold text-slate-400">CDSL</span></div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

export function WhyMaitra() {
  return (
    <AnimatedSection className="py-24 bg-card relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div variants={fadeIn}>
            <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-bold tracking-widest uppercase mb-8">Quick & Easy Onboarding</span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
              Start building your wealth <span className="text-slate-500">today.</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg">
              Join thousands of investors who trust Maitra for their financial journey. Open your account in minutes with zero paperwork.
            </p>

            <div className="space-y-10">
              <div className="flex gap-6 group">
                <div className="shrink-0 mt-1">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
                    <UserPlus className="w-7 h-7 text-white group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">5-Minute Account Opening</h3>
                  <p className="text-slate-400 text-base">Fully digital KYC process. No physical documents required.</p>
                </div>
              </div>
              
              <div className="flex gap-6 group">
                <div className="shrink-0 mt-1">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-primary/20 group-hover:border-primary/50 transition-all">
                    <ShieldCheck className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Bank-Grade Security</h3>
                  <p className="text-slate-400 text-base">Your funds and personal data are protected with enterprise-level encryption.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm aspect-[3/4] glass-card rounded-[2rem] p-6 flex flex-col items-center justify-center text-center overflow-hidden">
               {/* Decorative elements */}
               <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/30 rounded-full blur-[80px]"></div>
               <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>

               <div className="w-40 h-40 bg-white rounded-3xl p-3 shadow-2xl mb-10 relative z-10 transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                  <div className="w-full h-full border-4 border-dashed border-slate-200 rounded-2xl flex items-center justify-center bg-slate-50">
                    <QrCode className="w-16 h-16 text-slate-800" />
                  </div>
               </div>
               <h3 className="text-3xl font-bold text-white mb-4 relative z-10">Scan to Download</h3>
               <p className="text-slate-400 text-lg relative z-10">Get the Maitra app on iOS & Android instantly.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </AnimatedSection>
  );
}

export function PlatformShowcase() {
  return (
    <AnimatedSection className="relative w-full pt-20 pb-24 flex flex-col items-center overflow-hidden">
      {/* Split Background */}
      <div className="absolute inset-0 z-0 flex flex-col">
        <div className="h-[60%] bg-[#14E6C9]"></div>
        <div className="h-[40%] bg-[#050B18]"></div>
      </div>
      
      {/* Grid Pattern overlay for the top part */}
      <div className="absolute top-0 left-0 w-full h-[60%] bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] z-0"></div>

      <motion.div variants={fadeIn} className="relative z-10 w-full text-center px-4 mb-14 max-w-[1440px]">
        <h2 className="text-4xl md:text-6xl font-extrabold text-[#050B18] tracking-tight leading-[1.05]">All Assets, One Platform</h2>
      </motion.div>
      
      {/* Laptop Mockup Wrapper */}
      <motion.div 
        variants={fadeIn} 
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-full max-w-[1000px] px-4 perspective-[2000px] flex flex-col items-center"
      >
        {/* Screen Bezel */}
        <div className="w-full aspect-[16/7] bg-[#111111] rounded-[2rem] p-3 md:p-5 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative border border-[#333] transform rotateX-[4deg] transform-origin-bottom">
          
          {/* Webcam */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black border border-[#222] flex items-center justify-center">
             <div className="w-1 h-1 rounded-full bg-[#14E6C9] opacity-30"></div>
          </div>

          {/* Terminal Content */}
          <div className="w-full h-full bg-[#050B18] rounded-xl border border-white/10 overflow-hidden relative flex flex-col">
             
             {/* Top Navbar */}
             <div className="h-14 bg-[#0F172A] border-b border-white/5 flex items-center px-4 justify-between text-xs text-slate-300 shrink-0">
               <div className="flex gap-4 items-center">
                 <div className="w-6 h-6 rounded-full bg-[#14E6C9]/20 flex items-center justify-center text-[#14E6C9]"><Shield className="w-3 h-3" /></div>
                 <div className="flex flex-col">
                   <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Nifty 50</span>
                   <span className="text-green-400 font-medium">24261.60</span>
                 </div>
                 <div className="w-px h-6 bg-white/10"></div>
                 <div className="flex flex-col">
                   <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">BankNifty</span>
                   <span className="text-green-400 font-medium">52360.20</span>
                 </div>
               </div>

               <div className="hidden lg:flex gap-8">
                 <div className="flex items-center gap-2 text-white font-medium"><LineChart className="w-4 h-4"/> Dashboard</div>
                 <div className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer"><Search className="w-4 h-4"/> Orders</div>
                 <div className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer"><Users className="w-4 h-4"/> Portfolio</div>
                 <div className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer"><ShieldCheck className="w-4 h-4"/> Funds</div>
               </div>

               <div className="flex items-center gap-4">
                 <div className="hidden md:flex items-center bg-black/40 rounded-full px-4 py-1.5 border border-white/5 text-slate-500 cursor-text">
                   <Search className="w-3.5 h-3.5 mr-2" />
                   <span>Search instruments...</span>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors"><Users className="w-4 h-4 text-white" /></div>
               </div>
             </div>

             <div className="flex flex-1 min-h-0 p-2 gap-2">
               {/* Left Sidebar */}
               <div className="w-64 bg-[#0F172A] rounded-lg border border-white/5 flex flex-col h-full overflow-hidden hidden sm:flex shrink-0">
                 <div className="flex p-2 gap-1 border-b border-white/5">
                   <div className="flex-1 bg-[#14E6C9] text-[#050B18] text-center text-[10px] font-bold py-2 rounded-md uppercase tracking-wider">Market Watch</div>
                   <div className="flex-1 bg-transparent text-slate-400 text-center text-[10px] font-bold py-2 rounded-md uppercase tracking-wider hover:bg-white/5 cursor-pointer transition-colors">Easy Screen</div>
                 </div>
                 <div className="p-2">
                   <div className="bg-black/40 border border-white/5 rounded-md px-3 py-2 flex items-center text-xs text-slate-500 cursor-text hover:bg-white/5 transition-colors">
                     <Search className="w-3.5 h-3.5 mr-2" /> Add Symbols
                   </div>
                 </div>
                 <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col scrollbar-hide">
                   {[
                     { name: 'RELIANCE', change: '+1.2%', up: true, price: '2,930.15' }, 
                     { name: 'HDFCBANK', change: '-0.4%', up: false, price: '1,615.50' }, 
                     { name: 'TCS', change: '+0.8%', up: true, price: '3,980.20' }, 
                     { name: 'INFY', change: '-1.1%', up: false, price: '1,490.00' }, 
                     { name: 'ICICIBANK', change: '+2.4%', up: true, price: '1,250.75' },
                     { name: 'SBI', change: '+0.6%', up: true, price: '831.20' },
                     { name: 'ITC', change: '-0.2%', up: false, price: '450.60' },
                     { name: 'LT', change: '+1.5%', up: true, price: '3,540.00' }
                   ].map((stock, i) => (
                     <div key={stock.name} className={`px-4 py-3 flex justify-between items-center text-xs border-b border-white/5 cursor-pointer transition-colors ${i===5 ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                       <div>
                         <div className="text-white font-bold">{stock.name}</div>
                         <div className="text-slate-500 text-[10px] font-medium mt-0.5 tracking-wider">NSE</div>
                       </div>
                       <div className="text-right">
                         <div className={stock.up ? "text-green-400 font-bold" : "text-red-400 font-bold"}>{stock.price}</div>
                         <div className={stock.up ? "text-green-400 text-[10px] font-medium mt-0.5" : "text-red-400 text-[10px] font-medium mt-0.5"}>{stock.up ? '▲' : '▼'} {stock.change}</div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

               {/* Main Content */}
               <div className="flex-1 bg-[#0F172A] rounded-lg border border-white/5 flex flex-col overflow-hidden p-4 min-w-0">
                 {/* Header */}
                 <div className="flex justify-between items-start mb-6 shrink-0">
                   <div>
                     <div className="flex items-center gap-3 mb-2">
                       <div className="w-8 h-8 rounded-full bg-[#14E6C9] flex items-center justify-center text-[#050B18] font-black text-sm">S</div>
                       <h2 className="text-white font-extrabold text-xl md:text-2xl tracking-tight">State Bank Of India <span className="text-slate-500 text-sm ml-2 font-semibold">SBI</span></h2>
                     </div>
                     <div className="flex items-baseline gap-3">
                       <span className="text-3xl md:text-4xl font-black text-white tracking-tight">831.20</span>
                       <span className="text-green-400 text-sm font-bold bg-green-500/10 px-2 py-0.5 rounded-md">▲ 5.05 (0.61%)</span>
                     </div>
                   </div>
                   <div className="flex gap-3">
                     <Button className="bg-green-500 hover:bg-green-600 shadow-[0_0_15px_rgba(34,197,94,0.3)] h-10 px-8 text-sm font-bold text-white hover:scale-105 transition-all">BUY</Button>
                     <Button className="bg-red-500 hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.3)] h-10 px-8 text-sm font-bold text-white hover:scale-105 transition-all">SELL</Button>
                   </div>
                 </div>

                 {/* Tabs */}
                 <div className="flex gap-2 border-b border-white/10 pb-3 mb-6 shrink-0 overflow-x-auto scrollbar-hide">
                   {['Overview', 'Technicals', 'Option Chain', 'Futures', 'Financials', 'About'].map((tab, i) => (
                     <div key={tab} className={`px-5 py-2 text-sm font-bold rounded-md whitespace-nowrap transition-colors ${i === 0 ? 'bg-[#14E6C9]/20 text-[#14E6C9]' : 'text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer'}`}>
                       {tab}
                     </div>
                   ))}
                 </div>

                 {/* Chart & Stats Area */}
                 <div className="flex-1 flex gap-4 min-h-0">
                   {/* Chart Area */}
                   <div className="flex-[2] relative rounded-xl border border-white/5 overflow-hidden bg-[#050B18] min-h-0">
                      <div className="absolute top-4 left-4 z-10 flex gap-2">
                         {['1D', '1W', '1M', '1Y', 'ALL'].map((tf, i) => (
                           <div key={tf} className={`px-3 py-1 text-xs font-bold rounded-md cursor-pointer transition-colors ${i === 0 ? 'bg-[#14E6C9] text-[#050B18]' : 'text-slate-400 hover:bg-white/10'}`}>{tf}</div>
                         ))}
                      </div>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockChartData} margin={{ top: 50, right: 0, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="terminalGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.03)" vertical={false} />
                          <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide />
                          <Area type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={3} fill="url(#terminalGrad)" isAnimationActive={false} />
                        </AreaChart>
                      </ResponsiveContainer>
                   </div>
                   
                   {/* Market Info Sidebar */}
                   <div className="flex-1 flex-col gap-4 min-h-0 overflow-y-auto scrollbar-hide hidden lg:flex shrink-0">
                      {/* Market Depth */}
                      <div className="bg-[#050B18] rounded-xl border border-white/5 p-4 flex flex-col justify-between shrink-0">
                         <h3 className="text-white text-xs font-bold mb-3 uppercase tracking-wider">Market Depth</h3>
                         <div className="flex gap-4 text-[10px]">
                            <div className="flex-1">
                               <div className="flex justify-between text-slate-500 mb-2 border-b border-white/5 pb-1"><span>Orders</span><span>Qty</span><span className="text-green-400">Bid</span></div>
                               <div className="flex justify-between text-slate-300 mb-1"><span>6</span><span>1834</span><span className="text-green-400 font-bold">831.15</span></div>
                               <div className="flex justify-between text-slate-300 mb-1"><span>8</span><span>194</span><span className="text-green-400 font-bold">831.10</span></div>
                               <div className="flex justify-between text-slate-300 mb-1"><span>10</span><span>2154</span><span className="text-green-400 font-bold">831.05</span></div>
                               <div className="flex justify-between text-slate-300 mb-1"><span>7</span><span>1405</span><span className="text-green-400 font-bold">831.00</span></div>
                               <div className="flex justify-between font-bold mt-2 pt-2 border-t border-white/5"><span className="text-slate-500">Total</span><span className="text-green-400">910,700</span><span></span></div>
                            </div>
                            <div className="flex-1">
                               <div className="flex justify-between text-slate-500 mb-2 border-b border-white/5 pb-1"><span className="text-red-400">Ask</span><span>Qty</span><span>Orders</span></div>
                               <div className="flex justify-between text-slate-300 mb-1"><span className="text-red-400 font-bold">831.20</span><span>2451</span><span>18</span></div>
                               <div className="flex justify-between text-slate-300 mb-1"><span className="text-red-400 font-bold">831.25</span><span>2850</span><span>13</span></div>
                               <div className="flex justify-between text-slate-300 mb-1"><span className="text-red-400 font-bold">831.30</span><span>1016</span><span>12</span></div>
                               <div className="flex justify-between text-slate-300 mb-1"><span className="text-red-400 font-bold">831.35</span><span>858</span><span>10</span></div>
                               <div className="flex justify-between font-bold mt-2 pt-2 border-t border-white/5"><span></span><span className="text-red-400">1,616,105</span><span className="text-slate-500">Total</span></div>
                            </div>
                         </div>
                         <div className="w-full h-2 bg-white/5 rounded-full mt-4 flex overflow-hidden">
                            <div className="h-full bg-green-500" style={{width: '36%'}}></div>
                            <div className="h-full bg-red-500" style={{width: '64%'}}></div>
                         </div>
                      </div>

                      {/* Performance */}
                      <div className="bg-[#050B18] rounded-xl border border-white/5 p-4 shrink-0">
                         <h3 className="text-white text-xs font-bold mb-3 uppercase tracking-wider">Performance</h3>
                         <div className="flex justify-between text-[11px] mb-2">
                            <div className="flex flex-col"><span className="text-slate-500">Today Low</span><span className="text-white font-bold">825.00</span></div>
                            <div className="flex flex-col items-end"><span className="text-slate-500">Today High</span><span className="text-white font-bold">833.40</span></div>
                         </div>
                         <div className="relative w-full h-1.5 bg-white/10 rounded-full mb-5">
                            <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#14E6C9] rounded-full shadow-[0_0_8px_#14E6C9]" style={{left: '60%'}}></div>
                         </div>
                         
                         <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[11px]">
                            <div><div className="text-slate-500 mb-0.5">Open</div><div className="text-white font-bold">829.00</div></div>
                            <div><div className="text-slate-500 mb-0.5">Prev. Close</div><div className="text-white font-bold">826.15</div></div>
                            <div><div className="text-slate-500 mb-0.5">Volume</div><div className="text-white font-bold">1,06,32,201</div></div>
                            <div><div className="text-slate-500 mb-0.5">Avg. Price</div><div className="text-white font-bold">829.55</div></div>
                         </div>
                      </div>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Laptop Base (Keyboard & Trackpad) in 3D */}
        <div className="w-[105%] h-8 md:h-12 bg-gradient-to-b from-[#b5b5b5] to-[#737373] rounded-b-[2rem] border-t border-[#d4d4d4] shadow-[0_50px_100px_rgba(0,0,0,0.9)] relative flex justify-center items-start -mt-2.5 z-20">
           <div className="w-1/4 h-2 md:h-3 bg-[#525252] rounded-b-[10px] mt-0 shadow-inner"></div>
        </div>
        
        <div className="absolute bottom-[-24px] md:bottom-[-28px] z-30">
           <Button className="bg-gradient-to-r from-[#14E6C9] to-[#0FD4B8] hover:to-[#14E6C9] text-[#050B18] shadow-[0_15px_40px_rgba(20,230,201,0.5)] hover:scale-105 px-8 md:px-12 h-12 md:h-14 rounded-full font-black text-base md:text-lg transition-all border-[4px] border-[#050B18]">
             Login to Maitra <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6" />
           </Button>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

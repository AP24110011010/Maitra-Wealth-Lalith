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
  LineChart, ArrowRight, ShieldCheck, Zap, Globe, Shield, Award, Users, Smartphone
} from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

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
  const words = [
    { text: "STOCKS", color: "#2563EB" },
    { text: "COMMODITIES", color: "#14B8A6" },
    { text: "MUTUAL FUNDS", color: "#FF6B00" },
    { text: "FUTURES", color: "#4F46E5" },
    { text: "OPTIONS", color: "#F59E0B" },
    { text: "IPO", color: "#EC4899" },
  ];
  
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return ( <AnimatedSection className="relative w-full min-h-[calc(100vh-62px)] flex items-center pt-0 pb-6 overflow-hidden bg-[#050B18]">
      {/* Abstract Financial Geometry Background */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1F3BB3]/20 via-[#050B18] to-transparent opacity-70 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#22D3EE]/15 via-[#050B18] to-transparent opacity-60 blur-[100px] pointer-events-none"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none"></div>

      {/* Abstract Particles */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_15px_#22D3EE]"
      ></motion.div>
      <motion.div 
        animate={{ y: [0, 30, 0], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[30%] right-[20%] w-3 h-3 rounded-full bg-[#FF6B00] shadow-[0_0_20px_#FF6B00]"
      ></motion.div>
      <motion.div 
        animate={{ y: [0, -15, 0], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[40%] right-[10%] w-1.5 h-1.5 rounded-full bg-[#1F3BB3] shadow-[0_0_10px_#1F3BB3]"
      ></motion.div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col items-start text-left">
            <motion.div variants={fadeIn} className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass mb-8 border-[#1F3BB3]/30">
              <span className="flex h-2 w-2 rounded-full bg-[#22D3EE] animate-pulse"></span>
              <span className="text-sm font-semibold tracking-wide text-white uppercase">The Future of Wealth Management</span>
            </motion.div>

            <motion.div variants={fadeIn} style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
                fontSize: "clamp(52px,6vw,70px)"
              }} className="text-white mb-4 tracking-tighter whitespace-nowrap">
              <div style={{ color: "#F8FAFC" }}>Trading Simplified in</div>
              <div className="h-[1.1em] relative overflow-hidden w-full" style={{ color: words[wordIndex].color }}>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={wordIndex}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "anticipate" }}
                    className="absolute inset-0 whitespace-nowrap text-ellipsis"
                  >
                    {words[wordIndex].text}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
            
            <motion.p 
              variants={fadeIn} 
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "18px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.72)"
              }}
              className="mb-8 max-w-[560px] leading-relaxed"
            >
              Invest confidently with institutional-grade technology, lightning-fast execution, and seamless access to India's financial markets.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4 mb-8">
              <Link href="/open-account">
                <Button size="lg" className="h-13 rounded-full shadow-[0_4px_12px_rgba(255,107,0,0.2)] bg-gradient-to-r from-[#FF6B00] to-[#ff8c33] text-white hover:-translate-y-1 transition-all duration-200">
                  Open Demat Account <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/stocks">
                <Button size="lg" variant="outline" className="h-13 rounded-full border border-white/20 text-[#F8FAFC] bg-white/5 hover:bg-white/10 hover:border-white/40 shadow-none hover:-translate-y-1 transition-all duration-200 backdrop-blur-md">
                  <LineChart className="w-5 h-5" /> Explore Markets
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={fadeIn} className="w-full max-w-[550px] relative border border-white/10 bg-[#0F172A]/80 backdrop-blur-xl rounded-full p-2 pl-6 flex items-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <Search className="h-5 w-5 text-slate-400 mr-3 shrink-0" />
              <input 
                placeholder="Search Stocks, IPOs, Mutual Funds..." 
                className="w-full bg-transparent text-white placeholder:text-slate-500 focus:outline-none text-[13px] font-[500]"
              />
              <Button className="rounded-full px-6 h-12 bg-[#1F3BB3] text-white hover:bg-[#2546D4] transition-all duration-200 shrink-0 ml-2 shadow-[0_0_15px_rgba(31,59,179,0.3)] font-[600] text-[13px]">Search</Button>
            </motion.div>

            {/* Social Proof Row */}
            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-3 mb-10 mt-6 text-[12px] md:text-[13px] font-[500] text-slate-300">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 backdrop-blur-sm">
                <Smartphone className="w-3 h-3 text-[#22D3EE]" /> 5K+ App Downloads
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
                <Award className="w-3 h-3 text-[#FF6B00]" /> Trusted Since 2004
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
                <ShieldCheck className="w-3 h-3 text-[#1F3BB3]" /> SEBI Registered
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
                <Zap className="w-3 h-3 text-[#14E6C9]" /> Secure Digital Onboarding
              </div>
            </motion.div>
          </div>

          {/* Right Column: Premium Phones Mockup */}
          <motion.div variants={fadeIn} className="relative hidden lg:flex justify-center items-center h-[520px] -mt-[120px]">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#1F3BB3]/20 blur-[100px] rounded-full pointer-events-none"></div>
            
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

export function AppOnboardingSection() {
  return (
    <AnimatedSection className="pt-12 pb-16 bg-white relative overflow-hidden z-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div variants={fadeIn} className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#1F3BB3] text-[13px] font-[700] tracking-widest uppercase mb-8 border border-blue-100">
              <Zap className="w-4 h-4 fill-current"/> Quick & Easy Onboarding
            </span>
            <h2 className="text-[40px] md:text-[52px] lg:text-[60px] font-[800] tracking-tight mb-6 text-[#050B18] leading-[1.1]">
              Start building your<br/>wealth <span className="text-[#1F3BB3]">today.</span>
            </h2>
            <p className="text-[18px] font-[400] text-[#64748B] leading-relaxed mb-12">
              Open your Demat account in under 5 minutes with Maitra Wealth's secure, paperless onboarding experience.
            </p>

            <div className="flex gap-4 mb-6">
              <Link href="/open-account">
                <Button size="lg" className="bg-[#FF6B00] text-white hover:bg-[#ff7a1f] h-14 px-8 rounded-full text-[16px] font-[600] shadow-[0_8px_20px_rgba(255,107,0,0.25)] hover:-translate-y-1 transition-all duration-200">
                  Open Demat Account <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 mt-12 pt-12 border-t border-slate-100">
              <div className="flex gap-4 flex-1">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <UserPlus className="w-6 h-6 text-[#1F3BB3]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[17px] font-[700] text-[#050B18] mb-1">5-Minute Digital KYC</h3>
                  <p className="text-[14px] font-[400] text-[#64748B] leading-relaxed">Complete your account opening in just a few minutes.</p>
                </div>
              </div>
              <div className="flex gap-4 flex-1">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-[#1F3BB3]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[17px] font-[700] text-[#050B18] mb-1">Bank-Grade Security</h3>
                  <p className="text-[14px] font-[400] text-[#64748B] leading-relaxed">Your data and investments are protected with enterprise-level security.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center Phone */}
          <motion.div variants={fadeIn} className="lg:col-span-4 flex justify-center relative min-h-[500px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#1F3BB3]/5 rounded-full blur-[80px] pointer-events-none"></div>
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-10 scale-[0.85] lg:scale-[0.95] transform rotate-[6deg] drop-shadow-[0_40px_80px_rgba(0,0,0,0.15)] origin-center"
            >
              <PhoneMockup />
            </motion.div>
          </motion.div>

          {/* Right Download Buttons */}
          <motion.div variants={fadeIn} className="lg:col-span-3 flex flex-col justify-center gap-6 pl-0 lg:pl-10 relative z-20">
             <a href="#" className="group flex items-center gap-4 p-4 rounded-[20px] border border-slate-200 bg-white hover:border-[#1F3BB3]/30 hover:shadow-[0_20px_40px_rgba(31,59,179,0.08)] transition-all duration-200 hover:-translate-y-1">
               <div className="w-12 h-12 flex items-center justify-center">
                 {/* Google Play SVG Icon */}
                 <svg viewBox="0 0 1024 1024" className="w-9 h-9">
                    <path d="M110.8 111.4c-6.8 7.3-10.8 17.5-10.8 30.2v740.8c0 12.7 4 22.9 10.8 30.2l12 11.2 396.4-396.4v-30.8L122.8 100.2l-12 11.2z" fill="#00e676"/>
                    <path d="M685.2 640.8l-166-166v-30.8l166-166 52.8 30 198.8 113.2c56.4 32.4 56.4 85.2 0 117.6L738 610.8l-52.8 30z" fill="#ffc107"/>
                    <path d="M685.2 640.8l-166-166-408.4 408.4c17.6 18.4 46.4 20.4 81.2 0l493.2-242.4z" fill="#ff3d00"/>
                    <path d="M685.2 383.2L192 140.8c-34.8-20.4-63.6-18.4-81.2 0L519.2 549.2l166-166z" fill="#29b6f6"/>
                 </svg>
               </div>
               <div>
                 <div className="text-[11px] font-[600] text-slate-500 uppercase tracking-widest mb-0.5">Get it on</div>
                 <div className="text-[19px] font-[800] text-[#050B18] leading-none tracking-tight">Google Play</div>
               </div>
             </a>
             
             <a href="#" className="group flex items-center gap-4 p-4 rounded-[20px] border border-slate-200 bg-white hover:border-[#1F3BB3]/30 hover:shadow-[0_20px_40px_rgba(31,59,179,0.08)] transition-all duration-200 hover:-translate-y-1">
               <div className="w-12 h-12 flex items-center justify-center text-[#050B18]">
                 <Apple className="w-10 h-10 fill-current" />
               </div>
               <div>
                 <div className="text-[11px] font-[600] text-slate-500 uppercase tracking-widest mb-0.5">Download on the</div>
                 <div className="text-[19px] font-[800] text-[#050B18] leading-none tracking-tight">App Store</div>
               </div>
             </a>
          </motion.div>

        </div>
      </div>
    </AnimatedSection>
  );
}

export function PlatformShowcase() {
  return (
    <AnimatedSection className="relative w-full pt-20 pb-24 flex flex-col items-center overflow-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700&display=swap" rel="stylesheet" />
      {/* Split Background */}
      <div className="absolute inset-0 z-0 flex flex-col">
        <div className="h-[60%] bg-[#FF6B00]"></div>
        <div className="h-[40%] bg-[#050B18]"></div>
      </div>
      
      {/* Grid Pattern overlay for the top part */}
      <div className="absolute top-0 left-0 w-full h-[60%] bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] z-0"></div>

      <motion.div variants={fadeIn} className="relative z-10 w-full text-center px-4 mb-14 max-w-[1440px]">
        <h2 className="text-[28px] md:text-[32px] lg:text-[40px] font-[700] text-white tracking-tight leading-[1.2]">All Assets, One Platform</h2>
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
                   <div className="flex-1 bg-[#1F3BB3] text-white text-center text-[10px] font-bold py-2 rounded-md uppercase tracking-wider">Market Watch</div>
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
                       <div className="w-8 h-8 rounded-full bg-[#1F3BB3] flex items-center justify-center text-white font-black text-sm">S</div>
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

                 <div className="flex gap-2 border-b border-white/10 pb-3 mb-6 shrink-0 overflow-x-auto scrollbar-hide">
                   {['Overview', 'Technicals', 'Option Chain', 'Futures', 'Financials', 'About'].map((tab, i) => (
                     <div key={tab} className={`px-5 py-2 text-sm font-bold rounded-md whitespace-nowrap transition-colors ${i === 0 ? 'bg-[#1F3BB3]/20 text-[#22D3EE]' : 'text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer'}`}>
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
                           <div key={tf} className={`px-3 py-1 text-xs font-bold rounded-md cursor-pointer transition-colors ${i === 0 ? 'bg-[#3B82F6] text-white' : 'text-slate-400 hover:bg-white/10'}`}>{tf}</div>
                         ))}
                       </div>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockChartData} margin={{ top: 50, right: 0, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="terminalGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
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
                            <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#22D3EE] rounded-full shadow-[0_0_8px_#22D3EE]" style={{left: '60%'}}></div>
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
           <Button className="bg-[#FF6B00] hover:bg-[#ff7a1f] text-white shadow-[0_15px_40px_rgba(255,107,0,0.5)] hover:scale-105 px-8 md:px-12 h-12 md:h-14 rounded-full font-[800] text-base md:text-lg transition-all border-[4px] border-[#050B18]">
             Login to Maitra <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6" />
           </Button>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

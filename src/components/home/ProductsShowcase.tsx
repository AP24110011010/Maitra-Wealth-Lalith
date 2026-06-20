import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PhoneMockup } from "@/components/PhoneMockup";
import { 
  BarChart3, PieChart, LineChart, Landmark, ArrowRight, Shield, ShieldCheck, Globe, Zap, Coins
} from "lucide-react";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function ProductsOverview() {
  const products = [
    { name: "Stocks", desc: "Invest in 1500+ NSE scrips with deep analytics.", icon: <BarChart3 className="w-8 h-8"/>, color: "text-blue-400", bg: "bg-blue-400/10" },
    { name: "Mutual Funds", desc: "Zero AMC direct mutual funds for long-term wealth.", icon: <PieChart className="w-8 h-8"/>, color: "text-green-400", bg: "bg-green-400/10" },
    { name: "Futures & Options", desc: "Advanced tools for derivatives traders.", icon: <LineChart className="w-8 h-8"/>, color: "text-purple-400", bg: "bg-purple-400/10" },
    { name: "Commodities", desc: "Trade precious metals, energy, and agriculture.", icon: <Landmark className="w-8 h-8"/>, color: "text-yellow-400", bg: "bg-yellow-400/10" },
  ];

  return (
    <AnimatedSection className="py-20 bg-background border-t border-white/5 relative z-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-bold tracking-widest uppercase mb-6">Our Offerings</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Invest in everything.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <motion.div variants={fadeIn} key={p.name} className="glass-card rounded-xl p-6 group cursor-pointer hover:border-white/20 transition-all hover:-translate-y-2">
              <div className={`w-16 h-16 rounded-2xl ${p.bg} ${p.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {p.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{p.name}</h3>
              <p className="text-slate-400 mb-8">{p.desc}</p>
              <div className="flex justify-end">
                <ArrowRight className="w-6 h-6 text-slate-500 group-hover:text-primary transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function StocksSection() {
  return (
    <AnimatedSection className="py-20 bg-card relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div variants={fadeIn} className="order-2 lg:order-1 relative">
             <div className="relative w-full max-w-lg mx-auto aspect-square glass-card rounded-[2rem] p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center font-bold text-white text-xl border border-white/10">IN</div>
                    <div>
                      <h3 className="text-white font-bold text-xl">Infosys Ltd</h3>
                      <p className="text-slate-400">NSE</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold text-xl">₹1,476.10</p>
                    <p className="text-green-400 font-medium">+15.20 (1.04%)</p>
                  </div>
                </div>
                
                <div className="flex-1 relative border border-white/5 rounded-2xl bg-black/20 overflow-hidden flex items-end">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                     <path d="M0,100 L0,70 Q20,80 40,50 T70,40 T100,20 L100,100 Z" fill="rgba(59,130,246,0.1)" />
                     <path d="M0,70 Q20,80 40,50 T70,40 T100,20" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-slate-400 text-xs mb-1">Open</p>
                    <p className="text-white font-bold">1465.00</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-slate-400 text-xs mb-1">High</p>
                    <p className="text-white font-bold">1480.00</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <p className="text-slate-400 text-xs mb-1">Low</p>
                    <p className="text-white font-bold">1460.50</p>
                  </div>
                </div>
             </div>
          </motion.div>

          <motion.div variants={fadeIn} className="order-1 lg:order-2">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
              Equities & <br/>Stocks
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
              Unlock the power of the stock market. With Maitra, access real-time market data, advanced charting tools, and seamless execution to build your equity portfolio.
            </p>
            <ul className="space-y-6 mb-12">
              {[
                "Access to 1500+ NSE & BSE scrips",
                "Advanced charting with TradingView integration",
                "Deep market depth and historical data",
                "Real-time technical indicators"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-lg text-white">
                   <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">✓</div>
                   {item}
                </li>
              ))}
            </ul>
            <Link href="/stocks">
              <Button size="lg" className="h-12 px-8 text-base font-bold bg-white text-black hover:bg-slate-200 rounded-full">
                Explore Stocks
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>
    </AnimatedSection>
  );
}

export function MutualFundsSection() {
  return (
    <AnimatedSection className="py-20 bg-background relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div variants={fadeIn}>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
              Direct <br/>Mutual Funds
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
              Maximize your returns with zero commission direct mutual funds. Automate your wealth creation with systematic investment plans (SIPs).
            </p>
            <div className="flex gap-8 mb-12">
              <div>
                <p className="text-4xl font-bold text-white mb-2">0%</p>
                <p className="text-slate-400">Commission</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white mb-2">500+</p>
                <p className="text-slate-400">Fund Houses</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white mb-2">Auto</p>
                <p className="text-slate-400">SIP Deduction</p>
              </div>
            </div>
            <Button size="lg" className="h-12 px-8 text-base font-bold bg-primary text-white hover:bg-primary/90 rounded-full shadow-[0_0_30px_rgba(0,208,156,0.3)]">
              Start Investing
            </Button>
          </motion.div>

          <motion.div variants={fadeIn} className="relative flex justify-center">
            <div className="relative w-full max-w-lg aspect-square">
               {/* Abstract 3D Pie Chart Graphic */}
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-64 h-64 rounded-full border-[20px] border-primary/20 relative shadow-[0_0_100px_rgba(0,208,156,0.2)]">
                   <div className="absolute inset-[-20px] rounded-full border-[20px] border-primary border-t-transparent border-l-transparent rotate-45 shadow-lg"></div>
                   <div className="absolute inset-[-20px] rounded-full border-[20px] border-emerald-400 border-r-transparent border-b-transparent border-l-transparent -rotate-[15deg]"></div>
                   
                   {/* Center Content */}
                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-background rounded-full m-2 shadow-inner">
                     <span className="text-slate-400 text-sm">Est. Returns</span>
                     <span className="text-4xl font-bold text-white mt-1">14.5%</span>
                   </div>
                 </div>
               </div>
               
               {/* Floating Badges */}
               <div className="absolute top-10 right-10 glass-card px-4 py-3 rounded-2xl animate-bounce" style={{ animationDuration: '4s' }}>
                 <p className="text-sm text-slate-400">SIP Active</p>
                 <p className="text-xl font-bold text-green-400">₹5,000 / mo</p>
               </div>
               <div className="absolute bottom-10 left-10 glass-card px-4 py-3 rounded-2xl animate-bounce" style={{ animationDuration: '5s' }}>
                 <p className="text-sm text-slate-400">Total Value</p>
                 <p className="text-xl font-bold text-white">₹1,24,500</p>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </AnimatedSection>
  );
}

export function FuturesOptionsSection() {
  return (
    <AnimatedSection className="py-20 bg-card relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div variants={fadeIn} className="order-2 lg:order-1 relative">
             <div className="glass-card rounded-[2rem] p-6 relative overflow-hidden">
               <h3 className="text-xl font-bold text-white mb-6">Option Chain</h3>
               <div className="w-full overflow-hidden">
                 <div className="grid grid-cols-5 text-xs text-slate-500 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                   <div>Call LTP</div><div>Call Vol</div><div className="text-white text-center">Strike</div><div className="text-right">Put Vol</div><div className="text-right">Put LTP</div>
                 </div>
                 {[
                   { cLtp: "145.20", cVol: "2.1M", strike: "24200", pVol: "1.8M", pLtp: "95.50" },
                   { cLtp: "110.80", cVol: "3.5M", strike: "24250", pVol: "2.4M", pLtp: "115.10" },
                   { cLtp: "85.40", cVol: "4.2M", strike: "24300", pVol: "4.8M", pLtp: "145.60" },
                   { cLtp: "62.10", cVol: "2.8M", strike: "24350", pVol: "3.1M", pLtp: "185.20" },
                 ].map((row, i) => (
                   <div key={i} className={`grid grid-cols-5 text-sm py-4 border-b border-white/5 ${i === 2 ? 'bg-primary/10 rounded-lg border-none my-1' : ''}`}>
                     <div className="text-green-400 font-medium">{row.cLtp}</div>
                     <div className="text-slate-300">{row.cVol}</div>
                     <div className="text-white font-bold text-center bg-black/40 rounded px-2">{row.strike}</div>
                     <div className="text-slate-300 text-right">{row.pVol}</div>
                     <div className="text-red-400 font-medium text-right">{row.pLtp}</div>
                   </div>
                 ))}
               </div>
             </div>
          </motion.div>

          <motion.div variants={fadeIn} className="order-1 lg:order-2">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
              Futures & <br/>Options
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
              Trade derivatives with precision. Access advanced option chains, greek analysis, and high-speed execution for complex strategies.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="glass p-6 rounded-2xl">
                <Zap className="w-8 h-8 text-purple-400 mb-4" />
                <h4 className="text-white font-bold mb-2">Lightning Fast</h4>
                <p className="text-slate-400 text-sm">Zero-latency execution for scalpers.</p>
              </div>
              <div className="glass p-6 rounded-2xl">
                <Shield className="w-8 h-8 text-purple-400 mb-4" />
                <h4 className="text-white font-bold mb-2">Risk Management</h4>
                <p className="text-slate-400 text-sm">Advanced tools to protect your capital.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </AnimatedSection>
  );
}

export function CommoditiesSection() {
  return (
    <AnimatedSection className="py-20 bg-background relative overflow-hidden border-t border-white/5">
      <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div variants={fadeIn}>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
              Trade in <br/>Commodities
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
              Diversify your portfolio with MCX trading. From precious metals like Gold and Silver to energy resources like Crude Oil.
            </p>
            <div className="flex flex-col gap-4">
              <div className="glass-card p-6 rounded-2xl flex items-center justify-between border-l-4 border-l-yellow-500">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                    <Coins className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Precious Metals</h4>
                    <p className="text-slate-400 text-sm">Gold, Silver, Platinum</p>
                  </div>
                </div>
                <ArrowRight className="text-slate-600" />
              </div>
              <div className="glass-card p-6 rounded-2xl flex items-center justify-between border-l-4 border-l-orange-500">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Energy</h4>
                    <p className="text-slate-400 text-sm">Crude Oil, Natural Gas</p>
                  </div>
                </div>
                <ArrowRight className="text-slate-600" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-md aspect-[4/3] glass-card rounded-[2rem] p-6 flex flex-col justify-center shadow-[0_30px_60px_rgba(234,179,8,0.1)] border-white/10 relative overflow-hidden">
              {/* Metallic background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-yellow-900/10"></div>
              
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">GOLDM</h3>
                    <p className="text-slate-400">MCX</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">₹71,450</p>
                    <p className="text-green-400 font-medium">+240 (0.34%)</p>
                  </div>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">SILVERMIC</h3>
                    <p className="text-slate-400">MCX</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">₹88,200</p>
                    <p className="text-red-400 font-medium">-150 (0.17%)</p>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-bold text-white">CRUDEOIL</h3>
                    <p className="text-slate-400">MCX</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">₹6,840</p>
                    <p className="text-green-400 font-medium">+45 (0.66%)</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </AnimatedSection>
  );
}

export function IPOSection() {
  return (
    <AnimatedSection className="py-20 bg-primary relative overflow-hidden text-primary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
      <div className="container mx-auto max-w-[1440px] px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div variants={fadeIn} className="text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-bold tracking-widest uppercase mb-8 border border-white/30">Early Access</span>
            <h2 className="text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-[1.05]">
              Gateway to <br/>IPO Success
            </h2>
            <p className="text-xl text-white/90 font-medium mb-8 max-w-lg leading-relaxed">
              Invest in initial public offerings with a single click. Seamless UPI mandates and real-time subscription data.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-slate-100 font-bold px-8 h-12 rounded-full text-lg shadow-2xl hover:scale-105 transition-transform">
              Apply for IPO
            </Button>
          </motion.div>

          <motion.div variants={fadeIn} className="relative flex justify-center lg:justify-end">
            {/* Phone Mockup overlaying green block */}
            <div className="relative z-20 transform rotate-[5deg] shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
              <PhoneMockup />
            </div>

            {/* Overlapping White Data Card */}
            <div className="hidden lg:block absolute bg-white p-6 rounded-[1.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.4)] z-30 w-[400px] -bottom-20 -left-10 transform -rotate-[2deg]">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-2xl font-bold text-slate-800 border border-slate-200">LIC</div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">LIC India</h4>
                  <p className="text-slate-500">Closes in 2 days</p>
                </div>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600 font-medium text-base">Non-Institutional</span>
                <span className="font-bold text-slate-900 text-xl text-primary">2.01x</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-600 font-medium text-base">QIB</span>
                <span className="font-bold text-slate-900 text-xl text-primary">1.86x</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-600 font-medium text-base">Retail</span>
                <span className="font-bold text-slate-900 text-xl text-primary">3.92x</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </AnimatedSection>
  );
}

export function InsuranceSection() {
  return (
    <AnimatedSection className="py-20 bg-card relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div variants={fadeIn} className="order-2 lg:order-1 flex gap-6">
            <div className="flex flex-col gap-6 mt-12">
              <div className="w-56 h-72 glass-card rounded-[2rem] p-6 flex flex-col justify-end relative overflow-hidden bg-gradient-to-t from-blue-900/40 to-transparent border-blue-500/20">
                <Shield className="w-12 h-12 text-blue-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">Life Insurance</h3>
                <p className="text-slate-400">Secure your family's future.</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="w-56 h-72 glass-card rounded-[2rem] p-6 flex flex-col justify-end relative overflow-hidden bg-gradient-to-t from-emerald-900/40 to-transparent border-emerald-500/20">
                <ShieldCheck className="w-12 h-12 text-emerald-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">General Insurance</h3>
                <p className="text-slate-400">Health, motor, and property.</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="order-1 lg:order-2">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
              Comprehensive <br/>Insurance
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
              Beyond trading, Maitra provides holistic wealth management. Protect your assets and loved ones with our curated insurance products.
            </p>
            <Button size="lg" className="h-12 px-8 text-base font-bold bg-white text-black hover:bg-slate-200 rounded-full">
              Explore Plans
            </Button>
          </motion.div>

        </div>
      </div>
    </AnimatedSection>
  );
}

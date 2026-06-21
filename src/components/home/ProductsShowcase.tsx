import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PhoneMockup } from "@/components/PhoneMockup";
import {
  BarChart3,
  PieChart,
  LineChart,
  Landmark,
  ShieldCheck,
  ArrowRight,
  Activity,
} from "lucide-react";
import { fadeIn } from "@/lib/animations";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function PremiumServicesSection() {
  const services = [
    {
      name: "Stocks",
      desc: "Access 1,500+ NSE/BSE equities. Leverage deep analytics and real-time market data to execute your trades.",
      icon: <BarChart3 className="w-[50px] h-[50px] text-white mx-auto" strokeWidth={1.5} />, 
      link: "/stocks",
    },
    {
      name: "Mutual Funds",
      desc: "Invest in zero-commission direct mutual funds. Automate wealth creation with flexible SIPs.",
      icon: <PieChart className="w-[50px] h-[50px] text-white mx-auto" strokeWidth={1.5} />, 
      link: "/mutual-funds",
    },
    {
      name: "Commodities",
      desc: "Diversify into MCX precious metals and energy resources. Trade gold, silver, and crude oil seamlessly.",
      icon: <Landmark className="w-[50px] h-[50px] text-white mx-auto" strokeWidth={1.5} />, 
      link: "/commodities",
    },
    {
      name: "Futures & Options",
      desc: "Advanced derivatives trading with comprehensive option chains, greeks, and low-latency execution.",
      icon: <Activity className="w-[50px] h-[50px] text-white mx-auto" strokeWidth={1.5} />, 
      link: "/fno",
    },
    {
      name: "IPO",
      desc: "Apply for upcoming Initial Public Offerings with a seamless and transparent investment experience.",
      icon: <LineChart className="w-[50px] h-[50px] text-white mx-auto" strokeWidth={1.5} />, 
      link: "/ipo",
    },
    {
      name: "Insurance",
      desc: "Protect your family and assets with curated life, health, and general insurance policies.",
      icon: <ShieldCheck className="w-[50px] h-[50px] text-white mx-auto" strokeWidth={1.5} />, 
      link: "/insurance",
    },
  ];

  return (
    <AnimatedSection className="py-16 md:py-20 bg-[#050505] relative z-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-[800px]">
        <h2 className="text-center text-white text-3xl md:text-4xl font-[500] uppercase tracking-[0.35em]">
          OUR SERVICES
        </h2>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 mt-12">
          {services.map((service) => (
            <motion.div key={service.name} variants={fadeIn} className="w-full">
              <Link href={service.link}>
                <a className="group cursor-pointer flex flex-col items-center transition-all duration-300 hover:-translate-y-1 block w-full text-center">
                  {/* Icon */}
                  <div className="mb-4 flex justify-center w-full">
                    {service.icon}
                  </div>
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {service.name}
                  </h3>
                  {/* Description */}
                  <p className="text-[#D1D5DB] text-sm lg:text-base font-normal max-w-[210px] mx-auto leading-relaxed">
                    {service.desc}
                  </p>
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function IPOSection() {
  return (
    <AnimatedSection className="pt-16 pb-16 lg:pb-20 bg-[#1F3BB3] relative overflow-visible text-white z-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
      <div className="container mx-auto max-w-[1280px] px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div variants={fadeIn} className="text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-[13px] font-[600] tracking-widest uppercase mb-6 border border-white/20 shadow-sm backdrop-blur-md">Early Access</span>
            <h2 className="text-[36px] md:text-[48px] lg:text-[56px] font-[600] text-white tracking-[-0.04em] mb-6 leading-[0.95]">
              Invest in <br/>Upcoming IPOs
            </h2>
            <p className="text-[20px] text-white/90 font-[400] mb-10 max-w-[700px] leading-[1.6]">
              Get early access to high-growth companies. Apply for initial public offerings with a single click through Maitra Wealth. Seamless UPI mandates and real-time subscription tracking.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-[#050B18] hover:bg-slate-100 font-[600] px-8 h-12 rounded-full text-[15px] shadow-lg hover:-translate-y-[2px] transition-transform">Explore IPOs</Button>
              <Link href="/open-account">
                <Button size="lg" className="bg-transparent text-white hover:bg-white/10 font-[600] px-8 h-12 rounded-full text-[15px] border border-white/20 shadow-none hover:-translate-y-[2px] transition-transform">Open Demat Account</Button>
              </Link>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="relative flex justify-center lg:justify-end">
            <div className="relative z-20 transform rotate-[3deg] shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-transform hover:rotate-0 duration-500">
              <PhoneMockup />
            </div>

            {/* Overlapping White Data Card */}
            <div className="hidden lg:block absolute bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 p-6 rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] z-30 w-[420px] bottom-4 -left-8 lg:-left-20 xl:-left-32 transform -rotate-[2deg] hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="w-16 h-16 bg-white rounded-[16px] flex items-center justify-center text-2xl font-[800] text-slate-800 border border-slate-200">LIC</div>
                <div>
                  <h4 className="text-[20px] font-[700] text-white">LIC India</h4>
                  <p className="text-[#22D3EE] text-[15px] font-[500]">Closes in 2 days</p>
                </div>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-[#94A3B8] font-[500] text-[16px]">Non-Institutional</span>
                <span className="font-[700] text-white text-[18px]">2.01x</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-[#94A3B8] font-[500] text-[16px]">QIB</span>
                <span className="font-[700] text-white text-[18px]">1.86x</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-[#94A3B8] font-[500] text-[16px]">Retail</span>
                <span className="font-[700] text-[#14E6C9] text-[18px]">3.92x</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </AnimatedSection>
  );
}

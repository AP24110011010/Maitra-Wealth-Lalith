import React, { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, Quote, Play, Apple, ArrowRight, Plus, Minus
} from "lucide-react";
import { fadeIn } from "@/lib/animations";
import { AnimatedSection } from "@/components/ui/AnimatedSection";


export function BlogsSection() {
  const blogs = [
    {
      category: "Investing 101",
      title: "Reasons for Coal Petcoke Price Increase",
      excerpt: "Blog Reasons for Coal Petcoke Price Increase Coal story –...",
      image: "/images/blog-coal.png",
      link: "https://maitrawealth.com/reasons-for-coal-petcoke-price-increase/"
    },
    {
      category: "Investing 101",
      title: "Crude Oil Price To Touch 150 USD A Barrel",
      excerpt: "Blog Crude Oil Price To Touch 150 USD A Barrel...",
      image: "/images/blog-crude.png",
      link: "https://maitrawealth.com/crude-oil-price-to-touch-150-usd-a-barrel/"
    },
    {
      category: "Investing in Stocks",
      title: "How To Avoid Capital Gains Tax",
      excerpt: "Blog How To Avoid Capital Gains Tax The basic purpose...",
      image: "/images/blog-capital.png",
      link: "https://maitrawealth.com/how-to-avoid-capital-gains-tax/"
    }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none';
    const parent = e.currentTarget.parentElement;
    if (parent) {
      parent.classList.add('fallback-bg');
      parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-slate-600 font-semibold uppercase tracking-widest">' + parent.getAttribute('data-category') + '</div>';
    }
  };

  return (
    <AnimatedSection className="pt-10 pb-8 bg-[#050505] relative border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1100px]">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#FF6B00] text-sm font-semibold tracking-[0.2em] uppercase block mb-3">
            INVEST SMARTER WITH MAITRA
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Blog Section
          </h2>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <motion.div variants={fadeIn} key={i} className="group h-full">
              <a href={blog.link} target="_blank" rel="noopener noreferrer" className="block bg-[#131922] rounded-[20px] overflow-hidden hover:-translate-y-2 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)] h-full flex flex-col border border-white/5">
                
                {/* Image Container */}
                <div className="w-full aspect-[4/3] overflow-hidden bg-[#E2E8F0] relative flex items-center justify-center" data-category={blog.category}>
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                    onError={handleImageError}
                  />
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-slate-300 text-[13px] font-medium mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 opacity-70"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>
                    {blog.category}
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-white/80 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  <p className="text-slate-300/80 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
                    {blog.excerpt}
                  </p>
                  
                  <div className="text-sm font-bold text-white group-hover:text-slate-200 transition-colors mt-auto flex items-center">
                    Read More
                  </div>
                </div>
                
              </a>
            </motion.div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .fallback-bg { background: linear-gradient(135deg, #1A202C 0%, #0F172A 100%); }
      `}} />
    </AnimatedSection>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      text: "Maitra Commodities has an easy to use platform and mobile app. Also I congratulate excellent dealing desk service to keep market updates.",
      name: "SYED MOHAMED ABDUL SHUKOOR",
      city: "Trichy"
    },
    {
      text: "I always recommend Maitra to trade because they take care of my positions and they resolve my queries whenever I am in trouble. Well done!",
      name: "RAJENDRA VIBHUTE",
      city: "Udaipur"
    },
    {
      text: "Extremely good relationship with Maitra’s marketing team and their recommendations also good to reach success in commodity trading.",
      name: "MUKTHAR",
      city: "Bangalore"
    }
  ];

  return (
    <AnimatedSection className="pt-6 pb-12 bg-[#050505] relative">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1280px]">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#3B82F6] text-sm font-semibold tracking-wide block mb-4">
            Trusted by Thousands Across India
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Testimonials
          </h2>
          <p className="text-lg text-[#A1A8B8] font-light max-w-2xl mx-auto">
            Hear from real traders and investors who use Maitra daily.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              variants={fadeIn} 
              key={i} 
              className="bg-[#131922] border border-white/5 rounded-2xl p-10 relative flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)]"
            >
              <Quote className="w-16 h-16 text-white/5 absolute top-6 left-6" strokeWidth={1} />
              
              <p className="text-[15px] text-[#A1A8B8] leading-relaxed mb-10 mt-6 z-10 flex-grow font-light">
                “{t.text}”
              </p>
              
              <div className="w-8 h-[2px] bg-[#3B82F6] mb-6"></div>
              
              <h4 className="text-white font-bold text-sm tracking-wide uppercase">
                {t.name}
              </h4>
              <p className="text-slate-500 text-xs mt-1">
                {t.city}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function FAQSection() {
  const faqs = [
    { q: "What services does Maitra Wealth offer?", a: "Maitra Wealth offers a comprehensive suite of financial services including Equity trading, Derivatives (Futures & Options), Commodities, Currency trading, Mutual Funds, and IPO investments." },
    { q: "How do I open a Demat account with Maitra Wealth?", a: "You can open a Demat account in under 5 minutes through our 100% paperless KYC process. Just click 'Open Account' on our website and keep your PAN card, Aadhaar card, and bank details ready." },
    { q: "What are the charges for trading with Maitra Wealth?", a: "We offer highly competitive and transparent pricing. Equity delivery is free, while intraday and F&O trades are charged at a flat ₹20 per executed order. Direct mutual funds have zero commission." },
    { q: "How secure is my account with Maitra Wealth?", a: "Absolutely secure. Maitra Wealth is a SEBI registered broker and member of NSE, BSE, and MCX. We use bank-grade encryption for all transactions to ensure your data and assets are strictly protected." },
    { q: "What asset classes can I trade with Maitra Wealth?", a: "You can trade across multiple asset classes including Equities (Stocks), Derivatives (F&O), Commodities, Currencies, and Mutual Funds all from a single integrated platform." },
    { q: "Does Maitra Wealth offer customer support?", a: "Yes, we provide dedicated customer support through multiple channels including phone, email, and live chat. Our expert dealing desk is also available during market hours to assist with your trades." },
    { q: "Is there a minimum balance required for my trading account?", a: "No, there is no minimum balance required to open or maintain a trading and Demat account with Maitra Wealth. You can fund your account as needed when you decide to trade." },
    { q: "Can I trade using my mobile phone?", a: "Yes! The Maitra Wealth mobile app is available for both Android and iOS devices. It offers real-time charts, fast order execution, and portfolio tracking on the go." },
    { q: "How can I fund my trading account?", a: "You can easily fund your trading account instantly using UPI, Net Banking, or RTGS/NEFT/IMPS transfers directly from your registered bank account." },
    { q: "Does Maitra Wealth provide research and trading insights?", a: "Yes, we provide daily market insights, technical analysis, trading calls, and fundamental research reports to help our clients make informed investment decisions." }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <AnimatedSection className="pt-6 pb-8 bg-[#050505] relative">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <div className="text-center mb-16">
          <span className="text-[#3B82F6] text-sm font-semibold tracking-wide block mb-4 uppercase">
            FAQs
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              variants={fadeIn} 
              key={i} 
              className={`border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === i ? 'bg-[#131922] shadow-[0_8px_30px_rgba(255,255,255,0.02)]' : 'bg-transparent hover:bg-[#131922]/50'
              }`}
            >
              <button 
                className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className={`text-[17px] font-semibold pr-4 transition-colors duration-300 ${openIndex === i ? 'text-white' : 'text-slate-200'}`}>
                  {faq.q}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === i ? 'bg-[#3B82F6]/10 text-[#3B82F6]' : 'bg-white/5 text-slate-400'}`}>
                  {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-400 text-[15px] leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}


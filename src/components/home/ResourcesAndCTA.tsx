import React, { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, ChevronDown, Quote, Play, Apple 
} from "lucide-react";
import { fadeIn } from "@/lib/animations";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function KnowledgeCentre() {
  return (
    <AnimatedSection className="py-20 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-bold tracking-widest uppercase mb-6">Learn</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Empower Your Trading</h2>
          <p className="text-lg text-slate-400 font-light max-w-xl mx-auto">Download our free eBooks to master the markets and build lasting wealth.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Trading as a Beginner", desc: "A comprehensive guide to kickstart your journey." },
            { title: "Creating an Investment Plan", desc: "Strategies to build a robust, long-term portfolio." },
            { title: "Trading in Crude Oil", desc: "Master the nuances of energy commodities." },
            { title: "Options Trading", desc: "Demystifying derivatives, hedging, and leverage." }
          ].map((book, i) => (
            <motion.div variants={fadeIn} key={i} className="glass-card rounded-2xl p-6 hover:border-primary/50 hover:bg-white/5 hover:-translate-y-2 transition-all flex flex-col cursor-pointer group shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] group-hover:bg-primary/20 transition-colors"></div>
              <BookOpen className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform origin-left relative z-10" />
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">{book.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm mt-auto relative z-10">{book.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function BlogsSection() {
  return (
    <AnimatedSection className="py-20 bg-card relative border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-bold tracking-widest uppercase mb-6">Insights</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Market Research</h2>
          </div>
          <Button className="bg-white/10 text-white hover:bg-white/20 rounded-full px-6 h-10 text-sm font-bold transition-colors">
            View All Articles
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { tag: "Market Update", title: "Nifty hits new all-time high amidst global rally", date: "Oct 12, 2024" },
            { tag: "Analysis", title: "Why IT stocks are outperforming the broader market", date: "Oct 10, 2024" },
            { tag: "Commodities", title: "Gold prices surge as inflation fears loom", date: "Oct 08, 2024" }
          ].map((blog, i) => (
            <motion.div variants={fadeIn} key={i} className="group cursor-pointer">
              <div className="w-full aspect-[16/10] bg-background rounded-xl border border-white/5 mb-6 overflow-hidden relative">
                {/* Abstract Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-900/20 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
              </div>
              <span className="text-primary text-xs font-bold tracking-wider uppercase mb-3 block">{blog.tag}</span>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors leading-tight">{blog.title}</h3>
              <p className="text-slate-500 text-sm">{blog.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function TestimonialsSection() {
  return (
    <AnimatedSection className="py-24 bg-background relative border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Hear from our Traders</h2>
          <p className="text-lg text-slate-400 font-light max-w-2xl mx-auto">Thousands of investors trust Maitra for their financial journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { text: "Maitra Commodities has an easy to use platform and mobile app. Also I congratulate excellent dealing desk service to keep market updates.", author: "Rahul M." },
            { text: "I always recommend Maitra to trade because they take care of my positions and they resolve my queries whenever I am in trouble. Well done!!", author: "Priya S." },
            { text: "Extremely good relationship with Maitra’s marketing team and then their recommendations also good to reach success in commodity trading.", author: "Vikram K." }
          ].map((t, i) => (
            <motion.div variants={fadeIn} key={i} className="glass-card rounded-[2rem] p-8 relative group hover:-translate-y-2 transition-all">
              <Quote className="w-10 h-10 text-primary/20 absolute top-8 right-8 group-hover:text-primary/40 transition-colors" />
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(star => <span key={star} className="text-yellow-500 text-xl">★</span>)}
              </div>
              <p className="text-lg text-white mb-8 leading-relaxed font-light">"{t.text}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-white">{t.author.charAt(0)}</div>
                <div>
                  <h4 className="text-white font-bold">{t.author}</h4>
                  <p className="text-slate-500 text-sm">Verified Investor</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function FAQSection() {
  const faqs = [
    { q: "How do I open a Demat account with Maitra?", a: "You can open an account in under 5 minutes through our 100% paperless KYC process. Just download the app or click 'Open Account' on our website and keep your PAN and Aadhaar ready." },
    { q: "What are the brokerage charges?", a: "We offer highly competitive and transparent pricing. Equity delivery is free, while intraday and F&O trades are charged at a flat ₹20 per executed order." },
    { q: "Are direct mutual funds completely free?", a: "Yes, investing in direct mutual funds through Maitra involves zero commissions and zero AMC charges." },
    { q: "Is my data and money secure?", a: "Absolutely. We are a SEBI registered broker. We use bank-grade encryption for all transactions and strictly adhere to all regulatory compliance to ensure your assets are safe." }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <AnimatedSection className="py-20 bg-card relative border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div variants={fadeIn} key={i} className="glass-card rounded-2xl overflow-hidden">
              <button 
                className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-lg font-bold text-white">{faq.q}</span>
                <ChevronDown className={`w-6 h-6 text-primary transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-slate-400 text-base leading-relaxed border-t border-white/5 pt-4">
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

export function FinalCTA() {
  return (
    <AnimatedSection className="py-28 bg-background relative overflow-hidden border-t border-white/5">
      {/* Premium Geometric Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] text-center relative z-10">
        <motion.div variants={fadeIn} className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter leading-[1.05]">
            Ready to <span className="text-gradient-primary">upgrade</span> <br/>your trading?
          </h2>
          <p className="text-xl text-slate-400 font-light mb-12">Join the fastest growing premium investment platform today.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <div className="h-16 w-48 glass-card rounded-xl flex items-center justify-center gap-4 cursor-pointer hover:bg-white/10 hover:border-primary/50 transition-all hover:-translate-y-1">
              <Play className="w-8 h-8 text-white" />
              <div className="text-left">
                <p className="text-[10px] text-slate-400 uppercase leading-none mb-1">Get it on</p>
                <p className="text-white font-bold text-lg leading-tight">Google Play</p>
              </div>
            </div>
            
            <div className="h-16 w-48 glass-card rounded-xl flex items-center justify-center gap-4 cursor-pointer hover:bg-white/10 hover:border-primary/50 transition-all hover:-translate-y-1">
              <Apple className="w-8 h-8 text-white" />
              <div className="text-left">
                <p className="text-[10px] text-slate-400 uppercase leading-none mb-1">Download on the</p>
                <p className="text-white font-bold text-lg leading-tight">App Store</p>
              </div>
            </div>
          </div>
          
          <Link href="/open-account">
            <Button size="lg" className="h-16 px-12 text-xl font-bold bg-primary text-white hover:bg-primary/90 rounded-full shadow-[0_20px_50px_rgba(0,208,156,0.3)] hover:scale-105 transition-all">
              Open Demat Account
            </Button>
          </Link>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

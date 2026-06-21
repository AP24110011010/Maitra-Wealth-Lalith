import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, User } from 'lucide-react';
import { Button } from './ui/button';
import logoIcon from "@/assets/logo-icon.png";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Downloads', path: '/downloads' },
    { 
      name: 'Support', 
      path: '#', 
      hasDropdown: true,
      dropdownItems: ['Escalation Matrix', 'Knowledge Base', 'E-Voting', 'Maitra - News']
    },
    { 
      name: 'More', 
      path: '#', 
      hasDropdown: true,
      dropdownItems: ['Knowledge Sharing', 'Compliances', 'Calculators', 'Explore Markets']
    },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 h-[64px] flex items-center transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#050B18] backdrop-blur-xl border-b border-white/[0.06]' 
          : 'bg-[#050B18] backdrop-blur-lg border-b border-white/[0.06]'
      }`}
    >
      <div className="container mx-auto px-8 lg:px-12 max-w-7xl w-full">
        <div className="flex items-center justify-between w-full">
          {/* Logo (Left) */}
          <a href="/" className="flex items-center gap-[12px] cursor-pointer shrink-0">
            <img 
              src={logoIcon} 
              alt="Maitra Wealth" 
              className="h-[32px] md:h-[38px] lg:h-[44px] w-auto object-contain shrink-0 block"
            />
            <div className="flex flex-col justify-center">
              <span className="text-white font-[800] text-[24px] lg:text-[28px] leading-[0.9] tracking-tight">MAITRA</span>
              <span className="text-[#94A3B8] font-[700] text-[13px] lg:text-[16px] leading-[1.1] tracking-[0.25em] mt-[2px]">WEALTH</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center justify-center gap-[28px] flex-nowrap whitespace-nowrap flex-1 mx-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.path !== '#' ? (
                  <Link href={link.path}>
                    <div className={`flex items-center gap-1 font-[500] transition-colors cursor-pointer py-1.5 text-[15px] ${location === link.path ? 'text-[#22D3EE]' : 'text-[#CBD5E1] hover:text-[#22D3EE]'}`}>
                      {link.name}
                      {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />}
                    </div>
                  </Link>
                ) : (
                  <div className={`flex items-center gap-1 font-[500] transition-colors cursor-pointer py-1.5 text-[15px] ${location === link.path ? 'text-[#22D3EE]' : 'text-[#CBD5E1] hover:text-[#22D3EE]'}`}>
                    {link.name}
                    {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />}
                  </div>
                )}
                {/* Dropdown Menu */}
                {link.hasDropdown && link.dropdownItems && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-[#0F172A] rounded-xl shadow-2xl shadow-black/50 border border-white/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100">
                    <div className="p-2 flex flex-col gap-1">
                      {link.dropdownItems.map(item => (
                        <div key={item} className="px-4 py-2 hover:bg-white/5 rounded-lg cursor-pointer text-[14px] font-[500] text-slate-300 hover:text-white transition-colors">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions (Right) */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <div className="relative group">
              <Button variant="ghost" className="font-[600] text-[#F8FAFC] hover:text-[#22D3EE] hover:bg-white/5 rounded-full text-[15px] h-10 px-4">
                <User className="w-4 h-4 mr-2" /> Login <ChevronDown className="w-3.5 h-3.5 ml-1" />
              </Button>
              <div 
                className="absolute right-0 w-[280px] max-h-[80vh] overflow-y-auto bg-[#0F172A] rounded-[16px] shadow-2xl shadow-black/50 border border-white/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 top-[calc(100%+8px)]"
              >
                <div className="p-3 flex flex-col gap-1">
                  {['Web Login', 'Backoffice', 'Mutual Funds', 'IPO', 'ReKYC', 'Portfolio Login', 'Account Closure', 'Research', 'Stockants'].map(item => (
                    <div key={item} className="px-4 py-2.5 hover:bg-white/5 rounded-xl cursor-pointer text-sm font-medium text-slate-300 hover:text-[#22D3EE] transition-colors">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/open-account">
              <Button className="font-semibold text-[15px] h-10 px-6 rounded-full bg-[#FF6B00] text-white shadow-[0_4px_14px_rgba(255,107,0,0.3)] hover:-translate-y-[1px] hover:bg-[#ff7a1f] hover:shadow-[0_6px_20px_rgba(255,107,0,0.4)] transition-all duration-200">
                Open Demat
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0F172A] border-t border-white/10 overflow-y-auto max-h-[80vh]"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link href={link.path}>
                    <div className="text-slate-300 font-medium py-3 border-b border-white/5 px-2 hover:bg-white/5 rounded-lg flex justify-between">
                      {link.name}
                    </div>
                  </Link>
                  {link.hasDropdown && link.dropdownItems && (
                    <div className="pl-6 flex flex-col gap-1 mt-1 border-b border-white/5 pb-2">
                      {link.dropdownItems.map(item => (
                        <div key={item} className="text-slate-400 py-2 text-sm">{item}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-3 mt-4 px-2">
                <Button variant="outline" className="w-full justify-center border-white/10 text-white bg-transparent hover:bg-white/5 rounded-full">Login</Button>
                <Button className="w-full justify-center rounded-full bg-[#FF6B00] hover:bg-[#ff7a1f] text-white">Open Account</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

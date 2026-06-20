import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, User } from 'lucide-react';
import { Button } from './ui/button';

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
    { 
      name: 'Products & Services', 
      path: '#', 
      hasDropdown: true,
      dropdownItems: ['Maitra Web', 'Maitra API', 'Maitra App', 'Maitra IPO', 'Maitra Insurance', 'Maitra Mutual Funds']
    },
    { 
      name: 'Support', 
      path: '#', 
      hasDropdown: true,
      dropdownItems: ['Escalation Matrix', 'Kowledge Base', 'E-Voting', 'Maitra - News']
    },
    { name: 'Downloads', path: '/downloads' },
    { 
      name: 'Knowledge Sharing', 
      path: '#', 
      hasDropdown: true,
      dropdownItems: ['eBooks', 'Blogs', 'Research & Margin Reports']
    },
    { 
      name: 'Calculators', 
      path: '#', 
      hasDropdown: true,
      dropdownItems: ['Brokerage Calculator', 'Margin Calculator']
    },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Compliances', path: '/compliances' },
    { name: 'Explore Markets', path: '/stocks' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 h-[76px] flex items-center transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#050B18]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
          : 'bg-[#050B18]/50 backdrop-blur-lg border-b border-white/5'
      }`}
    >
      <div className="container mx-auto px-8 lg:px-12 max-w-7xl w-full">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(0,208,156,0.4)]">
                M
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Maitra <span className="text-primary font-medium">Commodities</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-[18px] xl:gap-[24px] flex-nowrap whitespace-nowrap">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.path !== '#' ? (
                  <Link href={link.path}>
                    <div className={`flex items-center gap-1 font-medium transition-colors cursor-pointer py-1.5 text-[13px] ${location === link.path ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
                      {link.name}
                      {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />}
                    </div>
                  </Link>
                ) : (
                  <div className={`flex items-center gap-1 font-medium transition-colors cursor-pointer py-1.5 text-[13px] ${location === link.path ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
                    {link.name}
                    {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />}
                  </div>
                )}
                {/* Dropdown Menu */}
                {link.hasDropdown && link.dropdownItems && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-[#0F172A] rounded-xl shadow-2xl shadow-black/50 border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left scale-95 group-hover:scale-100">
                    <div className="p-2 flex flex-col gap-1">
                      {link.dropdownItems.map(item => (
                        <div key={item} className="px-4 py-2 hover:bg-white/5 rounded-lg cursor-pointer text-sm font-medium text-slate-300 hover:text-white transition-colors">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative group">
              <Button variant="ghost" className="font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-full text-[13px] h-8 px-4">
                <User className="w-4 h-4 mr-2" /> Login <ChevronDown className="w-3.5 h-3.5 ml-1" />
              </Button>
              <div 
                className="absolute right-0 w-[280px] max-h-[80vh] overflow-y-auto bg-[#050B18]/95 backdrop-blur-xl rounded-[16px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 top-[calc(100%+16px)] group-hover:top-[calc(100%+8px)]"
                style={{ right: 0, left: 'auto', transform: 'none', maxWidth: 'calc(100vw - 32px)' }}
              >
                <div className="p-3 flex flex-col gap-1">
                  {['Web Login', 'Backoffice', 'Mutual Funds', 'IPO', 'ReKYC', 'Portfolio Login', 'Account Closure', 'Research', 'Stockants'].map(item => (
                    <div key={item} className="px-4 py-2.5 hover:bg-white/10 rounded-xl cursor-pointer text-sm font-medium text-slate-300 hover:text-[#14E6C9] transition-colors">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/open-account">
              <Button className="font-bold text-[13px] h-9 px-5 rounded-full shadow-[0_0_20px_rgba(0,208,156,0.3)] hover:shadow-[0_0_25px_rgba(0,208,156,0.5)] transition-shadow">
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
                <Button variant="outline" className="w-full justify-center border-white/20 text-white bg-transparent hover:bg-white/10 rounded-full">Login</Button>
                <Button className="w-full justify-center rounded-full shadow-[0_0_20px_rgba(0,208,156,0.3)]">Open Account</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

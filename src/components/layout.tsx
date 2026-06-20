import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ArrowUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground relative">
      <Navbar />
      <main className="flex-1 pt-[76px]">
        {children}
      </main>
      <Footer />
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-center">
        <button 
          onClick={scrollToTop}
          className={`w-12 h-12 bg-primary/20 hover:bg-primary/40 backdrop-blur-sm text-white rounded-md flex flex-col items-center justify-center shadow-lg transition-all duration-300 ${showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-medium leading-none">Top</span>
        </button>
        <a 
          href="https://wa.me/918939022622" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] transition-all duration-300 hover:-translate-y-1"
          aria-label="WhatsApp Us"
        >
          <FaWhatsapp className="w-8 h-8" />
        </a>
      </div>
    </div>
  );
}

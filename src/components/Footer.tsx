import React from 'react';
import { Link } from 'wouter';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, ShieldAlert, ArrowRight, FileText, Building2, MapPin, Landmark } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Footer() {
  return (
    <footer className="bg-[#030712] text-slate-300 relative mt-0 font-sans border-t border-white/5">
      
      {/* Main Footer Links */}
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl pt-8 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          
          {/* Column 1: Quick Links */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-8 cursor-pointer group">
              <div className="w-10 h-10 bg-[#FF6B00] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(255,107,0,0.4)] group-hover:scale-105 transition-transform duration-300">
                M
              </div>
              <span className="text-xl font-[800] tracking-tight text-white uppercase tracking-widest">
                MAITRA <span className="text-[#94A3B8] font-[700] text-sm">WEALTH</span>
              </span>
            </div>
            
            <h4 className="text-white font-semibold text-lg mb-5 tracking-wide">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-[15px] text-slate-400 font-light">
              <li><Link href="/" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors"></span> Home</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors"></span> Pricing</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors"></span> Products & Services</Link></li>
              <li><Link href="/blogs" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors"></span> Blogs</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors"></span> Complaints</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors"></span> Investor Charter</a></li>
            </ul>
          </div>

          {/* Column 2: Facilities & Utilities */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-5 tracking-wide">Facilities & Utilities</h4>
            <ul className="flex flex-col gap-3 text-[15px] text-slate-400 font-light">
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors"></span> Open an Account</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors"></span> Back Office Login</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors"></span> Web Mail Login</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors"></span> Mutual Funds Login</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors"></span> Brokerage Calculator</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors"></span> Margin Calculator</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors"></span> SmartODR / Smart Login</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors"></span> Business Partner</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-5 tracking-wide">Contact Information</h4>
            <div className="flex flex-col gap-4 text-[15px] text-slate-400 font-light">
              
              <div className="flex gap-3 items-start group">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-white font-medium mb-1">Registered Office</p>
                  <p className="leading-relaxed">No: 18, First Street, Venkatratinam Nagar Extension, Adyar, Chennai - 600020.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start group">
                <Building2 className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-white font-medium mb-1">Corporate Office</p>
                  <p className="leading-relaxed">Flat No:6, B R Complex, 2nd Floor, Old No:35 New No:33, CP Ramaswamy Road, Alwarpet, Chennai-600018</p>
                </div>
              </div>

              <div className="flex gap-3 items-center group">
                <Phone className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <p>044-45630555 / 044-48656581</p>
              </div>

              <div className="flex gap-3 items-start group">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col gap-1">
                  <a href="mailto:info@maitracommodities.com" className="hover:text-primary transition-colors">info@maitracommodities.com</a>
                  <a href="mailto:Grievance@maitracommodities.com" className="hover:text-primary transition-colors">Grievance@maitracommodities.com</a>
                </div>
              </div>

            </div>
          </div>

          {/* Column 4: Market & Regulatory Links + Disclosures Button */}
          <div className="flex flex-col">
            <h4 className="text-white font-semibold text-lg mb-5 tracking-wide">Market Links</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {['NSE', 'BSE', 'SEBI', 'MCX', 'NCDEX', 'CDSL', 'NSDL'].map((link) => (
                <a key={link} href="#" className="px-3.5 py-1.5 rounded-lg bg-[#0F172A] border border-white/5 text-sm font-medium text-slate-300 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all shadow-sm">
                  {link}
                </a>
              ))}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center justify-between w-full p-4 rounded-xl border border-white/5 bg-[#0F172A] hover:bg-[#131922] hover:border-white/10 transition-all text-left group shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FF6B00]/10 flex items-center justify-center group-hover:bg-[#FF6B00]/20 transition-colors">
                      <FileText className="w-4 h-4 text-[#FF6B00]" />
                    </div>
                    <span className="text-sm font-semibold text-white">Investor Disclosures &<br/><span className="text-slate-400 font-normal">Regulatory Notes</span></span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-all group-hover:translate-x-1" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-xl bg-[#030712] border-l border-white/10 p-0 text-slate-300">
                <div className="flex flex-col h-full">
                  <SheetHeader className="p-6 border-b border-white/5 bg-[#030712] z-10 shrink-0">
                    <SheetTitle className="text-white text-xl flex items-center gap-3 tracking-tight">
                      <div className="w-8 h-8 rounded-full bg-[#FF6B00]/10 flex items-center justify-center">
                        <ShieldAlert className="w-4 h-4 text-[#FF6B00]" />
                      </div>
                      Investor Disclosures
                    </SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="flex-1 p-6">
                    <div className="space-y-10 pb-12 pr-4">
                      
                      {/* Section 1: Compliance Notes */}
                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-base border-b border-white/5 pb-3">Compliance Notes</h4>
                        <div className="space-y-4 text-[15px] font-light leading-relaxed text-slate-400">
                          <p><strong className="text-slate-200 font-medium">Note – 1:</strong> Maitra Wealth is a brand of Maitra Commodities.</p>
                          <p><strong className="text-slate-200 font-medium">Note – 2:</strong> Maitra Commodities do not authorize/support our Authorized person/staff to trade your trading account on behalf of you unless telephonic order in place by you.</p>
                          <p><strong className="text-slate-200 font-medium">Note – 3:</strong> Maitra Commodities do not authorize/support any profit – sharing agreement between client & any MCPL AUTHORISED PERSON’S and Staffs.</p>
                          <p><strong className="text-slate-200 font-medium">Note – 4:</strong> Any authorized person has not been registered as an investment advisor at SEBI. Any execution of the calls are at customer’s own risk.</p>
                          <p><strong className="text-slate-200 font-medium">Note – 5:</strong> KYC is a one-time exercise done through a SEBI-registered intermediary (stockbroker, depository participant, mutual fund, etc). There is no need to repeat the KYC process when you go to any other intermediary.</p>
                          <p><strong className="text-slate-200 font-medium">Note – 6:</strong> You do not have to issue a cheque while subscribing to an IPO. Write your bank account number clearly on the IPO application and sign it, sanctioning your bank to make payments when there is an allotment. Your funds will remain in your bank account in the case of non-allotment.</p>
                          <p><strong className="text-slate-200 font-medium">Note – 7:</strong> “Prevent Unauthorized Transactions in your Trading / demat account –&gt; Update your Mobile Number and Email Address with your Trading Member / Depository Participant. Receive alerts on your Registered Mobile for all debit and other important transactions in your demat account / trading account directly from CDSL / NSE on the same day. – issued in the interest of investors..</p>
                          <p><strong className="text-slate-200 font-medium">Note – 8:</strong> Stock Brokers can accept securities as margin from clients only by way of pledge in the depository system w.e.f. September 01, 2020.</p>
                          <p><strong className="text-slate-200 font-medium">Note – 9:</strong> Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.</p>
                          <p><strong className="text-slate-200 font-medium">Note – 10:</strong> We here by declare that we are doing PRO trading.</p>
                        </div>
                      </div>

                      {/* Section 2: SCORES */}
                      <div className="space-y-4 bg-[#0F172A] p-5 rounded-xl border border-white/5">
                        <h4 className="text-white font-semibold text-base mb-2">Filing Complaints on SCORES</h4>
                        <div className="space-y-2 text-[15px] font-light leading-relaxed text-slate-400">
                          <p>a. Register on SCORES portal</p>
                          <p>b. Mandatory details for filing complaints on SCORES: i) Name, PAN, Address, Mobile Number, Email ID</p>
                          <p>c. Benefits: i) Effective Communication ii) Speedy redressal of the grievances</p>
                          <p className="pt-2">Link is : <a href="https://scores.sebi.gov.in/" className="text-primary hover:underline font-medium" target="_blank" rel="noreferrer">https://scores.sebi.gov.in/</a></p>
                        </div>
                      </div>

                      {/* Section 3: Registration Info */}
                      <div className="space-y-4">
                        <h4 className="text-white font-semibold text-base border-b border-white/5 pb-3 flex items-center gap-2"><Landmark className="w-5 h-5 text-primary" /> Registration Information</h4>
                        <div className="space-y-2 text-[15px] font-light leading-relaxed text-slate-400">
                          <p><strong className="text-slate-200 font-medium">NSE MEMBERSHIP CODE:</strong> 90175</p>
                          <p><strong className="text-slate-200 font-medium">MCX MEMBERSHIP CODE:</strong> 55060</p>
                          <p><strong className="text-slate-200 font-medium">SEBI REGISTRATION NO:</strong> INZ000074139</p>
                          <p><strong className="text-slate-200 font-medium">CIN NUMBER:</strong> U74999TN2012PTC084067</p>
                          <p><strong className="text-slate-200 font-medium">GST REGISTRATION NUMBER:</strong> 33AAHCM6659B1ZJ</p>
                          <p><strong className="text-slate-200 font-medium">DEPOSITORY NAME:</strong> CDSL</p>
                          <p><strong className="text-slate-200 font-medium">DPID:</strong> 12089300</p>
                          <p><strong className="text-slate-200 font-medium">DP SEBI REGISTRATION NO:</strong> IN-DP-430-2019</p>
                          <p><strong className="text-slate-200 font-medium">MUTUAL FUND AMFI ARN:</strong> 164992</p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>

      {/* Regulatory Information Bar */}
      <div className="bg-[#0F172A] py-4 border-y border-white/5">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
            {[
              { label: 'NSE', value: '90175' },
              { label: 'MCX', value: '55060' },
              { label: 'SEBI', value: 'INZ000074139' },
              { label: 'CIN', value: 'U74999TN2012PTC084067' },
              { label: 'GST', value: '33AAHCM6659B1ZJ' },
              { label: 'DPID', value: '12089300' },
              { label: 'AMFI ARN', value: '164992' },
            ].map((reg, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-[#030712] border border-white/5 rounded-full px-4 py-2 text-[13px] hover:border-white/20 transition-all hover:-translate-y-0.5 shadow-sm">
                <span className="text-slate-500 font-medium">{reg.label}:</span>
                <span className="text-slate-300 font-mono font-medium">{reg.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-[#030712] py-4">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#" className="hover:text-white transition-all bg-[#0F172A] border border-white/5 p-2.5 rounded-full hover:bg-primary hover:border-primary hover:-translate-y-1"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="hover:text-white transition-all bg-[#0F172A] border border-white/5 p-2.5 rounded-full hover:bg-primary hover:border-primary hover:-translate-y-1"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="hover:text-white transition-all bg-[#0F172A] border border-white/5 p-2.5 rounded-full hover:bg-primary hover:border-primary hover:-translate-y-1"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="hover:text-white transition-all bg-[#0F172A] border border-white/5 p-2.5 rounded-full hover:bg-primary hover:border-primary hover:-translate-y-1"><Linkedin className="w-4 h-4" /></a>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-light text-slate-500">
              <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
              <a href="#" className="hover:text-white transition-colors">Do's & Don'ts</a>
              <a href="#" className="hover:text-white transition-colors">Fraud Prevention</a>
              <a href="#" className="hover:text-white transition-colors">Investors Attention</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>

            <div className="text-sm text-slate-600 font-light text-center md:text-right">
              © {new Date().getFullYear()} Maitra Wealth. All Rights Reserved.
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
}

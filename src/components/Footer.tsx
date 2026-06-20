import React from 'react';
import { Link } from 'wouter';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, LifeBuoy, ShieldAlert, ArrowUp, ChevronDown, Landmark } from 'lucide-react';
import { Button } from './ui/button';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background text-slate-300 relative border-t border-white/5 mt-10">
      
      {/* Top Banner: Support, Logo, Grievances (Image 11 Style) */}
      <div className="border-b border-white/5">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 py-8">
            
            {/* Column 1: Customer Support */}
            <div className="flex flex-col items-center text-center px-4 py-6 md:py-0">
              <LifeBuoy className="w-8 h-8 text-slate-400 mb-4" />
              <h4 className="text-base font-medium text-white mb-2">Customer Support</h4>
              <p className="text-slate-400 font-light hover:text-primary transition-colors cursor-pointer mb-2">info@maitracommodities.com</p>
              <p className="text-slate-400 font-light">044-45630555</p>
            </div>

            {/* Column 2: Logo & Socials */}
            <div className="flex flex-col items-center justify-center text-center px-4 py-6 md:py-0">
              <div className="flex items-center gap-2 cursor-pointer mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(0,208,156,0.4)]">
                  M
                </div>
                <span className="text-lg font-bold tracking-tight text-white uppercase tracking-widest">
                  Maitra <span className="text-primary font-medium">Commodities</span>
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-6 max-w-xs font-light">
                © {new Date().getFullYear()} Maitra Wealth Pvt Ltd. All Rights Reserved.
              </p>
              <div className="flex items-center gap-4 text-slate-400">
                <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
              </div>
            </div>

            {/* Column 3: Grievances */}
            <div className="flex flex-col items-center text-center px-4 py-6 md:py-0">
              <ShieldAlert className="w-8 h-8 text-slate-400 mb-4" />
              <h4 className="text-base font-medium text-white mb-2">Grievances</h4>
              <p className="text-slate-400 font-light hover:text-primary transition-colors cursor-pointer mb-2">Grievance@maitracommodities.com</p>
              <p className="text-slate-400 font-light">044-48656581/82</p>
            </div>

          </div>
        </div>
      </div>

      {/* Main Links Section */}
      <div className="bg-background py-12 border-b border-white/5">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div>
              <h4 className="text-white font-semibold text-base mb-5">Products & Services</h4>
              <ul className="flex flex-col gap-3 text-sm text-slate-400 font-light">
                <li className="hover:text-primary transition-colors cursor-pointer">Maitra Web</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Maitra API</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Maitra App</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Maitra IPO</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Maitra Insurance</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Maitra Mutual Funds</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Equities</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Commodities</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Futures & Options</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-base mb-5">Support & Downloads</h4>
              <ul className="flex flex-col gap-3 text-sm text-slate-400 font-light">
                <li className="hover:text-primary transition-colors cursor-pointer">Escalation Matrix</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Knowledge Base</li>
                <li className="hover:text-primary transition-colors cursor-pointer">E-Voting</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Maitra - News</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Software Downloads</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Request Forms</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Investor Charter</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Business Partner</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-base mb-5">Calculators</h4>
              <ul className="flex flex-col gap-3 text-sm text-slate-400 font-light">
                <li className="hover:text-primary transition-colors cursor-pointer">Brokerage Calculator</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Margin Calculator</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Daily Margin Report</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-base mb-5">Quick Logins</h4>
              <ul className="flex flex-col gap-3 text-sm text-slate-400 font-light">
                <li className="hover:text-primary transition-colors cursor-pointer">Web Login</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Back Office Login</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Web Mail Login</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Mutual Funds Login</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Smartodr Login</li>
                <li className="hover:text-primary transition-colors cursor-pointer">IPO</li>
                <li className="hover:text-primary transition-colors cursor-pointer">ReKYC</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Portfolio Login</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-base mb-5">Legal & Policies</h4>
              <ul className="flex flex-col gap-3 text-sm text-slate-400 font-light">
                <li className="hover:text-primary transition-colors cursor-pointer">Disclaimer</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Do's & Don't</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Fraud Prevention</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Investors Attention</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Terms & Conditions</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Privacy policy</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Compliances</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* SEO / Content Rich Section (Image 12 Style) */}
      <div className="bg-background py-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          
          <div className="mb-8">
            <h5 className="text-white font-medium text-sm mb-2">Important Trading Entities</h5>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              NSE | BSE | SEBI | MCX | NCDEX | CDSL | NSDL
            </p>
          </div>

          <div className="mb-8">
            <h5 className="text-white font-medium text-sm mb-2">Popular Instruments & Mutual Funds</h5>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Adani Ports SEZ | Asian Paints | Axis Bank | Bajaj Auto | Bajaj Finance | Bharti Airtel | Britannia | IndusInd Bank | ICICI Bank | Infosys | JSW Steel | Kotak Bank | Larsen & Toubro | Maruti Suzuki | M&M | Nestle | Nifty 50 | NTPC | ONGC | Power Grid | Reliance | SBI | TCS | Tata Motors | Tata Steel | Titan | Ultratech Cement | UPL
            </p>
            <p className="text-xs text-slate-500 leading-relaxed font-light mt-2">
              Aditya Birla Sun Life Frontline Equity Fund | Bank of India Short Term Income Fund | HDFC Hybrid Equity Fund | ICICI Prudential Value Discovery Fund | Kotak Nifty PSU Bank ETF | Nippon India ETF Nifty PSU Bank BeES | Quant Quantamental Fund | SBI Nifty Next 50 Index Fund | SBI Overnight Fund | SBI PSU Fund
            </p>
          </div>

          {/* Expandable Legal Notes matching "Attention Investors" style from Image 12 */}
          <div className="space-y-4">
            <details className="group border border-white/5 bg-card rounded-xl overflow-hidden cursor-pointer">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-sm text-white hover:bg-white/5 transition-colors">
                <span className="flex items-center gap-3"><ShieldAlert className="w-4 h-4 text-primary" /> Attention Investors / Compliance Notes</span>
                <span className="transition group-open:rotate-180"><ChevronDown className="w-4 h-4" /></span>
              </summary>
              <div className="text-xs text-slate-400 font-light p-4 pt-0 space-y-3 bg-card border-t border-white/5 mt-4 leading-relaxed">
                <p><strong>Note – 1:</strong> Maitra Wealth is a brand of Maitra Commodities.</p>
                <p><strong>Note – 2:</strong> Maitra Commodities do not authorize/support our Authorized person/staff to trade your trading account on behalf of you unless telephonic order in place by you.</p>
                <p><strong>Note – 3:</strong> Maitra Commodities do not authorize/support any profit – sharing agreement between client & any MCPL AUTHORISED PERSON’S and Staffs.</p>
                <p><strong>Note – 4:</strong> Any authorized person has not been registered as an investment advisor at SEBI. Any execution of the calls are at customer’s own risk.</p>
                <p><strong>Note – 5:</strong> KYC is a one-time exercise done through a SEBI-registered intermediary (stockbroker, depository participant, mutual fund, etc). There is no need to repeat the KYC process when you go to any other intermediary.</p>
                <p><strong>Note – 6:</strong> You do not have to issue a cheque while subscribing to an IPO. Write your bank account number clearly on the IPO application and sign it, sanctioning your bank to make payments when there is an allotment. Your funds will remain in your bank account in the case of non-allotment.</p>
                <p><strong>Note – 7:</strong> “Prevent Unauthorized Transactions in your Trading / demat account –&gt; Update your Mobile Number and Email Address with your Trading Member / Depository Participant. Receive alerts on your Registered Mobile for all debit and other important transactions in your demat account / trading account directly from CDSL / NSE on the same day. – issued in the interest of investors..</p>
                <p><strong>Note – 8:</strong> Stock Brokers can accept securities as margin from clients only by way of pledge in the depository system w.e.f. September 01, 2020.</p>
                <p><strong>Note – 9:</strong> Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.</p>
                <p><strong>Note – 10:</strong> We here by declare that we are doing PRO trading.</p>
              </div>
            </details>

            <details className="group border border-white/5 bg-card rounded-xl overflow-hidden cursor-pointer">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-sm text-white hover:bg-white/5 transition-colors">
                <span className="flex items-center gap-3"><ShieldAlert className="w-4 h-4 text-primary" /> Filing Complaints on SCORES</span>
                <span className="transition group-open:rotate-180"><ChevronDown className="w-4 h-4" /></span>
              </summary>
              <div className="text-xs text-slate-400 font-light p-4 pt-0 space-y-2 bg-card border-t border-white/5 mt-4 leading-relaxed">
                <p>a. Register on SCORES portal</p>
                <p>b. Mandatory details for filing complaints on SCORES: i) Name, PAN, Address, Mobile Number, Email ID</p>
                <p>c. Benefits: i) Effective Communication ii) Speedy redressal of the grievances</p>
                <p>Link is : <a href="https://scores.sebi.gov.in/" className="text-primary hover:underline" target="_blank" rel="noreferrer">https://scores.sebi.gov.in/</a></p>
              </div>
            </details>

            <details className="group border border-white/5 bg-card rounded-xl overflow-hidden cursor-pointer">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4 text-sm text-white hover:bg-white/5 transition-colors">
                <span className="flex items-center gap-3"><Landmark className="w-4 h-4 text-primary" /> Registered Offices & Disclosures</span>
                <span className="transition group-open:rotate-180"><ChevronDown className="w-4 h-4" /></span>
              </summary>
              <div className="text-xs text-slate-400 font-light p-4 pt-0 space-y-2 bg-card border-t border-white/5 mt-4 leading-relaxed">
                <p><strong>Registered Office:</strong> No: 18, First Street, Venkatratinam Nagar Extension, Adyar, Chennai - 600020.</p>
                <p><strong>Corporate Office:</strong> Flat No:6, B R Complex, 2nd Floor, Old No:35 New No:33, CP Ramaswamy Road, Alwarpet, Chennai-600018</p>
                <p>NSE MEMBERSHIP CODE: 90175 | MCX MEMBERSHIP CODE: 55060 | SEBI REGISTRATION NO: INZ000074139</p>
                <p>CIN NUMBER : U74999TN2012PTC084067 | GST REGISTRATION NUMBER: 33AAHCM6659B1ZJ</p>
                <p>DEPOSITORY NAME : CDSL || DPID : 12089300 || DP SEBI REGISTRATION NO: IN-DP-430-2019 || MUTUAL FUND AMFI ARN : 164992</p>
              </div>
            </details>
          </div>

        </div>
      </div>
    </footer>
  );
}

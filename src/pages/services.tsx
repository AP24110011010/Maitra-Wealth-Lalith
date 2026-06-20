import { motion } from "framer-motion";
import { TrendingUp, BarChart3, LineChart, Gem, Zap, Shield, Globe, Smartphone, Code2, Calculator } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const services = [
  {
    icon: TrendingUp,
    title: "Stocks",
    subtitle: "NSE Equity Trading",
    desc: "Trade in 1500+ NSE scrips without a concern. Access real-time data, advanced charts, and execute orders instantly with our powerful trading platform.",
    features: ["1500+ NSE Scrips", "Real-time Quotes", "Advanced Charts", "Portfolio Tracker"],
    color: "from-blue-600 to-blue-800",
  },
  {
    icon: BarChart3,
    title: "Mutual Funds",
    subtitle: "SIP & Lumpsum",
    desc: "Set your own objectives and purchase and monitor your funds online with our simplified app. Zero AMC charges on all mutual fund investments.",
    features: ["Zero AMC", "SIP Automation", "Fund Comparison", "Goal Tracking"],
    color: "from-purple-600 to-purple-800",
  },
  {
    icon: LineChart,
    title: "Futures & Options",
    subtitle: "Derivatives Trading",
    desc: "Hedge or trade in multiple derivatives products in NSE or MCX. Access F&O strategies, option chains, and margin calculators to optimize your trades.",
    features: ["NSE & MCX F&O", "Option Chain", "Strategy Builder", "Margin Calculator"],
    color: "from-emerald-600 to-emerald-800",
  },
  {
    icon: Gem,
    title: "Commodities",
    subtitle: "MCX Trading",
    desc: "Invest or hedge in precious metals, energy & agri commodities. Trade gold, silver, crude oil, natural gas, and agricultural products on MCX.",
    features: ["Precious Metals", "Energy Commodities", "Agri Products", "MCX Certified"],
    color: "from-amber-600 to-amber-800",
  },
  {
    icon: Zap,
    title: "IPO",
    subtitle: "New Market Offerings",
    desc: "Invest in new market offerings with our simplified IPO app. Apply for IPOs through ASBA, track allotments, and never miss a listing opportunity.",
    features: ["ASBA Applications", "Zero AMC on IPOs", "Allotment Tracking", "Listing Alerts"],
    color: "from-rose-600 to-rose-800",
  },
  {
    icon: Shield,
    title: "Insurance",
    subtitle: "Life & General",
    desc: "Insure yourself and your family through a leading provider at a very affordable cost. Term life, health, motor and more — all in one platform.",
    features: ["Term Life Insurance", "Health Insurance", "Motor Insurance", "Affordable Premiums"],
    color: "from-teal-600 to-teal-800",
  },
];

const platforms = [
  {
    icon: Globe,
    title: "Maitra Web Terminal",
    desc: "Our web platform is user friendly and intuitive. The platform allows you to trade from anywhere and any device. The feature rich platform allows you to track your trades in a single window.",
    highlights: ["Multi-device support", "Single window trading", "Real-time P&L tracking", "Advanced order types"],
  },
  {
    icon: Smartphone,
    title: "Maitra Wealth App",
    desc: "Our responsive mobile app is available for both iOS and Android users. The app allows you to do what you require to do — TRADE — without any clutter.",
    highlights: ["iOS & Android", "Clean interface", "Instant order execution", "Push notifications"],
  },
  {
    icon: Code2,
    title: "Maitra API Access",
    desc: "Our APIs are versatile and allow you to integrate with any third party vendors or custom apps. Check our partners with whom you can use our APIs for Automated Trading.",
    highlights: ["RESTful APIs", "WebSocket feeds", "Third-party integration", "Algo trading support"],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative w-full py-32 overflow-hidden bg-background border-b border-white/5 pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-80 pointer-events-none"></div>
        <div className="container relative z-10 mx-auto px-4 lg:px-8 max-w-7xl text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold tracking-widest uppercase mb-6 border border-primary/30">PRODUCTS & SERVICES</span>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight leading-[1.1]">
            Everything You Need<br />to <span className="text-primary">Invest & Trade</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            From stocks and mutual funds to commodities, F&O, IPOs, and insurance — Maitra Wealth is your
            single platform for all financial needs.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A comprehensive suite of investment and trading products, all accessible from one platform.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/40 transition-all group">
                <div className={`h-2 bg-gradient-to-r ${s.color}`} />
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4`}>
                    <s.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">{s.subtitle}</div>
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                  <ul className="space-y-1.5">
                    {s.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Platforms & Tools</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Trade anytime, anywhere with our powerful suite of platforms and tools.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {platforms.map((p, i) => (
              <motion.div key={p.title} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="bg-card border border-border rounded-2xl p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <p.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.desc}</p>
                <ul className="space-y-1.5">
                  {p.highlights.map(h => (
                    <li key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Extra tools */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6 flex items-start gap-4">
              <Calculator className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h4 className="font-bold mb-1">Brokerage Calculator</h4>
                <p className="text-muted-foreground text-sm">Calculate your brokerage charges before placing any trade. Know exactly what you pay.</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 flex items-start gap-4">
              <BarChart3 className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h4 className="font-bold mb-1">Margin Calculator</h4>
                <p className="text-muted-foreground text-sm">Find out the margin requirements for any F&O contract. Plan your trades with confidence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 left-0 w-64 h-64 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-white stroke-2">
            <path d="M10,50 L50,10 L90,50 L50,90 Z M30,50 L50,30 L70,50 L50,70 Z" />
          </svg>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Start Trading Today</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">Open your Demat account in minutes and access all these services instantly.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/open-account">
              <Button size="lg" className="h-16 px-12 text-xl font-bold bg-primary text-white hover:bg-primary/90 rounded-full shadow-[0_0_40px_rgba(0,208,156,0.4)]">
                Open Demat Account
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-16 px-12 text-xl font-bold border-white/20 text-white hover:bg-white/10 rounded-full">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

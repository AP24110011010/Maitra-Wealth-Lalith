import { motion } from "framer-motion";
import { CheckCircle, Info } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const plans = [
  {
    name: "Basic",
    tagline: "For beginners",
    popular: false,
    charges: [
      { label: "Account Opening", value: "Free" },
      { label: "Demat AMC", value: "₹300/year" },
      { label: "Equity Delivery", value: "0%" },
      { label: "Equity Intraday", value: "0.03% or ₹20" },
      { label: "F&O", value: "₹20 per order" },
      { label: "Commodity", value: "₹20 per order" },
      { label: "Mutual Funds AMC", value: "Zero" },
      { label: "IPO Charges", value: "Zero" },
    ],
  },
  {
    name: "Pro",
    tagline: "For active traders",
    popular: true,
    charges: [
      { label: "Account Opening", value: "Free" },
      { label: "Demat AMC", value: "₹200/year" },
      { label: "Equity Delivery", value: "0%" },
      { label: "Equity Intraday", value: "0.03% or ₹20" },
      { label: "F&O", value: "₹15 per order" },
      { label: "Commodity", value: "₹15 per order" },
      { label: "Mutual Funds AMC", value: "Zero" },
      { label: "IPO Charges", value: "Zero" },
    ],
  },
];

const brokerageTable = [
  { segment: "Equity Delivery", nse: "0%", bse: "0%", note: "Zero brokerage on delivery trades" },
  { segment: "Equity Intraday", nse: "0.03% or ₹20", bse: "0.03% or ₹20", note: "Whichever is lower" },
  { segment: "Equity Futures", nse: "₹20 per order", bse: "₹20 per order", note: "Flat fee" },
  { segment: "Equity Options", nse: "₹20 per order", bse: "₹20 per order", note: "Flat fee" },
  { segment: "Currency Futures", nse: "₹20 per order", bse: "—", note: "Flat fee" },
  { segment: "Currency Options", nse: "₹20 per order", bse: "—", note: "Flat fee" },
  { segment: "Commodity Futures", nse: "—", bse: "₹20 per order (MCX)", note: "Flat fee" },
  { segment: "Commodity Options", nse: "—", bse: "₹20 per order (MCX)", note: "Flat fee" },
  { segment: "Mutual Funds", nse: "Zero", bse: "Zero", note: "No AMC charges" },
  { segment: "IPO", nse: "Zero", bse: "Zero", note: "No charges" },
];

export default function Pricing() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative w-full py-32 overflow-hidden bg-background border-b border-white/5 pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-80 pointer-events-none"></div>
        <div className="container relative z-10 mx-auto px-4 lg:px-8 max-w-7xl text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold tracking-widest uppercase mb-6 border border-primary/30">PRICING</span>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight leading-[1.1]">
            Transparent Pricing.<br />No <span className="text-primary">Hidden Costs.</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            At Maitra Wealth, we believe in complete transparency. What you see is what you pay —
            no surprise charges, ever.
          </motion.p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Both plans come with zero delivery brokerage, zero Mutual Fund AMC, and zero IPO charges.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className={`rounded-2xl border p-8 relative ${plan.popular ? "border-primary shadow-lg shadow-secondary/10 bg-card" : "border-border bg-card"}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{plan.tagline}</p>
                <ul className="space-y-3 mb-8">
                  {plan.charges.map(c => (
                    <li key={c.label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{c.label}</span>
                      <span className={`font-semibold ${c.value === "Zero" || c.value === "0%" || c.value === "Free" ? "text-emerald-600" : "text-foreground"}`}>{c.value}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/open-account">
                  <Button className={`w-full rounded-full ${plan.popular ? "bg-primary hover:bg-primary/90 text-white" : ""}`}
                    variant={plan.popular ? "default" : "outline"}>
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brokerage Table */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Detailed Brokerage Charges</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Comprehensive breakdown of brokerage for all trading segments.</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left px-6 py-4 font-semibold">Segment</th>
                  <th className="text-left px-6 py-4 font-semibold">NSE</th>
                  <th className="text-left px-6 py-4 font-semibold">BSE / MCX</th>
                  <th className="text-left px-6 py-4 font-semibold hidden md:table-cell">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {brokerageTable.map((row, i) => (
                  <motion.tr key={row.segment} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{row.segment}</td>
                    <td className={`px-6 py-4 ${row.nse === "Zero" || row.nse === "0%" ? "text-emerald-600 font-semibold" : "text-foreground"}`}>{row.nse}</td>
                    <td className={`px-6 py-4 ${row.bse === "Zero" || row.bse === "0%" ? "text-emerald-600 font-semibold" : "text-foreground"}`}>{row.bse}</td>
                    <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{row.note}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex items-start gap-2 text-sm text-muted-foreground bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 max-w-2xl">
            <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <p>Brokerage will not exceed SEBI prescribed limits. Additional statutory charges like STT, SEBI turnover fees, GST, stamp duty, and exchange transaction charges apply as per regulations.</p>
          </div>
        </div>
      </section>

      {/* Inclusions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What's Always Included</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              "Zero AMC on Mutual Funds & IPOs",
              "24x7 Tech Support",
              "SEBI-Registered Advisors",
              "Free Account Opening",
              "Paperless KYC",
              "Mobile App Access",
              "Web Terminal Access",
              "Brokerage Calculator",
            ].map((item, i) => (
              <motion.div key={item} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </motion.div>
            ))}
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
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Open Your Free Account Today</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">No account opening charges. No hidden fees. Just straightforward investing.</p>
          <Link href="/open-account">
            <Button size="lg" className="h-16 px-12 text-xl font-bold bg-primary text-white hover:bg-primary/90 rounded-full shadow-[0_0_40px_rgba(0,208,156,0.4)]">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

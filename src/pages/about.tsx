import { motion } from "framer-motion";
import { Shield, Award, Users, TrendingUp, CheckCircle, Building2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "50,000+", label: "Happy Clients" },
  { value: "1500+", label: "NSE Scrips" },
  { value: "SEBI", label: "Registered Broker" },
];

const values = [
  { icon: Shield, title: "Integrity", desc: "We operate with complete transparency — no hidden charges, no misleading advice. Your trust is our foundation." },
  { icon: TrendingUp, title: "Simplicity", desc: "We believe investing should be simple. Our platforms are designed to remove complexity so you focus on growing wealth." },
  { icon: Users, title: "Client First", desc: "Every decision we make is centered on your financial wellbeing. Your success is our success." },
  { icon: Award, title: "Excellence", desc: "Award-winning service backed by SEBI-registered experts and cutting-edge technology." },
];

const registrations = [
  { label: "NSE Membership Code", value: "90175" },
  { label: "MCX Membership Code", value: "55060" },
  { label: "SEBI Registration No", value: "INZ000074139" },
  { label: "CIN Number", value: "U74999TN2012PTC084067" },
  { label: "GST Registration", value: "33AAHCM6659B1ZJ" },
  { label: "Depository", value: "CDSL" },
  { label: "DPID", value: "12089300" },
  { label: "DP SEBI Reg No", value: "IN-DP-430-2019" },
  { label: "AMFI ARN", value: "164992" },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative w-full py-32 overflow-hidden bg-background border-b border-white/5 pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-80 pointer-events-none"></div>
        <div className="container relative z-10 mx-auto px-4 lg:px-8 max-w-7xl text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold tracking-widest uppercase mb-6 border border-primary/30">ABOUT US</span>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight leading-[1.1]">
            Built on Trust,<br />Backed by <span className="text-primary">Technology</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            Maitra Commodities, operating under the brand Maitra Wealth, is a SEBI-registered
            stockbroker based in Chennai, India. We believe that every Indian deserves access to
            professional financial services — simplified, transparent, and trustworthy.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{s.value}</div>
                <div className="text-muted-foreground text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">Our Story</span>
              <h2 className="text-3xl font-bold text-foreground mb-6">A Decade of Simplifying Wealth</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Maitra Commodities was founded with a simple mission: to make financial markets accessible
                to every Indian investor, regardless of their background or experience. We recognized that
                complexity was the biggest barrier to investing — so we set out to remove it.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                From our roots in Chennai, we've grown to serve thousands of clients across India — from
                seasoned traders in Trichy to first-time investors in Udaipur. Our award-winning platform,
                SEBI-registered advisors, and transparent pricing model have made us one of the most
                trusted brokers in South India.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, Maitra Wealth continues to evolve — with a robust mobile app, powerful API access,
                and a product suite spanning equities, commodities, mutual funds, F&O, IPOs, and insurance.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="bg-primary rounded-2xl p-8 text-primary-foreground">
              <Building2 className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-6">Office Locations</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-primary text-sm font-semibold mb-1">Registered Office</div>
                  <p className="text-primary-foreground/80 text-sm">No: 18, First Street, Venkatratinam Nagar Extension, Adyar, Chennai – 600020</p>
                </div>
                <div>
                  <div className="text-primary text-sm font-semibold mb-1">Corporate Office</div>
                  <p className="text-primary-foreground/80 text-sm">Flat No:6, B R Complex, 2nd Floor, Old No:35 New No:33, CP Ramaswamy Road, Alwarpet, Chennai – 600018</p>
                </div>
                <div>
                  <div className="text-primary text-sm font-semibold mb-1">Phone</div>
                  <p className="text-primary-foreground/80 text-sm">044-48656581 / 82</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">These principles guide every decision we make — from how we build our technology to how we serve our clients.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
                <v.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registrations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">SEBI Registrations & Compliance</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Maitra Commodities is fully registered and compliant with all SEBI regulations, ensuring your investments are protected.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {registrations.map((r, i) => (
              <motion.div key={r.label} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="bg-card border border-border rounded-xl p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground">{r.label}</div>
                  <div className="font-semibold text-foreground text-sm">{r.value}</div>
                </div>
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
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Ready to Start Your Investment Journey?</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">Join thousands of investors who trust Maitra Wealth for their financial future.</p>
          <Link href="/open-account">
            <Button size="lg" className="h-16 px-12 text-xl font-bold bg-primary text-white hover:bg-primary/90 rounded-full shadow-[0_0_40px_rgba(0,208,156,0.4)]">
              Open Demat Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

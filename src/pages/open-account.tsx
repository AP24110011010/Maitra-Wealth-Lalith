import { motion } from "framer-motion";
import { UserCheck, FileText, Shield, CheckCircle, Smartphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const steps = [
  {
    step: "01",
    icon: Smartphone,
    title: "Download the App or Visit Web",
    desc: "Download the Maitra Wealth app on iOS or Android, or visit our web terminal. Click on 'Open Account' to begin the process.",
  },
  {
    step: "02",
    icon: UserCheck,
    title: "Enter Your Basic Details",
    desc: "Provide your name, email, mobile number, and PAN. This takes less than 2 minutes and is completely secure.",
  },
  {
    step: "03",
    icon: FileText,
    title: "Complete e-KYC",
    desc: "Complete the paperless KYC process using your Aadhaar OTP and PAN verification. No physical documents or visits required.",
  },
  {
    step: "04",
    icon: Shield,
    title: "Account Activated",
    desc: "Your Demat and Trading account is activated within 24 hours. You'll receive login credentials on your registered email and mobile.",
  },
];

const requirements = [
  "PAN Card",
  "Aadhaar Card",
  "Bank Account (for fund transfer)",
  "Mobile number linked to Aadhaar",
  "Email address",
  "Passport-size photograph",
];

const benefits = [
  "Free account opening",
  "Zero AMC on Mutual Funds & IPOs",
  "Transparent brokerage — no hidden charges",
  "24x7 tech support",
  "SEBI-registered and regulated",
  "Trade in equities, commodities, F&O",
  "Highly rated mobile app",
  "Instant KYC — paperless process",
];

export default function OpenAccount() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-4">Get Started</span>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-4xl md:text-5xl font-bold mb-6">
            Open Your Demat Account<br />in Minutes
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-8">
            Join thousands of traders and investors on India's most transparent brokerage platform. Paperless, instant, and completely free.
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
              Open Account Now <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8">
              Call 044-45630555
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How to Open an Account</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Our 4-step onboarding process is designed to get you trading as fast as possible.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div key={s.step} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+3rem)] w-full h-0.5 bg-gradient-to-r from-primary/60 to-transparent" />
                )}
                <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors">
                  <div className="text-4xl font-black text-primary/20 mb-4">{s.step}</div>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Two columns: requirements + benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl font-bold mb-6">Documents Required</h2>
              <div className="space-y-3">
                {requirements.map((r, i) => (
                  <div key={r} className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">{i + 1}</div>
                    <span className="text-sm font-medium">{r}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl font-bold mb-6">What You Get</h2>
              <div className="space-y-3">
                {benefits.map(b => (
                  <div key={b} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compliance Note */}
      <section className="py-12 bg-card border-t border-b border-border">
        <div className="container mx-auto px-4 max-w-3xl text-center text-sm text-muted-foreground space-y-3">
          <p className="font-semibold text-foreground">Important Notes</p>
          <p>KYC is a one-time exercise done through a SEBI-registered intermediary. There is no need to repeat the KYC process when you go to any other intermediary.</p>
          <p>You do not have to issue a cheque while subscribing to an IPO. Write your bank account number clearly on the IPO application and sign it, sanctioning your bank to make payments when there is an allotment.</p>
          <p>Prevent Unauthorized Transactions in your Trading/Demat account — Update your Mobile Number and Email Address with your Trading Member/Depository Participant.</p>
          <p className="font-medium text-foreground">NSE MEMBERSHIP CODE: 90175 | MCX MEMBERSHIP CODE: 55060 | SEBI REGISTRATION NO: INZ000074139</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Investing?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Open your free Demat account now and begin your wealth creation journey with Maitra.</p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8">
            Open Free Account <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}

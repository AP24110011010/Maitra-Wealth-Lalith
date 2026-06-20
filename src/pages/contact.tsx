import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative w-full py-32 overflow-hidden bg-background border-b border-white/5 pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-80 pointer-events-none"></div>
        <div className="container relative z-10 mx-auto px-4 lg:px-8 max-w-7xl text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold tracking-widest uppercase mb-6 border border-primary/30">CONTACT US</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight leading-[1.1]">
            We're Here to <span className="text-primary">Help.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            Get in touch with our team of financial experts. We are here to help you navigate your wealth creation journey.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-card border-white/5 text-white">
              <CardContent className="p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-muted-foreground mb-4">Mon-Fri from 9am to 6pm</p>
              <p className="font-semibold text-lg text-primary">044-45630555</p>
              <p className="font-semibold text-lg text-primary">044-48656581/82</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-4">Our team will respond within 24 hours</p>
              <p className="font-semibold text-primary">info@maitracommodities.com</p>
              <p className="font-semibold text-primary">compliance@maitracommodities.com</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Visit Us</h3>
              <p className="text-muted-foreground mb-4">Corporate Office</p>
              <p className="font-semibold text-primary text-sm">
                Flat No:6, B R Complex, 2nd Floor, <br/>
                Old No:35 New No:33, CP Ramaswamy Road, <br/>
                Alwarpet, Chennai-600018
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-20 max-w-3xl mx-auto bg-card border border-white/5 p-8 md:p-12 rounded-2xl shadow-lg">
          <h3 className="text-3xl font-bold text-center mb-8 text-white">Send us a message</h3>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">First Name</label>
                <input type="text" className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-slate-500" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-300">Last Name</label>
                <input type="text" className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-slate-500" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Email Address</label>
              <input type="email" className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-slate-500" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Phone Number</label>
              <input type="tel" className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder-slate-500" placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-300">Message</label>
              <textarea className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 h-32 text-white placeholder-slate-500" placeholder="How can we help you?"></textarea>
            </div>
            <Button className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white rounded-xl font-bold">Send Message</Button>
          </form>
        </div>
        </div>
      </section>
    </div>
  );
}

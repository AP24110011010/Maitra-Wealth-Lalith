import React from "react";
import { 
  HeroSection, 
  MarketTicker, 
  AppOnboardingSection, 
  PlatformShowcase 
} from "@/components/home/HeroAndFeatures";
import { PremiumServicesSection, IPOSection } from "@/components/home/ProductsShowcase";
import { 
  BlogsSection, 
  TestimonialsSection, 
  FAQSection
} from "@/components/home/ResourcesAndCTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-background text-foreground overflow-x-hidden pt-0 pb-12">
      <HeroSection />
      <MarketTicker />
      <AppOnboardingSection />
      <PlatformShowcase />
      
      <PremiumServicesSection />
      <IPOSection />
      
      <BlogsSection />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
}

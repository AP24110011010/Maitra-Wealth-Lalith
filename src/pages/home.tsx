import React from "react";
import { 
  HeroSection, 
  MarketTicker, 
  TrustIndicators, 
  WhyMaitra, 
  PlatformShowcase 
} from "@/components/home/HeroAndFeatures";
import { 
  ProductsOverview, 
  StocksSection, 
  MutualFundsSection, 
  FuturesOptionsSection, 
  CommoditiesSection, 
  IPOSection, 
  InsuranceSection 
} from "@/components/home/ProductsShowcase";
import { 
  KnowledgeCentre, 
  BlogsSection, 
  TestimonialsSection, 
  FAQSection, 
  FinalCTA 
} from "@/components/home/ResourcesAndCTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-background text-foreground overflow-x-hidden pt-0">
      <HeroSection />
      <MarketTicker />
      <TrustIndicators />
      <WhyMaitra />
      <PlatformShowcase />
      
      <ProductsOverview />
      <StocksSection />
      <MutualFundsSection />
      <FuturesOptionsSection />
      <CommoditiesSection />
      <IPOSection />
      <InsuranceSection />
      
      <KnowledgeCentre />
      <BlogsSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
    </div>
  );
}

import { motion } from "framer-motion";
import React from "react";
import { staggerContainer } from "@/lib/animations";

export function AnimatedSection({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.section 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}

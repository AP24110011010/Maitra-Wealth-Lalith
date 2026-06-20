import { motion } from "framer-motion";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const posts = [
  {
    id: 1,
    category: "Investing 101",
    title: "Reasons for Coal Petcoke Price Increase",
    excerpt: "Coal story — an in-depth analysis of why petroleum coke prices have been rising and what it means for energy investors and commodity traders in India.",
    date: "March 15, 2025",
    readTime: "5 min read",
    tag: "Commodities",
  },
  {
    id: 2,
    category: "Investing 101",
    title: "Crude Oil Price To Touch 150 USD A Barrel",
    excerpt: "An expert analysis of global crude oil supply-demand dynamics, geopolitical risks, and OPEC decisions — and why crude could hit $150/barrel.",
    date: "February 28, 2025",
    readTime: "7 min read",
    tag: "Energy",
  },
  {
    id: 3,
    category: "Investing in Stocks",
    title: "How To Avoid Capital Gains Tax",
    excerpt: "The basic purpose of capital gains tax planning is to minimize your tax liability legally. Learn proven strategies to save on LTCG and STCG in India.",
    date: "January 20, 2025",
    readTime: "6 min read",
    tag: "Tax Planning",
  },
  {
    id: 4,
    category: "Mutual Funds",
    title: "SIP vs Lumpsum: Which Is Better For You?",
    excerpt: "Systematic Investment Plans and lumpsum investments both have merits. We break down the pros and cons so you can choose the right strategy for your goals.",
    date: "December 10, 2024",
    readTime: "4 min read",
    tag: "Mutual Funds",
  },
  {
    id: 5,
    category: "Trading Strategies",
    title: "Understanding Futures & Options: A Beginner's Guide",
    excerpt: "Derivatives can seem complex but they're powerful tools for hedging and speculating. This guide walks you through F&O basics with real examples.",
    date: "November 5, 2024",
    readTime: "8 min read",
    tag: "Derivatives",
  },
  {
    id: 6,
    category: "Investing in Stocks",
    title: "Top 10 Blue-Chip Stocks for Long-Term Investment in 2025",
    excerpt: "Blue-chip stocks form the backbone of any long-term portfolio. Discover which Nifty 50 companies offer the best combination of stability and growth.",
    date: "October 22, 2024",
    readTime: "6 min read",
    tag: "Equities",
  },
];

const categories = ["All", "Investing 101", "Investing in Stocks", "Mutual Funds", "Trading Strategies", "Commodities"];

export default function Blogs() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-4">Insights & Education</span>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-4xl md:text-5xl font-bold mb-6">
            Invest Smarter<br />with Maitra
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Expert insights, market analysis, and investing education — everything you need to make informed financial decisions.
          </motion.p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b bg-card sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map(c => (
              <button key={c}
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border border-border hover:border-primary hover:text-primary transition-colors first:bg-primary first:text-white first:border-primary">
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/40 transition-all group">
            <div className="grid md:grid-cols-2">
              <div className="bg-gradient-to-br from-primary to-primary/80 p-12 flex items-center justify-center min-h-[240px]">
                <div className="text-center text-white">
                  <div className="text-6xl font-black opacity-20 mb-2">01</div>
                  <div className="text-2xl font-bold">Featured Article</div>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">{posts[0].category}</span>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{posts[0].title}</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">{posts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{posts[0].date}</span>
                  <span>{posts[0].readTime}</span>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full w-fit">
                  Read Article <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post, i) => (
              <motion.article key={post.id} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/40 transition-all group cursor-pointer">
                <div className="bg-gradient-to-br from-primary/80 to-primary/60 h-40 flex items-center justify-center">
                  <span className="text-5xl font-black text-white/20">0{i + 2}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">{post.category}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Tag className="w-3 h-3" />{post.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors leading-tight">{post.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
          <p className="text-primary-foreground/70 mb-8">Get the latest market insights and investment tips delivered to your inbox.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:border-primary" />
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

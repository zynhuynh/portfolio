import React from 'react';
import { motion } from 'framer-motion';

const metrics = [
  { value: "2M+", label: "On-chain Active Wallets Reached" },
  { value: "100K+", label: "Peak Platform DAU" },
  { value: "800K+", label: "Users Acquired" },
  { value: "$5M", label: "Trading Volume Generated" },
  { value: "Top Trending", label: "NFT Collection across Base, Movement" },
  { value: "200+", label: "KOLs & Ecosystem Partners" },
];

export default function ImpactMetrics() {
  return (
    <section className="py-24 px-6 bg-surface relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#FFA3BD' }}>Growth Impact</h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: '#FF7FA6' }}></div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-20">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass p-8 rounded-2xl text-center group border border-white/10 hover:border-[rgba(255,127,166,0.35)] hover:-translate-y-2 transition-all duration-300"
            >
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-textSecondary bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                {metric.value}
              </h3>
              <p className="text-textSecondary text-sm font-medium">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

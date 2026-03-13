import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-45 pointer-events-none"
        style={{ backgroundColor: 'rgba(255, 143, 175, 0.22)' }}
      />

      <div className="max-w-7xl mx-auto z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.65fr_1fr] items-center gap-10 lg:gap-12">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2
                className="font-medium tracking-wider uppercase mb-4 text-sm md:text-base"
                style={{ color: '#FFA3BD' }}
              >
                Growth Marketing Manager
              </h2>
              <div
                className="h-[2px] w-20 rounded-full mb-6 mx-auto lg:mx-0"
                style={{ background: 'linear-gradient(90deg, #FF9DB6, #FF7FA6)' }}
              />
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #FFC1D3, #FF7FA6)' }}
                >
                  KIMMIE HUYNH
                </span>
              </h1>
              <p className="text-lg font-medium text-textPrimary mb-4">Here's who I am & what I do</p>
              <p className="text-textSecondary text-lg md:text-xl leading-relaxed max-w-3xl lg:max-w-none mb-6">
                I build scalable growth engines for Web3 ecosystems through end-to-end user acquisition, retention, product adoption and ecosystem partnerships across Vietnam, SEA and global markets.
              </p>
              <p className="text-textSecondary text-base md:text-lg leading-relaxed max-w-3xl lg:max-w-none mb-6">
                Over the past 6+ years, I've worked across Layer2, venture ecosystems, gaming, NFTs and blockchain conferences, helping scale platforms from 0 to 800K+ users, activate 2M+ on-chain wallets, and drive 100K+ peak DAU.
              </p>
              <p className="text-textSecondary text-base md:text-lg leading-relaxed max-w-3xl lg:max-w-none mb-10">
                Much of my work involves building projects from zero, designing growth strategies that drive fast adoption, strong communities and ecosystem expansion.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
            >
              <a
                href="#projects"
                className="px-8 py-4 text-white rounded-full font-semibold transition-all hover:brightness-110 hover:shadow-[0_0_28px_rgba(255,127,166,0.48)]"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #FFA3BD, #FF7FA6)',
                  boxShadow: '0 0 20px rgba(255,127,166,0.35)'
                }}
              >
                View My Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-4 bg-surfaceHighlight text-textPrimary rounded-full font-semibold border border-white/10 hover:bg-white/10 transition-all hover:border-[#FF9DB6]"
              >
                Contact Me
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mx-auto w-full max-w-[360px] md:max-w-[420px] lg:max-w-[460px]"
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-[24px] blur-2xl scale-[0.96] pointer-events-none"
                style={{ backgroundColor: 'rgba(255, 127, 166, 0.22)' }}
              />
              <img
                src="/assets/homepage/kimmie-homepage.jpg"
                alt="Kimmie Huynh portrait"
                className="relative w-full h-auto rounded-[24px] object-cover border border-white/10"
                style={{ boxShadow: '0 0 120px rgba(255,127,166,0.15), 0 18px 50px rgba(0,0,0,0.45)' }}
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

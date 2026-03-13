import React from 'react';
import { motion } from 'framer-motion';

const expertiseGroups = [
  {
    icon: "📈",
    title: "Growth & Performance Marketing",
    skills: [
      "User Growth Strategy & Execution",
      "Multi-channel Acquisition Planning",
      "Paid Media & CAC Optimization",
      "A/B Testing & Hypothesis-driven Experimentation",
      "KPI Ownership & Performance Dashboard Management",
      "Funnel Optimization & UX Enhancement",
    ],
  },
  {
    icon: "🤝",
    title: "Ecosystem & Partnership Development",
    skills: [
      "KOL & Influencer Network Management",
      "Community & Ambassador Program Development",
      "Strategic Partnerships & Cross-project Collaboration",
      "Token Incentive & Airdrop Framework Design",
    ],
  },
  {
    icon: "🧠",
    title: "Content & Brand Positioning",
    skills: [
      "Campaign Strategy & Analytics",
      "Content Strategy & Narrative Control",
      "Social Media Growth & Community Operations",
    ],
  },
];

export default function CoreExpertises() {
  return (
    <section className="py-24 px-6 bg-background relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 uppercase tracking-[0.06em]" style={{ color: '#FFA3BD' }}>
            Core Expertises
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: '#FF7FA6' }}></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-10 items-stretch">
          {expertiseGroups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass p-7 rounded-2xl border border-white/10 h-full flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl leading-none" aria-hidden="true">{group.icon}</span>
                <h3 className="text-lg md:text-xl font-semibold text-textPrimary">{group.title}</h3>
              </div>

              <ul className="space-y-3 mt-auto">
                {group.skills.map((item, skillIndex) => (
                  <li key={skillIndex} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ backgroundColor: '#FF7FA6' }} />
                    <span className="text-textSecondary text-sm md:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

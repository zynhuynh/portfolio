import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Building, GraduationCap } from 'lucide-react';

const journey = [
  {
    role: "Marketing Lead",
    company: "Kyros Ventures",
    period: "2021–2025",
    type: "work"
  },
  {
    role: "Growth Lead",
    company: "Ancient8 & Space3",
    period: "2021–2025",
    type: "work"
  },
  {
    role: "Marketing Lead",
    company: "GM Vietnam",
    period: "2023–2025",
    type: "work"
  },
  {
    role: "NFT Project Lead",
    company: "Lilquid, Arkai",
    period: "2024–2025",
    type: "work"
  },
  {
    role: "Master of Business Administration (MBA)",
    company: "Western Sydney University",
    period: "2024–2025",
    type: "edu"
  },
  {
    role: "Bachelor of Int. Business & Finance",
    company: "RMIT University - High Distinction",
    period: "2017–2021",
    type: "edu"
  }
];

export default function JourneyTimeline() {
  return (
    <section className="py-24 px-6 bg-background relative" id="about">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#FFA3BD' }}>My Journey</h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: '#FF7FA6' }}></div>
        </motion.div>

        <div className="space-y-8">
          {journey.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-6 rounded-2xl flex items-start gap-4 hover:bg-white/[0.03] transition-colors"
            >
              <div
                className="p-3 rounded-lg flex-shrink-0"
                style={{ backgroundColor: 'rgba(255,127,166,0.15)', color: '#FF7FA6' }}
              >
                {item.type === 'work' ? <Building size={24} /> : <GraduationCap size={24} />}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-textPrimary">{item.role}</h3>
                <p className="text-textSecondary mt-1">{item.company}</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-textSecondary text-sm font-medium">
                <Calendar size={16} />
                <span>{item.period}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectData } from '../data/projectData';

export default function ProjectsGrid() {
  return (
    <section className="py-24 px-6 bg-surface relative" id="projects">
      <div className="absolute left-[-8rem] top-24 h-[26rem] w-[26rem] rounded-full bg-primary/10 blur-[110px] pointer-events-none" />
      <div className="absolute right-[-6rem] bottom-0 h-[24rem] w-[24rem] rounded-full bg-secondary/10 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 max-w-4xl"
        >
          <p className="text-xs uppercase tracking-[0.28em] text-textSecondary mb-4">Selected Case Studies</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-5" style={{ color: '#FFA3BD' }}>Proof-first portfolio work</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projectData.map((project, index) => {
            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link
                  to={`/project/${project.slug}`}
                  className="group block h-full overflow-hidden rounded-[30px] border border-white/10 bg-background/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,127,166,0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  {(project.thumbnailImage || project.heroImage) && (
                    <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10">
                      <img
                        src={project.thumbnailImage || project.heroImage}
                        alt={project.thumbnailAlt || project.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />
                      <div className="absolute left-5 right-5 bottom-5 flex items-end justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-white/70 mb-2">
                            {project.subtitle || 'Case Study'}
                          </p>
                          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                        </div>
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors text-[#FFC1D3] group-hover:text-[#FF7FA6]"
                          style={{
                            backgroundColor: project.accent.bg,
                            borderColor: project.accent.border
                          }}
                        >
                          <ArrowUpRight size={18} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex flex-col h-[calc(100%-0px)]">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span
                        className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                          backgroundColor: project.accent.bg,
                          color: project.accent.primary,
                          border: `1px solid ${project.accent.border}`
                        }}
                      >
                        {project.role}
                      </span>
                      <span className="text-xs text-textSecondary">
                        {project.socialLinks?.length || 0} live link{project.socialLinks?.length === 1 ? '' : 's'}
                      </span>
                    </div>

                    <p className="text-textSecondary text-sm leading-relaxed mb-5 min-h-[4.5rem]">
                      {project.shortDescription}
                    </p>

                    <div className="mb-5">
                      <p className="inline-flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: '#FFA3BD' }}>
                        <span className="border-b border-transparent group-hover:border-[#FF7FA6] group-hover:text-[#FF7FA6] transition-all">
                          View details of my work
                        </span>
                        <span className="group-hover:text-[#FF7FA6] transition-colors">→</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.impact.slice(0, 3).map((metric, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: project.accent.bg,
                            color: project.accent.text,
                            border: `1px solid ${project.accent.border}`
                          }}
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

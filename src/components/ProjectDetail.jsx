import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Briefcase,
  ExternalLink,
  Image,
  Link2,
  Lightbulb,
  Newspaper,
  Target,
  Trophy
} from 'lucide-react';
import { projectData } from '../data/projectData';

function getSection(project, sectionId) {
  return (project.sections || []).find((section) => section.id === sectionId);
}

function countBlockLinks(blocks = []) {
  return blocks.reduce(
    (total, block) => total + (block.links?.length || 0) + (block.mediaCoverage?.length || 0),
    0
  );
}

function countProjectImages(project) {
  const imageUrls = new Set();

  if (project.heroImage) imageUrls.add(project.heroImage);
  (project.sections || []).forEach((section) => {
    (section.blocks || []).forEach((block) => {
      (block.images || []).forEach((url) => {
        if (url) imageUrls.add(url);
      });
    });
  });

  return imageUrls.size;
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projectData.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-textPrimary mb-4">Project not found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const accent = project.accent;
  const proofImageCount = countProjectImages(project);
  const allBlocks = (project.sections || []).flatMap((section) => section.blocks || []);
  const referenceCount =
    (project.socialLinks?.length || 0) + countBlockLinks(allBlocks);
  const getManualImages = (block) =>
    Array.isArray(block?.images) ? block.images.filter(Boolean) : [];

  const Section = ({ eyebrow, title, icon: Icon, children, delay = 0 }) => (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-[28px] border border-white/8 bg-white/[0.02] p-6 md:p-8"
    >
      <div className="flex items-start gap-4 mb-6">
        <div
          className="p-3 rounded-2xl border"
          style={{ backgroundColor: accent.bg, borderColor: accent.border, color: accent.primary }}
        >
          <Icon size={20} />
        </div>
        <div>
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.24em] text-textSecondary mb-2">{eyebrow}</p>
          )}
          <h2 className="text-2xl md:text-3xl font-bold text-textPrimary">{title}</h2>
        </div>
      </div>
      {children}
    </motion.section>
  );

  const renderLinkPills = (links, size = 'default') => (
    <div className={`flex flex-wrap ${size === 'large' ? 'gap-3 md:gap-4' : 'gap-3'}`}>
      {links.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-full transition-colors hover:bg-white/10 ${
            size === 'large'
              ? 'px-4 md:px-5 py-3 md:py-3.5 text-sm md:text-base font-medium'
              : 'px-4 py-2 text-sm'
          }`}
          style={{ backgroundColor: accent.bg, color: accent.text, border: `1px solid ${accent.border}` }}
        >
          <ExternalLink size={size === 'large' ? 16 : 14} />
          {link.label}
        </a>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      <div
        className="relative overflow-hidden pt-28 pb-16 px-6"
        style={{ background: `radial-gradient(circle at top right, ${accent.bg} 0%, transparent 45%)` }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-16 right-0 h-72 w-72 rounded-full blur-3xl"
            style={{ backgroundColor: accent.bg }}
          />
          {project.heroImage && (
            <>
              <img
                src={project.heroImage}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/45 via-background/80 to-background" />
            </>
          )}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            to="/#projects"
            onClick={() => {
              window.location.href = '/#projects';
            }}
            className="inline-flex items-center gap-2 text-textSecondary hover:text-textPrimary transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back to Projects</span>
          </Link>

          <div className="grid gap-8 grid-cols-1 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-textSecondary mb-4">
                Case Study / Proof-Driven Portfolio
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: accent.text }}>
                {project.title}
              </h1>
              {project.subtitle && (
                <p className="text-textSecondary text-lg md:text-xl mb-5">{project.subtitle}</p>
              )}
              <p className="text-base md:text-lg text-textPrimary/90 leading-relaxed max-w-3xl mb-6">
                {project.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span
                  className="px-4 py-2 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: accent.bg,
                    color: accent.primary,
                    border: `1px solid ${accent.border}`
                  }}
                >
                  {project.role}
                </span>
                <span className="px-4 py-2 rounded-full text-sm font-medium border border-white/10 bg-white/[0.03]">
                  {proofImageCount} proof asset{proofImageCount === 1 ? '' : 's'}
                </span>
                <span className="px-4 py-2 rounded-full text-sm font-medium border border-white/10 bg-white/[0.03]">
                  {referenceCount} external reference{referenceCount === 1 ? '' : 's'}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {project.impact.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border p-4 backdrop-blur-sm"
                    style={{
                      backgroundColor: accent.bg,
                      borderColor: accent.border
                    }}
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-textSecondary mb-2">Impact</p>
                    <p className="font-semibold leading-snug" style={{ color: accent.text }}>{item}</p>
                  </div>
                ))}
              </div>
              {project.socialLinks && project.socialLinks.length > 0 && (
                <div className="mt-7">
                  <p className="text-xs uppercase tracking-[0.26em] text-textSecondary mb-4">LINKS</p>
                  {renderLinkPills(project.socialLinks, 'large')}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
          <div className="space-y-8">
            {project.heroImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[28px] overflow-hidden border border-white/10 bg-surface"
              >
                <div className="px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                  <p className="text-xs uppercase tracking-[0.26em] text-textSecondary">Primary Campaign Visual</p>
                </div>
                <img
                  src={project.heroImage}
                  alt={`${project.title} hero`}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </motion.div>
            )}
            {project.sections && project.sections.map((section, sectionIdx) => {
              const iconBySection = {
                overview: Briefcase,
                visuals: Image,
                role: Briefcase,
                highlights: Trophy,
                "key-achievement": Trophy,
                objectives: Target,
                solutions: Lightbulb,
                achievements: Trophy
              };

              if (section.id === 'achievements') {
                return (
                  <Section
                    key={`${project.slug}-${section.id}`}
                    eyebrow={section.eyebrow}
                    title={section.title}
                    icon={iconBySection[section.id] || Briefcase}
                    delay={sectionIdx * 0.03}
                  >
                    <div className="space-y-6">
                      {section.blocks.map((block, blockIdx) => (
                        (project.slug === 'space3' &&
                          block.title === "My 'secret' growth engine for 1M+ users onboarding without spending 'millions'") ? (
                          <article
                            key={`${project.slug}-${section.id}-${blockIdx}-${block.title || 'block'}`}
                            className="space-y-5"
                          >
                            <div>
                              {block.title && (
                                <h4 className="text-xl font-bold mb-3" style={{ color: accent.text }}>
                                  {block.title}
                                </h4>
                              )}
                              {block.text && (
                                <div className="space-y-3">
                                  {block.text.split('\n\n').map((paragraph, paragraphIdx) => (
                                    <p
                                      key={`${project.slug}-${section.id}-${blockIdx}-paragraph-${paragraphIdx}`}
                                      className="text-textSecondary leading-relaxed text-sm md:text-base"
                                    >
                                      {paragraph}
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>

                            {block.mainVisual && (
                              <div className="rounded-2xl overflow-hidden border border-white/10 bg-surface">
                                <img
                                  src={block.mainVisual}
                                  alt={`${block.title || section.title} - main visual`}
                                  className="w-full h-auto"
                                  loading="lazy"
                                />
                              </div>
                            )}

                            {Array.isArray(block.supportingImages) && block.supportingImages.length > 0 && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {block.supportingImages.map((imgUrl, imgIdx) => (
                                  <div
                                    key={`${project.slug}-${section.id}-${blockIdx}-support-${imgIdx}-${imgUrl}`}
                                    className="rounded-2xl overflow-hidden border border-white/10 bg-surface"
                                  >
                                    <img
                                      src={imgUrl}
                                      alt={`${block.title || section.title} - supporting visual ${imgIdx + 1}`}
                                      className="w-full h-auto"
                                      loading="lazy"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </article>
                        ) : (project.slug === 'space3' &&
                          block.title === "My Strategy to Build Trust Through Strategic Ecosystem Partnerships") ? (
                          <article
                            key={`${project.slug}-${section.id}-${blockIdx}-${block.title || 'block'}`}
                            className="space-y-5"
                          >
                            <div>
                              {block.title && (
                                <h4 className="text-xl font-bold mb-3" style={{ color: accent.text }}>
                                  {block.title}
                                </h4>
                              )}
                              {block.text && (
                                <p className="text-textSecondary leading-relaxed text-sm md:text-base">
                                  {block.text}
                                </p>
                              )}
                            </div>

                            {Array.isArray(block.partnershipImages) && block.partnershipImages.length === 3 && (
                              <div className="grid grid-cols-1 md:grid-cols-[1.65fr_1fr] gap-4 items-start">
                                <img
                                  src={block.partnershipImages[0]}
                                  alt={`${block.title} - ecosystem visual 1`}
                                  className="w-full h-auto"
                                  loading="lazy"
                                />
                                <div className="grid grid-cols-1 gap-4">
                                  <img
                                    src={block.partnershipImages[1]}
                                    alt={`${block.title} - ecosystem visual 2`}
                                    className="w-full h-auto"
                                    loading="lazy"
                                  />
                                  <img
                                    src={block.partnershipImages[2]}
                                    alt={`${block.title} - ecosystem visual 3`}
                                    className="w-full h-auto"
                                    loading="lazy"
                                  />
                                </div>
                              </div>
                            )}
                          </article>
                        ) : (project.slug === 'kyros-ventures' &&
                          block.title === 'Media & Branding Coverage') ? (
                          <article
                            key={`${project.slug}-${section.id}-${blockIdx}-${block.title || 'block'}`}
                            className="space-y-5"
                          >
                            <div>
                              {block.title && (
                                <h4 className="text-xl font-bold mb-3" style={{ color: accent.text }}>
                                  {block.title}
                                </h4>
                              )}
                              {block.text && (
                                <p className="text-textSecondary leading-relaxed text-sm md:text-base">
                                  {block.text}
                                </p>
                              )}
                            </div>

                            {Array.isArray(block.editorialImages) && block.editorialImages.length === 3 && (
                              <div className="grid grid-cols-1 gap-4">
                                <img
                                  src={block.editorialImages[0]}
                                  alt={`${block.title} - editorial visual 1`}
                                  className="w-full h-auto"
                                  loading="lazy"
                                />
                                <img
                                  src={block.editorialImages[1]}
                                  alt={`${block.title} - editorial visual 2`}
                                  className="w-full h-auto"
                                  loading="lazy"
                                />
                                <img
                                  src={block.editorialImages[2]}
                                  alt={`${block.title} - editorial visual 3`}
                                  className="w-full h-auto"
                                  loading="lazy"
                                />
                              </div>
                            )}
                          </article>
                        ) : (project.slug === 'kyros-ventures' &&
                          block.title === 'KOLs Network & Investor Onboarding') ? (
                          <article
                            key={`${project.slug}-${section.id}-${blockIdx}-${block.title || 'block'}`}
                            className="space-y-5"
                          >
                            <div>
                              {block.title && (
                                <h4 className="text-xl font-bold mb-3" style={{ color: accent.text }}>
                                  {block.title}
                                </h4>
                              )}
                              {block.text && (
                                <p className="text-textSecondary leading-relaxed text-sm md:text-base">
                                  {block.text}
                                </p>
                              )}
                            </div>

                            {Array.isArray(block.kolImages) && block.kolImages.length === 2 && (
                              <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-4 items-start">
                                <img
                                  src={block.kolImages[0]}
                                  alt={`${block.title} - KOL visual left`}
                                  className="w-full h-auto"
                                  loading="lazy"
                                />
                                <img
                                  src={block.kolImages[1]}
                                  alt={`${block.title} - KOL visual right`}
                                  className="w-full h-auto"
                                  loading="lazy"
                                />
                              </div>
                            )}
                          </article>
                        ) : (project.slug === 'lilquid-nft' &&
                          block.title === 'Promotional Materials & Social Content') ? (
                          <article
                            key={`${project.slug}-${section.id}-${blockIdx}-${block.title || 'block'}`}
                            className="space-y-4"
                          >
                            <div>
                              {block.title && (
                                <h4 className="text-xl font-bold mb-3" style={{ color: accent.text }}>
                                  {block.title}
                                </h4>
                              )}
                              {block.text && (
                                <p className="text-textSecondary leading-relaxed text-sm md:text-base">
                                  {block.text}
                                </p>
                              )}
                            </div>

                            {Array.isArray(block.promotionGallery) && block.promotionGallery.length > 0 && (
                              <div className="columns-1 md:columns-2 lg:columns-3 [column-gap:16px]">
                                {block.promotionGallery.map((imgUrl, imgIdx) => (
                                  <img
                                    key={`${project.slug}-${section.id}-${blockIdx}-promotion-${imgIdx}-${imgUrl}`}
                                    src={imgUrl}
                                    alt={`${block.title} - material ${imgIdx + 1}`}
                                    className="w-full mb-4 rounded-xl break-inside-avoid"
                                    loading="lazy"
                                  />
                                ))}
                              </div>
                            )}
                          </article>
                        ) : (project.slug === 'lilquid-nft' &&
                          block.title === 'Community Growth & Engagement') ? (
                          <article
                            key={`${project.slug}-${section.id}-${blockIdx}-${block.title || 'block'}`}
                            className="space-y-5"
                          >
                            <div>
                              {block.title && (
                                <h4 className="text-xl font-bold mb-3" style={{ color: accent.text }}>
                                  {block.title}
                                </h4>
                              )}
                              {block.text && (
                                <p className="text-textSecondary leading-relaxed text-sm md:text-base">
                                  {block.text}
                                </p>
                              )}
                            </div>

                            {getManualImages(block).length > 0 && (
                              <div className="pt-1">
                                <div className="w-full md:w-[90%] mx-auto rounded-xl overflow-hidden border border-white/10 bg-surface">
                                  <img
                                    src={getManualImages(block)[0]}
                                    alt={`${block.title} - campaign visual`}
                                    className="w-full h-auto"
                                    loading="lazy"
                                  />
                                </div>
                              </div>
                            )}
                          </article>
                        ) : (project.slug === 'arkai-nft' &&
                          block.title === "A \"KEY TACTIC\" for Arkai's Growth - Ecosystem Partnership") ? (
                          <article
                            key={`${project.slug}-${section.id}-${blockIdx}-${block.title || 'block'}`}
                            className="rounded-[26px] overflow-hidden border border-white/10 bg-white/[0.03]"
                          >
                            <div className="p-6 md:p-7">
                              <h4 className="text-xl font-bold mb-4 text-textPrimary leading-snug">
                                A "<span style={{ color: accent.primary }}>KEY TACTIC</span>" for Arkai's Growth - Ecosystem Partnership
                              </h4>

                              <div className="space-y-5">
                                {(block.paragraphs || []).map((paragraph, paragraphIdx) => (
                                  <p
                                    key={`${project.slug}-${section.id}-${blockIdx}-paragraph-${paragraphIdx}`}
                                    className="text-textSecondary leading-relaxed text-sm md:text-base whitespace-pre-line"
                                  >
                                    {paragraphIdx === 0
                                      ? (
                                        <>
                                          {paragraph.split('50+ of projects')[0]}
                                          <span style={{ color: accent.primary }}>50+ of projects</span>
                                          {paragraph.split('50+ of projects')[1]}
                                        </>
                                      )
                                      : paragraph}
                                  </p>
                                ))}
                              </div>

                              {(block.bulletPoints || []).length > 0 && (
                                <ul className="list-disc pl-5 mt-4 space-y-1 text-textSecondary text-sm md:text-base leading-relaxed">
                                  {block.bulletPoints.map((point, pointIdx) => (
                                    <li key={`${project.slug}-${section.id}-${blockIdx}-point-${pointIdx}`}>{point}</li>
                                  ))}
                                </ul>
                              )}
                              {getManualImages(block).length > 0 && (
                                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-start">
                                  {getManualImages(block).map((imgUrl, imgIdx) => (
                                    <img
                                      key={`${project.slug}-${section.id}-${blockIdx}-campaign-${imgIdx}-${imgUrl}`}
                                      src={imgUrl}
                                      alt={`${block.title} - campaign visual ${imgIdx + 1}`}
                                      className="w-full h-auto rounded-xl"
                                      loading="lazy"
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          </article>
                        ) : (project.slug === 'arkai-nft' &&
                          block.title === 'Community Activation Campaigns') ? (
                          <article
                            key={`${project.slug}-${section.id}-${blockIdx}-${block.title || 'block'}`}
                            className="rounded-[26px] overflow-hidden border border-white/10 bg-white/[0.03]"
                          >
                            <div className="p-6 border-b border-white/10" style={{ backgroundColor: accent.bg }}>
                              {block.title && (
                                <h4 className="text-xl font-bold mb-3" style={{ color: accent.text }}>
                                  {block.title}
                                </h4>
                              )}
                              {block.text && (
                                <p className="text-textSecondary leading-relaxed text-sm md:text-base">{block.text}</p>
                              )}
                            </div>

                            {getManualImages(block).length > 0 && (
                              <div className="p-6">
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                                  {getManualImages(block).map((imgUrl, imgIdx) => (
                                    <div
                                      key={`${project.slug}-${section.id}-${blockIdx}-community-${imgIdx}-${imgUrl}`}
                                      className="rounded-xl overflow-hidden border border-white/10 bg-surface h-[170px] md:h-[190px] lg:h-[175px]"
                                    >
                                      <img
                                        src={imgUrl}
                                        alt={`${block.title} - visual ${imgIdx + 1}`}
                                        className="w-full h-full object-contain"
                                        loading="lazy"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </article>
                        ) : (
                        <article
                          key={`${project.slug}-${section.id}-${blockIdx}-${block.title || 'block'}`}
                          className="rounded-[26px] overflow-hidden border border-white/10 bg-white/[0.03]"
                        >
                          <div className="p-6 border-b border-white/10" style={{ backgroundColor: accent.bg }}>
                            {block.title && (
                              <h4 className="text-xl font-bold mb-3" style={{ color: accent.text }}>
                                {block.title}
                              </h4>
                            )}
                            {block.text && (
                              block.preserveLineBreaks ? (
                                <div className="space-y-3">
                                  {block.text.split('\n\n').map((paragraph, paragraphIdx) => (
                                    <p
                                      key={`${project.slug}-${section.id}-${blockIdx}-paragraph-${paragraphIdx}`}
                                      className="text-textSecondary leading-relaxed text-sm md:text-base whitespace-pre-line"
                                    >
                                      {paragraph}
                                    </p>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-textSecondary leading-relaxed text-sm md:text-base">{block.text}</p>
                              )
                            )}
                          </div>

                          <div className="p-6">
                            {block.highlight && (
                              <div className="p-4 rounded-2xl bg-black/20 border border-white/10 mb-5">
                                <p className="text-textPrimary text-sm font-medium leading-relaxed">{block.highlight}</p>
                              </div>
                            )}
                            {block.mediaLayout === 'bannerBelow' && getManualImages(block).length > 0 && (
                              <div className={`${
                                block.title === 'Content & Visual Campaign Production'
                                  ? 'mt-6 mb-6'
                                  : 'mt-1 md:mt-2 mb-5'
                              }`}>
                                <div className={`${
                                  block.title === 'Content & Visual Campaign Production'
                                    ? 'w-full md:w-[95%]'
                                    : 'w-full md:w-[92%]'
                                } mx-auto rounded-xl overflow-hidden border border-white/10 bg-surface`}>
                                  <img
                                    src={getManualImages(block)[0]}
                                    alt={block.imageAlt || `${block.title || section.title} - visual`}
                                    className="w-full h-auto"
                                    loading="lazy"
                                  />
                                </div>
                              </div>
                            )}
                            {block.mediaLayout === 'stackedCentered' && getManualImages(block).length > 0 && (
                              <div className="mt-2 mb-5 space-y-6 md:space-y-8">
                                {getManualImages(block).map((imgUrl, imgIdx) => (
                                  <div
                                    key={`${project.slug}-${section.id}-${blockIdx}-stacked-${imgIdx}-${imgUrl}`}
                                    className="w-[95%] md:w-[90%] mx-auto rounded-xl overflow-hidden border border-white/10 bg-surface"
                                  >
                                    <img
                                      src={imgUrl}
                                      alt={`${block.title || section.title} - visual ${imgIdx + 1}`}
                                      className="w-full h-auto object-contain"
                                      loading="lazy"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}

                            {Array.isArray(block.keyResults) && block.keyResults.length > 0 && (
                              <div className="mb-6">
                                <h5 className="text-sm uppercase tracking-[0.2em] mb-3" style={{ color: accent.text }}>
                                  Key Results
                                </h5>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                  {block.keyResults.map((result, resultIdx) => (
                                    <div
                                      key={`${project.slug}-${section.id}-${blockIdx}-result-${resultIdx}`}
                                      className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
                                    >
                                      <p className="text-xl font-bold text-textPrimary">{result.value}</p>
                                      <p className="text-xs text-textSecondary mt-1">{result.label}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {Array.isArray(block.activityVisuals) && block.activityVisuals.length > 0 && (
                              <div className="mb-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {block.activityVisuals.map((visual, visualIdx) => (
                                    <div
                                      key={`${project.slug}-${section.id}-${blockIdx}-activity-${visualIdx}`}
                                      className="rounded-2xl overflow-hidden border border-white/10 bg-surface"
                                    >
                                      <img
                                        src={visual.image}
                                        alt={`${block.title || section.title} - activity ${visualIdx + 1}`}
                                        className="w-full h-auto"
                                        loading="lazy"
                                      />
                                      {visual.caption && (
                                        <div className="px-3 py-2 border-t border-white/10 bg-white/[0.02]">
                                          <p className="text-xs text-textSecondary">{visual.caption}</p>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {block.mainVisual && (
                              <div className="mb-4 rounded-2xl overflow-hidden border border-white/10 bg-surface">
                                <img
                                  src={block.mainVisual}
                                  alt={`${block.title || section.title} - main visual`}
                                  className="w-full h-auto"
                                  loading="lazy"
                                />
                              </div>
                            )}

                            {Array.isArray(block.supportingImages) && block.supportingImages.length > 0 && (
                              <div className="mb-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                                {block.supportingImages.map((imgUrl, imgIdx) => (
                                  <div
                                    key={`${project.slug}-${section.id}-${blockIdx}-support-${imgIdx}-${imgUrl}`}
                                    className="rounded-2xl overflow-hidden border border-white/10 bg-surface"
                                  >
                                    <img
                                      src={imgUrl}
                                      alt={`${block.title || section.title} - supporting visual ${imgIdx + 1}`}
                                      className="w-full h-auto"
                                      loading="lazy"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}

                            {block.supportingCaption && (
                              <p className="text-xs md:text-sm text-textSecondary mt-4 leading-relaxed">
                                {block.supportingCaption}
                              </p>
                            )}

                            {Array.isArray(block.blocks) && block.blocks.length > 0 && (
                              <div className="space-y-5">
                                {block.blocks.map((contentBlock, contentBlockIdx) => (
                                  <div
                                    key={`${project.slug}-${section.id}-${blockIdx}-content-${contentBlockIdx}`}
                                    className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]"
                                  >
                                    {(contentBlock.text || contentBlock.image) && (
                                      <div className="p-4 border-b border-white/10">
                                        {contentBlock.text && (
                                          <p className="text-textSecondary leading-relaxed text-sm md:text-base">
                                            {contentBlock.text}
                                          </p>
                                        )}
                                      </div>
                                    )}
                                    {contentBlock.image && (
                                      <img
                                        src={contentBlock.image}
                                        alt={`${block.title || section.title} - block ${contentBlockIdx + 1}`}
                                        className="w-full h-auto"
                                        loading="lazy"
                                      />
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {!(Array.isArray(block.blocks) && block.blocks.length > 0) &&
                              block.mediaLayout !== 'bannerBelow' &&
                              block.mediaLayout !== 'stackedCentered' &&
                              getManualImages(block).length > 0 && (
                              <div className={`grid gap-4 ${
                                getManualImages(block).length === 3
                                  ? 'grid-cols-1 md:grid-cols-3'
                                  : getManualImages(block).length > 1
                                    ? 'grid-cols-1 md:grid-cols-2'
                                    : 'grid-cols-1'
                              }`}>
                                {getManualImages(block).map((imgUrl, imgIdx) => (
                                  <div
                                    key={`${project.slug}-${section.id}-${blockIdx}-${imgIdx}-${imgUrl}`}
                                    className="rounded-2xl overflow-hidden border border-white/10 bg-surface"
                                  >
                                    <img
                                      src={imgUrl}
                                      alt={`${block.title || section.title} - visual ${imgIdx + 1}`}
                                      className="w-full h-auto transition-transform duration-500 hover:scale-[1.02]"
                                      loading="lazy"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                            {block.caption && (
                              <p className="text-xs md:text-sm text-textSecondary mt-4 leading-relaxed">
                                {block.caption}
                              </p>
                            )}

                            {block.mediaCoverage && block.mediaCoverage.length > 0 && (
                              <div className="mt-5">
                                <div className="flex items-center gap-2 mb-3">
                                  <Newspaper size={16} style={{ color: accent.primary }} />
                                  <span className="text-sm font-semibold" style={{ color: accent.text }}>
                                    Media Coverage
                                  </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {block.mediaCoverage.map((mc, mcIdx) => (
                                    <a
                                      key={`${project.slug}-${section.id}-${blockIdx}-media-${mcIdx}`}
                                      href={mc.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-white/10 hover:bg-white/[0.04] transition-colors"
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = accent.border;
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                      }}
                                    >
                                      <div className="min-w-0">
                                        <p className="text-sm font-semibold text-textPrimary truncate">{mc.outlet}</p>
                                        <p className="text-xs text-textSecondary mt-1">External article reference</p>
                                      </div>
                                      <span
                                        className="text-xs px-2.5 py-1.5 rounded-full whitespace-nowrap"
                                        style={{ backgroundColor: accent.bg, color: accent.text }}
                                      >
                                        {mc.traffic} traffic
                                      </span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}

                            {block.links && block.links.length > 0 && (
                              <div className="mt-5">
                                <div className="flex items-center gap-2 mb-3">
                                  <Link2 size={16} style={{ color: accent.primary }} />
                                  <span className="text-sm font-semibold" style={{ color: accent.text }}>
                                    External Proof Links
                                  </span>
                                </div>
                                {renderLinkPills(block.links)}
                              </div>
                            )}
                          </div>
                        </article>
                        )
                      ))}
                    </div>
                  </Section>
                );
              }

              if (section.id === 'overview' && project.slug === 'ancient8') {
                const introBlocks = section.blocks.filter(
                  (block) => !['metric', 'impactHeading', 'impactVisuals'].includes(block.variant)
                );
                const impactHeadingBlock = section.blocks.find((block) => block.variant === 'impactHeading');
                const metricBlocks = section.blocks.filter((block) => block.variant === 'metric');
                const impactVisualsBlock = section.blocks.find((block) => block.variant === 'impactVisuals');

                return (
                  <Section
                    key={`${project.slug}-${section.id}`}
                    eyebrow={section.eyebrow}
                    title={section.title}
                    icon={iconBySection[section.id] || Briefcase}
                    delay={sectionIdx * 0.03}
                  >
                    <div className="space-y-5">
                      {introBlocks.map((block, blockIdx) => (
                        <article
                          key={`${project.slug}-${section.id}-intro-${blockIdx}`}
                          className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
                        >
                          <div className="p-5">
                            {block.text && (
                              <div className="space-y-2">
                                {block.text.split('\n').map((line, lineIdx) => (
                                  <p
                                    key={`${project.slug}-${section.id}-intro-${blockIdx}-line-${lineIdx}`}
                                    className="text-textSecondary leading-relaxed text-sm md:text-base"
                                  >
                                    {line}
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>

                          {getManualImages(block).length > 0 && (
                            <div className={`grid gap-0 ${getManualImages(block).length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                              {getManualImages(block).map((imgUrl, imgIdx) => (
                                <img
                                  key={`${project.slug}-${section.id}-intro-${blockIdx}-${imgIdx}-${imgUrl}`}
                                  src={imgUrl}
                                  alt={`${section.title} - intro visual ${imgIdx + 1}`}
                                  className="w-full h-auto border-t border-white/10"
                                  loading="lazy"
                                />
                              ))}
                            </div>
                          )}
                        </article>
                      ))}

                      {impactHeadingBlock && (
                        <div className="rounded-2xl border border-white/10 p-5" style={{ backgroundColor: accent.bg }}>
                          <h4 className="text-xl font-bold" style={{ color: accent.text }}>
                            {impactHeadingBlock.text}
                          </h4>
                        </div>
                      )}

                      {metricBlocks.length > 0 && (
                        <article className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                          <div className="p-5 space-y-3">
                            {metricBlocks.map((block, blockIdx) => (
                              <div key={`${project.slug}-${section.id}-metric-${blockIdx}`} className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent.primary }} />
                                <p className="text-textPrimary font-medium text-sm md:text-base">{block.text}</p>
                              </div>
                            ))}
                          </div>
                        </article>
                      )}

                      {impactVisualsBlock && getManualImages(impactVisualsBlock).length > 0 && (
                        <article className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                          <div className="grid grid-cols-1 md:grid-cols-2">
                            {getManualImages(impactVisualsBlock).map((imgUrl, imgIdx) => (
                              <img
                                key={`${project.slug}-${section.id}-impact-${imgIdx}-${imgUrl}`}
                                src={imgUrl}
                                alt={`${section.title} - impact visual ${imgIdx + 1}`}
                                className={`w-full h-auto ${imgIdx > 0 ? 'md:border-l border-white/10' : ''}`}
                                loading="lazy"
                              />
                            ))}
                          </div>
                        </article>
                      )}
                    </div>
                  </Section>
                );
              }

              if (section.id === 'overview' && project.slug === 'kyros-ventures') {
                return (
                  <Section
                    key={`${project.slug}-${section.id}`}
                    eyebrow={section.eyebrow}
                    title="About Kyros Ventures"
                    icon={iconBySection[section.id] || Briefcase}
                    delay={sectionIdx * 0.03}
                  >
                    <div className="space-y-4">
                      {section.blocks.map((block, blockIdx) => (
                        <p
                          key={`${project.slug}-${section.id}-${blockIdx}`}
                          className="text-textSecondary leading-relaxed text-sm md:text-base"
                        >
                          {block.text}
                        </p>
                      ))}
                    </div>
                  </Section>
                );
              }

              if (section.id === 'role') {
                if (project.slug === 'kyros-ventures') {
                  return (
                    <Section
                      key={`${project.slug}-${section.id}`}
                      eyebrow={section.eyebrow}
                      title={section.title}
                      icon={iconBySection[section.id] || Briefcase}
                      delay={sectionIdx * 0.03}
                    >
                      <div className="space-y-4">
                        {section.blocks.map((block, blockIdx) => (
                          block.variant === 'bullet' ? (
                            <div key={`${project.slug}-${section.id}-${blockIdx}`} className="flex items-start gap-3">
                              <div
                                className="w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0"
                                style={{ backgroundColor: accent.primary }}
                              />
                              <span className="text-textSecondary leading-relaxed text-sm md:text-base">{block.text}</span>
                            </div>
                          ) : (
                            <p
                              key={`${project.slug}-${section.id}-${blockIdx}`}
                              className="text-textSecondary leading-relaxed text-sm md:text-base"
                            >
                              {block.text}
                            </p>
                          )
                        ))}
                      </div>
                    </Section>
                  );
                }

                if (project.slug === 'arkai-nft') {
                  const roleImages = Array.isArray(project.roleImages)
                    ? project.roleImages.filter(Boolean)
                    : [];

                  return (
                    <Section
                      key={`${project.slug}-${section.id}`}
                      eyebrow={section.eyebrow}
                      title={section.title}
                      icon={iconBySection[section.id] || Briefcase}
                      delay={sectionIdx * 0.03}
                    >
                      <ul className="space-y-3">
                        {section.blocks.map((block, blockIdx) => (
                          <li key={`${project.slug}-${section.id}-${blockIdx}`} className="flex items-start gap-3">
                            <div
                              className="w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: accent.primary }}
                            />
                            <span className="text-textSecondary leading-relaxed">{block.text}</span>
                          </li>
                        ))}
                      </ul>
                      {roleImages.length > 0 && (
                        <div className="mt-6">
                          <div className="w-full md:w-[75%] mx-auto rounded-xl overflow-hidden border border-white/10 bg-surface">
                            <img
                              src={roleImages[0]}
                              alt={`${section.title} - visual`}
                              className="w-full h-auto"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      )}
                    </Section>
                  );
                }

                const roleImages = Array.isArray(project.roleImages)
                  ? project.roleImages.filter(Boolean)
                  : [];

                return (
                  <Section
                    key={`${project.slug}-${section.id}`}
                    eyebrow={section.eyebrow}
                    title={section.title}
                    icon={iconBySection[section.id] || Briefcase}
                    delay={sectionIdx * 0.03}
                  >
                    <div className="grid gap-3">
                      {section.blocks.map((block, blockIdx) => (
                        <div key={`${project.slug}-${section.id}-${blockIdx}`} className="flex items-start gap-3 p-4 rounded-2xl border border-white/8 bg-white/[0.02]">
                          <div
                            className="w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: accent.primary }}
                          />
                          <span className="text-textSecondary leading-relaxed">{block.text}</span>
                        </div>
                      ))}
                    </div>
                    {roleImages.length > 0 && (
                      <div className={`grid gap-4 mt-5 ${roleImages.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                        {roleImages.map((imgUrl, imgIdx) => (
                          <div
                            key={`${project.slug}-${section.id}-image-${imgIdx}-${imgUrl}`}
                            className="rounded-2xl overflow-hidden border border-white/10 bg-surface"
                          >
                            <img
                              src={imgUrl}
                              alt={`${section.title} - visual ${imgIdx + 1}`}
                              className="w-full h-auto transition-transform duration-500 hover:scale-[1.02]"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </Section>
                );
              }

              if (section.id === 'highlights' && project.slug === 'kyros-ventures') {
                return (
                  <Section
                    key={`${project.slug}-${section.id}`}
                    eyebrow={section.eyebrow}
                    title={section.title}
                    icon={iconBySection[section.id] || Briefcase}
                    delay={sectionIdx * 0.03}
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {section.blocks.map((block, blockIdx) => (
                        <div
                          key={`${project.slug}-${section.id}-${blockIdx}`}
                          className="rounded-2xl border border-white/10 p-5"
                          style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                        >
                          <p className="text-3xl md:text-4xl font-extrabold leading-none mb-2" style={{ color: accent.primary }}>
                            {block.value}
                          </p>
                          <p className="text-xs md:text-sm text-textSecondary leading-relaxed">
                            {block.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Section>
                );
              }

              if (section.id === 'key-achievement' && project.slug === 'lilquid-nft') {
                const block = section.blocks?.[0];
                if (!block) return null;

                return (
                  <Section
                    key={`${project.slug}-${section.id}`}
                    eyebrow={section.eyebrow}
                    title={section.title}
                    icon={iconBySection[section.id] || Briefcase}
                    delay={sectionIdx * 0.03}
                  >
                    <div className="max-w-[1020px] mx-auto space-y-4 md:space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-[0.98fr_1.02fr] gap-3 md:gap-4 items-start">
                        <div className="grid gap-4 md:gap-5 md:pr-2">
                          {(block.metricCards || []).map((card, idx) => (
                            <div
                              key={`${project.slug}-${section.id}-metric-card-${idx}`}
                              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                            >
                              <p
                                className="text-xl md:text-2xl font-extrabold tracking-tight leading-none mb-1"
                                style={{ color: accent.primary }}
                              >
                                {card.metric}
                              </p>
                              {(card.lines || []).map((line, lineIdx) => (
                                <p
                                  key={`${project.slug}-${section.id}-metric-card-${idx}-line-${lineIdx}`}
                                  className="text-[12px] md:text-sm text-textSecondary leading-snug"
                                >
                                  {line}
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:gap-5 items-start">
                          {block.row1Image && (
                            <img
                              src={block.row1Image}
                              alt="Lilquid key achievement leaderboard ranking"
                              className="w-full h-auto md:mt-0.5"
                              loading="lazy"
                            />
                          )}
                          {block.row2Left && (
                            <img
                              src={block.row2Left}
                              alt="Lilquid trading screenshot"
                              className="w-full h-auto"
                              loading="lazy"
                            />
                          )}
                          {block.row2Right && (
                            <img
                              src={block.row2Right}
                              alt="Lilquid BSX whitelist campaign screenshot"
                              className="w-full h-auto"
                              loading="lazy"
                            />
                          )}
                        </div>
                      </div>

                      {block.row4Image && (
                        <img
                          src={block.row4Image}
                          alt="Lilquid full NFT collection grid"
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      )}
                    </div>
                  </Section>
                );
              }

              if (section.id === 'key-achievement' && project.slug === 'arkai-nft') {
                const block = section.blocks?.[0];
                if (!block) return null;

                return (
                  <Section
                    key={`${project.slug}-${section.id}`}
                    eyebrow={section.eyebrow}
                    title={section.title}
                    icon={iconBySection[section.id] || Briefcase}
                    delay={sectionIdx * 0.03}
                  >
                    <div className="max-w-[1020px] mx-auto">
                      <div className="grid grid-cols-1 md:grid-cols-[0.98fr_1.02fr] gap-4 md:gap-5 items-start">
                        <div className="grid gap-4 md:gap-5">
                          {(block.metricCards || []).map((card, idx) => (
                            <div
                              key={`${project.slug}-${section.id}-metric-card-${idx}`}
                              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                            >
                              <p
                                className="text-xl md:text-2xl font-extrabold tracking-tight leading-none mb-1"
                                style={{ color: accent.primary }}
                              >
                                {card.metric}
                              </p>
                              {(card.lines || []).map((line, lineIdx) => (
                                <p
                                  key={`${project.slug}-${section.id}-metric-card-${idx}-line-${lineIdx}`}
                                  className="text-[12px] md:text-sm text-textSecondary leading-snug"
                                >
                                  {line}
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {(block.rightImages || []).map((imgUrl, imgIdx) => (
                            <img
                              key={`${project.slug}-${section.id}-right-image-${imgIdx}-${imgUrl}`}
                              src={imgUrl}
                              alt={`Arkai key achievement visual ${imgIdx + 1}`}
                              className="w-full h-auto rounded-xl"
                              loading="lazy"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </Section>
                );
              }

              if (section.id === 'objectives') {
                return (
                  <Section
                    key={`${project.slug}-${section.id}`}
                    eyebrow={section.eyebrow}
                    title={section.title}
                    icon={iconBySection[section.id] || Briefcase}
                    delay={sectionIdx * 0.03}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.blocks.map((block, blockIdx) => (
                        <div
                          key={`${project.slug}-${section.id}-${blockIdx}`}
                          className="p-5 rounded-2xl border border-white/10 transition-colors"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = accent.border;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                          }}
                        >
                          {block.title && <h4 className="font-bold text-textPrimary mb-2">{block.title}</h4>}
                          <p className="text-textSecondary text-sm leading-relaxed">{block.text}</p>
                        </div>
                      ))}
                    </div>
                  </Section>
                );
              }

              if (section.id === 'solutions') {
                return (
                  <Section
                    key={`${project.slug}-${section.id}`}
                    eyebrow={section.eyebrow}
                    title={section.title}
                    icon={iconBySection[section.id] || Briefcase}
                    delay={sectionIdx * 0.03}
                  >
                    <div className="space-y-4">
                      {section.blocks.map((block, blockIdx) => (
                        <div
                          key={`${project.slug}-${section.id}-${blockIdx}`}
                          className="p-5 rounded-2xl"
                          style={{ backgroundColor: accent.bg, border: `1px solid ${accent.border}` }}
                        >
                          {block.title && <h4 className="font-bold mb-2" style={{ color: accent.text }}>{block.title}</h4>}
                          <p className="text-textSecondary text-sm leading-relaxed">{block.text}</p>
                        </div>
                      ))}
                    </div>
                  </Section>
                );
              }

              return (
                <Section
                  key={`${project.slug}-${section.id}`}
                  eyebrow={section.eyebrow}
                  title={section.title}
                  icon={iconBySection[section.id] || Briefcase}
                  delay={sectionIdx * 0.03}
                >
                  <div className="space-y-5">
                    {section.blocks.map((block, blockIdx) => (
                      <article key={`${project.slug}-${section.id}-${blockIdx}`} className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                        <div className="p-5">
                          {block.title && <h4 className="font-bold text-textPrimary mb-2">{block.title}</h4>}
                          {block.variant === 'metric' ? (
                            <div className="flex items-center gap-3">
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent.primary }} />
                              <p className="text-textPrimary font-medium text-sm md:text-base">{block.text}</p>
                            </div>
                          ) : (
                            block.text && (
                              <div className="space-y-2">
                                {block.text.split('\n').map((line, lineIdx) => (
                                  <p key={`${project.slug}-${section.id}-${blockIdx}-line-${lineIdx}`} className="text-textSecondary leading-relaxed text-sm md:text-base">
                                    {line}
                                  </p>
                                ))}
                              </div>
                            )
                          )}
                        </div>

                        {getManualImages(block).length > 0 && (
                          <div className={`grid gap-0 ${getManualImages(block).length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                            {getManualImages(block).map((imgUrl, imgIdx) => (
                              <img
                                key={`${project.slug}-${section.id}-${blockIdx}-${imgIdx}-${imgUrl}`}
                                src={imgUrl}
                                alt={`${section.title} - block ${blockIdx + 1} visual ${imgIdx + 1}`}
                                className="w-full h-auto border-t border-white/10"
                                loading="lazy"
                              />
                            ))}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </Section>
              );
            })}
          </div>

          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-[28px] border border-white/10 bg-surface/80 backdrop-blur-sm p-6">
              <p className="text-xs uppercase tracking-[0.26em] text-textSecondary mb-4">Case Study At A Glance</p>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-textSecondary mb-1">Project</p>
                  <p className="font-semibold">{project.title}</p>
                </div>
                <div>
                  <p className="text-xs text-textSecondary mb-1">Role</p>
                  <p className="font-semibold">{project.role}</p>
                </div>
                <div>
                  <p className="text-xs text-textSecondary mb-1">Primary channel</p>
                  <p className="font-semibold">{project.socialLinks?.[0]?.label || 'External references'}</p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="rounded-[28px] border border-white/10 bg-surface/80 backdrop-blur-sm p-6"
            >
              <h3 className="text-lg font-bold text-textPrimary mb-4">Explore Other Projects</h3>
              <div className="grid grid-cols-1 gap-3">
                {projectData
                  .filter((p) => p.slug !== slug)
                  .map((p, i) => (
                    <Link
                      key={i}
                      to={`/project/${p.slug}`}
                      className="p-4 rounded-2xl border border-white/10 hover:-translate-y-0.5 transition-all"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = p.accent.border;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      }}
                    >
                      <p className="font-bold text-sm" style={{ color: p.accent.text }}>{p.title}</p>
                      <p className="text-textSecondary text-xs mt-1">{p.role}</p>
                    </Link>
                  ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

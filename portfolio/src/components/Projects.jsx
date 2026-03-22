import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { sectionItem, staggerContainer, viewportOnce } from "../motion/animations";

const MotionSection = motion.section;
const MotionDiv = motion.div;

const ProjectCard = ({ project, progress, range, targetScale }) => {
  const containerRef = useRef(null);
  
  // Cinematic scale-down effect
  const scale = useTransform(progress, range, [1, targetScale]);
  // Instead of making the div transparent (which causes text bleeding),
  // we increase a black overlay's opacity to simulate shadow/depth.
  const overlayOpacity = useTransform(progress, range, [0, 0.65]);

  return (
    <div ref={containerRef} className="sticky top-24 origin-top pb-12 sm:pb-24">
      <motion.div
        style={{ scale }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c1424] p-6 shadow-2xl md:p-10"
      >
        {/* Deep shadow overlay to darken cards as they sink back */}
        <motion.div 
          style={{ opacity: overlayOpacity }} 
          className="pointer-events-none absolute inset-0 z-10 bg-black" 
        />
        
        <div className="relative z-0 grid gap-8 lg:grid-cols-[0.38fr_1fr]">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-[0.3em] text-[#8e98b3]">
              {project.kind} / {project.period}
            </div>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white lg:text-3xl">
              {project.title}
            </h3>
            <p className="text-[0.95rem] leading-8 text-[#a6b0c8]">{project.summary}</p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-[#ffb8b2] transition-colors hover:text-white"
              >
                Open repository <ArrowUpRight size={14} />
              </a>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <div className="text-[0.65rem] uppercase tracking-[0.28em] text-[#8e98b3]">
                Outcomes
              </div>
              <div className="mt-4 space-y-3">
                {project.outcomes.map((outcome) => (
                  <div key={outcome} className="flex gap-4 text-[#e0e5f6] text-[0.95rem]">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff8d86]" />
                    <span className="leading-7">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="text-[0.65rem] uppercase tracking-[0.28em] text-[#8e98b3]">
                  Architecture
                </div>
                <div className="mt-4 space-y-3 text-[0.85rem] leading-6 text-[#9ca8c4]">
                  {project.architecture.map((item) => (
                    <div key={item} className="border-b border-white/10 pb-2">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[0.65rem] uppercase tracking-[0.28em] text-[#8e98b3]">
                  Stack
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-[0.85rem] text-[#d4daee]">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full border border-[#3c455d] bg-white/5 px-3 py-1">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = ({ projects }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section 
      ref={container} 
      id="projects" 
      className="relative scroll-mt-24 border-t border-white/10 px-5 py-24 sm:px-6 lg:px-8 bg-[#0a111a]/30"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.35fr_1fr] lg:items-start">
          
          <MotionDiv 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:sticky lg:top-32"
          >
            <MotionDiv variants={sectionItem} className="text-[0.65rem] uppercase tracking-[0.34em] text-[#ffb8b2]">
              Case studies
            </MotionDiv>
            <MotionDiv variants={sectionItem} className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white leading-[1.1] md:text-5xl">
              Projects that map directly to the platform story.
            </MotionDiv>
          </MotionDiv>

          <div className="relative mt-8 lg:mt-0">
            {projects.map((project, i) => {
              const targetScale = 1 - ((projects.length - i) * 0.05);
              return (
                <ProjectCard
                  key={project.title}
                  project={project}
                  progress={scrollYProgress}
                  range={[i * 0.25, 1]}
                  targetScale={targetScale}
                />
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { sectionItem, staggerContainer, viewportOnce } from "../motion/animations";

const MotionSection = motion.section;
const MotionDiv = motion.div;

const Projects = ({ projects }) => {
  return (
    <MotionSection id="projects" className="border-t border-white/10 px-5 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <MotionDiv variants={sectionItem} className="grid gap-12 lg:grid-cols-[0.35fr_1fr]">
            <div>
              <div className="text-xs uppercase tracking-[0.34em] text-[#ffb8b2]">
                Case studies
              </div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
                Projects that map directly to the platform story.
              </h2>
            </div>

            <div className="space-y-12">
              {projects.map((project) => (
                <MotionDiv
                  key={project.title}
                  variants={sectionItem}
                  className="grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-[0.38fr_1fr]"
                >
                  <div className="space-y-4">
                    <div className="text-xs uppercase tracking-[0.3em] text-[#8e98b3]">
                      {project.kind} / {project.period}
                    </div>
                    <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white">
                      {project.title}
                    </h3>
                    <p className="text-base leading-8 text-[#a6b0c8]">{project.summary}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#ffb8b2]"
                      >
                        Open repository <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>

                  <div className="space-y-8">
                    <div>
                      <div className="text-xs uppercase tracking-[0.28em] text-[#8e98b3]">
                        Outcomes
                      </div>
                      <div className="mt-4 space-y-3">
                        {project.outcomes.map((outcome) => (
                          <div key={outcome} className="flex gap-4 text-[#e0e5f6]">
                            <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#ff8d86]" />
                            <span className="leading-8">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <div className="text-xs uppercase tracking-[0.28em] text-[#8e98b3]">
                          Architecture
                        </div>
                        <div className="mt-4 space-y-3 text-sm leading-7 text-[#9ca8c4]">
                          {project.architecture.map((item) => (
                            <div key={item} className="border-b border-white/10 pb-2">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs uppercase tracking-[0.28em] text-[#8e98b3]">
                          Stack
                        </div>
                        <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#d4daee]">
                          {project.stack.map((item) => (
                            <span key={item} className="border-b border-[#3c455d] pb-1">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>
        </MotionDiv>
      </div>
    </MotionSection>
  );
};

export default Projects;

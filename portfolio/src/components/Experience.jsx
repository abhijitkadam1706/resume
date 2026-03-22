import { motion } from "framer-motion";
import { sectionItem, staggerContainer, viewportOnce } from "../motion/animations";

const MotionSection = motion.section;
const MotionDiv = motion.div;

const Experience = ({ entries }) => {
  return (
    <MotionSection id="experience" className="border-t border-white/10 px-5 py-24 sm:px-6 lg:px-8">
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
                Experience
              </div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
                Operating at the boundary between scale, automation, and runtime trust.
              </h2>
            </div>

            <div className="space-y-12">
              {entries.map((entry) => (
                <div key={`${entry.company}-${entry.role}`} className="border-t border-white/10 pt-8">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <div className="text-sm uppercase tracking-[0.26em] text-[#8e98b3]">
                        {entry.period}
                      </div>
                      <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
                        {entry.role}
                      </h3>
                      <div className="mt-2 text-lg text-[#c7d0e7]">
                        {entry.company} / {entry.location}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      {entry.impactMetrics.map((metric) => (
                        <div key={metric.label} className="border-l border-white/10 pl-4">
                          <div className="text-2xl font-semibold text-white">{metric.value}</div>
                          <div className="text-xs uppercase tracking-[0.2em] text-[#8e98b3]">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10 space-y-10">
                    {entry.tracks.map((track) => (
                      <div
                        key={track.title}
                        className="grid gap-5 border-t border-white/10 pt-6 lg:grid-cols-[0.42fr_1fr]"
                      >
                        <div>
                          <div className="text-sm uppercase tracking-[0.2em] text-[#ffb8b2]">
                            {track.title}
                          </div>
                          <div className="mt-3 text-sm leading-7 text-[#7f8aa6]">
                            {track.stack}
                          </div>
                        </div>
                        <div className="space-y-4">
                          {track.bullets.map((bullet) => (
                            <div
                              key={bullet}
                              className="flex gap-4 text-base leading-8 text-[#c7d0e7]"
                            >
                              <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#ff8d86]" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </MotionDiv>
        </MotionDiv>
      </div>
    </MotionSection>
  );
};

export default Experience;

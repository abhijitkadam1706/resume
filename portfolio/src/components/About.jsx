import { motion } from "framer-motion";
import { sectionItem, staggerContainer, viewportOnce } from "../motion/animations";

const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionP = motion.p;

const About = ({ profile, capabilityGroups }) => {
  return (
    <MotionSection id="about" className="scroll-mt-24 px-5 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <MotionDiv variants={sectionItem} className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.34em] text-[#ffb8b2]">
                Capability map
              </div>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl">
                Infrastructure discipline, not just tool familiarity.
              </h2>
              <MotionP className="mt-7 max-w-3xl text-lg leading-8 text-[#a6b0c8]">
                {profile.about.lead}
              </MotionP>
              <MotionP className="mt-5 max-w-3xl text-base leading-8 text-[#7f8aa6]">
                {profile.about.detail}
              </MotionP>
            </div>

            <div className="border-l border-white/10 pl-0 lg:pl-8">
              <div className="text-xs uppercase tracking-[0.28em] text-[#8e98b3]">
                Credentials
              </div>
              <div className="mt-5 space-y-4 text-sm leading-7 text-[#d4daee]">
                {profile.about.credentials.map((credential) => (
                  <div key={credential} className="border-b border-white/10 pb-4">
                    {credential}
                  </div>
                ))}
              </div>
              <div className="mt-6 text-sm uppercase tracking-[0.2em] text-[#8e98b3]">
                {profile.availability}
              </div>
            </div>
          </MotionDiv>

          <MotionDiv
            variants={staggerContainer}
            className="mt-16 grid gap-8 lg:grid-cols-2"
          >
            {capabilityGroups.map((group) => (
              <MotionDiv
                key={group.title}
                variants={sectionItem}
                className="border-t border-white/10 pt-6"
              >
                <div className="text-[0.78rem] uppercase tracking-[0.3em] text-[#8e98b3]">
                  {group.title}
                </div>
                <p className="mt-4 max-w-xl text-lg leading-7 text-[#e0e5f6]">
                  {group.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-3 text-sm text-[#9ca8c4]">
                  {group.items.map((item) => (
                    <span key={item} className="border-b border-[#3c455d] pb-1">
                      {item}
                    </span>
                  ))}
                </div>
              </MotionDiv>
            ))}
          </MotionDiv>
        </MotionDiv>
      </div>
    </MotionSection>
  );
};

export default About;

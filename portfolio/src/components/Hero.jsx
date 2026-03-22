import { motion } from "framer-motion";
import { heroItem, staggerContainer } from "../motion/animations";

const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionP = motion.p;
const MotionA = motion.a;

const Hero = ({ profile }) => {
  const { hero } = profile;

  return (
    <MotionSection
      id="home"
      className="relative min-h-[100svh] overflow-hidden px-5 pb-20 pt-28 sm:px-6 md:pb-24 md:pt-32 lg:px-8"
    >
      <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(255,141,134,0.14),transparent_48%),radial-gradient(circle_at_top_right,rgba(144,147,255,0.16),transparent_42%)]" />

      <div className="relative mx-auto flex min-h-[calc(100svh-7rem)] max-w-7xl flex-col justify-between">
        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.65fr)] lg:items-end"
        >
          <MotionDiv variants={heroItem} className="max-w-4xl">
            <div className="mb-6 flex items-center gap-4 text-[0.72rem] uppercase tracking-[0.35em] text-[#ffb8b2]">
              <span className="h-px w-10 bg-[#ff8d86]/70" />
              {hero.eyebrow}
            </div>

            <div className="font-heading text-[clamp(4rem,13vw,8.8rem)] font-semibold uppercase leading-[0.88] tracking-[-0.06em] text-white">
              {hero.headline.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>

            <MotionP
              variants={heroItem}
              className="mt-8 max-w-2xl text-xl leading-relaxed text-[#d4daee] md:text-2xl"
            >
              {hero.title}
            </MotionP>

            <MotionP
              variants={heroItem}
              className="mt-5 max-w-2xl text-base leading-8 text-[#94a0ba] md:text-lg"
            >
              {hero.summary}
            </MotionP>

            <MotionDiv variants={heroItem} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <MotionA
                href="#projects"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-fit items-center rounded-full bg-[#ff8d86] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#261411] shadow-[0_12px_48px_rgba(255,141,134,0.22)]"
              >
                View Case Studies
              </MotionA>
              <MotionA
                href="#contact"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-fit items-center rounded-full border border-white/15 px-6 py-3 text-sm uppercase tracking-[0.2em] text-[#d4daee] backdrop-blur-sm"
              >
                Open Contact Channel
              </MotionA>
            </MotionDiv>
          </MotionDiv>

          <MotionDiv
            variants={heroItem}
            className="hidden border-l border-white/10 pl-8 lg:block"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-[#8e98b3]">
              Operating focus
            </div>
            <div className="mt-5 space-y-5">
              {hero.signals.map((signal) => (
                <div key={signal} className="border-b border-white/10 pb-5">
                  <p className="text-lg leading-7 text-[#e0e5f6]">{signal}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-sm uppercase tracking-[0.22em] text-[#8e98b3]">
              {profile.role} / {profile.location}
            </div>
          </MotionDiv>
        </MotionDiv>

        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-14 grid gap-6 border-t border-white/10 pt-8 md:grid-cols-3"
        >
          {hero.proofPoints.map((point) => (
            <MotionDiv
              key={point.label}
              variants={heroItem}
              className="flex min-h-[8.5rem] flex-col justify-between border-b border-white/10 pb-5 md:border-b-0 md:border-r md:pr-6 last:md:border-r-0"
            >
              <div className="text-[0.72rem] uppercase tracking-[0.28em] text-[#8e98b3]">
                {point.label}
              </div>
              <div className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white">
                {point.value}
              </div>
              <div className="mt-3 max-w-xs text-sm leading-6 text-[#94a0ba]">
                {point.detail}
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </MotionSection>
  );
};

export default Hero;

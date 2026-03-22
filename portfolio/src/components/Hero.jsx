import { motion } from "framer-motion";
import { heroItem, staggerContainer } from "../motion/animations";

const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionP = motion.p;
const MotionA = motion.a;

const Hero = ({ profile, terminal, metrics, pipeline }) => {
  const { hero } = profile;

  return (
    <MotionSection
      id="home"
      className="relative scroll-mt-24 overflow-hidden px-5 pb-8 pt-16 sm:px-6 md:pb-12 md:pt-20 lg:px-8"
    >
      <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top_left,rgba(255,141,134,0.08),transparent_48%),radial-gradient(circle_at_top_right,rgba(144,147,255,0.08),transparent_42%)] pointer-events-none" />

      <div className="relative mx-auto flex min-h-[78svh] max-w-7xl items-center pt-4 lg:pt-8 w-full">
        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid w-full gap-10 xl:gap-14 lg:grid-cols-[1fr_320px] 2xl:grid-cols-[1fr_340px] lg:items-start"
        >
          {/* LEFT CONTENT COLUMN */}
          <MotionDiv variants={heroItem} className="flex flex-col gap-10 lg:pr-8 w-full overflow-hidden">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.35em] text-[#ffb8b2]">
                <span className="h-px w-8 bg-[#ff8d86]/70" />
                {hero.eyebrow}
              </div>

              <div className="font-heading text-[clamp(2.2rem,5vw,4.2rem)] font-bold uppercase leading-[1.05] tracking-[-0.04em] text-white break-words">
                {hero.headline.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>

              <MotionP
                variants={heroItem}
                className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-[#d4daee] md:text-[1.1rem]"
              >
                {hero.title}
              </MotionP>

              <MotionP
                variants={heroItem}
                className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-[#94a0ba]"
              >
                {hero.summary}
              </MotionP>

              <MotionDiv variants={heroItem} className="mt-8 flex flex-col gap-4 sm:flex-row">
                <MotionA
                  href="#projects"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex w-fit items-center rounded-full bg-[#ff8d86] px-6 py-2.5 text-[0.8rem] font-bold uppercase tracking-[0.2em] text-[#261411] shadow-[0_8px_32px_rgba(255,141,134,0.2)]"
                >
                  View Case Studies
                </MotionA>
                <MotionA
                  href="#contact"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex w-fit items-center rounded-full border border-white/15 px-6 py-2.5 text-[0.8rem] uppercase tracking-[0.2em] text-[#d4daee] backdrop-blur-sm transition-colors hover:bg-white/5"
                >
                  Open Contact Channel
                </MotionA>
              </MotionDiv>

              {/* Tighter Proof Points below buttons */}
              <MotionDiv
                variants={staggerContainer}
                className="mt-10 grid grid-cols-2 md:flex flex-col md:flex-row gap-6 border-t border-white/10 pt-6"
              >
                {hero.proofPoints.map((point) => (
                  <MotionDiv
                    key={point.label}
                    variants={heroItem}
                    className="md:border-r border-white/10 md:pr-6 md:last:border-0"
                  >
                    <div className="text-[0.6rem] uppercase tracking-[0.24em] text-[#8e98b3]">
                      {point.label}
                    </div>
                    <div className="mt-1.5 text-[1.4rem] font-semibold tracking-[-0.02em] text-[#e0e5f6] leading-none">
                      {point.value}
                    </div>
                    <div className="mt-1 text-[0.7rem] leading-tight text-[#94a0ba]">{point.detail}</div>
                  </MotionDiv>
                ))}
              </MotionDiv>
            </div>

            {/* INTEGRATED HUD (Only on large screens to avoid mess) */}
            <div className="hidden lg:grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-6 w-full items-start">
              {terminal}
              {pipeline}
            </div>
          </MotionDiv>

          {/* RIGHT SIDEBAR COLUMN */}
          <MotionDiv
            variants={heroItem}
            className="hidden lg:flex flex-col gap-10 pb-12 w-full"
          >
            {/* Integrated Metrics Dashboard */}
            <div className="w-full relative z-20">
              {metrics}
            </div>

            {/* Operating Focus List */}
            <div className="border-l border-white/10 pl-6 space-y-5">
              <div className="text-[0.65rem] uppercase tracking-[0.3em] text-[#8e98b3]">
                Operating focus
              </div>
              <div className="space-y-4">
                {hero.signals.map((signal) => (
                  <div key={signal} className="border-b border-white/5 pb-4 last:border-0">
                    <p className="text-[0.85rem] leading-snug text-[#d4daee]">{signal}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-[0.65rem] uppercase tracking-[0.22em] text-[#8e98b3]">
                {profile.role} / {profile.location}
              </div>
            </div>
          </MotionDiv>
        </MotionDiv>
      </div>
    </MotionSection>
  );
};

export default Hero;

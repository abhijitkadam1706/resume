import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { panelReveal } from "../motion/animations";

const MotionDiv = motion.div;

const PipelineEngine = ({ stages }) => {
  const [activeStage, setActiveStage] = useState(0);
  const [status, setStatus] = useState("running");

  useEffect(() => {
    let timeoutId;

    const runStage = (index) => {
      setActiveStage(index);

      if (index === stages.length - 1) {
        setStatus("stable");
        timeoutId = setTimeout(() => {
          setStatus("running");
          runStage(0);
        }, 2400);
        return;
      }

      timeoutId = setTimeout(() => runStage(index + 1), 1200);
    };

    timeoutId = setTimeout(() => runStage(0), 1200);
    return () => clearTimeout(timeoutId);
  }, [stages]);

  return (
    <MotionDiv
      variants={panelReveal}
      initial="hidden"
      animate="visible"
      className="pointer-events-none absolute bottom-10 right-5 hidden w-[580px] 2xl:block"
    >
      <div className="rounded-2xl border border-white/10 bg-[#09101d]/72 px-6 py-5 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <div className="mb-5 flex items-center justify-between">
          <div className="text-[0.7rem] uppercase tracking-[0.28em] text-[#d4daee]">
            Delivery pipeline
          </div>
          <div className="text-[0.62rem] uppercase tracking-[0.24em] text-[#8e98b3]">
            {status}
          </div>
        </div>

        <div className="relative flex items-start justify-between gap-4">
          <div className="absolute left-4 right-4 top-4 h-px bg-white/10" />
          <div
            className="absolute left-4 top-4 h-px bg-gradient-to-r from-[#9093ff] to-[#ff8d86] transition-all duration-700"
            style={{
              width: `${(activeStage / Math.max(stages.length - 1, 1)) * 100}%`,
            }}
          />

          {stages.map((stage, index) => {
            const isActive = index === activeStage;
            const isComplete = index < activeStage || status === "stable";

            return (
              <div key={stage.id} className="relative z-10 flex flex-1 flex-col items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-[0.68rem] font-semibold transition-all ${
                    isComplete
                      ? "border-[#27c93f] bg-[#27c93f] text-[#07110a]"
                      : isActive
                        ? "border-[#ff8d86] bg-[#111927] text-[#ffb8b2] shadow-[0_0_24px_rgba(255,141,134,0.35)]"
                        : "border-white/15 bg-[#111927] text-[#8e98b3]"
                  }`}
                >
                  {index + 1}
                </div>
                <div
                  className={`text-[0.62rem] uppercase tracking-[0.22em] ${
                    isActive ? "text-[#ffb8b2]" : isComplete ? "text-[#d4daee]" : "text-[#8e98b3]"
                  }`}
                >
                  {stage.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MotionDiv>
  );
};

export default PipelineEngine;

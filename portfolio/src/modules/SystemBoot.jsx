import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const MotionDiv = motion.div;

const SystemBoot = ({ sequence, onComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const [lines, setLines] = useState([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const activeSequence = shouldReduceMotion ? sequence.slice(-3) : sequence;
    const lineDelay = shouldReduceMotion ? 90 : 220;
    const finishDelay = shouldReduceMotion ? 220 : 800;
    let timeoutId;
    let lineIndex = 0;

    const pushNextLine = () => {
      if (lineIndex < activeSequence.length) {
        setLines((current) => [...current, activeSequence[lineIndex]]);
        lineIndex += 1;
        timeoutId = setTimeout(pushNextLine, lineDelay);
        return;
      }

      timeoutId = setTimeout(() => {
        setVisible(false);
        setTimeout(onComplete, shouldReduceMotion ? 120 : 650);
      }, finishDelay);
    };

    timeoutId = setTimeout(pushNextLine, shouldReduceMotion ? 60 : 260);
    return () => clearTimeout(timeoutId);
  }, [onComplete, sequence, shouldReduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <MotionDiv
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: shouldReduceMotion ? 1 : 1.02,
            filter: shouldReduceMotion ? "blur(0px)" : "blur(10px)",
          }}
          transition={{ duration: shouldReduceMotion ? 0.18 : 0.7 }}
          className="pointer-events-none fixed inset-0 z-[100] overflow-hidden bg-[#030712] px-6 py-10"
        >
          {!shouldReduceMotion && (
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-30" />
          )}

          <div className="relative mx-auto flex h-full max-w-6xl items-center">
            <div className="font-mono">
              {lines.map((line, index) => (
                <div
                  key={`${line}-${index}`}
                  className="mb-3 text-sm uppercase tracking-[0.26em] text-[#27c93f] drop-shadow-[0_0_12px_rgba(39,201,63,0.55)] md:text-lg"
                >
                  [{String((index + 1) * 16).padStart(4, "0")}] {line}
                </div>
              ))}
              <div className="h-5 w-3 animate-pulse bg-[#27c93f] shadow-[0_0_14px_rgba(39,201,63,0.5)]" />
            </div>
          </div>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default SystemBoot;

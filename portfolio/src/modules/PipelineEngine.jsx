import { motion } from "framer-motion";

const MotionDiv = motion.div;

const PipelineEngine = ({ stages }) => {
  // Map stages to infinity loop absolute positions (Left loop, right loop)
  const positions = [
    { left: "28%", top: "22%" }, // 0. Plan (Top Left)
    { left: "9%", top: "50%" },  // 1. Code (Far Left)
    { left: "28%", top: "78%" }, // 2. Build (Bottom Left)
    { left: "45%", top: "50%" }, // 3. Test (Center Left)
    { left: "72%", top: "22%" }, // 4. Release (Top Right)
    { left: "91%", top: "50%" }, // 5. Deploy (Far Right)
    { left: "72%", top: "78%" }, // 6. Operate (Bottom Right)
    { left: "55%", top: "50%" }, // 7. Monitor (Center Right)
  ];

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="pointer-events-none w-full max-w-[500px]"
    >
      <div className="rounded-xl border border-white/10 bg-[#09101d]/80 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-[0.65rem] uppercase tracking-[0.25em] text-[#d4daee]">
            DevOps Lifecycle
          </div>
          <div className="flex gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#ff8d86] shadow-[0_0_8px_#ff8d86]" />
            <span className="text-[0.55rem] uppercase tracking-[0.2em] text-[#ff8d86]">
              Infinite Loop
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[400px] aspect-[2/1] mt-4 mb-4">
          {/* SVG Infinity Loop */}
          <svg
            viewBox="0 0 320 160"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <defs>
              <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9b7bff" />
                <stop offset="50%" stopColor="#66a6ff" />
                <stop offset="100%" stopColor="#ff8d86" />
              </linearGradient>
            </defs>

            {/* Background Track */}
            <path
              d="M160,80 C110,30 40,30 40,80 C40,130 110,130 160,80 C210,30 280,30 280,80 C280,130 210,130 160,80 Z"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
            />

            {/* Animated Glowing Path */}
            <motion.path
              d="M160,80 C110,30 40,30 40,80 C40,130 110,130 160,80 C210,30 280,30 280,80 C280,130 210,130 160,80 Z"
              fill="none"
              stroke="url(#infinityGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{ pathLength: 1, pathOffset: 1 }}
              transition={{
                duration: 6,
                ease: "linear",
                repeat: Infinity,
              }}
              style={{ filter: "drop-shadow(0 0 8px rgba(102, 166, 255, 0.6))" }}
            />
          </svg>

          {/* DevOps Nodes */}
          {stages.slice(0, 8).map((stage, index) => {
            const pos = positions[index];
            const isDev = index < 4; // Dev side (blue)
            
            return (
              <div
                key={stage.id}
                className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
                style={{ left: pos.left, top: pos.top }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className={`flex h-7 w-7 items-center justify-center rounded-full border bg-[#0b1221] shadow-xl ${
                    isDev ? "border-[#66a6ff]/40 text-[#66a6ff]" : "border-[#ff8d86]/40 text-[#ff8d86]"
                  }`}
                >
                  <div className={`h-1.5 w-1.5 rounded-full ${isDev ? "bg-[#66a6ff]" : "bg-[#ff8d86]"}`} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className={`mt-2 text-[0.55rem] font-bold uppercase tracking-[0.2em] ${
                    isDev ? "text-[#a3c7ff]" : "text-[#ffb8b2]"
                  }`}
                >
                  {stage.label}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </MotionDiv>
  );
};

export default PipelineEngine;

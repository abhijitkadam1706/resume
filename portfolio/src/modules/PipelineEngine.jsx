import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Code2,
  FileCode2,
  FlaskConical,
  Hammer,
  Rocket,
  Settings2,
  Tag,
} from "lucide-react";

// DevOps Stages mapped accurately to the SVG Lemniscate of Bernoulli
const stagesData = [
  // OPS LOOP (Right Side) - Path offset 0.0 to 0.5
  { id: "release", label: "Release", icon: Tag, pos: { left: "57%", top: "42%" }, offset: 0.05, isDev: false },
  { id: "deploy", label: "Deploy", icon: Rocket, pos: { left: "72.5%", top: "19%" }, offset: 0.125, isDev: false },
  { id: "operate", label: "Operate", icon: Settings2, pos: { left: "86%", top: "50%" }, offset: 0.25, isDev: false },
  { id: "monitor", label: "Monitor", icon: Activity, pos: { left: "72.5%", top: "81%" }, offset: 0.375, isDev: false },

  // DEV LOOP (Left Side) - Path offset 0.5 to 1.0
  { id: "plan", label: "Plan", icon: FileCode2, pos: { left: "43%", top: "42%" }, offset: 0.55, isDev: true },
  { id: "code", label: "Code", icon: Code2, pos: { left: "27.5%", top: "19%" }, offset: 0.625, isDev: true },
  { id: "build", label: "Build", icon: Hammer, pos: { left: "14%", top: "50%" }, offset: 0.75, isDev: true },
  { id: "test", label: "Test", icon: FlaskConical, pos: { left: "27.5%", top: "81%" }, offset: 0.875, isDev: true },
];

const loopLabels = [
  { id: "dev", label: "Dev", position: { left: "22.5%", top: "49.5%" } },
  { id: "ops", label: "Ops", position: { left: "77.5%", top: "49.5%" } },
];

const MotionDiv = motion.div;

const PipelineEngine = () => {
  const [progress, setProgress] = useState(0);

  // Synchronize a global 0->1 tracker over 8 seconds to drive both the particle and the node highlights
  useEffect(() => {
    let animationFrame;
    const startTime = Date.now();
    const DURATION = 8000;
    
    const animate = () => {
      const now = Date.now();
      setProgress(((now - startTime) % DURATION) / DURATION);
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Mathematical Bezier infinity loop (Lemniscate)
  const infinityPath = "M0,0 C60,-80 160,-80 160,0 C160,80 60,80 0,0 C-60,-80 -160,-80 -160,0 C-160,80 -60,80 0,0 Z";

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex w-full items-center justify-center py-4 xl:justify-end"
    >
      <div className="relative w-full max-w-[46rem] overflow-hidden rounded-[2rem] border border-white/8 bg-[#080e1a]/45 p-5 shadow-[0_0_80px_rgba(0,0,0,0.45)] backdrop-blur-md lg:max-w-[50rem] xl:max-w-[54rem]">
        {/* Core SVG Canvas */}
        <div className="relative aspect-[2.15/1] w-full text-center">
          <svg
            viewBox="-170 -90 340 180"
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-10"
          >
            <defs>
              <linearGradient id="devOpsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#66a6ff" />   {/* Dev Blue */}
                <stop offset="50%" stopColor="#a67cff" />  {/* Cross Purple */}
                <stop offset="100%" stopColor="#ff8d86" /> {/* Ops Red */}
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* 1. Base Ghost Track */}
            <path
              d={infinityPath}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="4"
            />

            {/* 2. Static Glowing Core Line */}
            <path
              d={infinityPath}
              fill="none"
              stroke="url(#devOpsGrad)"
              strokeWidth="2"
              opacity="0.2"
              filter="url(#glow)"
            />

            {/* 3. Single High-Speed Data Packet */}
            <motion.path
              d={infinityPath}
              fill="none"
              stroke="#ffffff"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{ pathLength: 0.05, pathOffset: progress }}
              transition={{ duration: 0, ease: "linear" }}
              style={{ filter: "drop-shadow(0 0 8px #ffffff)" }}
            />
          </svg>

          {loopLabels.map((loop) => (
            <div
              key={loop.id}
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 text-[1.4rem] font-semibold tracking-[-0.04em] text-white/95 md:text-[2rem]"
              style={loop.position}
            >
              {loop.label}
            </div>
          ))}

          {/* Connected Floating Nodes */}
          {stagesData.map((stage) => {
            const Icon = stage.icon;
            
            // Check if the single moving dot is currently crossing this node's offset coordinate (+/- 0.05 variance)
            const isActive = Math.abs(progress - stage.offset) < 0.05 || Math.abs(progress - stage.offset + 1) < 0.05 || Math.abs(progress - stage.offset - 1) < 0.05;
            
            return (
              <MotionDiv
                key={stage.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: isActive ? 1.12 : 1 }}
                transition={{ duration: 0.2 }}
                className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 group z-20 origin-center"
                style={{
                  left: stage.pos.left, 
                  top: stage.pos.top,
                }}
              >
                {/* Node Glass Pill */}
                <div
                  className={`relative flex h-9 w-9 items-center justify-center rounded-[1rem] border backdrop-blur-md transition-all duration-300 md:h-11 md:w-11 ${
                    isActive
                      ? (
                          stage.isDev
                            ? "bg-[#0b162c] border-[#66a6ff] shadow-[0_0_20px_#66a6ff]"
                            : "bg-[#2c0b0b] border-[#ff8d86] shadow-[0_0_20px_#ff8d86]"
                        )
                      : (
                          stage.isDev
                            ? "bg-[#0b162c]/60 border-[#66a6ff]/20 opacity-60"
                            : "bg-[#2c0b0b]/60 border-[#ff8d86]/20 opacity-60"
                        )
                  }`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 transition-colors duration-300 md:h-4 md:w-4 ${
                      isActive
                        ? "text-white"
                        : (stage.isDev ? "text-[#66a6ff]" : "text-[#ff8d86]")
                    }`}
                  />
                </div>
                
                {/* Node Label Title */}
                <div
                  className={`absolute top-full mt-2.5 px-2.5 py-0.5 rounded-full border text-[0.5rem] font-bold uppercase tracking-[0.2em] backdrop-blur-md transition-all duration-300 md:px-3.5 md:text-[0.6rem] ${
                    isActive
                      ? (
                          stage.isDev
                            ? "bg-[#0b162c] border-[#66a6ff]/50 text-white shadow-[0_0_10px_rgba(102,166,255,0.5)]"
                            : "bg-[#2c0b0b] border-[#ff8d86]/50 text-white shadow-[0_0_10px_rgba(255,141,134,0.5)]"
                        )
                      : (
                          stage.isDev
                            ? "bg-[#0b162c]/40 border-[#66a6ff]/10 text-[#66a6ff]/70"
                            : "bg-[#2c0b0b]/40 border-[#ff8d86]/10 text-[#ff8d86]/70"
                        )
                  }`}
                >
                  {stage.label}
                </div>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </MotionDiv>
  );
};

export default PipelineEngine;

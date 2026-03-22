import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileCode2, Code2, Hammer, FlaskConical, 
  Tag, Rocket, Settings2, Activity 
} from "lucide-react";

// DevOps Stages mapped accurately to the SVG Lemniscate of Bernoulli
const stagesData = [
  // OPS LOOP (Right Side) - Path offset 0.0 to 0.5
  { id: "release", label: "Release", icon: Tag, pos: { left: "60%", top: "31%" }, offset: 0.05, isDev: false },
  { id: "deploy", label: "Deploy", icon: Rocket, pos: { left: "75.6%", top: "20%" }, offset: 0.125, isDev: false },
  { id: "operate", label: "Operate", icon: Settings2, pos: { left: "90%", top: "50%" }, offset: 0.250, isDev: false },
  { id: "monitor", label: "Monitor", icon: Activity, pos: { left: "75.6%", top: "80%" }, offset: 0.375, isDev: false },

  // DEV LOOP (Left Side) - Path offset 0.5 to 1.0
  { id: "plan", label: "Plan", icon: FileCode2, pos: { left: "40%", top: "31%" }, offset: 0.55, isDev: true },
  { id: "code", label: "Code", icon: Code2, pos: { left: "24.4%", top: "20%" }, offset: 0.625, isDev: true },
  { id: "build", label: "Build", icon: Hammer, pos: { left: "10%", top: "50%" }, offset: 0.750, isDev: true },
  { id: "test", label: "Test", icon: FlaskConical, pos: { left: "24.4%", top: "80%" }, offset: 0.875, isDev: true },
];

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-full flex justify-center py-16"
    >
      <div className="relative w-full max-w-[700px] aspect-[2/1] bg-[#080e1a]/40 backdrop-blur-md rounded-3xl flex items-center justify-center p-8">
        
        {/* Core SVG Canvas */}
        <div className="relative w-full h-full">
          <svg
            viewBox="-200 -100 400 200"
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
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
              style={{ filter: "drop-shadow(0 0 6px #ffffff)" }}
            />
          </svg>

          {/* Connected Floating Nodes */}
          {stagesData.map((stage) => {
            const Icon = stage.icon;
            
            // Check if the single moving dot is currently crossing this node's offset coordinate (+/- 0.06 variance)
            const isActive = Math.abs(progress - stage.offset) < 0.06 || Math.abs(progress - stage.offset + 1) < 0.06 || Math.abs(progress - stage.offset - 1) < 0.06;
            
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: isActive ? 1.15 : 1 }}
                transition={{ duration: 0.3 }}
                className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 group z-10"
                style={{ left: stage.pos.left, top: stage.pos.top }}
              >
                {/* Node Glass Pill */}
                <div 
                  className={`relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-xl border backdrop-blur-md transition-all duration-300 ${
                    isActive 
                      ? (stage.isDev 
                          ? "bg-[#0b162c] border-[#66a6ff] shadow-[0_0_20px_#66a6ff]" 
                          : "bg-[#2c0b0b] border-[#ff8d86] shadow-[0_0_20px_#ff8d86]")
                      : (stage.isDev 
                          ? "bg-[#0b162c]/60 border-[#66a6ff]/20 opacity-60" 
                          : "bg-[#2c0b0b]/60 border-[#ff8d86]/20 opacity-60")
                  }`}
                >
                  <Icon 
                    className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors duration-300 ${
                      isActive 
                        ? "#ffffff" 
                        : (stage.isDev ? "text-[#66a6ff]" : "text-[#ff8d86]")
                    }`} 
                    color={isActive ? "#ffffff" : undefined}
                  />
                </div>
                
                {/* Node Label Title */}
                <div 
                  className={`absolute top-full mt-2 px-2 py-0.5 rounded-full text-[0.45rem] md:text-[0.55rem] font-bold uppercase tracking-[0.2em] border backdrop-blur-md transition-all duration-300 ${
                    isActive
                      ? (stage.isDev 
                          ? "bg-[#0b162c] border-[#66a6ff]/50 text-white shadow-[0_0_10px_rgba(102,166,255,0.5)]" 
                          : "bg-[#2c0b0b] border-[#ff8d86]/50 text-white shadow-[0_0_10px_rgba(255,141,134,0.5)]")
                      : (stage.isDev 
                          ? "bg-[#0b162c]/40 border-[#66a6ff]/10 text-[#66a6ff]/70" 
                          : "bg-[#2c0b0b]/40 border-[#ff8d86]/10 text-[#ff8d86]/70")
                  }`}
                >
                  {stage.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default PipelineEngine;

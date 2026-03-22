import { motion } from "framer-motion";
import { 
  FileCode2, Code2, Hammer, FlaskConical, 
  Tag, Rocket, Settings2, Activity 
} from "lucide-react";

const MotionDiv = motion.div;

// DevOps Stages mapped to the exact flow of the reference image
const stagesData = [
  // Left Loop (DEV)
  { id: "code", label: "Code", icon: Code2, pos: { left: "20%", top: "15%" }, delay: 1 },
  { id: "build", label: "Build", icon: Hammer, pos: { left: "5%", top: "50%" }, delay: 2 },
  { id: "test", label: "Test", icon: FlaskConical, pos: { left: "20%", top: "85%" }, delay: 3 },
  { id: "plan", label: "Plan", icon: FileCode2, pos: { left: "40%", top: "40%" }, delay: 0 },
  
  // Right Loop (OPS)
  { id: "release", label: "Release", icon: Tag, pos: { left: "50%", top: "50%" }, delay: 4 },
  { id: "deploy", label: "Deploy", icon: Rocket, pos: { left: "80%", top: "15%" }, delay: 5 },
  { id: "operate", label: "Operate", icon: Settings2, pos: { left: "95%", top: "50%" }, delay: 6 },
  { id: "monitor", label: "Monitor", icon: Activity, pos: { left: "80%", top: "85%" }, delay: 7 },
];

const PipelineEngine = () => {
  // Perfect mathematical Bezier Lemniscate (Infinity Loop)
  const infinityPath = "M0,0 C60,-80 160,-80 160,0 C160,80 60,80 0,0 C-60,-80 -160,-80 -160,0 C-160,80 -60,80 0,0 Z";

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-full flex justify-center py-16"
    >
      <div className="relative w-full max-w-[700px] aspect-[2/1] rounded-2xl bg-[#080e1a]/40 backdrop-blur-2xl border border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.5)] flex items-center justify-center p-8">
        
        {/* Core SVG Canvas */}
        <div className="relative w-full h-full">
          <svg
            viewBox="-200 -100 400 200"
            className="absolute inset-0 w-full h-full overflow-visible"
          >
            <defs>
              <linearGradient id="devOpsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#66a6ff" />   {/* Dev Blue */}
                <stop offset="50%" stopColor="#a67cff" />  {/* Cross Purple */}
                <stop offset="100%" stopColor="#ff8d86" /> {/* Ops Red */}
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
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
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="4"
            />

            {/* 2. Constant Glowing Core Line */}
            <path
              d={infinityPath}
              fill="none"
              stroke="url(#devOpsGrad)"
              strokeWidth="2"
              opacity="0.3"
              filter="url(#glow)"
            />

            {/* 3. Main Progress Pulse (Data flowing through loop) */}
            <motion.path
              d={infinityPath}
              fill="none"
              stroke="url(#devOpsGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{ pathLength: 1, pathOffset: 1 }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            />

            {/* 4. High-Speed Tiny Data Packets */}
            {[0, 0.25, 0.5, 0.75].map((offset, i) => (
              <motion.path
                key={`packet-${i}`}
                d={infinityPath}
                fill="none"
                stroke="#ffffff"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0, pathOffset: offset }}
                animate={{ pathLength: 0.05, pathOffset: offset + 1 }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                style={{ filter: "drop-shadow(0 0 4px #ffffff)" }}
              />
            ))}
          </svg>

          {/* Floating UI Nodes placed along the path */}
          {stagesData.map((stage, i) => {
            const isDev = i < 4;
            const Icon = stage.icon;
            
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: stage.delay * 0.2 + 0.5, type: "spring" }}
                className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 group z-10"
                style={{ left: stage.pos.left, top: stage.pos.top }}
              >
                {/* Node Glass Card */}
                <div 
                  className={`relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-110 cursor-default shadow-xl ${
                    isDev 
                      ? "bg-[#0b162c]/80 border-[#66a6ff]/30 shadow-[0_0_20px_rgba(102,166,255,0.15)] hover:shadow-[0_0_30px_rgba(102,166,255,0.4)]" 
                      : "bg-[#2c0b0b]/80 border-[#ff8d86]/30 shadow-[0_0_20px_rgba(255,141,134,0.15)] hover:shadow-[0_0_30px_rgba(255,141,134,0.4)]"
                  }`}
                >
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isDev ? "text-[#66a6ff]" : "text-[#ff8d86]"}`} />
                </div>
                
                {/* Node Label */}
                <div 
                  className={`mt-3 px-3 py-1 rounded-full text-[0.55rem] md:text-xs font-bold uppercase tracking-[0.2em] border backdrop-blur-md ${
                    isDev 
                      ? "bg-[#0b162c]/80 border-[#66a6ff]/20 text-[#a3c7ff]" 
                      : "bg-[#2c0b0b]/80 border-[#ff8d86]/20 text-[#ffb8b2]"
                  }`}
                >
                  {stage.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </MotionDiv>
  );
};

export default PipelineEngine;

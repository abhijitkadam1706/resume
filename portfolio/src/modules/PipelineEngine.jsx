import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, Terminal, Package, TestTube, 
  Tag, Rocket, Settings, Activity, Cpu 
} from "lucide-react";

const MotionDiv = motion.div;

// Map stages to specific icons and colors
const stageConfig = [
  { icon: Calendar, color: "text-[#9b7bff]", border: "border-[#9b7bff]/30" }, // Plan
  { icon: Terminal, color: "text-[#66a6ff]", border: "border-[#66a6ff]/30" }, // Code
  { icon: Package, color: "text-[#66a6ff]", border: "border-[#66a6ff]/30" },  // Build
  { icon: TestTube, color: "text-[#66a6ff]", border: "border-[#66a6ff]/30" }, // Test
  { icon: Tag, color: "text-[#ff8d86]", border: "border-[#ff8d86]/30" },      // Release
  { icon: Rocket, color: "text-[#ff8d86]", border: "border-[#ff8d86]/30" },   // Deploy
  { icon: Settings, color: "text-[#ff8d86]", border: "border-[#ff8d86]/30" }, // Operate
  { icon: Activity, color: "text-[#ff8d86]", border: "border-[#ff8d86]/30" }, // Monitor
];

const PipelineEngine = ({ stages }) => {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [stages.length]);

  return (
    <div className="w-full flex items-center justify-center py-20 overflow-hidden perspective-[1200px]">
      <MotionDiv
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative w-[340px] h-[340px] md:w-[600px] md:h-[600px] flex items-center justify-center"
      >
        {/* Radar Background Rings */}
        <div className="absolute inset-0 rounded-full border border-white/5 bg-[#09101d]/40 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.5)]"></div>
        <div className="absolute inset-8 rounded-full border border-white/5 border-dashed"></div>
        <div className="absolute inset-20 rounded-full border border-white/10"></div>
        
        {/* Animated Radar Sweep */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent 70%, rgba(102, 166, 255, 0.1) 95%, rgba(102, 166, 255, 0.4) 100%)"
          }}
        />

        {/* Central Hub */}
        <div className="relative z-20 flex flex-col items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full border border-[#ff8d86]/30 bg-[#131a28] shadow-[0_0_40px_rgba(255,141,134,0.15)] group">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border border-[#ff8d86]/50"
          />
          <Cpu className="w-8 h-8 md:w-10 md:h-10 text-[#ff8d86] mb-2" />
          <div className="text-[0.55rem] md:text-xs font-bold tracking-widest text-[#e0e5f6] uppercase">CORE</div>
          <div className="text-[0.45rem] md:text-[0.5rem] tracking-[0.2em] text-[#ff8d86] uppercase animate-pulse">Syncing</div>
        </div>

        {/* Orbiting Stages */}
        {stages.slice(0, 8).map((stage, i) => {
          const config = stageConfig[i] || stageConfig[0];
          const Icon = config.icon;
          const isActive = i === activeStage;
          
          // Math for circular positioning (starting at top = -90deg)
          const angleDeg = (i * 360) / 8 - 90;
          const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 250;

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 + 0.5 }}
              className="absolute z-30"
              style={{
                transform: `rotate(${angleDeg}deg) translate(${radius}px) rotate(${-angleDeg}deg)`
              }}
            >
              <div 
                className={`relative flex flex-col items-center justify-center p-3 md:p-4 rounded-xl border bg-[#0d1320]/90 backdrop-blur-md transition-all duration-500 hover:scale-110 cursor-default ${
                  isActive ? `border-[#e0e5f6]/40 shadow-[0_0_30px_rgba(255,255,255,0.1)] scale-110` : `${config.border} shadow-lg opacity-60`
                }`}
              >
                {/* Active Indicator Glow */}
                {isActive && (
                  <motion.div 
                    layoutId="activeGlow"
                    className="absolute -inset-1 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md"
                  />
                )}
                
                <Icon className={`w-5 h-5 md:w-6 md:h-6 mb-2 transition-colors ${isActive ? "text-white" : config.color}`} />
                <div className={`text-[0.5rem] md:text-[0.6rem] font-bold uppercase tracking-[0.2em] ${isActive ? "text-white" : "text-[#a6abbb]"}`}>
                  {stage.label}
                </div>
                
                {/* Mock Telemetry Data on Hover or Active */}
                <div className={`absolute top-full mt-2 w-max text-center transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}>
                  <div className="text-[0.45rem] font-mono text-slate-400">
                    {i < 4 ? "> DEV_PHASE" : "> OPS_PHASE"}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </MotionDiv>
    </div>
  );
};

export default PipelineEngine;

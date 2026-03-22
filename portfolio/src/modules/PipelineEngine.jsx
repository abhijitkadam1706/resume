import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Box, TestTube, ShieldCheck, Rocket } from 'lucide-react';
import { springConfig } from '../motion/animations';

const STAGES = [
  { id: 'code', label: 'Source', icon: Code },
  { id: 'build', label: 'Build', icon: Box },
  { id: 'test', label: 'Test', icon: TestTube },
  { id: 'scan', label: 'Security', icon: ShieldCheck },
  { id: 'deploy', label: 'Deploy', icon: Rocket }
];

const PipelineEngine = () => {
  const [activeStage, setActiveStage] = useState(-1);
  const [status, setStatus] = useState('idle'); // idle, running, success, failed

  useEffect(() => {
    let timeout;
    const runPipeline = () => {
      setStatus('running');
      setActiveStage(0);

      const traverse = (stage) => {
        if (stage >= STAGES.length) {
          setStatus('success');
          timeout = setTimeout(runPipeline, 4000); // Restart pipeline loop
          return;
        }
        
        setActiveStage(stage);
        
        // Simulating realistic failure rates in Security and Test
        if ((stage === 3 || stage === 2) && Math.random() > 0.85) {
            setStatus('failed');
            timeout = setTimeout(runPipeline, 4000);
            return;
        }

        // Simulate duration of stage processing
        timeout = setTimeout(() => traverse(stage + 1), Math.random() * 800 + 1000);
      };

      traverse(0);
    };

    timeout = setTimeout(runPipeline, 1500); // initial start
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springConfig, delay: 0.5 }}
      className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-40 bg-[#080e1a]/80 backdrop-blur-xl border border-[#424855]/40 rounded-xl p-6 shadow-[0_15px_60px_rgba(0,0,0,0.5)] hidden lg:block w-[600px] pointer-events-auto hover:border-[#ff8d86]/50 transition-colors"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[#e0e5f6] font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${status === 'running' ? 'bg-[#ffbd2e] animate-pulse' : status === 'success' ? 'bg-[#27c93f]' : status === 'failed' ? 'bg-[#ff5f56]' : 'bg-[#424855]'}`}></span>
          CI/CD Pipeline Engine
        </h3>
        <span className="text-[10px] text-[#a6abbb] font-mono tracking-widest">{status.toUpperCase()}</span>
      </div>

      <div className="flex items-center justify-between relative px-2">
        {/* Background inactive track */}
        <div className="absolute top-[18px] left-8 right-8 h-0.5 bg-[#1e2637] -z-10 rounded-full"></div>
        
        {/* Animated Active track */}
        <div 
          className="absolute top-[18px] left-8 h-0.5 bg-gradient-to-r from-[#9093ff] to-[#ff8d86] -z-10 rounded-full transition-all duration-[1000ms] ease-in-out" 
          style={{ width: `calc(${Math.max(0, activeStage) / (STAGES.length - 1)} * (100% - 4rem))` }}
        />

        {STAGES.map((stage, i) => {
          const isActive = i === activeStage;
          const isPassed = i < activeStage || status === 'success';
          const isFailed = i === activeStage && status === 'failed';
          const Icon = stage.icon;

          return (
            <div key={stage.id} className="flex flex-col items-center gap-3 relative">
              <motion.div 
                animate={{ 
                  scale: isActive ? 1.2 : 1,
                  backgroundColor: isFailed ? '#ff5f56' : isPassed ? '#27c93f' : isActive ? '#080e1a' : '#080e1a',
                  borderColor: isFailed ? '#ff5f56' : isPassed ? '#27c93f' : isActive ? '#ff8d86' : '#424855',
                  boxShadow: isActive ? '0 0 20px rgba(255,141,134,0.4)' : isPassed ? '0 0 15px rgba(39,201,63,0.3)' : 'none'
                }}
                className={`w-9 h-9 rounded-full border-2 flex items-center justify-center relative z-10 transition-colors duration-300 bg-[#080e1a]`}
              >
                <Icon size={14} className={isActive ? 'text-[#ff8d86]' : isPassed || isFailed ? 'text-[#080e1a]' : 'text-[#a6abbb]'} />
                
                {isActive && status === 'running' && (
                  <span className="absolute inset-0 rounded-full border-2 border-[#ff8d86] animate-ping opacity-75"></span>
                )}
              </motion.div>
              
              <span className={`text-[9px] uppercase tracking-wider font-mono ${isActive ? 'text-[#ff8d86] font-bold' : isPassed ? 'text-[#27c93f]' : 'text-[#a6abbb]'}`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PipelineEngine;

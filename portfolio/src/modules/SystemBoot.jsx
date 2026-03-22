import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_SEQUENCE = [
  "INITIALIZING DEVOPS CORE...",
  "LOADING INFRASTRUCTURE DEFINITIONS...",
  "MOUNTING SECURE VOLUMES...",
  "ALLOCATING HPC COMPUTE NODES...",
  "ESTABLISHING KUBERNETES CONTROL PLANE...",
  "INJECTING ENVIRONMENT VARIABLES...",
  "CLUSTER READY. ENTERING COMMAND INTERFACE."
];

const SystemBoot = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    let timeoutId;
    
    const runSequence = () => {
      let currentLine = 0;
      
      const pushLine = () => {
        if (currentLine < BOOT_SEQUENCE.length) {
          setLines(prev => [...prev, BOOT_SEQUENCE[currentLine]]);
          currentLine++;
          timeoutId = setTimeout(pushLine, Math.random() * 250 + 100);
        } else {
          // Finish boot sequence
          timeoutId = setTimeout(() => {
            setIsBooting(false);
            setTimeout(onComplete, 800); // Allow time for exit animation
          }, 800);
        }
      };
      
      pushLine();
    };

    // Initial delay before booting text starts
    timeoutId = setTimeout(runSequence, 300);
    
    return () => clearTimeout(timeoutId);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#030712] flex flex-col justify-center px-8 md:px-24 pointer-events-none overflow-hidden"
        >
          {/* Scanline CRT overlay effect */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30 z-10"></div>
          
          <div className="max-w-4xl font-mono relative z-20">
            {lines.map((line, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[#27c93f] text-sm md:text-xl lg:text-2xl tracking-widest mb-3 font-bold drop-shadow-[0_0_8px_rgba(39,201,63,0.8)] uppercase"
              >
                <span className="opacity-50 mr-4">[{String(i * 14 + 12).padStart(4, '0')}]</span> {line}
              </motion.div>
            ))}
            
            <motion.div 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-4 h-[20px] md:h-[28px] bg-[#27c93f] mt-1 ml-1 align-middle drop-shadow-[0_0_8px_rgba(39,201,63,0.8)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SystemBoot;

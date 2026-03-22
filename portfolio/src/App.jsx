import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CanvasRoot from "./three/CanvasRoot";
import TerminalEngine from "./modules/TerminalEngine";
import MetricsDashboard from "./modules/MetricsDashboard";
import PipelineEngine from "./modules/PipelineEngine";
import SystemBoot from "./modules/SystemBoot";
import { fadeIn } from './motion/animations';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <div className="bg-[#080e1a] min-h-screen relative overflow-x-hidden">
      {/* 🔮 Boot Sequence */}
      <AnimatePresence>
        {!bootComplete && <SystemBoot onComplete={() => setBootComplete(true)} />}
      </AnimatePresence>

      {/* 🌐 3D Infrastructure Canvas (Runs constantly in background) */}
      <CanvasRoot />

      {/* The main content fades in after boot unlocks */}
      <AnimatePresence>
        {bootComplete && (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="relative z-10 w-full min-h-screen text-[#e0e5f6] font-sans selection:bg-[#ff8d86] selection:text-[#080e1a] pointer-events-none"
          >
            {/* Global Navbar */}
            <div className="pointer-events-auto z-50 relative">
              <Navbar />
            </div>

            {/* Hero Section Container (Relative for HUD placement) */}
            <div className="relative w-full overflow-hidden">
              <div className="pointer-events-auto relative z-20">
                {/* Your Original Hero Content */}
                <Hero />
              </div>

              {/* DevOps Control Systems HUD Overlay inside Hero constraints */}
              <div className="absolute inset-0 z-30 pointer-events-none">
                <TerminalEngine />
                <MetricsDashboard />
                <PipelineEngine />
              </div>
            </div>

            {/* Main Portfolio Content Layer (Resumes data visibility) */}
            <div className="relative z-40 bg-[#080e1a]/90 backdrop-blur-md border-t border-[#424855]/30 pointer-events-auto">
              <About />
              <Experience />
              <Projects />
              <Contact />
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
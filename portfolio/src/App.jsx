import { lazy, Suspense, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import {
  bootSequence,
  capabilityGroups,
  clusterProfile,
  experienceEntries,
  navLinks,
  pipelineStages,
  profile,
  projectStudies,
  telemetryConfig,
  terminalScenarios,
} from "./data/siteData";
import { fadeIn } from "./motion/animations";
const MotionDiv = motion.div;
const CanvasRoot = lazy(() => import("./three/CanvasRoot"));
const MetricsDashboard = lazy(() => import("./modules/MetricsDashboard"));
const PipelineEngine = lazy(() => import("./modules/PipelineEngine"));
const SystemBoot = lazy(() => import("./modules/SystemBoot"));
const TerminalEngine = lazy(() => import("./modules/TerminalEngine"));

function App() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#080e1a]">
      <AnimatePresence>
        {!bootComplete && (
          <Suspense fallback={null}>
            <SystemBoot
              sequence={bootSequence}
              onComplete={() => setBootComplete(true)}
            />
          </Suspense>
        )}
      </AnimatePresence>

      <Suspense fallback={null}>
        <CanvasRoot clusterProfile={clusterProfile} />
      </Suspense>

      <AnimatePresence>
        {bootComplete && (
          <MotionDiv
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="relative z-10 min-h-screen text-[#e0e5f6] selection:bg-[#ff8d86] selection:text-[#080e1a]"
          >
            <Navbar links={navLinks} name={profile.name} />

            <main>
              <div className="relative isolate overflow-hidden">
                <Hero profile={profile} />

                <Suspense fallback={null}>
                  <div className="pointer-events-none absolute inset-x-0 top-0 bottom-0 z-30">
                    <TerminalEngine scenarios={terminalScenarios} />
                    <MetricsDashboard telemetryConfig={telemetryConfig} />
                    <PipelineEngine stages={pipelineStages} />
                  </div>
                </Suspense>
              </div>

              <div className="relative z-20 border-t border-white/10 bg-[#080e1a]/86 backdrop-blur-xl">
                <About profile={profile} capabilityGroups={capabilityGroups} />
                <Experience entries={experienceEntries} />
                <Projects projects={projectStudies} />
                <Contact profile={profile} />
              </div>
            </main>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

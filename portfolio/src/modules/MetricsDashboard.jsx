import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, Cpu, HardDrive, Network } from "lucide-react";
import { panelReveal, slideInRight } from "../motion/animations";

const MotionDiv = motion.div;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const MetricsDashboard = ({ telemetryConfig }) => {
  const { initialMetrics, logMessages } = telemetryConfig;
  const [cpu, setCpu] = useState(initialMetrics.cpu);
  const [memory, setMemory] = useState(initialMetrics.memory);
  const [requests, setRequests] = useState(initialMetrics.requests);
  const [network, setNetwork] = useState(initialMetrics.network);
  const [logs, setLogs] = useState([
    { id: "boot-log", text: "Cluster telemetry stream attached." },
  ]);
  const logIdRef = useRef(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCpu((current) => clamp(current + (Math.random() * 10 - 5), 18, 92));
      setMemory((current) => clamp(current + (Math.random() * 6 - 3), 34, 88));
      setRequests((current) => Math.max(320, current + Math.floor(Math.random() * 180 - 90)));
      setNetwork((current) => Math.max(120, current + Math.floor(Math.random() * 90 - 45)));

      if (Math.random() > 0.45) {
        const nextLog = logMessages[Math.floor(Math.random() * logMessages.length)];
        const logId = `log-${logIdRef.current}`;
        logIdRef.current += 1;

        setLogs((current) =>
          [...current, { id: logId, text: nextLog }].slice(-5),
        );
      }
    }, 1800);

    return () => clearInterval(intervalId);
  }, [logMessages]);

  return (
    <MotionDiv
      variants={slideInRight}
      initial="hidden"
      animate="visible"
      className="pointer-events-none absolute right-5 top-28 hidden w-[320px] xl:block"
    >
      <MotionDiv
        variants={panelReveal}
        className="overflow-hidden rounded-2xl border border-white/10 bg-[#09101d]/78 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-[#111a2a]/90 px-4 py-3">
          <div className="flex items-center gap-2">
            <Activity size={15} className="text-[#9093ff]" />
            <span className="text-[0.68rem] uppercase tracking-[0.28em] text-[#d4daee]">
              Live telemetry
            </span>
          </div>
          <div className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.24em] text-[#8e98b3]">
            Healthy
            <span className="h-2 w-2 rounded-full bg-[#27c93f] animate-pulse" />
          </div>
        </div>

        <div className="space-y-6 px-5 py-5">
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-xs text-[#a6b0c8]">
                <span className="inline-flex items-center gap-2">
                  <Cpu size={14} />
                  CPU load
                </span>
                <span className="font-mono text-[#e0e5f6]">{cpu.toFixed(1)}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#192233]">
                <MotionDiv
                  animate={{ width: `${cpu}%` }}
                  transition={{ type: "spring", stiffness: 60, damping: 18 }}
                  className="h-full bg-gradient-to-r from-[#9093ff] to-[#ff8d86]"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-xs text-[#a6b0c8]">
                <span className="inline-flex items-center gap-2">
                  <HardDrive size={14} />
                  Memory
                </span>
                <span className="font-mono text-[#e0e5f6]">{memory.toFixed(1)}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#192233]">
                <MotionDiv
                  animate={{ width: `${memory}%` }}
                  transition={{ type: "spring", stiffness: 60, damping: 18 }}
                  className="h-full bg-gradient-to-r from-[#d8deef] to-[#9093ff]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-white/10 bg-[#111927]/65 p-3">
              <div className="text-[0.62rem] uppercase tracking-[0.26em] text-[#8e98b3]">
                Req / sec
              </div>
              <div className="mt-3 font-mono text-2xl text-white">{requests}</div>
            </div>
            <div className="border border-white/10 bg-[#111927]/65 p-3">
              <div className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.26em] text-[#8e98b3]">
                <Network size={12} />
                Net I/O
              </div>
              <div className="mt-3 font-mono text-2xl text-white">{network} MB/s</div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="text-[0.62rem] uppercase tracking-[0.26em] text-[#8e98b3]">
              Event stream
            </div>
            <div className="mt-4 flex h-[104px] flex-col justify-end gap-2 overflow-hidden font-mono text-[0.66rem] leading-5 text-[#cdd6ec]">
              <AnimatePresence initial={false}>
                {logs.map((log) => (
                  <MotionDiv
                    key={log.id}
                    initial={{ opacity: 0, x: -12, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: "auto" }}
                    exit={{ opacity: 0, x: 12, height: 0 }}
                    transition={{ type: "spring", stiffness: 180, damping: 22 }}
                    className="border-b border-white/5 pb-2 last:border-b-0"
                  >
                    {log.text}
                  </MotionDiv>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </MotionDiv>
    </MotionDiv>
  );
};

export default MetricsDashboard;

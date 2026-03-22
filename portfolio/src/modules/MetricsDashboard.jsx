import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, HardDrive, Network } from 'lucide-react';
import { slideInRight } from '../motion/animations';

const LOG_MESSAGES = [
  "Node ip-10-0-1-15 connected",
  "Job [HPC-Batch] scheduled",
  "Deployment [api-v2] successful",
  "Scaling group to 5 instances",
  "Health check passed",
  "Route53 failover active",
  "Terraform apply completed"
];

const MetricsDashboard = () => {
  const [cpu, setCpu] = useState(42);
  const [memory, setMemory] = useState(68);
  const [requests, setRequests] = useState(1250);
  const [network, setNetwork] = useState(450);
  const [logs, setLogs] = useState([{ id: Date.now(), text: "System initialized" }]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(prev => Math.min(100, Math.max(10, prev + (Math.random() * 20 - 10))));
      setMemory(prev => Math.min(100, Math.max(30, prev + (Math.random() * 8 - 4))));
      setRequests(prev => Math.max(100, prev + Math.floor(Math.random() * 400 - 200)));
      setNetwork(prev => Math.max(50, prev + Math.floor(Math.random() * 100 - 50)));

      if (Math.random() > 0.6) {
        const randomLog = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
        setLogs(prev => {
          const newLog = { id: Date.now(), text: `[${new Date().toLocaleTimeString('en-US',{hour12:false})}] ${randomLog}` };
          return [...prev, newLog].slice(-4);
        });
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      variants={slideInRight}
      initial="hidden"
      animate="visible"
      className="absolute top-24 right-6 z-50 w-80 bg-[#080e1a]/80 backdrop-blur-xl border border-[#424855]/40 rounded-xl shadow-[0_15px_60px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto hidden md:block"
    >
      <div className="bg-[#131a28]/90 px-4 py-3 border-b border-[#424855]/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-[#9093ff]" />
          <span className="text-[10px] font-bold text-[#e0e5f6] tracking-[0.2em] uppercase">Live Telemetry</span>
        </div>
        <div className="flex gap-1 items-center">
          <span className="text-[9px] text-[#a6abbb] tracking-wider uppercase mr-1">Status</span>
          <div className="w-2 h-2 rounded-full bg-[#27c93f] animate-pulse"></div>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between text-xs text-[#a6abbb] font-mono mb-2">
              <span className="flex items-center gap-1.5"><Cpu size={14} className="text-[#e0e5f6]"/> CPU Usage</span>
              <span className="text-[#e0e5f6] font-semibold">{cpu.toFixed(1)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#1e2637] rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-[#9093ff] to-[#ff8d86]" animate={{ width: `${cpu}%` }} transition={{ type: "spring", stiffness: 50, damping: 15 }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-[#a6abbb] font-mono mb-2">
              <span className="flex items-center gap-1.5"><HardDrive size={14} className="text-[#e0e5f6]"/> Memory</span>
              <span className="text-[#e0e5f6] font-semibold">{memory.toFixed(1)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#1e2637] rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-[#e0e5f6] to-[#9093ff]" animate={{ width: `${memory}%` }} transition={{ type: "spring", stiffness: 50, damping: 15 }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#1e2637]/40 rounded-lg p-3 border border-[#424855]/20 hover:border-[#9093ff]/50 transition-colors">
            <div className="text-[9px] text-[#a6abbb] uppercase tracking-wider mb-1">Req / Sec</div>
            <motion.div key={requests} initial={{ scale: 1.1, color: '#ff8d86' }} animate={{ scale: 1, color: '#e0e5f6' }} className="font-mono text-xl font-bold">{requests}</motion.div>
          </div>
          <div className="bg-[#1e2637]/40 rounded-lg p-3 border border-[#424855]/20 hover:border-[#9093ff]/50 transition-colors">
            <div className="text-[9px] text-[#a6abbb] uppercase tracking-wider mb-1 flex items-center gap-1"><Network size={10}/> Net I/O</div>
            <motion.div key={network} initial={{ scale: 1.1, color: '#9093ff' }} animate={{ scale: 1, color: '#e0e5f6' }} className="font-mono text-xl font-bold flex items-baseline gap-1">
              {network} <span className="text-[10px] text-[#a6abbb] font-normal">MB/s</span>
            </motion.div>
          </div>
        </div>

        <div className="mt-1 border-t border-[#424855]/30 pt-4 relative">
          <div className="text-[9px] text-[#a6abbb] uppercase tracking-widest mb-3 flex items-center gap-2">
            Event Stream <div className="h-px bg-[#424855]/50 flex-grow"></div>
          </div>
          <div className="font-mono text-[10px] flex flex-col gap-2 h-[76px] justify-end overflow-hidden">
            <AnimatePresence initial={false}>
              {logs.map((log, i) => (
                <motion.div key={log.id} initial={{ opacity: 0, x: -10, height: 0 }} animate={{ opacity: 1, x: 0, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className={`flex items-start gap-2 ${i === logs.length - 1 ? 'text-[#e0e5f6]' : 'text-[#424855]'}`}>
                  <span className="text-[#a6abbb] mt-0.5">›</span><span>{log.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MetricsDashboard;

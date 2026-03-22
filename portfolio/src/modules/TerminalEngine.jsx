import React, { useState, useEffect, useRef } from 'react';

const COMMANDS = [
  {
    cmd: "terraform apply -auto-approve",
    output: [
      "aws_eks_cluster.main: Creating...",
      "aws_eks_cluster.main: Still creating... [10s elapsed]",
      "aws_eks_cluster.main: Still creating... [20s elapsed]",
      "aws_eks_cluster.main: Creation complete after 12m30s",
      "Apply complete! Resources: 42 added, 0 changed, 0 destroyed."
    ]
  },
  {
    cmd: "kubectl get nodes",
    output: [
      "NAME                                      STATUS   ROLES    AGE   VERSION",
      "ip-10-0-1-15.eu-west-1.compute.internal   Ready    <none>   12m   v1.28.2",
      "ip-10-0-2-84.eu-west-1.compute.internal   Ready    <none>   12m   v1.28.2",
      "ip-10-0-3-42.eu-west-1.compute.internal   Ready    <none>   12m   v1.28.2"
    ]
  },
  {
    cmd: "docker ps",
    output: [
      "CONTAINER ID   IMAGE                        COMMAND                  STATUS         PORTS",
      "8e3a2b1c4d5e   nginx:alpine                 \"/docker-entrypoint.…\"   Up 5 minutes   0.0.0.0:80->80/tcp",
      "f4a5b6c7d8e9   abhijitkadam/portfolio:v1    \"npm start\"              Up 2 hours     0.0.0.0:3000->3000/tcp"
    ]
  },
  {
    cmd: "ssh cluster-node-01",
    output: [
      "Warning: Permanently added 'cluster-node-01' (ECDSA) to the list of known hosts.",
      "Welcome to Ubuntu 22.04.3 LTS (GNU/Linux 6.2.0-32-generic x86_64)",
      "Last login: Sun Mar 22 10:45:12 2026 from 192.168.1.100",
      "root@cluster-node-01:~# "
    ]
  }
];

const TerminalEngine = () => {
  const [history, setHistory] = useState([]);
  const [cmdIndex, setCmdIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, charIndex]);

  useEffect(() => {
    let timeout;
    
    if (typing) {
      const currentCmd = COMMANDS[cmdIndex].cmd;
      if (charIndex < currentCmd.length) {
        timeout = setTimeout(() => {
          setCharIndex(prev => prev + 1);
        }, Math.random() * 40 + 30);
      } else {
        timeout = setTimeout(() => {
          setTyping(false);
          setHistory(prev => [...prev, `➜  ~ ${currentCmd}`]);
        }, 500); 
      }
    } else {
      const outputLines = COMMANDS[cmdIndex].output;
      let lineIndex = 0;
      
      const printLine = () => {
        if (lineIndex < outputLines.length) {
          setHistory(prev => [...prev, outputLines[lineIndex]]);
          lineIndex++;
          timeout = setTimeout(printLine, Math.random() * 300 + 100);
        } else {
          timeout = setTimeout(() => {
            setCmdIndex(prev => (prev + 1) % COMMANDS.length);
            setCharIndex(0);
            setTyping(true);
            setHistory(prev => prev.length > 25 ? prev.slice(prev.length - 20) : prev);
          }, 2500);
        }
      };
      
      printLine();
    }
    
    return () => clearTimeout(timeout);
  }, [cmdIndex, charIndex, typing]);

  const currentCmd = COMMANDS[cmdIndex].cmd;
  const currentText = typing ? currentCmd.substring(0, charIndex) : '';

  return (
    <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-40 w-[350px] md:w-[480px] transition-all duration-300 pointer-events-auto shadow-[0_15px_60px_rgba(0,0,0,0.5)]">
      <div className="bg-[#080e1a]/80 backdrop-blur-xl border border-[#424855]/40 rounded-xl overflow-hidden flex flex-col transition-transform hover:-translate-y-2 duration-300">
        <div className="bg-[#131a28]/90 px-4 py-3 flex items-center border-b border-[#424855]/40 relative">
          <div className="flex gap-2 absolute left-4">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <span className="w-full text-center text-[11px] text-[#a6abbb] font-mono tracking-wider font-semibold">
            abhi@obsidian:~
          </span>
        </div>
        <div ref={scrollRef} className="p-4 h-[250px] overflow-y-auto font-mono text-xs md:text-sm flex flex-col gap-1.5 text-[#e0e5f6] terminal-scroll">
          {history.map((line, i) => (
            <div key={i} className={`whitespace-pre-wrap ${line.startsWith('➜') ? 'text-[#ff8d86] font-semibold mt-2' : 'text-[#a6abbb]'}`}>
              {line}
            </div>
          ))}
          {typing && (
            <div className="flex items-center text-[#ff8d86] mt-2 font-semibold">
              <span className="mr-2">➜</span>
              <span className="mr-2 text-[#a6abbb]">~</span>
              <span className="text-[#e0e5f6]">{currentText}</span>
              <span className="w-2 h-[15px] bg-[#e0e5f6] ml-1 animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
            </div>
          )}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .terminal-scroll::-webkit-scrollbar { width: 5px; }
        .terminal-scroll::-webkit-scrollbar-track { background: transparent; }
        .terminal-scroll::-webkit-scrollbar-thumb { background: rgba(66, 72, 85, 0.5); border-radius: 4px; }
        .terminal-scroll::-webkit-scrollbar-thumb:hover { background: rgba(144, 147, 255, 0.5); }
      `}} />
    </div>
  );
};

export default TerminalEngine;

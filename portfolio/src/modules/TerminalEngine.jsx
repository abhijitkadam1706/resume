import { useEffect, useRef, useState } from "react";

const MAX_HISTORY = 14;

const TerminalEngine = ({ scenarios }) => {
  const [history, setHistory] = useState([
    { type: "system", text: "Attached to platform runtime view." },
  ]);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, charIndex]);

  useEffect(() => {
    const activeScenario = scenarios[scenarioIndex];
    let timeoutId;

    if (typing) {
      if (charIndex < activeScenario.command.length) {
        timeoutId = setTimeout(() => {
          setCharIndex((current) => current + 1);
        }, 34);
      } else {
        timeoutId = setTimeout(() => {
          setHistory((current) =>
            [
              ...current,
              {
                type: "command",
                text: `$ ${activeScenario.command}`,
              },
            ].slice(-MAX_HISTORY),
          );
          setTyping(false);
        }, 280);
      }
    } else {
      let outputIndex = 0;

      const printNextLine = () => {
        if (outputIndex < activeScenario.output.length) {
          const line = activeScenario.output[outputIndex];
          setHistory((current) =>
            [...current, { type: "output", text: line }].slice(-MAX_HISTORY),
          );
          outputIndex += 1;
          timeoutId = setTimeout(printNextLine, 260);
          return;
        }

        timeoutId = setTimeout(() => {
          setScenarioIndex((current) => (current + 1) % scenarios.length);
          setCharIndex(0);
          setTyping(true);
        }, 2200);
      };

      printNextLine();
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, scenarioIndex, scenarios, typing]);

  return (
    <div className="pointer-events-none w-full max-w-[420px] pb-6">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#09101d]/60 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-white/10 bg-[#111a2a]/80 px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-[0.6rem] uppercase tracking-[0.3em] text-[#8e98b3]">
            Terminal
          </div>
        </div>

        <div
          ref={scrollRef}
          className="terminal-scroll flex h-[180px] flex-col gap-1.5 overflow-y-auto px-4 py-3 font-mono text-[0.65rem] leading-5 text-[#d4daee]"
        >
          {history.map((entry, index) => (
            <div
              key={`${entry.type}-${index}`}
              className={
                entry.type === "command"
                  ? "text-[#ffb8b2] font-semibold mt-1"
                  : entry.type === "system"
                    ? "text-[#8e98b3]"
                    : "text-[#d4daee]"
              }
            >
              {entry.text}
            </div>
          ))}

          {typing && (
            <div className="flex items-center text-[#ffb8b2] font-semibold mt-1">
              <span>$ {scenarios[scenarioIndex].command.slice(0, charIndex)}</span>
              <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-[#d4daee]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalEngine;

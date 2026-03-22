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
    <div className="pointer-events-none absolute bottom-8 left-5 hidden w-[380px] xl:block 2xl:w-[440px]">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#09101d]/78 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 bg-[#111a2a]/90 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-[0.65rem] uppercase tracking-[0.3em] text-[#8e98b3]">
            Runtime shell
          </div>
        </div>

        <div
          ref={scrollRef}
          className="terminal-scroll flex h-[260px] flex-col gap-2 overflow-y-auto px-4 py-4 font-mono text-[0.72rem] leading-6 text-[#d4daee]"
        >
          {history.map((entry, index) => (
            <div
              key={`${entry.type}-${index}`}
              className={
                entry.type === "command"
                  ? "text-[#ffb8b2]"
                  : entry.type === "system"
                    ? "text-[#8e98b3]"
                    : "text-[#d4daee]"
              }
            >
              {entry.text}
            </div>
          ))}

          {typing && (
            <div className="flex items-center text-[#ffb8b2]">
              <span>$ {scenarios[scenarioIndex].command.slice(0, charIndex)}</span>
              <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-[#d4daee]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalEngine;

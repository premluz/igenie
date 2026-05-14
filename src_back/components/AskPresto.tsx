import { Send, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAgentStore } from "@/store/useAgentStore";
import { useRef, useEffect, useState } from "react";
import genieIcon from "@/assets/genie.png";

export function AskPresto() {
  const { logs, thoughts, status, selectedInsight, runReasoning, toggleThought, addLog, addThought } = useAgentStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasInput, setHasInput] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, thoughts]);

  const handleAskPresto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("question") as HTMLInputElement;
    if (!input.value.trim()) return;

    const query = input.value;
    input.value = "";

    // Add user message
    addLog(`> ${query}`, "query");

    // Simulate thinking and reasoning
    addThought("Analyzing context", 142, [
      "Selected insight: " + (selectedInsight?.title || "None"),
      "Query: " + query,
      "Fetching related signals...",
    ]);

    await new Promise((res) => setTimeout(res, 1200));

    // Add reasoning steps
    addThought("Retrieving data sources", 234, [
      "Databricks Delta Lake: 45 seconds",
      "Signal convergence algorithm: 3.2 seconds",
      "Sentiment analysis: 1.8 seconds",
    ]);

    await new Promise((res) => setTimeout(res, 1200));

    addThought("Generating insight", 422, [
      "Multi-signal convergence detected",
      "Confidence score: 0.94",
      "Top 3 signals: social growth, retail movement, search acceleration",
      "Comparable trends: 12 historical matches",
    ]);

    addLog("insight_analysis_complete", "success");
  };

  return (
    <aside className="w-[420px] border-l border-border flex flex-col bg-background">
      {/* Header */}
      <div className="h-14 border-b border-border flex items-center px-6 bg-card/20">
        <span className="text-xs font-semibold cursor-pointer hover:text-accent transition-colors">Ask Presto</span>
      </div>

      {/* Reasoning Panel - Timeline */}
      <ScrollArea className="flex-1 bg-black/30 relative">
        <img
          src={genieIcon}
          alt="Genie"
          className={`size-full rounded-[inherit] transition-[color,box-shadow] outline-none opacity-10 absolute inset-0 object-contain pointer-events-none ${hasInput ? 'opacity-0' : 'opacity-10'}`}
          style={{ transition: 'opacity 200ms ease-out' }}
        />
        <div ref={scrollRef} className="space-y-0 relative pl-6 p-4">
          {/* Timeline line */}
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/40 via-blue-500/20 to-transparent" />

          {/* Logs as timeline items */}
          {logs.map((log, idx) => (
            <div key={log.id} className="relative py-2 group">
              {/* Timeline circle */}
              <div className={`absolute -left-3 top-3 w-2 h-2 rounded-full transition-all ${
                log.type === "success" ? "bg-green-500" : "bg-blue-500"
              }`} />

              {/* Log text */}
              <div className={`text-[10px] leading-relaxed font-mono ${
                log.type === "success" ? "text-green-500 font-bold" : "text-zinc-500"
              }`}>
                {log.text}
              </div>
            </div>
          ))}

          {/* Thoughts with reasoning */}
          {thoughts.map((thought, idx) => (
            <div key={thought.id} className="relative py-3 group">
              {/* Timeline circle - thinking state */}
              <div className="absolute -left-3 top-3 w-2 h-2 rounded-full bg-blue-500/80 animate-pulse" />

              {/* Thought button */}
              <button
                onClick={() => toggleThought(thought.id)}
                className="w-full text-left flex items-start gap-2 py-1 text-[10px] font-mono text-zinc-400 hover:text-zinc-300 transition-colors group/thought"
              >
                {/* Thought text and time */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{thought.text}</span>
                    <span className="text-blue-400/70 text-[9px]">{thought.tokens}s</span>
                  </div>
                </div>

                {/* Expand icon */}
                <ChevronDown
                  size={12}
                  className={`flex-shrink-0 text-blue-500/60 transition-transform group-hover/thought:text-blue-500 ${
                    thought.expanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Expanded reasoning */}
              {thought.expanded && (
                <div className="mt-2 ml-0 pl-3 border-l border-blue-500/30 space-y-1">
                  {thought.reasoning.map((line, idx) => (
                    <div key={idx} className="text-[9px] text-zinc-600 font-mono py-0.5">
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Thinking indicator */}
          {status === "thinking" && (
            <div className="relative py-2">
              <div className="absolute -left-3 top-1 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <div className="animate-pulse text-zinc-600 text-[10px] font-mono">Thinking...</div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="p-4 border-t border-border bg-background">
        <form onSubmit={handleAskPresto} className="relative">
          <Input
            ref={inputRef}
            name="question"
            placeholder="How can I help you today?"
            className="pr-10 bg-zinc-900 border-zinc-800 text-xs h-10 rounded-[4px]"
            onChange={(e) => setHasInput(!!e.currentTarget.value)}
          />
          <Button size="icon" variant="ghost" className="absolute right-1 top-1 h-8 w-8 text-muted-foreground">
            <Send size={14} />
          </Button>
        </form>
      </div>
    </aside>
  );
}

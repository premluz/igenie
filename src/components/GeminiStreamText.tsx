import React, { useState, useEffect, useRef } from "react";

interface GeminiStreamProps {
  text: string;
  speed?: number
  showCursor?: boolean
  className?: string
}

export const GeminiStreamText: React.FC<GeminiStreamProps> = ({
  text,
  speed = 12,
  showCursor = true,
  className = ""
}) => {
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const fullTextArray = useRef<string[]>([]);
  const currentIndex = useRef<number>(0);
  const rafId = useRef<number | null>(null);
  const lastFrameTime = useRef<number>(0);

  useEffect(() => {
    fullTextArray.current = text.split("");
    setDisplayedText([]);
    currentIndex.current = 0;
    lastFrameTime.current = performance.now();

    const streamEngine = (timestamp: number) => {
      const elapsed = timestamp - lastFrameTime.current;

      if (elapsed >= speed) {
        if (currentIndex.current < fullTextArray.current.length) {
          const nextChar = fullTextArray.current[currentIndex.current];
          setDisplayedText((prev) => [...prev, nextChar]);
          currentIndex.current++;
          lastFrameTime.current = timestamp;
        } else {
          if (rafId.current) cancelAnimationFrame(rafId.current);
          return;
        }
      }
      rafId.current = requestAnimationFrame(streamEngine);
    };

    rafId.current = requestAnimationFrame(streamEngine);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [text, speed]);

  return (
    <span className={`inline tracking-wide leading-relaxed ${className}`}>
      {displayedText.map((char, index) => (
        <span
          key={index}
          className="inline animate-gemini-fade"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </span>
      ))}
      {showCursor && (
        <span className="inline-block w-[2px] h-[1em] bg-accent ml-1 rounded-sm animate-pulse" />
      )}
    </span>
  );
};

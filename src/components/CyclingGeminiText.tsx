import React, { useState, useEffect } from "react";
import { GeminiStreamText } from "./GeminiStreamText";

interface CyclingGeminiTextProps {
  texts: string[];
  speed?: number;
  delayBetweenTexts?: number;
  className?: string;
  showCursor?: boolean;
  maxCycles?: number; // 0 = one-time pass (no cycling back), undefined = infinite, > 0 = cycle N times
  showEmptyOnEnd?: boolean; // Show empty space when cycling ends
  enableLinks?: boolean; // Parse [text](url) links and render with purple underline
  onLinkClick?: (href: string) => void; // Callback when link is clicked
}

// Parse markdown-style links [text](url) and HTML <a> tags, return JSX
const parseLinks = (text: string): (string | React.ReactNode)[] => {
  // Combined regex for markdown [text](url) and HTML <a href="">text</a>
  const markdownRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const htmlLinkRegex = /<a\s+href=["']([^"']*)["'][^>]*>([^<]+)<\/a>/g;

  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let matches: Array<{ index: number; end: number; type: 'markdown' | 'html'; linkText: string; url: string }> = [];

  // Find all markdown links
  let match;
  while ((match = markdownRegex.exec(text)) !== null) {
    matches.push({
      index: match.index,
      end: markdownRegex.lastIndex,
      type: 'markdown',
      linkText: match[1],
      url: match[2]
    });
  }

  // Find all HTML links
  while ((match = htmlLinkRegex.exec(text)) !== null) {
    matches.push({
      index: match.index,
      end: htmlLinkRegex.lastIndex,
      type: 'html',
      url: match[1],
      linkText: match[2]
    });
  }

  // Sort matches by index
  matches.sort((a, b) => a.index - b.index);

  // Build parts array
  matches.forEach((linkMatch, idx) => {
    // Add text before the link
    if (linkMatch.index > lastIndex) {
      parts.push(text.substring(lastIndex, linkMatch.index));
    }

    // Add the link
    parts.push(
      <a
        key={`link-${idx}`}
        href={linkMatch.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple underline hover:text-purple/80 transition-colors"
      >
        {linkMatch.linkText}
      </a>
    );

    lastIndex = linkMatch.end;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
};

export const CyclingGeminiText: React.FC<CyclingGeminiTextProps> = ({
  texts,
  speed = 12,
  delayBetweenTexts = 2000,
  className = "",
  showCursor = true,
  maxCycles = 0,
  showEmptyOnEnd = false,
  enableLinks = false,
  onLinkClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [isCyclingComplete, setIsCyclingComplete] = useState(false);

  useEffect(() => {
    // Check if we should continue cycling
    // maxCycles: 0 = one pass (no cycling), undefined/null = infinite, >0 = cycle that many times
    if (isCyclingComplete) return;
    const isInfinite = maxCycles === undefined || maxCycles === null;
    const shouldStop = !isInfinite && maxCycles > 0 && cycleCount >= maxCycles;

    const textLength = texts[currentIndex].length;
    const typingTime = textLength * speed;
    const totalDelay = typingTime + delayBetweenTexts;

    const timer = setTimeout(() => {
      // maxCycles=0: one pass only (no cycling back)
      // maxCycles=undefined/null: infinite cycling
      // maxCycles>0: cycle that many times then stop

      if (maxCycles === 0) {
        // One-time pass: go to next or complete (no cycling back)
        if (currentIndex < texts.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setKey((prev) => prev + 1);
        } else {
          // Reached last text, mark as complete
          setIsCyclingComplete(true);
        }
      } else {
        // Infinite or limited cycling - wrap around normally
        const nextIndex = (currentIndex + 1) % texts.length;
        setCurrentIndex(nextIndex);
        setKey((prev) => prev + 1);

        // Increment cycle count when wrapping back to start
        if (nextIndex === 0) {
          const newCycleCount = cycleCount + 1;
          setCycleCount(newCycleCount);

          // Mark as complete if we've reached max cycles (maxCycles > 0)
          if (maxCycles && maxCycles > 0 && newCycleCount >= maxCycles) {
            setIsCyclingComplete(true);
          }
        }
      }
    }, totalDelay);

    return () => clearTimeout(timer);
  }, [currentIndex, texts, speed, delayBetweenTexts, isCyclingComplete, maxCycles]);

  // If cycling is complete and not showing empty, show the last text
  const displayText = isCyclingComplete && !showEmptyOnEnd ? texts[currentIndex] : texts[currentIndex];

  return (
    <>
      {isCyclingComplete && showEmptyOnEnd ? (
        <span className={className}>&nbsp;</span>
      ) : enableLinks ? (
        <GeminiStreamText
          key={key}
          text={displayText}
          speed={speed}
          className={className}
          showCursor={!isCyclingComplete || !showEmptyOnEnd ? showCursor : false}
          renderLinks={true}
          onLinkClick={onLinkClick}
        />
      ) : (
        <GeminiStreamText
          key={key}
          text={displayText}
          speed={speed}
          className={className}
          showCursor={!isCyclingComplete || !showEmptyOnEnd ? showCursor : false}
          onLinkClick={onLinkClick}
        />
      )}
    </>
  );
};

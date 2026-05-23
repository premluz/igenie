import React, { useState, useEffect, useRef } from "react";

interface GeminiStreamProps {
  text: string;
  speed?: number
  showCursor?: boolean
  className?: string
  renderLinks?: boolean; // Parse and render links after streaming
  onLinkClick?: (href: string) => void; // Callback when link is clicked
}

// Parse markdown-style links [text](url) and HTML <a> tags
const parseLinksToJSX = (text: string, onLinkClick?: (href: string) => void): (string | React.ReactNode)[] => {
  const markdownRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const htmlLinkRegex = /<a\s+href=["']([^"']*)["'][^>]*>([^<]+)<\/a>/g;

  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let matches: Array<{ index: number; end: number; linkText: string; url: string }> = [];

  let match;
  while ((match = markdownRegex.exec(text)) !== null) {
    matches.push({
      index: match.index,
      end: markdownRegex.lastIndex,
      linkText: match[1],
      url: match[2]
    });
  }

  while ((match = htmlLinkRegex.exec(text)) !== null) {
    matches.push({
      index: match.index,
      end: htmlLinkRegex.lastIndex,
      url: match[1],
      linkText: match[2]
    });
  }

  matches.sort((a, b) => a.index - b.index);

  matches.forEach((linkMatch, idx) => {
    if (linkMatch.index > lastIndex) {
      parts.push(text.substring(lastIndex, linkMatch.index));
    }

    parts.push(
      <a
        key={`link-${idx}`}
        href={linkMatch.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple underline hover:text-purple/80 transition-colors"
        onClick={(e) => {
          if (onLinkClick) {
            e.preventDefault();
            onLinkClick(linkMatch.url);
          }
        }}
      >
        {linkMatch.linkText}
      </a>
    );

    lastIndex = linkMatch.end;
  });

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
};

export const GeminiStreamText: React.FC<GeminiStreamProps> = ({
  text,
  speed = 12,
  showCursor = true,
  className = "",
  renderLinks = false,
  onLinkClick
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

  // Get the fully streamed text
  const streamedText = displayedText.join("");
  const isFullyStreamed = streamedText.length === text.length;

  // If renderLinks is enabled and text is fully streamed, parse and show links
  if (renderLinks && isFullyStreamed) {
    const parsedLinks = parseLinksToJSX(streamedText, onLinkClick);
    return (
      <span className={`inline tracking-wide leading-relaxed ${className}`}>
        {parsedLinks}
        {showCursor && (
          <span className="inline-block w-[2px] h-[1em] bg-accent ml-1 rounded-sm animate-pulse" />
        )}
      </span>
    );
  }

  // Default: show animated streaming text
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

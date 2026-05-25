import React, { useState, useEffect, useRef } from "react";

interface GeminiStreamProps {
  text: string;
  speed?: number
  showCursor?: boolean
  className?: string
  renderLinks?: boolean;
  onLinkClick?: (href: string) => void;
}

type ContentSegment =
  | { type: 'text'; content: string }
  | { type: 'link'; url: string; text: string };

// Parse text into segments: text parts and links
const parseIntoSegments = (text: string): ContentSegment[] => {
  const markdownRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const htmlLinkRegex = /<a\s+href=["']([^"']*)["'][^>]*>([^<]+)<\/a>/g;

  const segments: ContentSegment[] = [];
  let lastIndex = 0;
  let matches: Array<{ index: number; end: number; type: 'markdown' | 'html'; linkText: string; url: string }> = [];

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

  while ((match = htmlLinkRegex.exec(text)) !== null) {
    matches.push({
      index: match.index,
      end: htmlLinkRegex.lastIndex,
      type: 'html',
      linkText: match[2],
      url: match[1]
    });
  }

  matches.sort((a, b) => a.index - b.index);

  matches.forEach((linkMatch) => {
    if (linkMatch.index > lastIndex) {
      segments.push({
        type: 'text',
        content: text.substring(lastIndex, linkMatch.index)
      });
    }

    segments.push({
      type: 'link',
      url: linkMatch.url,
      text: linkMatch.linkText
    });

    lastIndex = linkMatch.end;
  });

  if (lastIndex < text.length) {
    segments.push({
      type: 'text',
      content: text.substring(lastIndex)
    });
  }

  return segments.length > 0 ? segments : [{ type: 'text', content: text }];
};

export const GeminiStreamText: React.FC<GeminiStreamProps> = ({
  text,
  speed = 12,
  showCursor = true,
  className = "",
  renderLinks = false,
  onLinkClick
}) => {
  const [displayedChars, setDisplayedChars] = useState<number>(0);
  const fullTextLength = useRef<number>(text.length);
  const rafId = useRef<number | null>(null);
  const lastFrameTime = useRef<number>(0);
  const segments = useRef<ContentSegment[]>([]);

  useEffect(() => {
    segments.current = renderLinks ? parseIntoSegments(text) : [{ type: 'text', content: text }];
    fullTextLength.current = text.length;
    setDisplayedChars(0);
    lastFrameTime.current = performance.now();

    const streamEngine = (timestamp: number) => {
      const elapsed = timestamp - lastFrameTime.current;

      if (elapsed >= speed) {
        setDisplayedChars((prev) => {
          const next = prev + 1;
          if (next >= fullTextLength.current) {
            if (rafId.current) cancelAnimationFrame(rafId.current);
            return fullTextLength.current;
          }
          return next;
        });
        lastFrameTime.current = timestamp;
      }
      if (displayedChars < fullTextLength.current) {
        rafId.current = requestAnimationFrame(streamEngine);
      }
    };

    rafId.current = requestAnimationFrame(streamEngine);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [text, speed, renderLinks]);

  // Render segments with streaming text
  const renderContent = () => {
    if (!renderLinks) {
      // No link rendering: stream plain text
      return text.split("").slice(0, displayedChars).map((char, index) => (
        <span
          key={index}
          className="inline animate-gemini-fade"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </span>
      ));
    }

    // With link rendering: render segments with text parts streamed and links shown immediately
    const content: React.ReactNode[] = [];
    let charCount = 0;
    let linkIdx = 0;

    for (const segment of segments.current) {
      if (segment.type === 'text') {
        const textLength = segment.content.length;
        const endChar = charCount + textLength;

        if (charCount >= displayedChars) {
          // Haven't reached this text yet
          break;
        }

        const displayUntil = Math.min(displayedChars, endChar);
        const displayedText = segment.content.substring(0, displayUntil - charCount);

        displayedText.split("").forEach((char, idx) => {
          content.push(
            <span
              key={`text-${charCount}-${idx}`}
              className="inline animate-gemini-fade"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </span>
          );
        });

        charCount = endChar;
      } else {
        // Link segment: always show if we've streamed past the start of this link
        if (displayedChars > charCount) {
          content.push(
            <a
              key={`link-${linkIdx}`}
              href={segment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple underline hover:text-purple/80 transition-colors"
              onClick={(e) => {
                if (onLinkClick) {
                  e.preventDefault();
                  onLinkClick(segment.url);
                }
              }}
            >
              {segment.text}
            </a>
          );
          charCount += segment.text.length;
        }
        linkIdx++;
      }
    }

    return content;
  };

  return (
    <span className={`inline tracking-wide leading-relaxed ${className}`}>
      {renderContent()}
      {showCursor && (
        <span className="inline-block w-[2px] h-[1em] bg-accent ml-1 rounded-sm animate-pulse" />
      )}
    </span>
  );
};

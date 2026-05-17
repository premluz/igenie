import React, { useState, useEffect } from "react";
import { GeminiStreamText } from "./GeminiStreamText";

interface CyclingGeminiTextProps {
  texts: string[];
  speed?: number;
  delayBetweenTexts?: number;
  className?: string;
  showCursor?: boolean;
}

export const CyclingGeminiText: React.FC<CyclingGeminiTextProps> = ({
  texts,
  speed = 12,
  delayBetweenTexts = 2000,
  className = "",
  showCursor = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const textLength = texts[currentIndex].length;
    const typingTime = textLength * speed;
    const totalDelay = typingTime + delayBetweenTexts;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
      setKey((prev) => prev + 1);
    }, totalDelay);

    return () => clearTimeout(timer);
  }, [currentIndex, texts, speed, delayBetweenTexts]);

  return (
    <GeminiStreamText
      key={key}
      text={texts[currentIndex]}
      speed={speed}
      className={className}
      showCursor={showCursor}
    />
  );
};

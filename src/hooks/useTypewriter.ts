import { useState, useEffect } from 'react'

interface TypewriterOptions {
  texts: string[]
  speed?: number
  backspaceSpeed?: number
  delayBetweenTexts?: number
  loop?: boolean
}

export function useTypewriter({
  texts,
  speed = 50,
  backspaceSpeed = 30,
  delayBetweenTexts = 2000,
  loop = true
}: TypewriterOptions) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const currentText = texts[currentIndex]
    let timeout: NodeJS.Timeout

    if (isTyping) {
      // Typing phase
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        }, speed)
      } else {
        // Finished typing, wait before backspacing
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, delayBetweenTexts)
      }
    } else {
      // Backspacing phase
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, backspaceSpeed)
      } else {
        // Finished backspacing, move to next text
        if (loop) {
          setCurrentIndex((currentIndex + 1) % texts.length)
          setIsTyping(true)
        }
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isTyping, currentIndex, texts, speed, backspaceSpeed, delayBetweenTexts, loop])

  return displayText
}

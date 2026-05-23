import { useEffect, useRef, useState } from 'react'

interface UseInViewAnimationOptions {
  threshold?: number
  rootMargin?: string
  delay?: number // Delay in ms before animation starts after becoming visible
}

export function useInViewAnimation({
  threshold = 0.1,
  rootMargin = '0px',
  delay = 0
}: UseInViewAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimatedRef.current) {
        hasAnimatedRef.current = true

        // Apply delay before triggering animation
        if (delay > 0) {
          const timer = setTimeout(() => {
            setIsVisible(true)
          }, delay)
          return () => clearTimeout(timer)
        } else {
          setIsVisible(true)
        }
      }
    }, {
      threshold,
      rootMargin
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, rootMargin, delay])

  return { ref, isVisible }
}

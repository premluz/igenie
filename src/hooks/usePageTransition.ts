import { useEffect, useCallback, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { usePrestoStore } from '@/store/usePrestoStore'

export function usePageTransition() {
  const navigate = useNavigate()
  const location = useLocation()
  const { enablePageTransition, setIsPageTransitioning } = usePrestoStore()
  const pendingNavigationRef = useRef<string | null>(null)

  const performNavigation = useCallback((path: string) => {
    setIsPageTransitioning(false)
    navigate(path)
  }, [navigate, setIsPageTransitioning])

  const navigateWithTransition = useCallback((path: string) => {
    if (!enablePageTransition) {
      navigate(path)
      return
    }

    pendingNavigationRef.current = path
    setIsPageTransitioning(true)

    // Animation will complete in 1.2 seconds (see PageTransitionOverlay)
    const timer = setTimeout(() => {
      performNavigation(path)
    }, 1200)

    return () => clearTimeout(timer)
  }, [enablePageTransition, navigate, setIsPageTransitioning, performNavigation])

  return {
    navigateWithTransition,
    performNavigation
  }
}

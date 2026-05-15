import { useEffect } from 'react'
import { usePrestoStore } from '@/store/usePrestoStore'
import { scenarioMap } from '@/scenarios'

let initialLoadDone = false

export function useViewSync() {
  const { viewStack, currentView, loadScenarioDetail, clearCanvas } = usePrestoStore()

  // Handle initial URL on first mount
  useEffect(() => {
    if (initialLoadDone) return
    initialLoadDone = true

    const segments = window.location.pathname
      .split('/')
      .filter(Boolean)

    if (segments.length > 0) {
      const [scenarioId] = segments
      const scenario = scenarioMap[scenarioId as keyof typeof scenarioMap]
      if (scenario) {
        loadScenarioDetail(scenarioId)
      }
    }
  }, [loadScenarioDetail])

  // Store → URL: serialize viewStack to URL path (only after initial load)
  useEffect(() => {
    if (!initialLoadDone) return

    const segments = viewStack
      .filter(v => v.scenarioId)
      .map(v => v.scenarioId)

    if (currentView?.scenarioId && !segments.includes(currentView.scenarioId)) {
      segments.push(currentView.scenarioId)
    }

    const path = segments.length > 0 ? '/' + segments.join('/') : '/'
    if (window.location.pathname !== path) {
      window.history.pushState({ viewStack, currentView }, '', path)
    }
  }, [viewStack, currentView])

  // Browser back/forward → Store: restore from popstate
  useEffect(() => {
    const handler = (e: PopStateEvent) => {
      if (e.state?.viewStack && e.state?.currentView) {
        usePrestoStore.setState({
          viewStack: e.state.viewStack,
          currentView: e.state.currentView
        })
      } else {
        clearCanvas()
      }
    }

    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [clearCanvas])
}

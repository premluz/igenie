import { useCallback } from 'react'
import { usePrestoStore } from '@/store/usePrestoStore'
import { getScenario } from '@/scenarios'
import type { ScenarioTrigger } from '@/scenarios/types'

export interface ScenarioTransition {
  matched: boolean
  nextScenarioId?: string
  delay?: number
  loadingMessages?: any
}

export function useScenarioDetection() {
  const { loadScenarioDetail, currentView } = usePrestoStore()

  const detectScenarioTransition = useCallback((input: string): ScenarioTransition => {
    if (!input.trim()) return { matched: false }

    const lowerInput = input.toLowerCase().trim()

    // Get current scenario's triggers from the view data
    const triggers = (currentView as any)?.scenarioTriggers as ScenarioTrigger[] | undefined

    console.log('[ScenarioDetection] Input:', input)
    console.log('[ScenarioDetection] Current View ID:', currentView?.id)
    console.log('[ScenarioDetection] Triggers:', triggers)

    if (!triggers || triggers.length === 0) {
      console.log('[ScenarioDetection] No triggers found')
      return { matched: false }
    }

    // Check each trigger from current scenario
    for (const trigger of triggers) {
      for (const keyword of trigger.keywords) {
        if (lowerInput.includes(keyword)) {
          console.log('[ScenarioDetection] Match found! Keyword:', keyword, 'Next scenario:', trigger.nextScenarioId)

          // Get the NEW scenario's loadingDelay and loadingMessages
          const nextScenario = getScenario(trigger.nextScenarioId)
          const delay = nextScenario?.loadingDelay || 5000
          const loadingMessages = nextScenario?.loadingMessages

          return {
            matched: true,
            nextScenarioId: trigger.nextScenarioId,
            delay,
            loadingMessages
          }
        }
      }
    }

    console.log('[ScenarioDetection] No keyword match')
    return { matched: false }
  }, [currentView])

  // Load scenario data without navigating
  const transitionToScenario = useCallback((scenarioId: string, delay: number) => {
    const { setTransitioning, revealCellsGradually, revealCells } = usePrestoStore.getState()

    // Show loading state immediately and load the new view so cells start in 'thinking'
    setTransitioning(true)
    loadScenarioDetail(scenarioId)

    // Start revealing cells gradually at the halfway point
    setTimeout(() => {
      revealCellsGradually(delay / 2)
    }, delay / 2)

    // After delay, ensure all cells are revealed and stop transitioning
    setTimeout(() => {
      revealCells()
      setTransitioning(false)
    }, delay)
  }, [loadScenarioDetail])

  return {
    detectScenarioTransition,
    transitionToScenario
  }
}

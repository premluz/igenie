import { type Row } from '@/store/usePrestoStore'

export interface ScenarioTrigger {
  keywords: string[]
  nextScenarioId: string
}

export interface LoadingMessageCategory {
  header: string
  header_done: string
  texts?: string[]
}

export interface LoadingMessages {
  [key: string]: LoadingMessageCategory | string
  summary: string
}

export interface ScenarioData {
  id: string
  brand: string
  category: string
  title: string
  description: string
  date: string
  velocityScore: number
  sentimentScore: number
  sparklineData?: number[]
  signals: Array<{
    id: string
    name: string
    icon: 'radio' | 'flame' | 'trending' | 'activity' | 'search'
    velocity: number
    sentiment: number
    trend: 'rising' | 'stable' | 'falling'
    description?: string
  }>
  initialLayout: Array<Omit<Row, 'id'>>
  chartData: Record<string, unknown>
  narratives: Record<string, string>
  logs?: Record<string, string[]>
  scenarioTriggers?: ScenarioTrigger[]
  animationSpeed?: {
    title?: number
    description?: number
  }
  loadingDelay?: number
  loadingMessages?: LoadingMessages
}

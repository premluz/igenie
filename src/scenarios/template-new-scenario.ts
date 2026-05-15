import { type Row } from '@/store/usePrestoStore'

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
}

export const newScenario: ScenarioData = {
  id: 'new-scenario-2026',
  brand: 'Your Brand Name',
  category: 'Your Category',
  title: 'Your Insight Title',
  description: 'Your insight description that appears in listings',
  date: '2026-05-14',
  velocityScore: 8.5,
  sentimentScore: 85,

  signals: [
    {
      id: 'sig-1',
      name: 'Signal 1',
      icon: 'radio',
      velocity: 8.5,
      sentiment: 85,
      trend: 'rising',
      description: 'Your signal description'
    }
  ],

  initialLayout: [
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Executive Summary',
          subtitle: '',
          data: 'Your narrative text here'
        }
      ]
    }
  ],

  chartData: {
    'Monthly Revenue': [
      { date: '2024-01-01', volume: 650, sentiment: 100 },
      { date: '2024-02-01', volume: 580, sentiment: 97 }
    ]
  },

  narratives: {
    'Your Insight Title': 'Your narrative content'
  }
}

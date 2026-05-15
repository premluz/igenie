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

export const cucumberMint: ScenarioData = {
  id: 'cucumber-mint-2026',
  brand: 'Premium Beverage Brand',
  category: 'Wellness Beverages',
  title: '"Cucumber Mint" flavor adoption accelerating in wellness beverages',
  description: 'No major competitor has launched a dedicated SKU',
  date: '2026-05-13',
  velocityScore: 8.8,
  sentimentScore: 87,

  signals: [
    {
      id: 'sig-1',
      name: 'Social Buzz',
      icon: 'radio',
      velocity: 8.9,
      sentiment: 87,
      trend: 'rising'
    },
    {
      id: 'sig-2',
      name: 'Retail Movement',
      icon: 'trending',
      velocity: 8.4,
      sentiment: 84,
      trend: 'rising'
    },
    {
      id: 'sig-3',
      name: 'Search Acceleration',
      icon: 'search',
      velocity: 9.1,
      sentiment: 89,
      trend: 'rising'
    }
  ],

  initialLayout: [
    // Row 1: Signal Strength + Signal Trust (2 columns)
    {
      columns: 2,
      cells: [
        {
          id: '',
          type: 'kpi',
          status: 'ready',
          title: 'Signal strength',
          subtitle: 'Consumer demand for cucumber-mint beverages is accelerating across all channels with strong multi-signal convergence.',
          data: {
            value: '8.8',
            unit: 'velocity score',
            extra: 'Strong multi-signal convergence across social growth, retail movement, and search acceleration.',
            sparkline: [
              { date: '2026-04-01', score: 6.2 },
              { date: '2026-04-08', score: 6.8 },
              { date: '2026-04-15', score: 7.1 },
              { date: '2026-04-22', score: 7.6 },
              { date: '2026-04-29', score: 8.1 },
              { date: '2026-05-06', score: 8.4 },
              { date: '2026-05-13', score: 8.8 }
            ]
          }
        },
        {
          id: '',
          type: 'kpi',
          status: 'ready',
          title: 'Signal trust',
          subtitle: 'Verification confidence',
          data: {
            value: '87%',
            unit: 'confidence',
            extra: 'Verified through Databricks Gold Layer consistency and multi-source validation.',
            sparkline: [
              { date: '2026-04-01', score: 72 },
              { date: '2026-04-08', score: 74 },
              { date: '2026-04-15', score: 76 },
              { date: '2026-04-22', score: 79 },
              { date: '2026-04-29', score: 83 },
              { date: '2026-05-06', score: 85 },
              { date: '2026-05-13', score: 87 }
            ]
          }
        }
      ]
    },

    // Row 2: Executive Summary, Business Implications, Action Recommendations (3 columns)
    {
      columns: 3,
      cells: [
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Executive summary',
          subtitle: '',
          data: 'Consumer interest in cucumber-mint flavored beverages accelerated significantly over the last 90 days, driven primarily by wellness-oriented Gen Z audiences and premium retail channels.\n\nThe trend shows:\n• strong social acceleration\n• increasing retail sell-through\n• rising search demand\n• and low incumbent competition\n\nCurrent adoption remains early-stage but demonstrates characteristics consistent with emerging functional beverage trends that later reached mainstream penetration.'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Business implications',
          subtitle: '',
          data: '• Potential whitespace in premium hydration segment\n• Opportunity for limited-edition launches in high-awareness markets\n• Particularly relevant for urban premium retail channels\n• E-commerce-first launch may outperform mass retail rollout\n• First-mover advantage window closing as larger players evaluate category'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Action recommendations',
          subtitle: '',
          data: '• Launch limited-edition SKU in Q2 2026 focusing on urban premium retail\n• Allocate 40% of budget to Gen Z social marketing and influencer partnerships\n• Test premium pricing at $5.99/bottle in e-commerce channels\n• Monitor competitor response signals monthly\n• Plan larger rollout if awareness exceeds 35% in target demographic by Q3'
        }
      ]
    },

    // Row 3: Signal Sources (full width)
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'table',
          status: 'ready',
          title: 'Signal sources',
          subtitle: '1234 data points tracked',
          data: null
        }
      ]
    },

    // Row 4: H2 Header - Financial Performance
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Financial Performance',
          subtitle: '',
          data: null
        }
      ]
    },

    // Row 5: Monthly Revenue Chart + Quarterly Pipeline (2 columns)
    {
      columns: 2,
      cells: [
        {
          id: '',
          type: 'combo-chart',
          status: 'ready',
          title: 'Monthly Revenue',
          subtitle: 'Stacked by segment with target overlay',
          data: null
        },
        {
          id: '',
          type: 'combo-chart',
          status: 'ready',
          title: 'Quarterly Pipeline',
          subtitle: 'By opportunity type',
          data: null
        }
      ]
    },

    // Row 6: Additional Analysis Charts (2 columns)
    {
      columns: 2,
      cells: [
        {
          id: '',
          type: 'radar-chart',
          status: 'ready',
          title: 'Market Segment Analysis',
          subtitle: 'Dimension scoring across channels',
          data: null
        },
        {
          id: '',
          type: 'diverging-bar',
          status: 'ready',
          title: 'Positive vs Negative Indicators',
          subtitle: 'By market segment',
          data: null
        }
      ]
    }
  ],

  chartData: {
    'Monthly Revenue': [
      { date: '2024-01-01', volume: 650, sentiment: 100 },
      { date: '2024-02-01', volume: 580, sentiment: 97 },
      { date: '2024-03-01', volume: 700, sentiment: 108 },
      { date: '2024-04-01', volume: 1100, sentiment: 122 },
      { date: '2024-05-01', volume: 1200, sentiment: 126 },
      { date: '2024-06-01', volume: 1150, sentiment: 115 },
      { date: '2024-07-01', volume: 1300, sentiment: 118 },
      { date: '2024-08-01', volume: 1400, sentiment: 117 },
      { date: '2024-09-01', volume: 1350, sentiment: 108 },
      { date: '2024-10-01', volume: 1600, sentiment: 114 },
      { date: '2024-11-01', volume: 1550, sentiment: 107 },
      { date: '2024-12-01', volume: 1900, sentiment: 112 }
    ],

    'Quarterly Pipeline': [
      { date: '2024-Q1', volume: 1930, sentiment: 100 },
      { date: '2024-Q2', volume: 3850, sentiment: 110 },
      { date: '2024-Q3', volume: 3000, sentiment: 94 },
      { date: '2024-Q4', volume: 4500, sentiment: 106 }
    ],

    'Market Segment Analysis': [
      { dimension: 'Urban Premium', value: 89, max: 100 },
      { dimension: 'Gen Z Adoption', value: 87, max: 100 },
      { dimension: 'E-commerce Strength', value: 92, max: 100 },
      { dimension: 'Retail Velocity', value: 84, max: 100 },
      { dimension: 'Social Sentiment', value: 86, max: 100 },
      { dimension: 'Competitive Threat', value: 34, max: 100 }
    ],

    'Positive vs Negative Indicators': [
      { driver: 'Social Acceleration', positive: 3200, negative: -120 },
      { driver: 'Retail Sell-through', positive: 2800, negative: -200 },
      { driver: 'Search Demand', positive: 3100, negative: -150 },
      { driver: 'Competitor Activity', positive: 600, negative: -2100 },
      { driver: 'Price Acceptance', positive: 2400, negative: -300 },
      { driver: 'Distribution Gaps', positive: 1800, negative: -900 }
    ]
  },

  narratives: {
    '"Cucumber Mint" flavor adoption accelerating in wellness beverages':
      'Consumer demand for cucumber-mint beverages is accelerating across all channels with strong multi-signal convergence.'
  }
}

export const scenarios = {
  'cucumber-mint': cucumberMint
}

import { type Row, type PrestoStore } from '@/store/usePrestoStore'

/**
 * Neutrogena Natural Beauty Trend Scenario
 * Insight: Rising consumer interest in clean, natural skincare
 * Signal convergence across social buzz, retail movement, and search acceleration
 */

export interface ScenarioData {
  id: string
  brand: string
  category: string
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
  logs: Record<string, string[]>
}

export const neutroGenaNatural: ScenarioData = {
  id: 'neutrogena-natural-2026',
  brand: 'Neutrogena',
  category: 'Skincare',
  title: 'Clean Beauty Acceleration — Neutrogena Natural Product Line',
  description: 'Rising consumer interest in clean, natural skincare across all channels',

  // Signals that Presto identified
  signals: [
    {
      id: 'sig-1',
      name: 'Clean Beauty Buzz',
      icon: 'radio',
      velocity: 9.2,
      sentiment: 84,
      trend: 'rising',
      description: 'Social mentions of "clean," "natural," "non-toxic" skincare accelerating'
    },
    {
      id: 'sig-2',
      name: 'Retail Velocity',
      icon: 'trending',
      velocity: 7.8,
      sentiment: 76,
      trend: 'rising',
      description: 'Neutrogena Ultra Gentle line sell-through up 34% vs. last quarter'
    },
    {
      id: 'sig-3',
      name: 'Search Demand',
      icon: 'search',
      velocity: 8.5,
      sentiment: 79,
      trend: 'rising',
      description: '"Neutrogena natural ingredients" queries up 156% YoY'
    },
    {
      id: 'sig-4',
      name: 'Influencer Activity',
      icon: 'activity',
      velocity: 6.9,
      sentiment: 88,
      trend: 'rising',
      description: 'Clean beauty creators mentioning brand 4x more this quarter'
    },
    {
      id: 'sig-5',
      name: 'CX Sentiment',
      icon: 'flame',
      velocity: 7.2,
      sentiment: 82,
      trend: 'stable',
      description: 'Customer reviews emphasize "gentle" and "minimal ingredients"'
    }
  ],

  // Canvas layout - rows with cells
  initialLayout: [
    // Row 1: Narrative intro (full width)
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Clean Beauty Acceleration',
          subtitle: 'Neutrogena Natural Product Line',
          data: 'Consumer demand for clean, natural skincare is accelerating across all channels. Search volume for natural ingredients is up 156% YoY. Retail sell-through of the Ultra Gentle line grew 34% last quarter. Social buzz and influencer activity show strong positive sentiment (84-88%) around clean beauty positioning.'
        }
      ]
    },

    // Row 2: KPI cards (2 columns)
    {
      columns: 2,
      cells: [
        {
          id: '',
          type: 'kpi',
          status: 'ready',
          title: 'Search Growth',
          subtitle: 'Year-over-year',
          data: {
            value: '+156%',
            unit: 'natural skincare queries',
            sparkline: [
              { date: '2025-11-01', score: 45 },
              { date: '2025-12-01', score: 62 },
              { date: '2026-01-01', score: 78 },
              { date: '2026-02-01', score: 95 },
              { date: '2026-03-01', score: 125 },
              { date: '2026-04-01', score: 145 },
              { date: '2026-05-01', score: 156 }
            ]
          }
        },
        {
          id: '',
          type: 'kpi',
          status: 'ready',
          title: 'Retail Velocity',
          subtitle: 'Ultra Gentle line',
          data: {
            value: '+34%',
            unit: 'sell-through vs Q3',
            sparkline: [
              { date: '2025-11-01', score: 8 },
              { date: '2025-12-01', score: 12 },
              { date: '2026-01-01', score: 16 },
              { date: '2026-02-01', score: 22 },
              { date: '2026-03-01', score: 28 },
              { date: '2026-04-01', score: 31 },
              { date: '2026-05-01', score: 34 }
            ]
          }
        }
      ]
    },

    // Row 3: Charts (2 columns)
    {
      columns: 2,
      cells: [
        {
          id: '',
          type: 'combo-chart',
          status: 'ready',
          title: 'Search Volume & Sentiment Trend',
          subtitle: 'Last 90 days',
          data: null
        },
        {
          id: '',
          type: 'radar-chart',
          status: 'ready',
          title: 'Brand Sentiment Profile',
          subtitle: 'Dimensions vs. competitive set',
          data: null
        }
      ]
    },

    // Row 4: More charts (2 columns)
    {
      columns: 2,
      cells: [
        {
          id: '',
          type: 'diverging-bar',
          status: 'ready',
          title: 'Positive vs Negative Drivers',
          subtitle: 'From customer reviews',
          data: null
        },
        {
          id: '',
          type: 'table',
          status: 'ready',
          title: 'Retail Channel Performance',
          subtitle: 'Sell-through by channel and segment',
          data: null
        }
      ]
    },

    // Row 5: Action narrative (full width)
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Recommended Actions',
          subtitle: 'Capitalize on clean beauty trend',
          data: '1. Amplify "natural ingredients" messaging across digital channels — search demand is highest leverage opportunity\n\n2. Increase allocation to Ultra Gentle line — retail velocity and consumer sentiment are both strong signals\n\n3. Partner with 10-15 mid-tier clean beauty influencers — high engagement in this cohort, authenticity > reach\n\n4. Launch limited-edition natural variant SKU Q2 2026 — window of opportunity before category commoditizes\n\n5. Test premium pricing on clean line — sentiment data shows consumers willing to pay for "natural" positioning'
        }
      ]
    }
  ],

  // Chart data keyed by cell title
  chartData: {
    'Search Volume & Sentiment Trend': [
      { date: '2026-02-15', volume: 3200, sentiment: 72 },
      { date: '2026-02-22', volume: 3650, sentiment: 74 },
      { date: '2026-03-01', volume: 4100, sentiment: 76 },
      { date: '2026-03-08', volume: 4800, sentiment: 78 },
      { date: '2026-03-15', volume: 5600, sentiment: 81 },
      { date: '2026-03-22', volume: 6200, sentiment: 82 },
      { date: '2026-03-29', volume: 7100, sentiment: 84 },
      { date: '2026-04-05', volume: 8200, sentiment: 86 },
      { date: '2026-04-12', volume: 8900, sentiment: 87 }
    ],

    'Brand Sentiment Profile': [
      { dimension: 'Natural Ingredients', value: 88, max: 100 },
      { dimension: 'Gentle Formulation', value: 85, max: 100 },
      { dimension: 'Efficacy', value: 76, max: 100 },
      { dimension: 'Value for Money', value: 72, max: 100 },
      { dimension: 'Brand Trust', value: 79, max: 100 },
      { dimension: 'Availability', value: 74, max: 100 }
    ],

    'Positive vs Negative Drivers': [
      { driver: 'Natural/Minimal Ingredients', positive: 2400, negative: -120 },
      { driver: 'Gentle on Skin', positive: 2100, negative: -180 },
      { driver: 'Hypoallergenic', positive: 1800, negative: -240 },
      { driver: 'Price Point', positive: 900, negative: -680 },
      { driver: 'Product Range', positive: 1200, negative: -420 },
      { driver: 'Availability in Stores', positive: 1400, negative: -360 }
    ],

    'Retail Channel Performance': {
      columns: [
        { key: 'channel', label: 'Channel' },
        { key: 'ultra_gentle_sales', label: 'Ultra Gentle Sales ($M)' },
        { key: 'growth_pct', label: 'Growth %' },
        { key: 'market_share', label: 'Market Share' },
        { key: 'sentiment', label: 'Customer Sentiment' }
      ],
      rows: [
        {
          channel: 'Amazon',
          ultra_gentle_sales: 2.4,
          growth_pct: 47,
          market_share: '28%',
          sentiment: '88%'
        },
        {
          channel: 'Target',
          ultra_gentle_sales: 1.8,
          growth_pct: 34,
          market_share: '18%',
          sentiment: '82%'
        },
        {
          channel: 'Walmart',
          ultra_gentle_sales: 2.1,
          growth_pct: 28,
          market_share: '22%',
          sentiment: '79%'
        },
        {
          channel: 'Sephora',
          ultra_gentle_sales: 1.2,
          growth_pct: 52,
          market_share: '16%',
          sentiment: '91%'
        },
        {
          channel: 'Direct (e-commerce)',
          ultra_gentle_sales: 0.8,
          growth_pct: 68,
          market_share: '11%',
          sentiment: '86%'
        },
        {
          channel: 'Specialty Beauty',
          ultra_gentle_sales: 0.7,
          growth_pct: 41,
          market_share: '8%',
          sentiment: '84%'
        }
      ],
      features: {
        sorting: true,
        columnFilters: ['channel'],
        pagination: { pageSize: 10 },
        virtualise: false
      }
    }
  },

  // Narrative text blocks
  narratives: {
    'Clean Beauty Acceleration':
      'Consumer demand for clean, natural skincare is accelerating across all channels. Search volume for natural ingredients is up 156% YoY. Retail sell-through of the Ultra Gentle line grew 34% last quarter. Social buzz and influencer activity show strong positive sentiment (84-88%) around clean beauty positioning.',

    'Recommended Actions':
      '1. Amplify "natural ingredients" messaging across digital channels — search demand is highest leverage opportunity\n\n2. Increase allocation to Ultra Gentle line — retail velocity and consumer sentiment are both strong signals\n\n3. Partner with 10-15 mid-tier clean beauty influencers — high engagement in this cohort, authenticity > reach\n\n4. Launch limited-edition natural variant SKU Q2 2026 — window of opportunity before category commoditizes\n\n5. Test premium pricing on clean line — sentiment data shows consumers willing to pay for "natural" positioning'
  },

  // Reasoning logs per signal (shown when Presto reasons about this scenario)
  logs: {
    'Clean Beauty Acceleration': [
      'Fetching Databricks Delta Lake: consumer search patterns...',
      'Querying: "clean beauty", "natural skincare", "minimal ingredients" — last 12 months',
      'Signal convergence: +156% YoY search growth detected',
      'Cross-referencing retail velocity data from Nielsen...',
      'Ultra Gentle line: +34% sell-through vs. baseline',
      'Analyzing social sentiment: 7.2M mentions in past 90 days',
      'Positive sentiment: 84% average (vs 68% category baseline)',
      'Influencer clustering: 340 creators in clean beauty cohort mentioning brand',
      'Sentiment synthesis complete: HIGH CONFIDENCE signal'
    ],

    'Recommended Actions': [
      'Analyzing: Which actions maximize signal strength?',
      'Search demand: Highest velocity, highest ROI potential',
      'Retail: Strong signal + operational feasibility',
      'Influencer partnerships: High sentiment, authentic engagement',
      'Product: Limited edition reduces supply risk while testing positioning',
      'Pricing test: Validate willingness-to-pay thesis',
      'Priority ranking: Economic impact + confidence level',
      'Action plan synthesized'
    ]
  }
}

// Export as scenario map
export const scenarios = {
  'neutrogena-natural': neutroGenaNatural
}

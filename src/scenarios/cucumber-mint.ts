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
  scenarioTriggers?: ScenarioTrigger[]
  animationSpeed?: {
    title?: number
    description?: number
  }
  loadingDelay?: number
  loadingMessages?: LoadingMessages
}

export const cucumberMint: ScenarioData = {
  id: 'cucumber-mint-2026',
  brand: 'Premium Beverage Brand',
  category: 'Wellness Beverages',
  title: 'Clean Beauty Acceleration — Cucumber Mint Product Line',
  description: 'Rising consumer interest in natural skincare across all channels',
  date: '2026-05-13',
  velocityScore: 8.8,
  sentimentScore: 87,
  sparklineData: [2, 3, 2, 4, 3, 5, 9],

  
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
    // Row 1: Signal metrics (3 columns) - Trend, Strength, Trust
    // Row 2: Heading
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'header',
          status: 'ready',
          title: 'Insight validation',
          data: null
        }
      ]
    },
    {
      columns: 3,
      cells: [
        {
          id: '',
          type: 'progress-bar',
          status: 'ready',
          title: 'Trend',
          subtitle: 'Where it\'s going',
          descriptionTop: 'Weekly velocity change',
          descriptionBottom: 'Current momentum is non-linear; trajectory suggests structural category shift, not seasonal spike.',
          data: {
            type: 'trend',
            sparklineData: [2, 3, 2, 4, 3, 5, 9],
            color: '#10b981',
            value: 12.5
          }
        },
        {
          id: '',
          type: 'progress-bar',
          status: 'ready',
          title: 'Strength',
          subtitle: 'Signal power',
          descriptionTop: 'Signal strength across channels',
          descriptionBottom: 'Signal reaches 90th percentile for skincare category; indicates high viral durability and market resonance.',
          data: {
            type: 'strength',
            value: 8.8,
            max: 10,
            color: '#3b82f6'
          }
        },
        {
          id: '',
          type: 'progress-bar',
          status: 'ready',
          title: 'Trust',
          subtitle: 'Source validity',
          descriptionTop: 'Validation across sources',
          descriptionBottom: '87% validity via 42-channel cross-referencing; sufficient confidence to allocate media spend immediately.',
          data: {
            type: 'trust',
            value: 87,
            max: 100,
            color: '#10b981'
          }
        }
      ]
    },

    // Row 2: Signal sources (full width)
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'signal-sources',
          status: 'ready',
          title: 'Signal sources',
          subtitle: '',
          descriptionTop: 'Data validation across 3 core channels',
          descriptionBottom: '5,847 data points across 42 verified channels show convergence: Social Buzz + Search Demand = Intent confirmation.',
          data: {
            total: 'Social + Retail + Search convergence validates category momentum',
            pillars: [
              {
                id: 'social',
                icon: 'Radio',
                label: 'Social Buzz',
                value: '34',
                sparklineData: [2, 3, 3, 4, 5, 7, 8],
                subtext: 'Influencer mentions & engagement',
                color: 'emerald'
              },
              {
                id: 'retail',
                icon: 'TrendingUp',
                label: 'Retail Velocity',
                value: '28',
                sparklineData: [3, 4, 5, 6, 7, 8, 9],
                subtext: 'POS data & sell-through acceleration',
                color: 'blue'
              },
              {
                id: 'search',
                icon: 'Search',
                label: 'Search Demand',
                value: '38',
                sparklineData: [2, 3, 4, 5, 6, 8, 9],
                subtext: 'Query volume & intent growth',
                color: 'purple'
              }
            ]
          }
        }
      ]
    },
    // Row 2: Heading
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'header',
          status: 'ready',
          title: 'Insight interpretation',
          data: null
        }
      ]
    },
    // Row 3: Narrative cards (3 columns)
    {
      columns: 3,
      cells: [
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Executive Summary',
          subtitle: '',
          descriptionTop: 'AI Synthesis of the Signal',
          descriptionBottom: '',
          data: 'Consumer demand for clean beauty products is accelerating with 8.8/10 signal strength validated through multiple independent sources (87% trust).\n\nNo major competitor has launched a dedicated SKU, representing a first-mover opportunity in a high-velocity category.\n\nMulti-signal convergence across social, retail, and search confirms this is not a fleeting trend.'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Business Implications',
          subtitle: '',
          descriptionTop: 'Strategic Insights',
          descriptionBottom: '',
          data: '• "Natural" positioning is 3x more likely to convert in Gen Z cohorts than mass-market alternatives\n\n• Emerging flavor drives category expansion; competitors respond in 6–9 months typical lag\n\n• Retail velocity outpacing industry baseline by 2x; indicates retailer confidence in restocking\n\n• E-commerce penetration 35% above category average; signals early adopter, high-intent audience'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Action Recommendations',
          subtitle: '',
          descriptionTop: 'Next Steps (Priority Order)',
          descriptionBottom: '',
          data: '• Accelerate product development for dedicated SKU; first-mover window closes in Q3\n\n• Allocate 60% media budget to social + influencer partnerships in wellness cohort\n\n• Launch in top 10 metros Q2 2026; test premium pricing at $5.99 price point\n\n• Secure retail shelf commitments before competitor awareness rises above 45%\n\n• Monitor social sentiment weekly; plan national rollout if awareness exceeds 60% by end of Q2\n\n___BUTTON___Generate Ideas___POWERED_BY_Innov8___'
        }
      ]
    },
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'header',
          status: 'ready',
          title: 'Insight details',
          data: null
        }
      ]
    },
    // Row 4: Additional narrative depth (3 columns)
    {
      columns: 3,
      cells: [
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Segment Insights',
          subtitle: '',
          descriptionTop: 'Who is driving adoption?',
          descriptionBottom: 'Early adopters skew 70% female, median age 24–35, urban centers (top 15 metros); high education + disposable income.',
          data: '• Gen Z driving 58% of social mentions; high authenticity expectations\n\n• Urban premium retail outperforming suburban channels by 3x\n\n• E-commerce growth 2.8x faster than brick-and-mortar\n\n• Wellness positioning (not clean beauty per se) is the primary purchase driver'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Competitive Landscape',
          subtitle: '',
          descriptionTop: 'Incumbent response timeline?',
          descriptionBottom: 'Large competitors typically monitor trending flavors; response lag is 6–9 months. Window of exclusivity closes Q3 2026.',
          data: '• No direct competitor SKU exists; opportunity is real\n\n• Indirect competition from premium wellness brands (growing but fragmented)\n\n• Larger CPG players are evaluating category; first to market owns narrative\n\n• Shelf space scarcity in premium retail; distribution advantage compounds over time'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Risk Mitigation',
          subtitle: '',
          descriptionTop: 'What could go wrong?',
          descriptionBottom: 'Primary risks: supply chain delays (3–4 month lead time), competitor speed-to-market, social sentiment fragility.',
          data: '• Supply chain: Secure raw material commitments immediately\n\n• Competitor response: Monitor search + social for competitor awareness signals weekly\n\n• Sentiment: "Natural" perception is fragile; maintain authenticity messaging\n\n• Retail: Negotiate multi-quarter shelf commitments; prevent delisting by competitor spend'
        }
      ]
    },

    // Row 5: Financial Performance Header
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'header',
          status: 'ready',
          title: 'Insight artifacts',
          data: null
        }
      ]
    },

    // Row 6: Charts (2 columns)
    {
      columns: 2,
      cells: [
        {
          id: '',
          type: 'combo-chart',
          status: 'ready',
          title: 'Monthly Revenue Trend',
          subtitle: 'Last 12 months vs. 2025 baseline',
          descriptionTop: 'Revenue impact over time',
          descriptionBottom: 'Growth accelerating; +47% YoY suggests sustained momentum, not short-term spike. Implies structural market shift.',
          data: null
        },
        {
          id: '',
          type: 'combo-chart',
          status: 'ready',
          title: 'Quarterly Pipeline',
          subtitle: 'Opportunity pipeline by stage',
          descriptionTop: 'Forward indicator of revenue',
          descriptionBottom: 'Q2 pipeline up 52% QoQ; suggests sustainable growth trajectory if conversion rates hold.',
          data: null
        }
      ]
    },

    // Row 7: Analysis Charts (2 columns)
    {
      columns: 2,
      cells: [
        {
          id: '',
          type: 'radar-chart',
          status: 'ready',
          title: 'Market Segment Strength',
          subtitle: 'Dimension scoring across channels',
          descriptionTop: 'Where are we strongest?',
          descriptionBottom: 'E-commerce strength (92%) exceeds retail (84%); younger demographic adopting faster than mainstream.',
          data: null
        },
        {
          id: '',
          type: 'diverging-bar',
          status: 'ready',
          title: 'Positive vs Negative Signals',
          subtitle: 'Tailwinds vs. headwinds',
          descriptionTop: 'What is working vs. what isn\'t?',
          descriptionBottom: 'Positive signals (social, search, retail) far outweigh negatives; pricing concern is only material headwind.',
          data: null
        }
      ]
    }
  ],

  chartData: {
    'Monthly Revenue Trend': [
      { date: '2025-05-01', volume: 450, sentiment: 85 },
      { date: '2025-06-01', volume: 480, sentiment: 88 },
      { date: '2025-07-01', volume: 520, sentiment: 90 },
      { date: '2025-08-01', volume: 590, sentiment: 92 },
      { date: '2025-09-01', volume: 650, sentiment: 94 },
      { date: '2025-10-01', volume: 720, sentiment: 93 },
      { date: '2025-11-01', volume: 810, sentiment: 91 },
      { date: '2025-12-01', volume: 920, sentiment: 89 },
      { date: '2026-01-01', volume: 1050, sentiment: 87 },
      { date: '2026-02-01', volume: 1180, sentiment: 88 },
      { date: '2026-03-01', volume: 1350, sentiment: 89 },
      { date: '2026-04-01', volume: 1560, sentiment: 87 }
    ],

    'Quarterly Pipeline': [
      { date: '2025-Q2', volume: 1410, sentiment: 86 },
      { date: '2025-Q3', volume: 1760, sentiment: 92 },
      { date: '2025-Q4', volume: 2650, sentiment: 89 },
      { date: '2026-Q1', volume: 3580, sentiment: 88 }
    ],

    'Market Segment Strength': [
      { dimension: 'E-commerce Strength', value: 92, max: 100 },
      { dimension: 'Gen Z Adoption', value: 88, max: 100 },
      { dimension: 'Urban Premium Retail', value: 87, max: 100 },
      { dimension: 'Social Momentum', value: 89, max: 100 },
      { dimension: 'Search Intent', value: 91, max: 100 },
      { dimension: 'Competitive Threat', value: 28, max: 100 }
    ],

    'Positive vs Negative Indicators': [
      { driver: 'Social Acceleration', positive: 3400, negative: -180 },
      { driver: 'Search Demand Growth', positive: 3800, negative: -220 },
      { driver: 'E-commerce Velocity', positive: 3200, negative: -240 },
      { driver: 'Retail Sell-through', positive: 2900, negative: -280 },
      { driver: 'Price Acceptance', positive: 2600, negative: -420 },
      { driver: 'Competitive Response', positive: 400, negative: -2200 }
    ]
  },

  narratives: {
    'Clean Beauty Acceleration — Cucumber Mint Product Line':
      'Consumer demand for clean beauty is accelerating across all channels with strong multi-signal convergence.'
  },

  scenarioTriggers: [
    {
      keywords: ['genz', 'gen z', 'gen-z'],
      nextScenarioId: 'neutrogena-natural'
    }
  ],

  animationSpeed: {
    title: 15,
    description: 15
  },

  loadingDelay: 7000,

  loadingMessages: {
    intent: {
      header: 'Understanding intent...',
      header_done: 'Intent understood',
      texts: ['Analyzing "Gen Z" query', 'Cross-referencing with trends']
    },
    analysis: {
      header: 'Analyzing data...',
      header_done: 'Analysis complete',
      texts: ['Processing demographic signals', 'Evaluating sentiment patterns']
    },
    synthesis: {
      header: 'Synthesizing insights...',
      header_done: 'Synthesis complete',
      texts: ['Correlating signals', 'Building narrative']
    },
    summary: 'Gen Z Beauty Insights ready'
  }
}

export const scenarios = {
  'cucumber-mint': cucumberMint
}

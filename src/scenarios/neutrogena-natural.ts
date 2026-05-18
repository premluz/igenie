/**
 * Neutrogena Natural Beauty Trend Scenario
 * Insight: Rising consumer interest in clean, natural skincare
 * Signal convergence across social buzz, retail movement, and search acceleration
 */

import { type ScenarioData } from './types'

export const neutroGenaNatural: ScenarioData = {
  id: 'neutrogena-natural-2026',
  brand: 'Neutrogena',
  category: 'Skincare',
  title: 'Clean Beauty Acceleration — Neutrogena Natural Product Line',
  description: 'Rising consumer interest in clean, natural skincare across all channels',
  date: '2026-05-14',
  velocityScore: 8.6,
  sentimentScore: 82,
  sparklineData: [3, 4, 5, 6, 7, 8, 9],

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
    // Row 1: Signal metrics (3 columns) - Trend, Strength, Trust
    {
      columns: 3,
      cells: [
        {
          id: '',
          type: 'progress-bar',
          status: 'ready',
          title: 'Trend',
          subtitle: 'Where it\'s going',
          data: {
            type: 'trend',
            sparklineData: [3, 4, 5, 6, 7, 8, 9],
            color: '#10b981'
          }
        },
        {
          id: '',
          type: 'progress-bar',
          status: 'ready',
          title: 'Strength',
          subtitle: 'Signal power',
          data: {
            type: 'strength',
            value: 8.6,
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
          data: {
            type: 'trust',
            value: 82,
            max: 100,
            color: '#10b981'
          }
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
          data: {
            total: '5,847 data points across 42 verified channels',
            pillars: [
              {
                id: 'social',
                icon: 'Radio',
                label: 'Clean Beauty Buzz',
                value: '34%',
                sparklineData: [2, 3, 4, 5, 6, 8, 9],
                subtext: 'Social mentions trending up',
                color: 'emerald'
              },
              {
                id: 'retail',
                icon: 'TrendingUp',
                label: 'Retail Velocity',
                value: '28%',
                sparklineData: [3, 4, 4, 5, 5, 6, 7],
                subtext: 'Sell-through acceleration',
                color: 'blue'
              },
              {
                id: 'search',
                icon: 'Search',
                label: 'Search Demand',
                value: '38%',
                sparklineData: [4, 5, 6, 7, 8, 9, 10],
                subtext: 'Query growth 156% YoY',
                color: 'purple'
              }
            ]
          }
        }
      ]
    },

    // Row 3: Executive Summary (3 columns)
    {
      columns: 3,
      cells: [
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Executive Summary',
          subtitle: '',
          data: 'Consumer demand for clean, natural skincare is accelerating across all channels with 156% YoY search growth and 34% retail velocity growth. Signal strength (8.6/10) indicates powerful momentum.\n\nThe trend shows:\n• Strong social acceleration\n• Increasing retail sell-through\n• Rising search demand\n• Low incumbent competition'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Business Implications',
          subtitle: '',
          data: '• Premium positioning opportunity — consumers willing to pay for "natural" credentials\n\n• First-mover advantage in Ultra Gentle line — before category commoditizes\n\n• Brand trust building — clean beauty messaging resonates authentically with target demographics\n\n• Category growth tailwind — natural skincare expanding faster than overall beauty market'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Action Recommendations',
          subtitle: '',
          data: '• Amplify "natural ingredients" messaging across digital channels — highest leverage opportunity\n\n• Increase allocation to Ultra Gentle line — strongest velocity and sentiment signals\n\n• Partner with 10-15 mid-tier clean beauty influencers for authentic reach\n\n• Launch limited-edition natural variant SKU Q2 2026 — capture momentum window\n\n• Test premium pricing on clean line — sentiment data supports willingness to pay\n\n___BUTTON___Generate Ideas___POWERED_BY_INNOV8___'
        }
      ]
    },

    // Row 3: KPI cards (2 columns)
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
  },

  scenarioTriggers: [
    {
      keywords: ['millennial', 'millennial-analysis'],
      nextScenarioId: 'cucumber-mint'
    }
  ],

  animationSpeed: {
    title: 15,
    description: 15
  },

  loadingDelay: 6000,

  loadingMessages: {
    signal_detect: {
      header: 'Detecting signals...',
      header_done: 'Signals detected',
      texts: ['Scanning clean beauty trends', 'Identifying natural ingredient mentions']
    },
    convergence: {
      header: 'Analyzing convergence...',
      header_done: 'Convergence mapped',
      texts: ['Cross-referencing retail velocity', 'Evaluating social momentum']
    },
    market_fit: {
      header: 'Assessing market fit...',
      header_done: 'Market analysis complete',
      texts: ['Comparing sentiment scores', 'Evaluating positioning opportunity']
    },
    summary: 'Clean Beauty Market Opportunity identified'
  }
}

// Export as scenario map
export const scenarios = {
  'neutrogena-natural': neutroGenaNatural
}

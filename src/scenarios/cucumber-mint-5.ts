import { type ScenarioData } from './types'

export const cucumberMint5: ScenarioData = {
  id: 'cucumber-mint5',
  brand: 'Cucumber Mint',
  category: 'Personal Care',
  title: 'Competitive Market Positioning',
  description: 'Share gains vs natural skincare competitors',
  date: '2026-05-10',
  velocityScore: 7.2,
  sentimentScore: 76,
  sparklineData: [4, 4, 5, 5, 6, 6, 7],

  signals: [
    {
      id: 'sig-1',
      name: 'Market Share',
      icon: 'flame',
      velocity: 7.2,
      sentiment: 76,
      trend: 'rising'
    }
  ],

  initialLayout: [
    // Row 1: Progress bars (3 columns)
    {
      columns: 3,
      cells: [
        {
          id: '',
          type: 'progress-bar',
          status: 'ready',
          title: 'Trend',
          subtitle: "Where it's going",
          data: {
            type: 'trend',
            sparklineData: [4, 4, 5, 5, 6, 6, 7],
            color: '#3b82f6'
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
            value: 7.2,
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
            value: 76,
            max: 100,
            color: '#f97316'
          }
        }
      ]
    },

    // Row 2: Signal sources (1 column)
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
            total: '4,123 data points across 32 verified channels',
            pillars: [
              {
                id: 'market',
                icon: 'TrendingUp',
                label: 'Market Share',
                value: '40%',
                sparklineData: [2, 3, 4, 5, 6, 7, 8],
                subtext: 'Competitive positioning gaining',
                color: 'blue'
              },
              {
                id: 'brand',
                icon: 'Radio',
                label: 'Brand Mentions',
                value: '35%',
                sparklineData: [3, 4, 5, 6, 7, 8, 9],
                subtext: 'Social & media coverage growing',
                color: 'emerald'
              },
              {
                id: 'research',
                icon: 'Search',
                label: 'Consumer Research',
                value: '25%',
                sparklineData: [4, 5, 6, 7, 8, 9, 10],
                subtext: 'Market analysis consistent',
                color: 'purple'
              }
            ]
          }
        }
      ]
    },

    // Row 3: Narratives (3 columns)
    {
      columns: 3,
      cells: [
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Executive Summary',
          subtitle: '',
          data: 'Cucumber Mint gaining market share in natural skincare with competitive pricing. Strong positioning around natural ingredients and sustainability outperforming competitor growth.'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Business Implications',
          subtitle: '',
          data: '• Competitive advantage built on authentic natural positioning\n\n• Sustainability story resonates with premium segments\n\n• Market expansion opportunity as category grows'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Action Recommendations',
          subtitle: '',
          data: '• Double down on sustainability narrative in communications\n\n• Monitor competitor moves and innovation pipeline\n\n• Build awareness in under-penetrated markets\n\n• Develop premium tier products for ultra-premium segment\n\n___BUTTON___Generate Ideas___POWERED_BY_Innov8___'
        }
      ]
    },

    // Row 4: Header
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'header',
          status: 'ready',
          title: 'Perception Analysis',
          data: null
        }
      ]
    },

    // Row 5: Diverging Bar + Line Chart (2 columns)
    {
      columns: 2,
      cells: [
        {
          id: '',
          type: 'diverging-bar',
          status: 'ready',
          title: 'Brand Positioning: Natural vs Premium Perception',
          subtitle: '',
          descriptionTop: '',
          descriptionBottom: 'Consumer perception shows strong natural ingredient positioning; premium quality perception lags but growing.',
          data: [
            { driver: 'Natural Ingredients', positive: 2800, negative: 150 },
            { driver: 'Sustainability', positive: 2100, negative: 280 },
            { driver: 'Quality', positive: 1850, negative: 420 },
            { driver: 'Premium Feel', positive: 650, negative: 950 },
            { driver: 'Price Value', positive: 480, negative: 800 }
          ]
        },
        {
          id: '',
          type: 'line-chart',
          status: 'ready',
          title: 'Perception Trend: 12-Month Trajectory',
          subtitle: '',
          descriptionTop: '',
          descriptionBottom: 'Natural ingredient perception stable; premium positioning gaining traction over past 6 months.',
          data: [
            { date: '2024-06-01', value: 65.2 },
            { date: '2024-07-01', value: 66.8 },
            { date: '2024-08-01', value: 67.1 },
            { date: '2024-09-01', value: 68.3 },
            { date: '2024-10-01', value: 69.8 },
            { date: '2024-11-01', value: 70.5 },
            { date: '2024-12-01', value: 71.2 },
            { date: '2025-01-01', value: 72.9 },
            { date: '2025-02-01', value: 73.7 },
            { date: '2025-03-01', value: 74.1 },
            { date: '2025-04-01', value: 75.4 },
            { date: '2025-05-01', value: 76.8 }
          ]
        }
      ]
    },

    // Row 6: Treemap (2 columns)
    {
      columns: 2,
      cells: [
        {
          id: '',
          type: 'treemap',
          status: 'ready',
          title: 'Conversation Distribution: What Drives Perception',
          subtitle: '',
          descriptionTop: '',
          descriptionBottom: 'Natural ingredients dominate conversation (42% of volume); sustainability and premium quality emerging as secondary drivers.',
          data: [
            { label: 'Natural Ingredients', value: 185400, category: 'Primary' },
            { label: 'Sustainability', value: 125600, category: 'Primary' },
            { label: 'Quality & Safety', value: 95200, category: 'Secondary' },
            { label: 'Premium Positioning', value: 78500, category: 'Secondary' },
            { label: 'Packaging Design', value: 61200, category: 'Tertiary' },
            { label: 'Brand Story', value: 58900, category: 'Tertiary' },
            { label: 'Price Value', value: 42100, category: 'Tertiary' },
            { label: 'Product Performance', value: 35800, category: 'Secondary' }
          ]
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Perception Insights',
          subtitle: '',
          descriptionTop: '',
          descriptionBottom: '',
          data: '→ **Natural Positioning Holds:** 42% of conversation volume centers on natural ingredients—core strength is resonating.\n\n→ **Sustainability Emerging:** 27% of volume now discusses sustainability; growing as secondary differentiator.\n\n→ **Premium Gap:** Premium positioning conversation growing but still underdeveloped (21% of total).\n\n→ **Opportunity:** Increase premium messaging while maintaining natural positioning; dual positioning strategy shows 6-month growth trajectory.\n\n→ **Recommendation:** Test premium tier messaging in Q3 while protecting natural ingredient narrative; capitalize on perception momentum before competitive response.'
        }
      ]
    }
  ],

  chartData: {
    'Monthly Revenue': [
      { date: '2024-01-01', volume: 380, sentiment: 71 },
      { date: '2024-02-01', volume: 450, sentiment: 74 },
      { date: '2024-03-01', volume: 540, sentiment: 79 }
    ]
  },

  narratives: {
    'Competitive Market Positioning': 'The brand is successfully differentiated through natural ingredients and sustainable practices.'
  }
}

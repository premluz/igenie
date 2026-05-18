import { type ScenarioData } from './types'

export const botanicalEnergyDeepDive: ScenarioData = {
  id: 'botanical-energy-deepdive',
  brand: 'Botanical Energy Deep Dive — Herbal & Functional Trends',
  category: 'Wellness & Functional Beverages',
  title: 'Botanical Energy Deep Dive — Herbal & Functional Trends',
  description: 'In-depth analysis of botanical and herbal energy ingredient adoption, premium positioning, and market expansion',
  date: '2026-05-18',
  velocityScore: 8.7,
  sentimentScore: 87,
  sparklineData: [5, 6, 7, 8, 9, 11, 13],

  signals: [
    {
      id: 'sig-1',
      name: 'Ingredient Search Spike',
      icon: 'search',
      velocity: 8.9,
      sentiment: 87,
      trend: 'rising'
    },
    {
      id: 'sig-2',
      name: 'Premium Positioning',
      icon: 'trending',
      velocity: 8.4,
      sentiment: 86,
      trend: 'rising'
    },
    {
      id: 'sig-3',
      name: 'Wellness Community Adoption',
      icon: 'radio',
      velocity: 8.6,
      sentiment: 89,
      trend: 'rising'
    }
  ],

  initialLayout: [
    // Row 1: Heading
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'header',
          status: 'ready',
          title: 'Botanical Energy Market Deep Dive',
          data: null
        }
      ]
    },
    // Row 2: Key metrics (3 columns)
    {
      columns: 3,
      cells: [
        {
          id: '',
          type: 'progress-bar',
          status: 'ready',
          title: 'Market Growth',
          subtitle: '',
          descriptionTop: '',
          descriptionBottom: 'YoY expansion in botanical segment. Sustained acceleration.',
          data: {
            type: 'trend',
            sparklineData: [5, 6, 7, 8, 9, 11, 13],
            color: '#10b981',
            value: 18.2
          }
        },
        {
          id: '',
          type: 'progress-bar',
          status: 'ready',
          title: 'Quality Index',
          subtitle: '',
          descriptionTop: '',
          descriptionBottom: 'Ingredient transparency and certification ratings.',
          data: {
            type: 'strength',
            value: 8.7,
            max: 10,
            color: '#3b82f6'
          }
        },
        {
          id: '',
          type: 'progress-bar',
          status: 'ready',
          title: 'Consumer Trust',
          subtitle: '',
          descriptionTop: '',
          descriptionBottom: 'Botanical ingredients drive premium pricing acceptance.',
          data: {
            type: 'trust',
            value: 87,
            max: 100,
            color: '#10b981'
          }
        }
      ]
    },

    // Row 3: Signal sources
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'signal-sources',
          status: 'ready',
          title: 'Ingredient Signal Sources',
          subtitle: '',
          descriptionTop: '',
          descriptionBottom: '4,892 data points across 38 wellness channels. Convergence on functional botanic ingredients.',
          data: {
            total: '',
            pillars: [
              {
                id: 'wellness',
                icon: 'Radio',
                label: 'Wellness Communities',
                value: '42',
                sparklineData: [4, 5, 6, 7, 8, 10, 12],
                subtext: 'Reddit, wellness forums, health blogs',
                color: 'emerald'
              },
              {
                id: 'retail',
                icon: 'TrendingUp',
                label: 'Premium Retail Adoption',
                value: '31',
                sparklineData: [3, 4, 5, 6, 7, 9, 11],
                subtext: 'Whole Foods, specialty health stores',
                color: 'blue'
              },
              {
                id: 'search',
                icon: 'Search',
                label: 'Ingredient Research',
                value: '40',
                sparklineData: [4, 5, 6, 7, 8, 10, 12],
                subtext: 'Botanical, functional ingredient queries',
                color: 'purple'
              }
            ]
          }
        }
      ]
    },

    // Row 4: Heading
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'header',
          status: 'ready',
          title: 'Market Analysis',
          data: null
        }
      ]
    },

    // Row 5: Analysis cards (3 columns)
    {
      columns: 3,
      cells: [
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Ingredient Trends',
          subtitle: '',
          descriptionTop: 'What Botanicals Are Rising?',
          descriptionBottom: '',
          data: 'Ashwagandha adoption velocity exceeds all other adaptogens by 2.1x. Matcha maintains stable demand while mushroom blends (lion\'s mane, cordyceps) are emerging as secondary trend.\n\nGuarana and yerba mate remain foundational but are being repositioned as "clean alternatives" to synthetic caffeine sources.'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Premium Positioning',
          subtitle: '',
          descriptionTop: 'Market Segmentation',
          descriptionBottom: '',
          data: '• Premium botanical blends command 3.8x price multiplier versus standard energy formulations\n\n• Certification premium (organic, non-GMO, third-party tested) adds $2.50-$4.00 per unit\n\n• Transparency in ingredient sourcing (single-origin botanicals) drives 4.2x higher repeat purchase rates\n\n• Functional benefit claims (adaptogens, nootropics) resonate strongest with affluent wellness consumers (25-45 age band)'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Strategic Opportunities',
          subtitle: '',
          descriptionTop: 'Next Moves',
          descriptionBottom: '',
          data: '• Develop adaptogen + nootropic dual-benefit formulations; market unmet demand for stress-energy balance\n\n• Expand DTC subscription model around seasonal botanical blends (Q2: cooling, Q4: warming botanicals)\n\n• Partner with wellness influencers in yoga, meditation, and biohacking communities\n\n• Secure direct relationships with botanical suppliers to control margin and narrative\n\n___BUTTON___Explore Partnerships___POWERED_BY_Innov8___'
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
          title: 'Performance Artifacts',
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
          title: 'Botanical SKU Growth',
          subtitle: 'Monthly unit sales across botanical-focused product lines',
          descriptionTop: 'Revenue velocity in premium botanical segment',
          descriptionBottom: 'Premium botanical SKUs growing 2.4x faster than standard energy formulations. Sentiment stability (86-88%) indicates brand equity beyond trend hype.',
          data: null
        },
        {
          id: '',
          type: 'radar',
          status: 'ready',
          title: 'Botanical Strength Profile',
          subtitle: 'Multi-dimensional botanical market assessment',
          descriptionTop: 'Market penetration across key dimensions',
          descriptionBottom: 'Premium positioning (92%) and ingredient transparency (88%) lead; mainstream retail penetration (68%) remains the constraint. Distribution expansion is the bottleneck.',
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
          type: 'segment-strength',
          status: 'ready',
          title: 'Channel Distribution Strength',
          subtitle: 'Market presence by sales channel',
          descriptionTop: 'Where botanical products gain ground?',
          descriptionBottom: 'Online DTC and specialty retail lead (94%, 91%); mainstream convenience and grocery lagging (72%, 68%). Direct-to-consumer profitability highest.',
          data: null
        },
        {
          id: '',
          type: 'diverging-bar',
          status: 'ready',
          title: 'Market Expansion vs Constraints',
          subtitle: 'Growth drivers vs supply-side limitations',
          descriptionTop: 'What accelerates vs what limits scaling?',
          descriptionBottom: 'Consumer demand tailwinds (+4.1K signals) and premium price acceptance (+3.2K) outpace supply constraints (-1.5K) and regulatory complexity (-1.8K). 2:1 net signal advantage.',
          data: null
        }
      ]
    },

    // Row 8: Forecast (full width)
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'forecast-chart',
          status: 'ready',
          title: 'Market Projection',
          subtitle: 'Botanical energy segment growth trajectory with confidence bounds',
          descriptionTop: 'Botanical category market expansion forecast',
          descriptionBottom: 'Historical data (blue) through May 18 shows accelerating adoption. Projection (orange) forecasts 6.2B units by September 2026 assuming continued distribution expansion. Conservative bounds reflect regulatory uncertainty.',
          data: null
        }
      ]
    }
  ],

  chartData: {
    'Botanical SKU Growth': [
      { date: '2025-06-01', volume: 120, sentiment: 82 },
      { date: '2025-07-01', volume: 165, sentiment: 84 },
      { date: '2025-08-01', volume: 225, sentiment: 85 },
      { date: '2025-09-01', volume: 310, sentiment: 86 },
      { date: '2025-10-01', volume: 420, sentiment: 87 },
      { date: '2025-11-01', volume: 560, sentiment: 87 },
      { date: '2025-12-01', volume: 740, sentiment: 86 },
      { date: '2026-01-01', volume: 960, sentiment: 88 },
      { date: '2026-02-01', volume: 1210, sentiment: 87 },
      { date: '2026-03-01', volume: 1520, sentiment: 88 },
      { date: '2026-04-01', volume: 1890, sentiment: 86 }
    ],

    'Botanical Strength Profile': [
      { dimension: 'Premium Positioning', value: 92, benchmark: 70, max: 100 },
      { dimension: 'Ingredient Transparency', value: 88, benchmark: 65, max: 100 },
      { dimension: 'Wellness Community Adoption', value: 84, benchmark: 62, max: 100 },
      { dimension: 'DTC Channel Strength', value: 89, benchmark: 68, max: 100 },
      { dimension: 'Certification Status', value: 86, benchmark: 60, max: 100 },
      { dimension: 'Mainstream Retail Reach', value: 68, benchmark: 72, max: 100 }
    ],

    'Channel Distribution Strength': [
      { channel: 'Direct-to-Consumer', value: 94, max: 100 },
      { channel: 'Specialty Retail', value: 91, max: 100 },
      { channel: 'Online Marketplaces', value: 88, max: 100 },
      { channel: 'Whole Foods & Premium', value: 85, max: 100 },
      { channel: 'Mainstream Grocery', value: 68, max: 100 },
      { channel: 'Convenience Stores', value: 72, max: 100 }
    ],

    'Market Projection': [
      { date: '2025-06-01', value: 120, type: 'historical' },
      { date: '2025-08-01', value: 225, type: 'historical' },
      { date: '2025-10-01', value: 420, type: 'historical' },
      { date: '2025-12-01', value: 740, type: 'historical' },
      { date: '2026-02-01', value: 1210, type: 'historical' },
      { date: '2026-04-01', value: 1890, type: 'historical' },
      { date: '2026-05-18', value: 2340, type: 'today', isToday: true },
      { date: '2026-06-15', value: 2850, type: 'forecast', lower: 2698, upper: 3002 },
      { date: '2026-07-15', value: 3520, type: 'forecast', lower: 3338, upper: 3703 },
      { date: '2026-08-15', value: 4340, type: 'forecast', lower: 4119, upper: 4561 },
      { date: '2026-09-15', value: 5280, type: 'forecast', lower: 5016, upper: 5544 },
      { date: '2026-10-15', value: 6220, type: 'forecast', lower: 5909, upper: 6531 },
      { date: '2026-11-15', value: 7100, type: 'forecast', lower: 6735, upper: 7465 }
    ],

    'Market Expansion vs Constraints': [
      { driver: 'Consumer Demand Growth', positive: 4100, negative: -120 },
      { driver: 'Premium Price Acceptance', positive: 3200, negative: -250 },
      { driver: 'Wellness Community Expansion', positive: 3500, negative: -180 },
      { driver: 'DTC Channel Scaling', positive: 2800, negative: -320 },
      { driver: 'Supply Chain Constraints', positive: 600, negative: -1500 },
      { driver: 'Regulatory Complexity', positive: 400, negative: -1800 }
    ]
  },

  narratives: {
    'Botanical Energy Deep Dive — Herbal & Functional Trends':
      'Premium botanical energy segment is experiencing sustained demand growth driven by wellness community adoption and ingredient transparency trends.'
  },

  animationSpeed: {
    title: 10,
    description: 10
  },

  loadingDelay: 7000,

  loadingMessages: {
    intent: {
      header: 'Understanding intent...',
      header_done: 'Intent understood',
      texts: ['Analyzing botanical energy positioning within premium segment', 'Isolating functional ingredient strength signals', 'Mapping channel distribution opportunity']
    },
    analysis: {
      header: 'Analyzing data...',
      header_done: 'Analysis complete',
      texts: ['Parsing ingredient community signals & wellness platform conversations', 'Evaluating channel strength across DTC, specialty retail, natural grocers', 'Calculating brand health proxy metrics from social velocity']
    },
    synthesis: {
      header: 'Synthesizing insights...',
      header_done: 'Synthesis complete',
      texts: ['Correlating botanical signals to early-adopter channel dynamics', 'Mapping supply chain friction & production scaling windows', 'Finalizing market penetration recommendations']
    },
    summary: 'Botanical Energy Market Deep Dive ready'
  }
}

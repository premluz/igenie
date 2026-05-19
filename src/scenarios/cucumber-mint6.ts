import { type ScenarioData } from './types'

export const cucumberMint6: ScenarioData = {
  id: 'cucumber-mint6',
  brand: 'Premium Beverage Brand',
  category: 'Wellness Beverages',
  title: '"Cucumber Mint" flavor adoption accelerating in wellness beverages',
  description: 'No major competitor has launched a dedicated SKU',
  date: '2026-05-13',
  velocityScore: 8.8,
  sentimentScore: 87,
  sparklineData: [6.2, 6.8, 7.1, 7.6, 8.1, 8.4, 8.8],

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
    // Row 1: KPI Cards
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

    // Row 2: Narratives
    {
      columns: 3,
      cells: [
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Executive summary',
          subtitle: '',
          data: 'Consumer interest in cucumber-mint flavored beverages accelerated significantly over the last 90 days, driven primarily by wellness-oriented Gen Z audiences and premium retail channels.\n\nThe trend shows:\n• strong social acceleration\n• increasing retail sell-through\n• rising search demand\n• and low incumbent competition'
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

    // Row 3: Header
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'header',
          status: 'ready',
          title: 'Market Perception & Sentiment',
          data: null
        }
      ]
    },

    // Row 4: Diverging Bar + Line Chart (2 columns)
    {
      columns: 2,
      cells: [
        {
          id: '',
          type: 'diverging-bar',
          status: 'ready',
          title: 'Wellness Positioning: Healthy vs Indulgent Perception',
          subtitle: '',
          descriptionTop: '',
          descriptionBottom: 'Strong wellness perception with "natural" and "refreshing" driving positive sentiment; indulgent positioning still developing.',
          data: [
            { driver: 'Natural Ingredients', positive: 3200, negative: 120 },
            { driver: 'Refreshing Taste', positive: 2800, negative: 200 },
            { driver: 'Wellness Benefit', positive: 3100, negative: 150 },
            { driver: 'Premium Quality', positive: 2100, negative: 420 },
            { driver: 'Indulgent/Smooth', positive: 600, negative: 2100 }
          ]
        },
        {
          id: '',
          type: 'line-chart',
          status: 'ready',
          title: 'Sentiment Evolution: 6-Month Trend',
          subtitle: '',
          descriptionTop: '',
          descriptionBottom: 'Sentiment climbing from 72% to 87% over 6 months; acceleration in recent weeks indicates growing consumer enthusiasm.',
          data: [
            { date: '2025-11-01', value: 72.0 },
            { date: '2025-12-01', value: 74.2 },
            { date: '2026-01-01', value: 76.1 },
            { date: '2026-02-01', value: 78.5 },
            { date: '2026-03-01', value: 81.3 },
            { date: '2026-04-01', value: 83.8 },
            { date: '2026-05-01', value: 86.2 },
            { date: '2026-05-13', value: 87.0 }
          ]
        }
      ]
    },

    // Row 5: Treemap (2 columns)
    {
      columns: 2,
      cells: [
        {
          id: '',
          type: 'treemap',
          status: 'ready',
          title: 'Conversation Distribution: What Drives Adoption',
          subtitle: '',
          descriptionTop: '',
          descriptionBottom: '→ **Wellness Dominates:** Largest volume driver (24%)\n\n→ **Natural Ingredients:** Second-largest segment (23%)\n\n→ **Gen Z Authenticity:** Rising secondary driver (19%)\n\n→ **Premium Positioning:** Tertiary positioning message (16%)\n\n→ **Supporting Topics:** Social trends, flavor innovation, retail, competitor discussion round out conversation.',
          data: [
            { label: 'Wellness & Health', value: 168000, category: 'Primary' },
            { label: 'Natural Ingredients', value: 162000, category: 'Primary' },
            { label: 'Gen Z Authenticity', value: 138000, category: 'Secondary' },
            { label: 'Premium Positioning', value: 118000, category: 'Secondary' },
            { label: 'Social Trends', value: 105000, category: 'Tertiary' },
            { label: 'Flavor Innovation', value: 98000, category: 'Tertiary' },
            { label: 'Retail Availability', value: 92000, category: 'Tertiary' },
            { label: 'Competitor Comparison', value: 89000, category: 'Secondary' }
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
          data: '→ **Wellness Dominates:** 48% of conversation centers on health/wellness benefits—core positioning resonating strongly.\n\n→ **Authenticity Gap:** Gen Z seeking authentic natural story (26% of volume); premium tier messaging opportunity.\n\n→ **Momentum Building:** Sentiment accelerating faster in past 6 weeks; early adopter to mainstream transition beginning.\n\n→ **Competition Risk:** Low competitor mentions (8% of volume) but larger players watching; window closing for exclusivity.\n\n→ **Recommendation:** Maximize market penetration Q2-Q3 while first-mover advantage active; emphasize authentic wellness narrative and premium positioning before competitive response.'
        }
      ]
    },

    // Row 6: Additional narrative depth (3 columns)
    {
      columns: 3,
      cells: [
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Market Window Analysis',
          subtitle: '',
          data: '→ **First-Mover Advantage:** Competitors tracking the category; estimated 6-8 week window before major players respond\n\n→ **Target Demographics:** 18-35 year-old wellness-conscious consumers; particularly strong resonance with yoga, fitness, and health communities\n\n→ **Geographic Hotspots:** Urban premium retail (NYC, LA, San Francisco) showing 2.3x category average velocity\n\n→ **Pricing Ceiling:** Consumers accepting $5.99-6.49/bottle in e-commerce; mass retail may compress to $4.99'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Competitive Landscape',
          subtitle: '',
          data: '→ **Low Threat Tier:** Traditional energy drink players (Red Bull, Monster) showing slow response; product portfolios heavily invested in previous trends\n\n→ **Direct Competitors:** Liquid IV, Liquid Refresh entering adjacent space but not specialized flavor innovation\n\n→ **Category Expansion:** Functional beverage startups (Celsius, Reign) expanding but lack authentic wellness positioning\n\n→ **Window Closing:** Once a major brand (Coca-Cola, PepsiCo) enters cucumber-mint category, margins compress 40-50%'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Success Metrics & Targets',
          subtitle: '',
          data: '→ **Q2 2026 Milestones:** 35% awareness in target demographic; $2.8M revenue from e-commerce + premium retail\n\n→ **Velocity Targets:** Maintain 8.5+ signal strength through consistent influencer partnerships and retail expansion\n\n→ **Sentiment Goals:** Sustain 87%+ positive sentiment through authentic wellness narrative (avoid exaggerated health claims)\n\n→ **Expansion Ready:** Once 50K+ monthly conversations achieved, mass retail rollout justified with confidence'
        }
      ]
    },

    // Row 7: Top 10 Brands Table
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'table',
          status: 'ready',
          title: 'Competitive Set: Top 10 Brands in Wellness Beverage Space',
          subtitle: 'Brands actively competing for Gen Z wellness consumer mindshare',
          data: {
            columns: [
              { key: 'rank', label: 'Rank' },
              { key: 'brand', label: 'Brand' },
              { key: 'category', label: 'Category' },
              { key: 'velocity', label: 'Social Velocity' },
              { key: 'sentiment', label: 'Sentiment' },
              { key: 'market_position', label: 'Position in Category' }
            ],
            rows: [
              { rank: '1', brand: 'Liquid IV', category: 'Hydration', velocity: '8.4', sentiment: '84%', market_position: 'Leader' },
              { rank: '2', brand: 'Celsius', category: 'Energy + Fitness', velocity: '9.1', sentiment: '88%', market_position: 'Rising' },
              { rank: '3', brand: 'Reign Total Body Fuel', category: 'Performance Energy', velocity: '7.8', sentiment: '79%', market_position: 'Challenger' },
              { rank: '4', brand: 'LMNT Electrolytes', category: 'Electrolyte Replenishment', velocity: '7.3', sentiment: '85%', market_position: 'Niche Leader' },
              { rank: '5', brand: 'Liquid Refresh', category: 'Functional Hydration', velocity: '6.9', sentiment: '81%', market_position: 'Growing' },
              { rank: '6', brand: 'GU Energy', category: 'Sports Nutrition Drinks', velocity: '6.2', sentiment: '76%', market_position: 'Specialist' },
              { rank: '7', brand: 'Orgain Organic Protein', category: 'Plant-Based Drinks', velocity: '5.8', sentiment: '78%', market_position: 'Category Adjacent' },
              { rank: '8', brand: 'Coconut Water (Vita Coco)', category: 'Natural Hydration', velocity: '5.5', sentiment: '72%', market_position: 'Mature' },
              { rank: '9', brand: 'RYSE Supps Energy', category: 'Fitness Energy', velocity: '5.3', sentiment: '74%', market_position: 'Emerging' },
              { rank: '10', brand: 'Clean Juice Co', category: 'Cold-Pressed Wellness', velocity: '4.9', sentiment: '80%', market_position: 'Premium Niche' }
            ],
            features: {
              sorting: true,
              columnFilters: ['category'],
              pagination: { pageSize: 10 },
              virtualise: false
            }
          }
        }
      ]
    }
  ],

  chartData: {
    'Monthly Revenue': [
      { date: '2024-01-01', volume: 650, sentiment: 100 },
      { date: '2024-02-01', volume: 580, sentiment: 97 },
      { date: '2024-03-01', volume: 700, sentiment: 108 }
    ]
  },

  narratives: {
    '"Cucumber Mint" flavor adoption accelerating in wellness beverages': 'Consumer demand for cucumber-mint beverages is accelerating across all channels with strong multi-signal convergence.'
  }
}

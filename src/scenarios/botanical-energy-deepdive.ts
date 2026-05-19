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
          descriptionBottom: '→ **18.2% YoY:** Botanical segment expanding well above category baseline\n\n→ **Sustained Acceleration:** Non-linear trajectory since Q3 2025 — structural shift, not seasonal spike',
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
          descriptionBottom: '→ **Quality Score 8.7/10:** Top-tier ingredient transparency and third-party certification performance\n\n→ **Trust Driver:** Certification ratings correlated with 4.2x repeat purchase rate uplift',
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
          descriptionBottom: '→ **87% Confidence:** 38-channel cross-validated signal — act with high conviction\n\n→ **Premium Acceptance:** Botanical positioning unlocks $2.50–$4.00 price premium per unit',
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
          descriptionBottom: '→ **4,892 Data Points:** Across 38 wellness channels — high-confidence convergence signal\n\n→ **Multi-Channel Alignment:** Wellness communities + retail adoption + ingredient search all accelerating simultaneously\n\n→ **Signal Interpretation:** Convergence pattern confirms structural category growth, not isolated influencer hype',
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
          descriptionBottom: '→ **Growth Rate:** Premium botanical SKUs growing 2.4x faster than standard energy formulations\n\n→ **Sentiment Stability:** 86–88% range indicates brand equity beyond trend hype\n\n→ **Acceleration Pattern:** Non-linear curve since Q4 2025 signals structural category shift',
          data: [
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
          ]
        },
        {
          id: '',
          type: 'radar',
          status: 'ready',
          title: 'Botanical Strength Profile',
          subtitle: 'Multi-dimensional botanical market assessment',
          descriptionTop: 'Market penetration across key dimensions',
          descriptionBottom: '→ **Premium Positioning (92%):** Leading dimension — far above benchmark (70%)\n\n→ **Ingredient Transparency (88%):** Second-strongest pillar driving consumer trust\n\n→ **Mainstream Retail (68%):** Sole dimension below benchmark — distribution is the strategic bottleneck',
          data: [
            { dimension: 'Premium Positioning', value: 92, benchmark: 70, max: 100 },
            { dimension: 'Ingredient Transparency', value: 88, benchmark: 65, max: 100 },
            { dimension: 'Wellness Community Adoption', value: 84, benchmark: 62, max: 100 },
            { dimension: 'DTC Channel Strength', value: 89, benchmark: 68, max: 100 },
            { dimension: 'Certification Status', value: 86, benchmark: 60, max: 100 },
            { dimension: 'Mainstream Retail Reach', value: 68, benchmark: 72, max: 100 }
          ]
        }
      ]
    },

    // Row 7: Top 10 Brands Table (full width)
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'table',
          status: 'ready',
          title: 'Competitive Set: Top 10 Botanical & Functional Energy Brands',
          subtitle: 'Brands competing for premium wellness and botanical energy consumer mindshare',
          data: {
            columns: [
              { key: 'rank', label: 'Rank' },
              { key: 'brand', label: 'Brand' },
              { key: 'category', label: 'Category' },
              { key: 'velocity', label: 'Signal Velocity' },
              { key: 'sentiment', label: 'Sentiment' },
              { key: 'botanical_focus', label: 'Botanical Focus' },
              { key: 'market_position', label: 'Position' }
            ],
            rows: [
              { rank: '1', brand: 'Celsius', category: 'Functional Energy', velocity: '9.1', sentiment: '88%', botanical_focus: 'Green Tea, Guarana', market_position: 'Leader' },
              { rank: '2', brand: 'Guayakí Yerba Mate', category: 'Botanical Energy', velocity: '8.7', sentiment: '91%', botanical_focus: 'Yerba Mate (single-origin)', market_position: 'Authentic Leader' },
              { rank: '3', brand: 'Red Bull Sugar Free', category: 'Mainstream Energy', velocity: '8.4', sentiment: '79%', botanical_focus: 'Minimal botanical', market_position: 'Incumbent' },
              { rank: '4', brand: 'Hiyo Botanical Seltzer', category: 'Functional Botanical', velocity: '8.2', sentiment: '89%', botanical_focus: 'Ashwagandha, Elderflower', market_position: 'Rising Challenger' },
              { rank: '5', brand: 'Runa Clean Energy', category: 'Botanical Energy', velocity: '7.9', sentiment: '87%', botanical_focus: 'Guayusa leaf', market_position: 'Niche Leader' },
              { rank: '6', brand: 'NOS Energy', category: 'Performance Energy', velocity: '7.6', sentiment: '74%', botanical_focus: 'Ginseng, B-vitamins', market_position: 'Challenger' },
              { rank: '7', brand: 'Bloom Nutrition', category: 'Wellness Supplement', velocity: '7.4', sentiment: '86%', botanical_focus: 'Mushroom blends, Adaptogens', market_position: 'Premium Niche' },
              { rank: '8', brand: 'Odyssey Mushroom Elixir', category: 'Functional Mushroom', velocity: '7.1', sentiment: '88%', botanical_focus: "Lion's Mane, Cordyceps", market_position: 'Emerging' },
              { rank: '9', brand: 'Kill Cliff Ignite', category: 'Clean Energy', velocity: '6.8', sentiment: '81%', botanical_focus: 'Green Tea, Elderflower', market_position: 'Growing' },
              { rank: '10', brand: 'Kin Euphorics', category: 'Botanical Functional', velocity: '6.5', sentiment: '85%', botanical_focus: 'Rhodiola, GABA, Ashwagandha', market_position: 'Premium Niche' }
            ],
            features: {
              sorting: true,
              columnFilters: ['category', 'market_position'],
              pagination: { pageSize: 10 },
              virtualise: false
            }
          }
        }
      ]
    },

    // Row 8: Analysis Charts (2 columns)
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
          descriptionBottom: '→ **DTC & Specialty Lead (94%, 91%):** Premium channels dominate — direct consumer relationships compound over time\n\n→ **Mainstream Gap (72%, 68%):** Convenience and grocery lagging — distribution expansion is the highest-leverage growth lever\n\n→ **Premium Retail (85%):** Whole Foods tier performing well — certification and sourcing narrative resonating',
          data: [
            { channel: 'Direct-to-Consumer', value: 94, max: 100 },
            { channel: 'Specialty Retail', value: 91, max: 100 },
            { channel: 'Online Marketplaces', value: 88, max: 100 },
            { channel: 'Whole Foods & Premium', value: 85, max: 100 },
            { channel: 'Mainstream Grocery', value: 68, max: 100 },
            { channel: 'Convenience Stores', value: 72, max: 100 }
          ]
        },
        {
          id: '',
          type: 'diverging-bar',
          status: 'ready',
          title: 'Market Expansion vs Constraints',
          subtitle: 'Growth drivers vs supply-side limitations',
          descriptionTop: 'What accelerates vs what limits scaling?',
          descriptionBottom: '→ **Consumer Demand (+4.1K):** Strongest positive signal — organic demand growth sustaining momentum\n\n→ **Wellness Community (+3.5K):** Community-driven adoption accelerating brand trust\n\n→ **Regulatory Complexity (-1.8K):** Largest constraint — botanical claims require FDA compliance rigor\n\n→ **Net Signal Advantage:** 2:1 positive-to-negative ratio confirms expansion window is open',
          data: [
            { driver: 'Consumer Demand Growth', positive: 4100, negative: -120 },
            { driver: 'Premium Price Acceptance', positive: 3200, negative: -250 },
            { driver: 'Wellness Community Expansion', positive: 3500, negative: -180 },
            { driver: 'DTC Channel Scaling', positive: 2800, negative: -320 },
            { driver: 'Supply Chain Constraints', positive: 600, negative: -1500 },
            { driver: 'Regulatory Complexity', positive: 400, negative: -1800 }
          ]
        }
      ]
    },

    // Row 9: Forecast (full width)
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
          descriptionBottom: '→ **Historical Acceleration:** Blue curve through May 2026 confirms non-linear adoption across premium channels\n\n→ **6.2B Unit Target:** Orange projection by September 2026 assumes continued DTC + specialty retail expansion\n\n→ **Conservative Bounds:** Confidence interval widens from Q3 onward reflecting regulatory and supply chain uncertainty',
          data: [
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
          ]
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

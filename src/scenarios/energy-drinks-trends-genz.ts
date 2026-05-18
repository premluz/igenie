import { type ScenarioData } from './types'

export const energyDrinks: ScenarioData = {
  id: 'energy-drinks',
  brand: 'Gen Z Clean Energy Surge — Natural Botanical Blends',
  category: 'Energy Drinks & Wellness',
  title: 'Gen Z Clean Energy Surge — Natural Botanical Blends',
  description: 'Explosive shift toward clean caffeine and functional wellness ingredients among Gen Z consumers',
  date: '2026-05-18',
  velocityScore: 9.2,
  sentimentScore: 89,
  sparklineData: [3, 4, 3, 5, 6, 8, 12],

  signals: [
    {
      id: 'sig-1',
      name: 'Social Buzz',
      icon: 'radio',
      velocity: 9.4,
      sentiment: 88,
      trend: 'rising'
    },
    {
      id: 'sig-2',
      name: 'Retail Movement',
      icon: 'trending',
      velocity: 8.9,
      sentiment: 86,
      trend: 'rising'
    },
    {
      id: 'sig-3',
      name: 'Search Acceleration',
      icon: 'search',
      velocity: 9.5,
      sentiment: 91,
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
          title: 'Insight validation',
          data: null
        }
      ]
    },
    // Row 2: Signal metrics (3 columns) - Tightened for immediate triage
    {
      columns: 3,
      cells: [
        {
          id: '',
          type: 'progress-bar',
          status: 'ready',
          title: 'Trend',
          subtitle: '',
          descriptionTop: '',
          descriptionBottom: 'Structural shift. Not a seasonal spike.',
          data: {
            type: 'trend',
            sparklineData: [3, 4, 3, 5, 6, 8, 12],
            color: '#10b981',
            value: 15.4
          }
        },
        {
          id: '',
          type: 'progress-bar',
          status: 'ready',
          title: 'Strength',
          subtitle: '',
          descriptionTop: '',
          descriptionBottom: '92nd percentile. High viral durability.',
          data: {
            type: 'strength',
            value: 9.2,
            max: 10,
            color: '#3b82f6'
          }
        },
        {
          id: '',
          type: 'progress-bar',
          status: 'ready',
          title: 'Trust',
          subtitle: '',
          descriptionTop: '',
          descriptionBottom: '42-channel validated. Act with confidence.',
          data: {
            type: 'trust',
            value: 89,
            max: 100,
            color: '#10b981'
          }
        }
      ]
    },

    // Row 3: Signal sources (full width)
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'signal-sources',
          status: 'ready',
          title: 'Signal sources',
          subtitle: '',
          descriptionTop: '',
          descriptionBottom: '6,214 data points across 42 verified channels show convergence: Social Buzz + Search Demand = Intent confirmation.',
          data: {
            total: '',
            pillars: [
              {
                id: 'social',
                icon: 'Radio',
                label: 'Social Buzz',
                value: '36',
                sparklineData: [3, 4, 4, 5, 6, 8, 10],
                subtext: 'TikTok & IG lifestyle mentions',
                color: 'emerald'
              },
              {
                id: 'retail',
                icon: 'TrendingUp',
                label: 'Retail Velocity',
                value: '26',
                sparklineData: [2, 3, 4, 5, 7, 8, 11],
                subtext: 'Convenience & e-commerce pull',
                color: 'blue'
              },
              {
                id: 'search',
                icon: 'Search',
                label: 'Search Demand',
                value: '38',
                sparklineData: [3, 4, 5, 6, 7, 9, 12],
                subtext: 'Ingredient & clean energy queries',
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
          title: 'Insight interpretation',
          data: null
        }
      ]
    },
    // Row 5: Narrative cards (3 columns)
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
          data: 'Gen Z demand for clean, botanical energy drinks is accelerating rapidly with 9.2/10 signal strength in early-adopter channels (DTC, specialty retail, Whole Foods)—verified cross-channel backing (89% trust).\n\nThis is a micro-niche/high-intent segment dynamic, NOT a total-market projection. 10x growth reflects velocity in adoption-ready channels; mass retail scaling requires separate supply-chain validation.\n\nLegacy brands locked into synthetic formulas. 6–9 month competitive response lag = first-mover window through Q3 2026.'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Business Implications',
          subtitle: '',
          descriptionTop: 'Strategic Insights',
          descriptionBottom: '',
          data: '• "Clean botanical" positioning achieves 3.5x higher conversion in Gen Z cohorts than traditional formulations\n\n• First-mover window is tight; competitor response lag from major conglomerates is estimated at 6–9 months\n\n• Convenience and DTC velocity is outperforming category baseline by 2.2x; signals strong demand in early-adopter channels\n\n• SUPPLY CHAIN FRICTION: Physical product 10x growth requires co-packer capacity expansion + regional logistics scaling. Budget 3–4 months for production ramping before mass retail.\n\n• Premium pricing tiers show high acceptance when paired with transparent functional benefits'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Action Recommendations',
          subtitle: '',
          descriptionTop: 'Next Steps (Priority Order)',
          descriptionBottom: '',
          data: '• Fast-track formula approval for botanical SKU line; capitalize on the open window before Q3 closes\n\n• Direct 65% of regional media spend to TikTok and community-driven creator partnerships\n\n• Deploy initial batch to top 15 urban metros (DTC + specialty); test premium indexing at a $3.99 per unit price point\n\n• Lock shelf agreements in early-adopter channels (Whole Foods, specialty health) before digital proxy awareness crosses 45% threshold\n\n• Scale to mass retail once brand health survey validates $50k+ quarterly awareness benchmarks confirm 60%+ consumer trial intent\n\n• Audit social sentiment weekly; trigger national distribution phase if awareness surpasses 60% by late Q2\n\n___BUTTON___Generate Ideas___POWERED_BY_Innov8___'
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
    // Row 6: Additional narrative depth (3 columns)
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
          descriptionBottom: 'Early adopters skew 62% Gen Z / young Millennial, urban centers, indexing high for holistic wellness and active lifestyles.',
          data: '• Gen Z accounts for 64% of active social mentions, favoring zero-crash functional alternatives\n\n• Specialty and premium convenience channels outperforming standard grocery loops by 3.2x\n\n• High-intent digital search velocity growing 2.5x faster than brick-and-mortar indexing\n\n• Clean label transparency is the primary driver over standard generic taste profiles'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Competitive Landscape',
          subtitle: '',
          descriptionTop: 'Incumbent response timeline?',
          descriptionBottom: 'Legacy CPG conglomerates are limited by production lines; market response lag is 6–9 months. Window closes Q3 2026.',
          data: '• No major legacy brand has a dedicated clean botanical SKU ready for market\n\n• Indirect competition coming from fragmented wellness beverage startups\n\n• Strategic intelligence indicates tier-1 players are monitoring macro search data; speed-to-shelf owns the narrative\n\n• Securing shelf contracts early builds a defensive moat against post-trend entrants'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Risk Mitigation',
          subtitle: '',
          descriptionTop: 'What could go wrong?',
          descriptionBottom: 'Core vulnerabilities include ingredient supply constraints, co-packer lead times, and flavor portfolio scaling.',
          data: '• Supply chain: Lock in long-term natural extract contracts immediately\n\n• Market velocity: Track search shifts weekly to detect prompt pivots in flavor preferences\n\n• Messaging: Guard "clean" certification status fiercely against competitor dynamic tracking\n\n• Distribution: Build backup co-packer relationships to mitigate regional out-of-stock threats'
        }
      ]
    },

    // Row 7: Financial Performance Header
    // Methodology & Defense Section
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'header',
          status: 'ready',
          title: 'Methodology & Signal Validation',
          data: null
        }
      ]
    },

    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Market Awareness Proxy Calculation',
          subtitle: '',
          descriptionTop: 'How We Define the 45% Threshold',
          descriptionBottom: 'Presto synthesizes a real-time digital proxy for category awareness—not a brand health survey replacement.',
          data: 'Market Awareness Proxy = (Current Category Search Volume / 12-month Baseline Category Search Volume) x (Social Mention Velocity / Historical Mention Baseline)\n\n• Baseline = average organic "clean energy drink" / "botanical energy" monthly search volume (2024-2025)\n\n• Current Volume = April-May 2026 search trends + social velocity convergence\n\n• 45% Threshold = inflection point where competitor awareness begins climbing; signals window is closing\n\n• 60%+ Threshold = validated by quarterly brand health survey ($50k budget); triggers full national distribution approval\n\nThis is NOT a replacement for formal research - it\'s an early-warning algorithmic signal.'
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
          title: 'Insight artifacts',
          data: null
        }
      ]
    },

    // Row 8: Charts (2 columns)
    {
      columns: 2,
      cells: [
        {
          id: '',
          type: 'combo-chart',
          status: 'ready',
          title: 'Monthly Revenue Trend',
          subtitle: 'Unit volume growth with sentiment tracking',
          descriptionTop: 'Sales velocity with market perception',
          descriptionBottom: 'Monthly volumes 10x in 12 months; sentiment staying elevated (88-90%) suggests sustained consumer confidence, not hype-driven spike.',
          data: null
        },
        {
          id: '',
          type: 'radar',
          status: 'ready',
          title: 'Signal Strength Radar',
          subtitle: 'Multi-dimensional signal analysis (blue) vs. category benchmark (gray)',
          descriptionTop: 'Strategic strength assessment',
          descriptionBottom: 'Digital-first signal: Social (94%) and Influencer (91%) lead; Retail (76%) and Price Acceptance (72%) lagging. Asymmetric polygon shape reveals strategic gaps.',
          data: null
        }
      ]
    },

    // Row 9: Analysis Charts (2 columns)
    {
      columns: 2,
      cells: [
        {
          id: '',
          type: 'segment-strength',
          status: 'ready',
          title: 'Market Segment Strength',
          subtitle: 'Gen Z acquisition strength by channel',
          descriptionTop: 'Where momentum is strongest?',
          descriptionBottom: 'TikTok leads at 96% with Instagram at 91%; search and influencer partnerships sustaining velocity. Retail lagging at 84%.',
          data: null
        },
        {
          id: '',
          type: 'diverging-bar',
          status: 'ready',
          title: 'Positive vs Negative Indicators',
          subtitle: 'Tailwinds (positive) vs competitive headwinds',
          descriptionTop: 'What momentum factors matter most?',
          descriptionBottom: 'Viral social mechanics (+4.2K signals) and retail velocity (+3.8K) far exceed competitor response risk (-2.8K). 3:1 signal-to-risk ratio.',
          data: null
        }
      ]
    },

    // Row 10: Forecast & Trajectory (full width)
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'forecast-chart',
          status: 'ready',
          title: 'Forecast Trajectory',
          subtitle: 'Early-adopter channel projection (DTC + specialty premium retail)',
          descriptionTop: 'Where is the micro-niche market heading?',
          descriptionBottom: '10x growth reflects early-adopter velocity in high-intent channels (DTC, Whole Foods, specialty wellness retail)—NOT total national projection. Forecast assumes supply chain scaling & co-packer availability through Sept 2026. Mass retail expansion would follow separate S-curve phase.',
          data: null
        }
      ]
    }
  ],

  chartData: {
    'Monthly Revenue Trend': [
      { date: '2025-05-01', volume: 280, sentiment: 82 },
      { date: '2025-06-01', volume: 340, sentiment: 84 },
      { date: '2025-07-01', volume: 420, sentiment: 86 },
      { date: '2025-08-01', volume: 520, sentiment: 87 },
      { date: '2025-09-01', volume: 660, sentiment: 88 },
      { date: '2025-10-01', volume: 840, sentiment: 89 },
      { date: '2025-11-01', volume: 1050, sentiment: 90 },
      { date: '2025-12-01', volume: 1290, sentiment: 89 },
      { date: '2026-01-01', volume: 1580, sentiment: 88 },
      { date: '2026-02-01', volume: 1920, sentiment: 89 },
      { date: '2026-03-01', volume: 2340, sentiment: 90 },
      { date: '2026-04-01', volume: 2850, sentiment: 88 },
      { date: '2026-05-18', volume: 3580, sentiment: 89 }
    ],

    'Signal Strength Radar': [
      { dimension: 'Social Buzz', value: 94, benchmark: 72, max: 100 },
      { dimension: 'Search Demand', value: 88, benchmark: 68, max: 100 },
      { dimension: 'Retail Velocity', value: 76, benchmark: 64, max: 100 },
      { dimension: 'Influencer Reach', value: 91, benchmark: 70, max: 100 },
      { dimension: 'Sentiment Score', value: 89, benchmark: 75, max: 100 },
      { dimension: 'Price Acceptance', value: 72, benchmark: 60, max: 100 }
    ],

    'Market Segment Strength': [
      { channel: 'TikTok', value: 96, max: 100 },
      { channel: 'Instagram', value: 91, max: 100 },
      { channel: 'Retail POS', value: 84, max: 100 },
      { channel: 'Google Search', value: 93, max: 100 },
      { channel: 'eCommerce', value: 87, max: 100 },
      { channel: 'Influencer Network', value: 89, max: 100 }
    ],

    'Forecast Trajectory': [
      { date: '2025-09-01', value: 660, type: 'historical' },
      { date: '2025-10-01', value: 840, type: 'historical' },
      { date: '2025-11-01', value: 1050, type: 'historical' },
      { date: '2025-12-01', value: 1290, type: 'historical' },
      { date: '2026-01-01', value: 1580, type: 'historical' },
      { date: '2026-02-01', value: 1920, type: 'historical' },
      { date: '2026-03-01', value: 2340, type: 'historical' },
      { date: '2026-04-01', value: 2850, type: 'historical' },
      { date: '2026-05-01', value: 3420, type: 'historical' },
      { date: '2026-05-18', value: 3580, type: 'today', isToday: true },
      { date: '2026-06-01', value: 4100, type: 'forecast', lower: 3895, upper: 4305 },
      { date: '2026-07-01', value: 4950, type: 'forecast', lower: 4693, upper: 5208 },
      { date: '2026-08-01', value: 5950, type: 'forecast', lower: 5641, upper: 6259 },
      { date: '2026-09-01', value: 7100, type: 'forecast', lower: 6725, upper: 7475 },
      { date: '2026-10-01', value: 8400, type: 'forecast', lower: 7959, upper: 8841 },
      { date: '2026-11-01', value: 9850, type: 'forecast', lower: 9336, upper: 10364 }
    ],

    'Positive vs Negative Indicators': [
      { driver: 'Viral Social Mentions', positive: 4200, negative: -120 },
      { driver: 'Retail Shelf Velocity', positive: 3800, negative: -180 },
      { driver: 'Search Demand Surge', positive: 4500, negative: -150 },
      { driver: 'Influencer Partnerships', positive: 3200, negative: -220 },
      { driver: 'Premium Price Acceptance', positive: 2900, negative: -380 },
      { driver: 'Competitor Response Risk', positive: 450, negative: -2800 }
    ]
  },

  narratives: {
    'Clean Energy Surge — Natural Botanical Blends':
      'Gen Z consumer velocity toward organic caffeine variants is showing extreme non-linear expansion across key trackers.'
  },

  scenarioTriggers: [
    {
      keywords: ['energy', 'clean energy'],
      nextScenarioId: 'botanical-energy-deepdive'
    }
  ],

  animationSpeed: {
    title: 10,
    description: 10
  },

  loadingDelay: 8000,

  loadingMessages: {
    intent: {
      header: 'Understanding intent...',
      header_done: 'Intent understood',
      texts: ['Analyzing "Gen Z clean energy surge" request', 'Isolating botanical blend parameters', 'Mapping early-adopter channel dynamics']
    },
    analysis: {
      header: 'Analyzing data...',
      header_done: 'Analysis complete',
      texts: ['Parsing social conversation signals (TikTok, Instagram, Reddit)', 'Evaluating retail velocity patterns across DTC + specialty channels', 'Calculating semantic sentiment from product reviews & creator content']
    },
    synthesis: {
      header: 'Synthesizing insights...',
      header_done: 'Synthesis complete',
      texts: ['Correlating signals to micro-niche segment strength', 'Mapping 45% awareness threshold progression', 'Finalizing executive narrative & recommendations']
    },
    summary: 'Gen Z Clean Energy Insights ready'
  }
}
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
          descriptionBottom: '→  Structural shift. Not a seasonal spike.',
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
          descriptionBottom: '→ 92nd percentile. High viral durability.',
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
          descriptionBottom: '→ 42-channel validated. Act with confidence.',
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
          descriptionBottom: '→ 6,214 data points across 42 verified channels show convergence: Social Buzz + Search Demand = Intent confirmation.',
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
          descriptionBottom: '→ **Signal Verdict:** 9.2/10 strength with 89% trust — act within the Q3 2026 first-mover window.',
          data: '→ **Signal Strength:** Gen Z demand for clean, botanical energy drinks is accelerating rapidly with 9.2/10 signal strength in early-adopter channels (DTC, specialty retail, Whole Foods) — verified cross-channel backing (89% trust).\n\n→ **Scope Clarity:** This is a micro-niche/high-intent segment dynamic, NOT a total-market projection. 10x growth reflects velocity in adoption-ready channels; mass retail scaling requires separate supply-chain validation.\n\n→ **Competitive Window:** Legacy brands locked into synthetic formulas. 6–9 month competitive response lag = first-mover window through Q3 2026.'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Business Implications',
          subtitle: '',
          descriptionTop: 'Strategic Insights',
          descriptionBottom: '→ **Bottom Line:** 3.5x conversion advantage with a 6–9 month window before major conglomerates respond.',
          data: '→ **Clean Botanical Positioning:** Achieves 3.5x higher conversion in Gen Z cohorts than traditional formulations — strongest differentiator in category.\n\n→ **First-Mover Window:** Tight and closing; competitor response lag from major conglomerates is estimated at 6–9 months.\n\n→ **Channel Velocity:** Convenience and DTC outperforming category baseline by 2.2x; signals strong demand in early-adopter channels.\n\n→ **Supply Chain Friction:** Physical product 10x growth requires co-packer capacity expansion + regional logistics scaling. Budget 3–4 months for production ramping before mass retail.\n\n→ **Premium Pricing:** Tiers show high acceptance when paired with transparent functional benefits.'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Action Recommendations',
          subtitle: '',
          descriptionTop: 'Next Steps (Priority Order)',
          descriptionBottom: '→ **Urgency:** Q3 window is open now — delay beyond 60 days risks losing first-mover advantage.',
          data: '→ **Formula Fast-Track:** Approve botanical SKU line immediately; capitalize on the open window before Q3 closes.\n\n→ **Media Allocation:** Direct 65% of regional media spend to TikTok and community-driven creator partnerships.\n\n→ **Metro Launch:** Deploy initial batch to top 15 urban metros (DTC + specialty); test premium indexing at a $3.99 per unit price point.\n\n→ **Shelf Lock:** Secure agreements in early-adopter channels (Whole Foods, specialty health) before digital proxy awareness crosses 45% threshold.\n\n→ **Mass Retail Trigger:** Scale once brand health survey validates $50k+ quarterly awareness benchmarks and confirms 60%+ consumer trial intent.\n\n→ **Sentiment Monitoring:** Audit social sentiment weekly; trigger national distribution phase if awareness surpasses 60% by late Q2.\n\n___BUTTON___Generate Ideas___POWERED_BY_Innov8___'
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
          title: 'Additional narrative depth',
          data: null
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
    },



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
    // Row 8: Market Summary
    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Market Opportunity Summary',
          subtitle: '',
          descriptionBottom: '→ **Window Open:** 6–9 month first-mover advantage before major conglomerates respond. Decision required by Q3 2026 to secure market position.',
          data: '→ **Clean Botanical Energy Trend:** Gen Z consumers are shifting toward functional beverages with transparent, minimal ingredient lists. Current gap in market: major legacy brands (Red Bull, Monster, NOS) lack authentic botanical positioning.\n\n→ **Signal Strength:** 9.2/10 across all channels (social, retail, search) with 89% confidence. Velocity acceleration is non-linear—not seasonal spike, structural shift in consumer preference.\n\n→ **Competition Void:** Traditional energy drink manufacturers are locked into synthetic formulations. Response lag estimated at 6–9 months—enough time to establish brand moat and capture first-adopter loyalty.\n\n→ **Channel Velocity:** DTC and specialty retail showing 2.2x category baseline growth. Premium pricing ($3.99–$4.99/unit) has strong acceptance in early-adopter demographics (fitness, wellness, lifestyle communities).\n\n→ **Supply Chain Gate:** Physical production scaling for 10x growth requires 3–4 months lead time. Co-packer contracts must be locked NOW to capture Q2–Q3 retail window. Delay beyond 60 days risks losing first-mover advantage.'
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
          descriptionBottom: '→  Monthly volumes 10x in 12 months; sentiment staying elevated (88-90%) suggests sustained consumer confidence, not hype-driven spike.',
          data: null
        },
        {
          id: '',
          type: 'radar',
          status: 'ready',
          title: 'Signal Strength Radar',
          subtitle: 'Multi-dimensional signal analysis (blue) vs. category benchmark (gray)',
          descriptionTop: 'Strategic strength assessment',
          descriptionBottom: '→ Digital-first signal: Social (94%) and Influencer (91%) lead; Retail (76%) and Price Acceptance (72%) lagging. Asymmetric polygon shape reveals strategic gaps.',
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
          descriptionBottom: '→ TikTok leads at 96% with Instagram at 91%; search and influencer partnerships sustaining velocity. Retail lagging at 84%.',
          data: null
        },
        {
          id: '',
          type: 'diverging-bar',
          status: 'ready',
          title: 'Positive vs Negative Indicators',
          subtitle: 'Tailwinds (positive) vs competitive headwinds',
          descriptionTop: 'What momentum factors matter most?',
          descriptionBottom: '→ **Viral Social Mechanics:** +4.2K signals overwhelming social platforms\n\n→ **Retail Velocity:** +3.8K shelf movement significantly outpacing category\n\n→ **Search Demand:** +4.5K queries showing sustained organic interest\n\n→ **Influencer Reach:** +3.2K creator partnerships amplifying reach\n\n→ **Competitor Risk:** -2.8K response signals indicate slow response window (3:1 opportunity-to-risk ratio)',
          data: [
            { driver: 'Viral Social Mentions', positive: 4200, negative: -120 },
            { driver: 'Retail Shelf Velocity', positive: 3800, negative: -180 },
            { driver: 'Search Demand Surge', positive: 4500, negative: -150 },
            { driver: 'Influencer Partnerships', positive: 3200, negative: -220 },
            { driver: 'Premium Price Acceptance', positive: 2900, negative: -380 },
            { driver: 'Competitor Response Risk', positive: 450, negative: -2800 }
          ]
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
          descriptionBottom: '→ 10x growth reflects early-adopter velocity in high-intent channels (DTC, Whole Foods, specialty wellness retail)—NOT total national projection. Forecast assumes supply chain scaling & co-packer availability through Sept 2026. Mass retail expansion would follow separate S-curve phase.',
          data: null
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
      keywords: ['usa', 'clean energy'],
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
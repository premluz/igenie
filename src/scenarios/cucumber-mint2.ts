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
}

export const cucumberMint2: ScenarioData = {
  id: 'cucumber-mint2-2026',
  brand: 'GreenWave Beverages',
  category: 'Plant-Based Drinks',
  title: 'Plant-Based Beverage Innovation — Mixed Signals in Niche Segment',
  description: 'Emerging plant-based drink category showing growth in premium segment but declining in mass market',
  date: '2026-05-13',
  velocityScore: 6.5,
  sentimentScore: 72,
  sparklineData: [3, 5, 4, 6, 7, 6, 8],

  signals: [
    {
      id: 'sig-1',
      name: 'Social Buzz',
      icon: 'radio',
      velocity: 7.2,
      sentiment: 78,
      trend: 'rising'
    },
    {
      id: 'sig-2',
      name: 'Retail Movement',
      icon: 'trending',
      velocity: 5.8,
      sentiment: 65,
      trend: 'stable'
    },
    {
      id: 'sig-3',
      name: 'Search Acceleration',
      icon: 'search',
      velocity: 6.5,
      sentiment: 73,
      trend: 'rising'
    }
  ],

  initialLayout: [
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
          descriptionBottom: 'Momentum shows volatility with slight upward bias; social and search outpacing retail. Suggests strong online/influencer traction but retail channel maturation. Bifurcated market signals.',
          data: {
            type: 'trend',
            sparklineData: [3, 5, 4, 6, 7, 6, 8],
            color: '#f59e0b',
            value: 4.2
          }
        },
        {
          id: '',
          type: 'progress-bar',
          status: 'ready',
          title: 'Strength',
          subtitle: 'Signal power',
          descriptionTop: 'Signal strength across channels',
          descriptionBottom: 'Signal strength at 6.5/10; moderately competitive for beverage category. Performance driven by social/search; retail velocity is lagging. Influencer-led growth masking weak traditional distribution.',
          data: {
            type: 'strength',
            value: 6.5,
            max: 10,
            color: '#f59e0b'
          }
        },
        {
          id: '',
          type: 'progress-bar',
          status: 'ready',
          title: 'Trust',
          subtitle: 'Source validity',
          descriptionTop: 'Validation across sources',
          descriptionBottom: '72% validity via 35-channel cross-referencing; moderate confidence. Signal strength driven primarily by social (potentially biased toward early adopters). Retail data suggests slower mainstream adoption than social metrics indicate.',
          data: {
            type: 'trust',
            value: 72,
            max: 100,
            color: '#f59e0b'
          }
        }
      ]
    },

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
          descriptionBottom: '3,421 data points across 35 verified channels show divergence: Social/Search momentum strong; Retail stability at lower velocity. Suggests influencer-led early-adopter growth not yet converting to mainstream retail velocity.',
          data: {
            total: 'Mixed signals: Online momentum vs. Retail caution; channel divergence is material',
            pillars: [
              {
                id: 'social',
                icon: 'Radio',
                label: 'Social Buzz',
                value: '31',
                sparklineData: [2, 3, 5, 6, 7, 8, 9],
                subtext: 'Strong influencer traction',
                color: 'emerald'
              },
              {
                id: 'retail',
                icon: 'TrendingUp',
                label: 'Retail Velocity',
                value: '18',
                sparklineData: [5, 5, 5, 5, 6, 6, 6],
                subtext: 'Stable but muted growth',
                color: 'blue'
              },
              {
                id: 'search',
                icon: 'Search',
                label: 'Search Demand',
                value: '28',
                sparklineData: [3, 4, 5, 6, 7, 8, 8],
                subtext: 'Growing category interest',
                color: 'purple'
              }
            ]
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
          title: 'Executive Summary',
          subtitle: '',
          descriptionTop: 'AI Synthesis of the Signal',
          descriptionBottom: '',
          data: 'Plant-based beverage segment showing 6.5/10 signal strength with strong consumer interest online but cautious retail adoption. Market is bifurcated: premium online channels thriving; mass-market retail moving slowly.\n\nSocial and search signals indicate genuine consumer interest in category; however, retail velocity lags, suggesting either distribution constraints or price sensitivity in mainstream channels.\n\nOpportunity exists in premium DTC + selective retail positioning, but requires different strategy than mass-market plays. Market shows classic early-adopter pattern; mainstream adoption timing uncertain.'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Business Implications',
          subtitle: '',
          descriptionTop: 'Strategic Insights',
          descriptionBottom: '',
          data: '• Plant-based positioning resonates strongly with online audience (social + search momentum clear)\n\n• Retail channel friction suggests pricing or distribution barriers; mainstream retailers cautious on commitment\n\n• E-commerce skews toward premium price points; mass-market positioning underperforming vs. niche premium\n\n• Influencer/social-driven awareness not yet translating to retail velocity; awareness/action gap\n\n• Category growth likely; market structure (premium online vs. retail trade-off) will determine profitability'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Action Recommendations',
          subtitle: '',
          descriptionTop: 'Next Steps (Priority Order)',
          descriptionBottom: '',
          data: '• Establish direct-to-consumer (DTC) brand first; build customer loyalty and data before retail push\n\n• Test premium tier in selective retail locations (Whole Foods, specialty); avoid mass-market channel initially\n\n• Double down on influencer partnerships in wellness segment; social signal is strong and cost-efficient\n\n• Validate retail demand through limited distribution before committing to major CPG expansions\n\n• Plan mainstream positioning for 2027; current market structure favors premium early; mass-market timing premature\n\n___BUTTON___Build DTC Strategy___POWERED_BY_Innov8___'
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
          title: 'Segment Insights',
          subtitle: '',
          descriptionTop: 'Who is driving adoption?',
          descriptionBottom: 'Younger affluent demographics (25–40) driving category; strong female skew (68%); concentrated in metro areas with high health consciousness. Mass market not yet engaged.',
          data: '• Millennial + Gen Z: 72% of social mentions; high brand loyalty if differentiated on authenticity\n\n• Female representation: 68% of purchasers; wellness positioning resonates with this demographic\n\n• Urban concentration: Top 15 metros account for 68% of retail velocity; category expansion is geography-dependent\n\n• Price elasticity: Premium tier (>$4.99) growing faster than value tier; suggests affluent early-adopter base'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Competitive Landscape',
          subtitle: '',
          descriptionTop: 'Incumbent response timelines',
          descriptionBottom: 'Large beverage companies monitoring category but not yet committing; fear of cannibalizing core products. Window of opportunity for niche players: 12–18 months before major CPG entries.',
          data: '• Large incumbents (Coca-Cola, PepsiCo) launching exploratory products; not committed yet\n\n• Indie/DTC brands (established: $50M+ revenue) gaining share in premium segment\n\n• Distribution bottleneck: Limited shelf space in mainstream channels favors focused brand strategies\n\n• First-mover advantage in retail partner relationships possible; timing is critical\n\n• Category consolidation likely in 18–24 months; acquisition targets emerging for large CPG players'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Risk Mitigation',
          subtitle: '',
          descriptionTop: 'Key uncertainties and mitigants',
          descriptionBottom: 'Primary risks: mainstream adoption timing, retail partner commitment uncertainty, incumbent response speed, consumer taste/preference shifts.',
          data: '• Adoption timing: If mass-market adoption doesn\'t materialize by 2027, profitability delayed; stay nimble\n\n• Retail dependency: Don\'t over-commit to retail deals without volume guarantees; DTC is safer bet\n\n• Incumbent competition: Large players can outspend on marketing; focus on differentiation (taste, positioning)\n\n• Taste validation: Consumer testing shows good receptivity; taste/quality is not primary risk\n\n• Capital efficiency: Avoid scaling inventory until retail demand signals clearly positive'
        }
      ]
    },

    {
      columns: 1,
      cells: [
        {
          id: '',
          type: 'table',
          status: 'ready',
          title: 'Market Performance & Financial Outlook',
          subtitle: 'Quarterly metrics summary',
          descriptionTop: 'Key financial and operational indicators',
          descriptionBottom: 'Growth trajectory accelerating: Revenue $935 (Q2 2025) → $2,210 (Q1 2026, +136% growth). Pipeline surge stronger (+137%), indicating customer acquisition scaling. DTC channel driving early growth; retail adoption ramping Q4→Q1.',
          data: {
            columns: [
              { key: 'metric', label: 'Metric' },
              { key: 'q2_2025', label: 'Q2 2025' },
              { key: 'q3_2025', label: 'Q3 2025' },
              { key: 'q4_2025', label: 'Q4 2025' },
              { key: 'q1_2026', label: 'Q1 2026' },
              { key: 'trend', label: 'Trend' }
            ],
            rows: [
              { metric: 'Revenue', q2_2025: '935', q3_2025: '1,145', q4_2025: '1,560', q1_2026: '2,210', trend: '↑ +136%' },
              { metric: 'Pipeline Opportunity', q2_2025: '935', q3_2025: '1,145', q4_2025: '1,560', q1_2026: '2,210', trend: '↑ +137%' },
              { metric: 'Avg Sentiment', q2_2025: '70%', q3_2025: '73%', q4_2025: '73%', q1_2026: '72%', trend: '↑ +2 pts' },
              { metric: 'DTC Channel', q2_2025: '58%', q3_2025: '62%', q4_2025: '65%', q1_2026: '62%', trend: '↑ growth→stable' },
              { metric: 'Retail Distribution', q2_2025: '8 cities', q3_2025: '12 cities', q4_2025: '18 cities', q1_2026: '24 cities', trend: '↑ 3x expansion' }
            ]
          }
        }
      ]
    },

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
          descriptionBottom: 'Accelerating growth from low base: May 2025 ($280) → Apr 2026 ($890, +218%). Momentum sustained through Q4/Q1 period. Sentiment stable at 71-72%, indicating customer satisfaction tracking with growth. No quality-velocity tradeoff visible.',
          data: null
        },
        {
          id: '',
          type: 'combo-chart',
          status: 'ready',
          title: 'Quarterly Pipeline',
          subtitle: 'Opportunity pipeline by stage',
          descriptionTop: 'Forward indicator of revenue',
          descriptionBottom: 'Pipeline growth outpacing revenue (+137% vs +136%): Q2 2025 ($935) → Q1 2026 ($2,210). Indicates strong sales funnel acceleration. Wholesale/retail partnerships signed Q4 showing payoff. Forecast: Continued 40-50% QoQ growth sustainable through Q2 2026.',
          data: null
        }
      ]
    },

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
          descriptionBottom: 'Social (82%) and Search (76%) lead; E-commerce (71%) solid. Influencer Traction (82%) matching Social, validating strategy. Mass-Market Readiness (35%) lags—strategic decision to focus premium/DTC first is working. Retail (58%) building momentum from low base.',
          data: null
        },
        {
          id: '',
          type: 'diverging-bar',
          status: 'ready',
          title: 'Positive vs Negative Signals',
          subtitle: 'Tailwinds vs. headwinds',
          descriptionTop: 'What is working vs. what isn\'t?',
          descriptionBottom: 'Positive drivers (Social, Search, DTC, Premium Retail) substantially outweigh headwinds. Mainstream Retail (-1,200) and Incumbent Response (-1,400) are real but manageable. Net positive 4,200 vs negative 5,200 signals strong upside potential with clear execution risk mitigation path.',
          data: null
        }
      ]
    }
  ],

  chartData: {
    'Monthly Revenue Trend': [
      { date: '2025-05-01', volume: 280, sentiment: 68 },
      { date: '2025-06-01', volume: 310, sentiment: 70 },
      { date: '2025-07-01', volume: 345, sentiment: 72 },
      { date: '2025-08-01', volume: 380, sentiment: 74 },
      { date: '2025-09-01', volume: 420, sentiment: 75 },
      { date: '2025-10-01', volume: 460, sentiment: 75 },
      { date: '2025-11-01', volume: 520, sentiment: 74 },
      { date: '2025-12-01', volume: 580, sentiment: 73 },
      { date: '2026-01-01', volume: 650, sentiment: 72 },
      { date: '2026-02-01', volume: 720, sentiment: 71 },
      { date: '2026-03-01', volume: 800, sentiment: 71 },
      { date: '2026-04-01', volume: 890, sentiment: 72 }
    ],

    'Quarterly Pipeline': [
      { date: '2025-Q2', volume: 935, sentiment: 70 },
      { date: '2025-Q3', volume: 1145, sentiment: 73 },
      { date: '2025-Q4', volume: 1560, sentiment: 73 },
      { date: '2026-Q1', volume: 2210, sentiment: 72 }
    ],

    'Market Segment Strength': [
      { dimension: 'E-commerce Strength', value: 71, max: 100 },
      { dimension: 'Influencer Traction', value: 82, max: 100 },
      { dimension: 'Premium Retail', value: 58, max: 100 },
      { dimension: 'Social Momentum', value: 82, max: 100 },
      { dimension: 'Search Intent', value: 76, max: 100 },
      { dimension: 'Mass-Market Readiness', value: 35, max: 100 }
    ],

    'Positive vs Negative Indicators': [
      { driver: 'Social Influencer Power', positive: 2800, negative: -420 },
      { driver: 'Search Category Growth', positive: 2600, negative: -380 },
      { driver: 'DTC Revenue Velocity', positive: 2400, negative: -320 },
      { driver: 'Premium Retail Adoption', positive: 1800, negative: -680 },
      { driver: 'Mainstream Retail Friction', positive: 800, negative: -1200 },
      { driver: 'Incumbent Competitive Response', positive: 200, negative: -1400 }
    ]
  },

  narratives: {
    'Plant-Based Beverage Innovation — Mixed Signals in Niche Segment':
      'Emerging plant-based beverage category showing strong online and influencer traction but cautious retail adoption; bifurcated market with premium DTC outpacing mass-market channels.'
  }
}

export const scenarios = {
  'cucumber-mint2': cucumberMint2
}

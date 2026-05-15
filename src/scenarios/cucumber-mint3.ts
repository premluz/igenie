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

export const cucumberMint3: ScenarioData = {
  id: 'cucumber-mint3-2026',
  brand: 'EvoGlow Cosmetics',
  category: 'Sustainable Beauty',
  title: 'Sustainable Beauty Category Maturation — Stable Growth with Sustainability Premium',
  description: 'Established players in sustainable cosmetics showing steady growth on back of environmental positioning',
  date: '2026-05-13',
  velocityScore: 7.1,
  sentimentScore: 81,
  sparklineData: [5, 6, 6, 7, 7, 7, 8],

  signals: [
    {
      id: 'sig-1',
      name: 'Social Buzz',
      icon: 'radio',
      velocity: 7.4,
      sentiment: 84,
      trend: 'rising'
    },
    {
      id: 'sig-2',
      name: 'Retail Movement',
      icon: 'trending',
      velocity: 6.8,
      sentiment: 79,
      trend: 'stable'
    },
    {
      id: 'sig-3',
      name: 'Search Acceleration',
      icon: 'search',
      velocity: 7.1,
      sentiment: 80,
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
          descriptionBottom: 'Momentum steady with slight upward bias; momentum reflects mature category with structural tailwinds (ESG demand, regulatory pressure). Sustainable premium positioning showing durability.',
          data: {
            type: 'trend',
            sparklineData: [5, 6, 6, 7, 7, 7, 8],
            color: '#10b981',
            value: 2.8
          }
        },
        {
          id: '',
          type: 'progress-bar',
          status: 'ready',
          title: 'Strength',
          subtitle: 'Signal power',
          descriptionTop: 'Signal strength across channels',
          descriptionBottom: 'Signal strength at 7.1/10; strong for mature cosmetics category. Well-balanced across social, retail, and search. Indicates established market position with broad appeal, not early-adopter concentration.',
          data: {
            type: 'strength',
            value: 7.1,
            max: 10,
            color: '#10b981'
          }
        },
        {
          id: '',
          type: 'progress-bar',
          status: 'ready',
          title: 'Trust',
          subtitle: 'Source validity',
          descriptionTop: 'Validation across sources',
          descriptionBottom: '81% validity via 42-channel cross-referencing; strong confidence level. Signal consistency across social, retail, and search suggests genuine market consensus, not influencer-driven hype.',
          data: {
            type: 'trust',
            value: 81,
            max: 100,
            color: '#10b981'
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
          descriptionBottom: '4,238 data points across 42 verified channels show alignment: Social, Retail, and Search moving together suggests ecosystem confidence. ESG narrative resonating across all customer touchpoints.',
          data: {
            total: 'Aligned signals across channels; sustainable beauty category gaining structural market share',
            pillars: [
              {
                id: 'social',
                icon: 'Radio',
                label: 'Social Buzz',
                value: '36',
                sparklineData: [4, 5, 6, 7, 7, 8, 8],
                subtext: 'Sustainability messaging strong',
                color: 'emerald'
              },
              {
                id: 'retail',
                icon: 'TrendingUp',
                label: 'Retail Velocity',
                value: '32',
                sparklineData: [5, 6, 6, 6, 7, 7, 7],
                subtext: 'Stable retail shelf presence',
                color: 'blue'
              },
              {
                id: 'search',
                icon: 'Search',
                label: 'Search Demand',
                value: '34',
                sparklineData: [5, 6, 6, 7, 7, 7, 8],
                subtext: 'Steady category interest',
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
          data: 'Sustainable cosmetics category is established and maturing with 7.1/10 signal strength and high confidence (81% trust). Strong alignment across social, retail, and search signals indicates ecosystem consensus rather than hype.\n\nMarket is being driven by structural ESG trends, regulatory pressure, and mainstream consumer adoption of sustainability positioning. This is not a niche trend; it\'s becoming category baseline expectation.\n\nGrowth opportunity is modest but durable; sustainable premium positioning commands price premium and attracts affluent demographic. Market will expand slowly as category matures but risk profile is low given broad signal alignment.'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Business Implications',
          subtitle: '',
          descriptionTop: 'Strategic Insights',
          descriptionBottom: '',
          data: '• Sustainability is now category table-stakes; brands without ESG positioning will struggle\n\n• Premium pricing sustainable; consumers willing to pay 20-30% premium for verified sustainable positioning\n\n• Retail shelf space expanding for sustainable brands; incumbent pressure on greenwashing claims\n\n• Consumer sentiment durable; environmental messaging resonating across demographics, not just early adopters\n\n• Category growth structural; driven by regulation (EU Regulations), investor pressure (ESG mandates), and consumer preference shift'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Action Recommendations',
          subtitle: '',
          descriptionTop: 'Next Steps (Priority Order)',
          descriptionBottom: '',
          data: '• Audit supply chain for authentic sustainability claims; greenwashing risk is high as category grows\n\n• Invest in third-party certifications (B-Corp, Fair Trade); consumers and retailers demanding proof\n\n• Expand premium tier; market shows price elasticity for truly sustainable offerings\n\n• Deepen retail partnerships; category shelf space expanding; shelf-placement opportunities exist\n\n• Build narrative around impact; quantify environmental benefits (water saved, emissions avoided, waste diverted)\n\n___BUTTON___Audit Sustainability Claims___POWERED_BY_Innov8___'
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
          descriptionBottom: 'Affluent, educated demographics (HHI >$100k) are primary drivers; strong female skew (74%); age 25-55 concentrated. Mainstream adoption expanding but still above-average income bias.',
          data: '• Demographic skew: Affluent (HHI >$100k) account for 68% of premium sustainable beauty sales\n\n• Female dominance: 74% female purchasers; wellness + sustainability narrative resonates\n\n• Age distribution: 25-55 age range; broader than typical premium beauty (previous 35-50 skew)\n\n• Education correlation: College-educated consumers overrepresented; higher price point acceptance\n\n• Geography: Urban + suburban expansion; once limited to coastal metros, now spreading to secondary cities'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Competitive Landscape',
          subtitle: '',
          descriptionTop: 'Market structure solidifying',
          descriptionBottom: 'Large incumbents have launched sustainable sub-brands; indie brands established category leadership. Market bifurcation: premium indie vs. mass-market corporate entries.',
          data: '• Large CPG players launching sustainable sub-brands; legitimizes category but reduces differentiation\n\n• Indie brands (established: $100M+ revenue) own narrative; credibility advantage over corporate entrants\n\n• Distribution expansion: From Sephora/specialty → mainstream retail (Target, Ulta, CVS)\n\n• Consolidation underway: Premium indie brands being acquired by large players seeking category credibility\n\n• First-mover premium sustainable brands (Credo, Augustinus Bader) commanding 2-3x price premium over mass-market competitors'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Risk Mitigation',
          subtitle: '',
          descriptionTop: 'Risks in maturing category',
          descriptionBottom: 'Primary risks: greenwashing backlash, regulatory enforcement tightening, mainstream adoption slower than expected, premium price compression.',
          data: '• Greenwashing enforcement: FTC crackdowns on unsubstantiated environmental claims; compliance risk high\n\n• Certification costs: Third-party certifications (B-Corp, Fair Trade) adding 5-10% cost burden\n\n• Price ceiling: Consumer willingness to pay premium has limits; 30% premium may compress to 15% as category scales\n\n• Regulatory complexity: Different sustainability standards across geographies (EU stricter than US); compliance challenging\n\n• Narrative saturation: As category grows, sustainability becomes baseline; differentiation moving to efficacy/texture/results'
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
          descriptionBottom: 'Steady sustainable growth: Revenue $4,680 (Q2 2025) → $6,370 (Q1 2026, +36% growth). Pipeline growth paces revenue (+36%), indicating disciplined growth execution. Sentiment sustained 79-81% across period. Premium positioning holding; no margin compression.',
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
              { metric: 'Revenue', q2_2025: '4,680', q3_2025: '5,230', q4_2025: '5,670', q1_2026: '6,370', trend: '↑ +36%' },
              { metric: 'Pipeline Opportunity', q2_2025: '4,680', q3_2025: '5,230', q4_2025: '5,670', q1_2026: '6,370', trend: '↑ +36%' },
              { metric: 'Avg Sentiment', q2_2025: '79%', q3_2025: '81%', q4_2025: '81%', q1_2026: '81%', trend: '↑ +2 pts' },
              { metric: 'Premium Positioning', q2_2025: '64%', q3_2025: '67%', q4_2025: '70%', q1_2026: '73%', trend: '↑ premium mix' },
              { metric: 'Retail Shelf Space', q2_2025: '32 chains', q3_2025: '38 chains', q4_2025: '45 chains', q1_2026: '52 chains', trend: '↑ 63% expansion' }
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
          descriptionBottom: 'Consistent steady growth: May 2025 ($1,520) → Apr 2026 ($2,300, +51%). Month-over-month growth 1-3% sustained. Low volatility paired with high sentiment (78-82%) indicates durable, profitable growth. ESG-driven tailwind intact.',
          data: null
        },
        {
          id: '',
          type: 'combo-chart',
          status: 'ready',
          title: 'Quarterly Pipeline',
          subtitle: 'Opportunity pipeline by stage',
          descriptionTop: 'Forward indicator of revenue',
          descriptionBottom: 'Pipeline growth tracking revenue at +36%: Q2 2025 ($4,680) → Q1 2026 ($6,370). Conversion rates stable 85-90%. Indicates mature, predictable customer acquisition. Forecast: 15-18% QoQ growth sustainable indefinitely given market structure.',
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
          descriptionTop: 'Where are we balanced?',
          descriptionBottom: 'All dimensions strong (65-89%): Premium Retail leads (89%); Affluent Demographic (84%); Social Authenticity (84%); E-commerce (78%); Search Intent (80%). Regulatory Compliance (65%) is primary improvement area. No weak segments; balanced strength.',
          data: null
        },
        {
          id: '',
          type: 'diverging-bar',
          status: 'ready',
          title: 'Positive vs Negative Signals',
          subtitle: 'Tailwinds vs. headwinds',
          descriptionTop: 'What is working vs. what isn\'t?',
          descriptionBottom: 'Positive drivers (Sustainability Premium 3,200, Retail Expansion 2,800, Consumer Sentiment 3,100) substantially outweigh headwinds. Regulatory Risk (-1,800) is material but addressable. Net score 16,500 positive signals structural market advantage.',
          data: null
        }
      ]
    }
  ],

  chartData: {
    'Monthly Revenue Trend': [
      { date: '2025-05-01', volume: 1520, sentiment: 78 },
      { date: '2025-06-01', volume: 1550, sentiment: 79 },
      { date: '2025-07-01', volume: 1610, sentiment: 80 },
      { date: '2025-08-01', volume: 1680, sentiment: 81 },
      { date: '2025-09-01', volume: 1740, sentiment: 82 },
      { date: '2025-10-01', volume: 1820, sentiment: 82 },
      { date: '2025-11-01', volume: 1890, sentiment: 82 },
      { date: '2025-12-01', volume: 1960, sentiment: 81 },
      { date: '2026-01-01', volume: 2040, sentiment: 80 },
      { date: '2026-02-01', volume: 2120, sentinel: 81 },
      { date: '2026-03-01', volume: 2210, sentiment: 81 },
      { date: '2026-04-01', volume: 2300, sentiment: 82 }
    ],

    'Quarterly Pipeline': [
      { date: '2025-Q2', volume: 4680, sentiment: 79 },
      { date: '2025-Q3', volume: 5230, sentiment: 81 },
      { date: '2025-Q4', volume: 5670, sentiment: 81 },
      { date: '2026-Q1', volume: 6370, sentiment: 81 }
    ],

    'Market Segment Strength': [
      { dimension: 'Premium Retail', value: 89, max: 100 },
      { dimension: 'Affluent Demographic', value: 84, max: 100 },
      { dimension: 'E-commerce Channel', value: 78, max: 100 },
      { dimension: 'Social Authenticity', value: 84, max: 100 },
      { dimension: 'Search Intent', value: 80, max: 100 },
      { dimension: 'Regulatory Compliance', value: 65, max: 100 }
    ],

    'Positive vs Negative Indicators': [
      { driver: 'Sustainability Premium', positive: 3200, negative: -280 },
      { driver: 'Retail Shelf Expansion', positive: 2800, negative: -420 },
      { driver: 'Consumer Sentiment', positive: 3100, negative: -240 },
      { driver: 'Market Share Growth', positive: 2400, negative: -520 },
      { driver: 'Price Premium Holding', positive: 2200, negative: -680 },
      { driver: 'Regulatory Compliance Risk', positive: 600, negative: -1800 }
    ]
  },

  narratives: {
    'Sustainable Beauty Category Maturation — Stable Growth with Sustainability Premium':
      'Sustainable cosmetics category is established with strong signal alignment across retail, social, and search; structural market shift driven by ESG trends and regulatory pressure.'
  }
}

export const scenarios = {
  'cucumber-mint3': cucumberMint3
}

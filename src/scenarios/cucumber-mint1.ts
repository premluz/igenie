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
  loadingDelay?: number
}

export const cucumberMint1: ScenarioData = {
  id: 'cucumber-mint1-2026',
  brand: 'Neutrogena Natural',
  category: 'Natural Skincare',
  title: 'Natural Skincare Market Saturation — Declining Velocity Signal',
  description: 'Softening consumer interest in natural skincare as market becomes saturated with new entrants',
  date: '2026-05-13',
  velocityScore: 4.2,
  sentimentScore: 58,
  sparklineData: [9, 8, 7, 6, 5, 4, 3],

  signals: [
    {
      id: 'sig-1',
      name: 'Social Buzz',
      icon: 'radio',
      velocity: 3.8,
      sentiment: 52,
      trend: 'falling'
    },
    {
      id: 'sig-2',
      name: 'Retail Movement',
      icon: 'trending',
      velocity: 4.5,
      sentiment: 61,
      trend: 'falling'
    },
    {
      id: 'sig-3',
      name: 'Search Acceleration',
      icon: 'search',
      velocity: 4.3,
      sentiment: 60,
      trend: 'falling'
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
          descriptionBottom: 'Momentum is decelerating; downward trajectory indicates market saturation and consumer attention shifting to other categories. Early warning signal requiring strategic pivot.',
          data: {
            type: 'trend',
            sparklineData: [9, 8, 7, 6, 5, 4, 3],
            color: '#ef4444',
            value: -8.5
          }
        },
        {
          id: '',
          type: 'progress-bar',
          status: 'ready',
          title: 'Strength',
          subtitle: 'Signal power',
          descriptionTop: 'Signal strength across channels',
          descriptionBottom: 'Signal strength below median for skincare category (4.2/10); indicates lower market resonance. Competitors with differentiated positioning outperforming significantly.',
          data: {
            type: 'strength',
            value: 4.2,
            max: 10,
            color: '#ef4444'
          }
        },
        {
          id: '',
          type: 'progress-bar',
          status: 'ready',
          title: 'Trust',
          subtitle: 'Source validity',
          descriptionTop: 'Validation across sources',
          descriptionBottom: '58% validity via 28-channel cross-referencing; weaker confidence signal. Data spread across sources suggests unclear market positioning and fragmented consumer interest.',
          data: {
            type: 'trust',
            value: 58,
            max: 100,
            color: '#ef4444'
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
          descriptionBottom: '2,154 data points across 28 verified channels show divergence: No clear consensus. Social Buzz losing traction; Retail showing slight hold; Search interest flat. Market maturity signals.',
          data: {
            total: 'Declining across all signals; market entering mature/saturation phase',
            pillars: [
              {
                id: 'social',
                icon: 'Radio',
                label: 'Social Buzz',
                value: '12',
                sparklineData: [8, 7, 6, 5, 4, 3, 2],
                subtext: 'Influencer mentions declining',
                color: 'orange'
              },
              {
                id: 'retail',
                icon: 'TrendingUp',
                label: 'Retail Velocity',
                value: '14',
                sparklineData: [7, 7, 6, 6, 5, 5, 4],
                subtext: 'POS data stable but low',
                color: 'blue'
              },
              {
                id: 'search',
                icon: 'Search',
                label: 'Search Demand',
                value: '11',
                sparklineData: [9, 8, 7, 6, 5, 4, 3],
                subtext: 'Query volume declining',
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
          data: 'Consumer demand for natural skincare is stabilizing with 4.2/10 signal strength; confidence only moderate (58% trust). Market is moving past innovation phase into commodity competition.\n\nMultiple competitors have entered with similar positioning, eroding differentiation. First-mover advantage has dissipated; new entrants are competing primarily on price.\n\nThis is NOT a growth opportunity; strategic question is how to maintain market position in declining category or pivot to adjacent segments (e.g., premium wellness, clinical efficacy positioning).'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Business Implications',
          subtitle: '',
          descriptionTop: 'Strategic Insights',
          descriptionBottom: '',
          data: '• "Natural" positioning no longer differentiates; consumer adoption is widespread but not deepening\n\n• Emerging competitors launching at price points 30% below current positioning; margin pressure is structural\n\n• Retail velocity declining; shelf space increasingly allocated to higher-growth categories\n\n• E-commerce penetration flat; suggests exhausted early-adopter cohort and slower mainstream adoption\n\n• Sentiment trending downward suggests consumer perception issues or authentic product concerns (not marketing-fixable)'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Action Recommendations',
          subtitle: '',
          descriptionTop: 'Next Steps (Priority Order)',
          descriptionBottom: '',
          data: '• Conduct consumer research urgently; understand if decline is positioning, product, or category-level\n\n• Evaluate strategic alternatives: reposition to premium/clinical segment OR harvest profits in mature market\n\n• If staying in category: optimize cost structure and negotiate retail contracts before negotiating leverage deteriorates\n\n• Test adjacent positioning (clinical efficacy, dermatologist-backed) in limited markets before broad commitment\n\n• Monitor competitor actions; prepare to exit if market share erodes below sustainable threshold\n\n___BUTTON___Develop Pivot Strategy___POWERED_BY_Innov8___'
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
          descriptionBottom: 'Core adopters aging out (median age now 38–48); Gen Z showing declining interest. Urban premium retail still holds but losing share to mass-market competitors.',
          data: '• Gen Z interest declining; younger cohorts skipping "natural" as baseline expectation, not differentiator\n\n• Female 35+ remaining core segment but engagement declining 2% QoQ\n\n• E-commerce growth stalled at 28% of sales; retail channels losing shelf space\n\n• Price sensitivity rising; premium positioning no longer defensible against value alternatives'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Competitive Landscape',
          subtitle: '',
          descriptionTop: 'Market structure shifting',
          descriptionBottom: 'Natural positioning has become table-stakes; 40+ SKUs now claim "natural" positioning. Differentiation moving to efficacy claims, sustainability, or price.',
          data: '• Direct competitors launched 15+ SKUs in past 18 months; market is fragmenting\n\n• Mass-market players (Unilever, P&G) launching value-tier natural alternatives\n\n• Premium indie brands gaining traction on sustainability + DTC narrative (not product efficacy)\n\n• Large CPG absorbing market share; consolidation likely as smaller brands rationalize\n\n• First-to-market advantage completely dissipated; late followers have superior positioning or cost structure'
        },
        {
          id: '',
          type: 'narrative',
          status: 'ready',
          title: 'Risk Mitigation',
          subtitle: '',
          descriptionTop: 'Headwinds amplifying',
          descriptionBottom: 'Primary risks: accelerating category decline, retail delisting due to low velocity, consumer perception shift away from natural as differentiator.',
          data: '• Category maturity: Market share losses may accelerate as category growth hits 0% or negative\n\n• Retail discipline: Expect delisting if velocity doesn\'t stabilize within 2–3 quarters\n\n• Sentiment erosion: Negative social signals may indicate product issues or authenticity concerns\n\n• Competitive intensity: Price war is likely; gross margins may compress 10–15% within 12 months\n\n• Strategic: Staying in category requires operational excellence; growth strategy must pivot'
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
          descriptionBottom: 'Consistent decline across all metrics indicates structural headwinds. Revenue down from 2,690 (Q2 2025) to 1,920 (Q1 2026, -28.6%). Pipeline decline steeper (-57.1% Q2→Q1), signaling accelerating customer acquisition challenges.',
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
              { metric: 'Revenue', q2_2025: '2,690', q3_2025: '2,440', q4_2025: '2,260', q1_2026: '1,920', trend: '↓ -28.6%' },
              { metric: 'Pipeline Opportunity', q2_2025: '2,800', q3_2025: '2,450', q4_2025: '1,900', q1_2026: '1,200', trend: '↓ -57.1%' },
              { metric: 'Avg Sentiment', q2_2025: '68%', q3_2025: '65%', q4_2025: '60%', q1_2026: '55%', trend: '↓ -13 pts' },
              { metric: 'Retail Velocity', q2_2025: '6.2', q3_2025: '5.8', q4_2025: '5.2', q1_2026: '4.5', trend: '↓ -27%' },
              { metric: 'Market Share', q2_2025: '12.1%', q3_2025: '11.2%', q4_2025: '10.1%', q1_2026: '8.8%', trend: '↓ -27%' }
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
          descriptionBottom: 'Accelerating decline: May 2025 ($920) → Apr 2026 ($600, -34.8%). Consistent 4-5% month-over-month erosion. Sentiment declining in lockstep (72% → 54%). Suggests linked cause: either product perception or category demand collapse.',
          data: null
        },
        {
          id: '',
          type: 'combo-chart',
          status: 'ready',
          title: 'Quarterly Pipeline',
          subtitle: 'Opportunity pipeline by stage',
          descriptionTop: 'Forward indicator of revenue',
          descriptionBottom: 'Pipeline collapse: Q2 2025 ($2,800) → Q1 2026 ($1,200, -57.1%). Steeper than revenue decline, indicating customer acquisition velocity has broken. Forecast: Q2 2026 revenue likely $450-500 if trend continues.',
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
          descriptionTop: 'Where are we weakest?',
          descriptionBottom: 'All dimensions below 53 ceiling; E-commerce 45%, Social 38%, Gen Z Adoption 28%. Competitive Threat dominates at 78. No growth levers visible. Weakness is broad-based, not channel-specific.',
          data: null
        },
        {
          id: '',
          type: 'diverging-bar',
          status: 'ready',
          title: 'Positive vs Negative Signals',
          subtitle: 'Tailwinds vs. headwinds',
          descriptionTop: 'What is working vs. what isn\'t?',
          descriptionBottom: 'Negative signals 2.5-4x larger than positive across all drivers. Competitive Response most severe (-3,600 vs +200). Even strongest driver (Social Engagement) shows -2,400 negative overpowering +1,200 positive. No recovery path without repositioning.',
          data: null
        }
      ]
    }
  ],

  chartData: {
    'Monthly Revenue Trend': [
      { date: '2025-05-01', volume: 920, sentiment: 72 },
      { date: '2025-06-01', volume: 890, sentiment: 70 },
      { date: '2025-07-01', volume: 850, sentiment: 68 },
      { date: '2025-08-01', volume: 810, sentiment: 65 },
      { date: '2025-09-01', volume: 780, sentiment: 63 },
      { date: '2025-10-01', volume: 750, sentiment: 61 },
      { date: '2025-11-01', volume: 720, sentiment: 60 },
      { date: '2025-12-01', volume: 690, sentiment: 58 },
      { date: '2026-01-01', volume: 670, sentiment: 57 },
      { date: '2026-02-01', volume: 650, sentiment: 56 },
      { date: '2026-03-01', volume: 630, sentiment: 55 },
      { date: '2026-04-01', volume: 600, sentiment: 54 }
    ],

    'Quarterly Pipeline': [
      { date: '2025-Q2', volume: 2800, sentiment: 68 },
      { date: '2025-Q3', volume: 2450, sentiment: 65 },
      { date: '2025-Q4', volume: 1900, sentiment: 60 },
      { date: '2026-Q1', volume: 1200, sentiment: 55 }
    ],

    'Market Segment Strength': [
      { dimension: 'E-commerce Strength', value: 45, max: 100 },
      { dimension: 'Gen Z Adoption', value: 28, max: 100 },
      { dimension: 'Urban Premium Retail', value: 52, max: 100 },
      { dimension: 'Social Momentum', value: 38, max: 100 },
      { dimension: 'Search Intent', value: 42, max: 100 },
      { dimension: 'Competitive Threat', value: 78, max: 100 }
    ],

    'Positive vs Negative Indicators': [
      { driver: 'Social Engagement', positive: 1200, negative: -2400 },
      { driver: 'Search Demand', positive: 1400, negative: -1800 },
      { driver: 'E-commerce Velocity', positive: 1100, negative: -1600 },
      { driver: 'Retail Sell-through', positive: 1300, negative: -2100 },
      { driver: 'Price Competitiveness', positive: 900, negative: -2800 },
      { driver: 'Competitive Response', positive: 200, negative: -3600 }
    ]
  },

  narratives: {
    'Natural Skincare Market Saturation — Declining Velocity Signal':
      'Consumer demand for natural skincare is stabilizing; market is entering mature/saturation phase with declining signals across all channels.'
  }
}

export const scenarios = {
  'cucumber-mint1': cucumberMint1
}

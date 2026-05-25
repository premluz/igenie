import type { ScenarioData } from './types'

function generateSparkline(finalBuzz: number, yoyChange: string): number[] {
  const yoyPercent = parseInt(yoyChange.replace(/[+%-]/g, ''))
  const isPositive = yoyChange.startsWith('+')
  const volatility = 5 + Math.random() * 8

  const data: number[] = []
  let current = finalBuzz - (isPositive ? yoyPercent * 0.8 : -yoyPercent * 0.8)

  for (let i = 0; i < 14; i++) {
    const noise = (Math.random() - 0.5) * volatility
    current += (isPositive ? yoyPercent / 14 : -yoyPercent / 14) + noise
    data.push(Math.max(10, Math.min(100, Math.round(current))))
  }

  return data
}

export const brandPerception: ScenarioData = {
  id: 'brand-perception',
  brand: 'Energy Drinks',
  category: 'Brand Pulse',
  title: 'Brand Perception Dashboard',
  description: 'Comprehensive brand perception analysis across dimensions',
  date: new Date().toISOString(),
  velocityScore: 8.7,
  sentimentScore: 62,
  sparklineData: [45, 52, 48, 65, 72, 68, 75, 71, 78],
  signals: [],

  initialLayout: [
    {
      columns: 2,
      cells: [
        {
          id: 'perception-winners',
          type: 'table',
          title: 'Biggest winners',
          subtitle: 'Ranked by YoY change',
          status: 'thinking',
          prestosummary: 'Pepsi and premium variants gaining fastest momentum across perception metrics.',
          data: {
            columns: [
              { key: 'brand', label: 'Brand' },
              { key: 'buzz', label: 'Buzz' },
              { key: 'yoy', label: 'YoY' }
            ],
            rows: [
              { brand: 'Pepsi Diet', buzz: 69, yoy: '+16%', insight: { color: 'green', description: 'Category-leading gain. Challenger brands taking share simultaneously — not isolated.' } },
              { brand: 'Pepsi', buzz: 73, yoy: '+15%', insight: { color: 'green', description: 'Two Pepsi variants in top 5. Unified brand momentum, not product-specific.' } },
              { brand: 'Sprite Zero', buzz: 66, yoy: '+11%', insight: { color: 'green', description: 'Zero-sugar variant outperforming parent brand. Health shift signal.' } },
              { brand: 'Mirinda', buzz: 84, yoy: '+11%', insight: { color: 'green', description: 'Niche brand punching above weight. Watch for sustained or spike pattern.' } },
              { brand: 'Mountain Dew', buzz: 60, yoy: '+8%', insight: { color: 'green', description: 'Steady climb. No spike — organic momentum building.' } }
            ]
          }
        },
        {
          id: 'perception-losers',
          type: 'table',
          title: 'Biggest losers',
          subtitle: 'Ranked by YoY change',
          status: 'thinking',
          prestosummary: 'Traditional cola brands losing perception share to emerging alternatives.',
          data: {
            columns: [
              { key: 'brand', label: 'Brand' },
              { key: 'buzz', label: 'Buzz' },
              { key: 'yoy', label: 'YoY' }
            ],
            rows: [
              { brand: 'Coca-Cola Original', buzz: 75, yoy: '-14%', insight: { color: 'red', description: 'Market leader declining while challengers gain. Structural, not seasonal.' } },
              { brand: 'Dr Pepper', buzz: 73, yoy: '-14%', insight: { color: 'red', description: 'Consistent decline across all five losers. Unusual uniformity — possible data artefact or category event.' } },
              { brand: 'Arizona Iced Tea', buzz: 77, yoy: '-14%', insight: { color: 'red', description: 'Premium casual segment losing ground across the board.' } },
              { brand: 'Fanta Orange', buzz: 87, yoy: '-14%', insight: { color: 'red', description: 'Parent company (Coca-Cola) variants declining in sync. Portfolio-level weakness.' } },
              { brand: 'Schweppes', buzz: 77, yoy: '-14%', insight: { color: 'red', description: 'Mixer category softening or measurement anomaly — identical % across all losers warrants flagging.' } }
            ]
          }
        },
        {
          id: 'perception-trends',
          type: 'line-chart',
          title: 'Buzz trends',
          subtitle: '5 brands selected for momentum, not score - 14 month tracking',
          status: 'thinking',
          prestosummary: 'Red Bull showing volatile peaks indicating breakthrough perception moments.',
          descriptionBottom: '→ **Pepsi** showing strongest momentum trajectory from 47 to 55 range\n\n→ **Gatorade** maintaining high stability 60-72 range\n\n→ **Red Bull** volatile but resilient, peaks indicate breakthrough moments\n\n→ **Coca-Cola Original** declining trend suggests perception loss\n\n→ **Pepsi Diet** steady growth capturing secondary market',
          data: [
            { date: '2024-08-01', Pepsi: 47, CocaOriginal: 73, RedBull: 57, Gatorade: 74, PepsiDiet: 63 },
            { date: '2024-09-01', Pepsi: 56, CocaOriginal: 65, RedBull: 63, Gatorade: 66, PepsiDiet: 73 },
            { date: '2024-10-01', Pepsi: 44, CocaOriginal: 70, RedBull: 61, Gatorade: 68, PepsiDiet: 66 },
            { date: '2024-11-01', Pepsi: 54, CocaOriginal: 58, RedBull: 64, Gatorade: 61, PepsiDiet: 70 },
            { date: '2024-12-01', Pepsi: 45, CocaOriginal: 69, RedBull: 60, Gatorade: 66, PepsiDiet: 75 },
            { date: '2025-01-01', Pepsi: 55, CocaOriginal: 65, RedBull: 100, Gatorade: 60, PepsiDiet: 68 },
            { date: '2025-02-01', Pepsi: 45, CocaOriginal: 68, RedBull: 61, Gatorade: 60, PepsiDiet: 66 },
            { date: '2025-03-01', Pepsi: 49, CocaOriginal: 64, RedBull: 56, Gatorade: 65, PepsiDiet: 69 },
            { date: '2025-04-01', Pepsi: 49, CocaOriginal: 61, RedBull: 68, Gatorade: 61, PepsiDiet: 72 },
            { date: '2025-05-01', Pepsi: 50, CocaOriginal: 70, RedBull: 56, Gatorade: 67, PepsiDiet: 71 },
            { date: '2025-06-01', Pepsi: 44, CocaOriginal: 70, RedBull: 60, Gatorade: 72, PepsiDiet: 66 },
            { date: '2025-07-01', Pepsi: 53, CocaOriginal: 73, RedBull: 53, Gatorade: 64, PepsiDiet: 63 },
            { date: '2025-08-01', Pepsi: 55, CocaOriginal: 63, RedBull: 53, Gatorade: 72, PepsiDiet: 61 },
            { date: '2025-09-01', Pepsi: 47, CocaOriginal: 66, RedBull: 55, Gatorade: 62, PepsiDiet: 70 }
          ]
        }
      ]
    },
    {
      columns: 1,
      cells: [
        {
          id: 'perception-ranking',
          type: 'table',
          title: 'Buzz ranking',
          subtitle: 'All selected brands',
          status: 'thinking',
          prestosummary: 'Gatorade and premium energy drinks dominating perception tiers.',
          data: {
            columns: [
              { key: 'brand', label: 'Brand' },
              { key: 'buzz', label: 'Buzz' },
              { key: 'yoy', label: 'YoY' },
              { key: 'progress', label: 'Progress' }
            ],
            rows: [
              { brand: 'Gatorade', buzz: 89, yoy: '+8%', progress: 89, sparkline: generateSparkline(89, '+8%'), insight: { color: 'green', description: 'Category leader maintaining dominance. Stable growth amid volatility.' } },
              { brand: 'Fanta Orange', buzz: 87, yoy: '+8%', progress: 87, sparkline: generateSparkline(87, '+8%'), insight: { color: 'blue', description: 'High absolute score. Premium positioning resonates.' } },
              { brand: '7UP', buzz: 87, yoy: '+5%', progress: 87, sparkline: generateSparkline(87, '+5%') },
              { brand: 'Powerade', buzz: 87, yoy: '+2%', progress: 87, sparkline: generateSparkline(87, '+2%') },
              { brand: 'Lipton Iced Tea', buzz: 84, yoy: '+16%', progress: 84, sparkline: generateSparkline(84, '+16%'), insight: { color: 'green', description: 'Highest growth rate in top tier. Category shift towards tea variants accelerating.' } },
              { brand: 'Mirinda', buzz: 84, yoy: '+11%', progress: 84, sparkline: generateSparkline(84, '+11%') },
              { brand: 'Red Bull', buzz: 82, yoy: '+5%', progress: 82, sparkline: generateSparkline(82, '+5%') },
              { brand: 'Monster Energy', buzz: 82, yoy: '+5%', progress: 82, sparkline: generateSparkline(82, '+5%') },
              { brand: 'Sprite', buzz: 78, yoy: '+6%', progress: 78, sparkline: generateSparkline(78, '+6%') },
              { brand: 'Pepsi Max', buzz: 77, yoy: '+2%', progress: 77, sparkline: generateSparkline(77, '+2%') },
              { brand: 'Schweppes', buzz: 77, yoy: '+8%', progress: 77, sparkline: generateSparkline(77, '+8%') },
              { brand: 'Arizona Iced Tea', buzz: 77, yoy: '-14%', progress: 77, sparkline: generateSparkline(77, '-14%'), insight: { color: 'red', description: 'High score but declining. Lost perception among key demographics.' } },
              { brand: 'Nestea', buzz: 76, yoy: '-7%', progress: 76, sparkline: generateSparkline(76, '-7%') },
              { brand: 'Fanta Grape', buzz: 76, yoy: '+5%', progress: 76, sparkline: generateSparkline(76, '+5%') },
              { brand: 'Coca-Cola Original', buzz: 75, yoy: '-14%', progress: 75, sparkline: generateSparkline(75, '-14%'), insight: { color: 'red', description: 'Legacy leader in decline. Perception loss accelerating despite strong absolute score.' } },
              { brand: 'Pepsi', buzz: 73, yoy: '+15%', progress: 73, sparkline: generateSparkline(73, '+15%'), insight: { color: 'green', description: 'Strong growth trajectory. Challenger narrative gaining traction vs. Coca-Cola.' } },
              { brand: 'Dr Pepper', buzz: 73, yoy: '-5%', progress: 73, sparkline: generateSparkline(73, '-5%') },
              { brand: 'Pepsi Diet', buzz: 69, yoy: '+16%', progress: 69, sparkline: generateSparkline(69, '+16%'), insight: { color: 'green', description: 'Highest growth rate overall. Diet segment returning to relevance.' } },
              { brand: 'Coca-Cola Zero', buzz: 69, yoy: '+6%', progress: 69, sparkline: generateSparkline(69, '+6%') },
              { brand: 'Coca-Cola Zero', buzz: 67, yoy: '+3%', progress: 67, sparkline: generateSparkline(67, '+3%') },
              { brand: 'Sprite Zero', buzz: 66, yoy: '+11%', progress: 66, sparkline: generateSparkline(66, '+11%') },
              { brand: 'Mountain Dew', buzz: 60, yoy: '+8%', progress: 60, sparkline: generateSparkline(60, '+8%') }
            ]
          }
        }
      ]
    }
  ],

  chartData: {},
  narratives: {}
}

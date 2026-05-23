import type { ScenarioData } from './types'

export const buzzCompetitiveAnalysis: ScenarioData = {
  id: 'buzz-competitive-analysis',
  brand: 'Energy Drinks',
  category: 'Buzz Competitive Analysis',
  title: 'Buzz Competitive Landscape',
  description: 'Real-time competitive analysis of brand buzz dynamics and market positioning',
  date: new Date().toISOString(),
  velocityScore: 8.7,
  sentimentScore: 62,
  sparklineData: [45, 52, 48, 65, 72, 68, 75, 71, 78],
  signals: [
    {
      id: 'winners',
      name: 'Market Winners',
      icon: 'trending',
      velocity: 8.7,
      sentiment: 72,
      trend: 'rising',
      description: 'Brands gaining momentum'
    },
    {
      id: 'losers',
      name: 'Market Losers',
      icon: 'flame',
      velocity: 6.2,
      sentiment: 48,
      trend: 'falling',
      description: 'Brands losing share'
    },
    {
      id: 'trends',
      name: 'Buzz Trends',
      icon: 'activity',
      velocity: 7.5,
      sentiment: 65,
      trend: 'stable',
      description: 'Market momentum tracking'
    },
    {
      id: 'ranking',
      name: 'Market Ranking',
      icon: 'search',
      velocity: 8.1,
      sentiment: 70,
      trend: 'rising',
      description: 'Competitive positioning'
    }
  ],

  initialLayout: [
    {
      columns: 2,
      cells: [
        {
          id: 'biggest-winners',
          type: 'table',
          title: 'Biggest winners',
          subtitle: 'Ranked by YoY change',
          status: 'ready',
          data: {
            columns: [
              { key: 'brand', label: 'Brand' },
              { key: 'buzz', label: 'Buzz' },
              { key: 'yoy', label: 'YoY' }
            ],
            rows: [
              { brand: 'Pepsi Diet', buzz: 69, yoy: '+16%' },
              { brand: 'Pepsi', buzz: 73, yoy: '+15%' },
              { brand: 'Sprite Zero', buzz: 66, yoy: '+11%' },
              { brand: 'Mirinda', buzz: 84, yoy: '+11%' },
              { brand: 'Mountain Dew', buzz: 60, yoy: '+8%' }
            ]
          }
        },
        {
          id: 'biggest-losers',
          type: 'table',
          title: 'Biggest losers',
          subtitle: 'Ranked by YoY change',
          status: 'ready',
          data: {
            columns: [
              { key: 'brand', label: 'Brand' },
              { key: 'buzz', label: 'Buzz' },
              { key: 'yoy', label: 'YoY' }
            ],
            rows: [
              { brand: 'Coca-Cola Original', buzz: 75, yoy: '-14%' },
              { brand: 'Dr Pepper', buzz: 73, yoy: '-14%' },
              { brand: 'Arizona Iced Tea', buzz: 77, yoy: '-14%' },
              { brand: 'Fanta Orange', buzz: 87, yoy: '-14%' },
              { brand: 'Schweppes', buzz: 77, yoy: '-14%' }
            ]
          }
        }
      ]
    },
    {
      columns: 1,
      cells: [
        {
          id: 'buzz-trends',
          type: 'line-chart',
          title: 'Buzz trends by brand',
          subtitle: '5 brands selected for momentum, not score - 14 month tracking',
          status: 'ready',
          descriptionBottom: '→ **Pepsi** showing strongest momentum trajectory from 47 to 55 range with recent spike to 70\n\n→ **Gatorade** maintaining high stability 60-72 range, consistent market leader positioning\n\n→ **Red Bull** volatile but resilient, peaks of 100 (Jan 2025) indicate breakthrough moments\n\n→ **Coca-Cola Original** declining trend from 73 to 66 suggests momentum loss to Pepsi\n\n→ **Pepsi Diet** steady growth from 63 to 70, capturing secondary market momentum',
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
          id: 'buzz-ranking',
          type: 'table',
          title: 'Buzz ranking',
          subtitle: 'All selected brands',
          status: 'ready',
          data: {
            columns: [
              { key: 'brand', label: 'Brand' },
              { key: 'buzz', label: 'Buzz' },
              { key: 'yoy', label: 'YoY' },
              { key: 'progress', label: 'Progress' }
            ],
            rows: [
              { brand: 'Gatorade', buzz: 89, yoy: '+8%', progress: 89 },
              { brand: 'Fanta Orange', buzz: 87, yoy: '+8%', progress: 87 },
              { brand: '7UP', buzz: 87, yoy: '+5%', progress: 87 },
              { brand: 'Powerade', buzz: 87, yoy: '+2%', progress: 87 },
              { brand: 'Lipton Iced Tea', buzz: 84, yoy: '+16%', progress: 84 },
              { brand: 'Mirinda', buzz: 84, yoy: '+11%', progress: 84 },
              { brand: 'Red Bull', buzz: 82, yoy: '+5%', progress: 82 },
              { brand: 'Monster Energy', buzz: 82, yoy: '+5%', progress: 82 },
              { brand: 'Sprite', buzz: 78, yoy: '+6%', progress: 78 },
              { brand: 'Pepsi Max', buzz: 77, yoy: '+2%', progress: 77 },
              { brand: 'Schweppes', buzz: 77, yoy: '+8%', progress: 77 },
              { brand: 'Arizona Iced Tea', buzz: 77, yoy: '-14%', progress: 77 },
              { brand: 'Nestea', buzz: 76, yoy: '-7%', progress: 76 },
              { brand: 'Fanta Grape', buzz: 76, yoy: '+5%', progress: 76 },
              { brand: 'Coca-Cola Original', buzz: 75, yoy: '-14%', progress: 75 },
              { brand: 'Pepsi', buzz: 73, yoy: '+15%', progress: 73 },
              { brand: 'Dr Pepper', buzz: 73, yoy: '-5%', progress: 73 },
              { brand: 'Pepsi Diet', buzz: 69, yoy: '+16%', progress: 69 },
              { brand: 'Coca-Cola Zero', buzz: 69, yoy: '+6%', progress: 69 },
              { brand: 'Coca-Cola Zero', buzz: 67, yoy: '+3%', progress: 67 },
              { brand: 'Sprite Zero', buzz: 66, yoy: '+11%', progress: 66 },
              { brand: 'Mountain Dew', buzz: 60, yoy: '+8%', progress: 60 }
            ]
          }
        }
      ]
    }
  ],

  chartData: {},
  narratives: {}
}

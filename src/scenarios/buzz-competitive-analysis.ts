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
          subtitle: 'Market momentum over time - competitive tracking',
          status: 'ready',
          data: [
            { date: '2024-01-01', Pepsi: 72, Coca: 78, Sprite: 65 },
            { date: '2024-01-15', Pepsi: 70, Coca: 76, Sprite: 68 },
            { date: '2024-02-01', Pepsi: 68, Coca: 74, Sprite: 70 },
            { date: '2024-02-15', Pepsi: 75, Coca: 72, Sprite: 72 },
            { date: '2024-03-01', Pepsi: 73, Coca: 75, Sprite: 74 },
            { date: '2024-03-15', Pepsi: 76, Coca: 77, Sprite: 75 },
            { date: '2024-04-01', Pepsi: 78, Coca: 75, Sprite: 77 },
            { date: '2024-04-15', Pepsi: 74, Coca: 73, Sprite: 79 },
            { date: '2024-05-01', Pepsi: 79, Coca: 71, Sprite: 81 },
            { date: '2024-05-15', Pepsi: 77, Coca: 70, Sprite: 80 },
            { date: '2024-06-01', Pepsi: 80, Coca: 72, Sprite: 82 },
            { date: '2024-06-15', Pepsi: 81, Coca: 74, Sprite: 83 },
            { date: '2024-07-01', Pepsi: 83, Coca: 76, Sprite: 84 },
            { date: '2024-07-15', Pepsi: 82, Coca: 78, Sprite: 82 },
            { date: '2024-08-01', Pepsi: 84, Coca: 79, Sprite: 85 },
            { date: '2024-08-15', Pepsi: 85, Coca: 81, Sprite: 86 },
            { date: '2024-09-01', Pepsi: 86, Coca: 82, Sprite: 87 }
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

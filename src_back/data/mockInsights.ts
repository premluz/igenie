export interface ComboChartDatum {
  segment: string;
  reviewVolume: number;
  avgSentiment: number;
}

export interface RadarChartDatum {
  dimension: string;
  value: number;
  max: number;
}

export interface InsightDetail {
  id: string;
  title: string;
  velocity: number;
  velocityChange: number;
  sentiment: number;
  sentiment_label: "positive" | "negative";
  trend: Array<{ date: string; score: number }>;
  description: string;
  comboData: ComboChartDatum[];
  radarData: RadarChartDatum[];
}

export const mockInsightsDetail: InsightDetail[] = [
  {
    id: "1",
    title: '"Cucumber Mint" flavor adoption accelerating in wellness beverages',
    velocity: 9.6,
    velocityChange: 10,
    sentiment: 85,
    sentiment_label: "positive",
    trend: [
      { date: "2026-02-01", score: 20 },
      { date: "2026-03-01", score: 45 },
      { date: "2026-04-01", score: 85 },
      { date: "2026-05-01", score: 95 },
    ],
    description:
      "Emerging Trend Velocity spike 9.6/10 · 1.540% in 14 days · No competitor SKU yet Sparkline shape: flat then sharp spike at the end",
    comboData: [
      { segment: "Face", reviewVolume: 1240, avgSentiment: 88 },
      { segment: "Body", reviewVolume: 2156, avgSentiment: 82 },
      { segment: "Sun", reviewVolume: 1890, avgSentiment: 79 },
    ],
    radarData: [
      { dimension: "Face Sentiment", value: 88, max: 100 },
      { dimension: "Face Rating", value: 4.6, max: 5 },
      { dimension: "Body Sentiment", value: 82, max: 100 },
      { dimension: "Body Rating", value: 4.3, max: 5 },
      { dimension: "Sun Sentiment", value: 79, max: 100 },
      { dimension: "Sun Rating", value: 4.1, max: 5 },
    ],
  },
  {
    id: "2",
    title: "PepsiCo trademark filing detected",
    velocity: 8.1,
    velocityChange: -5,
    sentiment: 65,
    sentiment_label: "negative",
    trend: [
      { date: "2026-02-01", score: 10 },
      { date: "2026-03-01", score: 25 },
      { date: "2026-04-01", score: 65 },
      { date: "2026-05-01", score: 90 },
    ],
    description:
      'Competitor Alert "Cool Cuke" filed March 2026 · Sparkling Water · No launch yet Sparkline shape: flat line with sudden uptick',
    comboData: [
      { segment: "Face", reviewVolume: 845, avgSentiment: 62 },
      { segment: "Body", reviewVolume: 1320, avgSentiment: 58 },
      { segment: "Sun", reviewVolume: 967, avgSentiment: 71 },
    ],
    radarData: [
      { dimension: "Face Sentiment", value: 62, max: 100 },
      { dimension: "Face Rating", value: 3.2, max: 5 },
      { dimension: "Body Sentiment", value: 58, max: 100 },
      { dimension: "Body Rating", value: 3.0, max: 5 },
      { dimension: "Sun Sentiment", value: 71, max: 100 },
      { dimension: "Sun Rating", value: 3.7, max: 5 },
    ],
  },
  {
    id: "3",
    title: "Oat Milk sentiment dropping",
    velocity: 7.2,
    velocityChange: 15,
    sentiment: 35,
    sentiment_label: "negative",
    trend: [
      { date: "2026-02-01", score: 80 },
      { date: "2026-03-01", score: 65 },
      { date: "2026-04-01", score: 45 },
      { date: "2026-05-01", score: 28 },
    ],
    description:
      'Category Risk 71% - 54% positive "Bloating" mentions up 180% Sparkline shape: gradual decline curve',
    comboData: [
      { segment: "Face", reviewVolume: 2340, avgSentiment: 32 },
      { segment: "Body", reviewVolume: 3120, avgSentiment: 38 },
      { segment: "Sun", reviewVolume: 1876, avgSentiment: 35 },
    ],
    radarData: [
      { dimension: "Face Sentiment", value: 32, max: 100 },
      { dimension: "Face Rating", value: 2.1, max: 5 },
      { dimension: "Body Sentiment", value: 38, max: 100 },
      { dimension: "Body Rating", value: 2.4, max: 5 },
      { dimension: "Sun Sentiment", value: 35, max: 100 },
      { dimension: "Sun Rating", value: 2.3, max: 5 },
    ],
  },
];

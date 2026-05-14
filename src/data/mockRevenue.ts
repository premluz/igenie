export interface MonthlyARRDatum {
  month: string;
  enterprise: number;
  midMarket: number;
  smb: number;
  strategic: number;
  other: number;
}

export interface QuarterlyARRDatum {
  quarter: string;
  expansionUpsell: number;
  newBusiness: number;
  renewal: number;
}

export interface TargetPoint {
  period: string;
  target: number;
}

export interface KPICard {
  title: string;
  value: string;
  subtitle: string;
}

export const monthlyARRData: MonthlyARRDatum[] = [
  { month: "Jan 2024", enterprise: 500000, midMarket: 300000, smb: 150000, strategic: 50000, other: 0 },
  { month: "Feb 2024", enterprise: 510000, midMarket: 320000, smb: 140000, strategic: 55000, other: 0 },
  { month: "Mar 2024", enterprise: 550000, midMarket: 350000, smb: 160000, strategic: 60000, other: 0 },
  { month: "Apr 2024", enterprise: 580000, midMarket: 380000, smb: 170000, strategic: 70000, other: 0 },
  { month: "May 2024", enterprise: 620000, midMarket: 410000, smb: 180000, strategic: 75000, other: 0 },
  { month: "Jun 2024", enterprise: 650000, midMarket: 440000, smb: 190000, strategic: 80000, other: 0 },
  { month: "Jul 2024", enterprise: 680000, midMarket: 460000, smb: 200000, strategic: 90000, other: 0 },
  { month: "Aug 2024", enterprise: 700000, midMarket: 480000, smb: 210000, strategic: 100000, other: 0 },
  { month: "Sep 2024", enterprise: 720000, midMarket: 500000, smb: 220000, strategic: 110000, other: 0 },
  { month: "Oct 2024", enterprise: 750000, midMarket: 520000, smb: 230000, strategic: 120000, other: 0 },
  { month: "Nov 2024", enterprise: 780000, midMarket: 540000, smb: 240000, strategic: 130000, other: 0 },
  { month: "Dec 2024", enterprise: 800000, midMarket: 560000, smb: 250000, strategic: 140000, other: 0 },
  { month: "Jan 2025", enterprise: 850000, midMarket: 600000, smb: 270000, strategic: 160000, other: 0 },
  { month: "Feb 2025", enterprise: 900000, midMarket: 640000, smb: 290000, strategic: 180000, other: 0 },
  { month: "Mar 2025", enterprise: 950000, midMarket: 680000, smb: 310000, strategic: 200000, other: 0 },
  { month: "Apr 2025", enterprise: 1000000, midMarket: 720000, smb: 330000, strategic: 220000, other: 0 },
  { month: "May 2025", enterprise: 1050000, midMarket: 760000, smb: 350000, strategic: 240000, other: 0 },
  { month: "Jun 2025", enterprise: 1100000, midMarket: 800000, smb: 370000, strategic: 260000, other: 0 },
  { month: "Jul 2025", enterprise: 1150000, midMarket: 840000, smb: 390000, strategic: 280000, other: 0 },
];

export const monthlyTargetData: TargetPoint[] = [
  { period: "Jan 2024", target: 900000 },
  { period: "Feb 2024", target: 920000 },
  { period: "Mar 2024", target: 950000 },
  { period: "Apr 2024", target: 1000000 },
  { period: "May 2024", target: 1050000 },
  { period: "Jun 2024", target: 1100000 },
  { period: "Jul 2024", target: 1150000 },
  { period: "Aug 2024", target: 1200000 },
  { period: "Sep 2024", target: 1250000 },
  { period: "Oct 2024", target: 1300000 },
  { period: "Nov 2024", target: 1350000 },
  { period: "Dec 2024", target: 1400000 },
  { period: "Jan 2025", target: 1450000 },
  { period: "Feb 2025", target: 1500000 },
  { period: "Mar 2025", target: 1550000 },
  { period: "Apr 2025", target: 1600000 },
  { period: "May 2025", target: 1650000 },
  { period: "Jun 2025", target: 1700000 },
  { period: "Jul 2025", target: 1750000 },
];

export const quarterlyARRData: QuarterlyARRDatum[] = [
  { quarter: "2024 Q1", expansionUpsell: 1200000, newBusiness: 800000, renewal: 1500000 },
  { quarter: "2024 Q2", expansionUpsell: 1350000, newBusiness: 900000, renewal: 1600000 },
  { quarter: "2024 Q3", expansionUpsell: 1500000, newBusiness: 1000000, renewal: 1700000 },
  { quarter: "2024 Q4", expansionUpsell: 1600000, newBusiness: 1100000, renewal: 1800000 },
  { quarter: "2025 Q1", expansionUpsell: 1750000, newBusiness: 1200000, renewal: 1900000 },
  { quarter: "2025 Q2", expansionUpsell: 1900000, newBusiness: 1300000, renewal: 2000000 },
  { quarter: "2025 Q3", expansionUpsell: 2050000, newBusiness: 1400000, renewal: 2100000 },
];

export const quarterlyTargetData: TargetPoint[] = [
  { period: "2024 Q1", target: 3000000 },
  { period: "2024 Q2", target: 3200000 },
  { period: "2024 Q3", target: 3400000 },
  { period: "2024 Q4", target: 3600000 },
  { period: "2025 Q1", target: 3800000 },
  { period: "2025 Q2", target: 4000000 },
  { period: "2025 Q3", target: 4200000 },
];

export const kpiCards: KPICard[] = [
  {
    title: "QTD Net New ARR",
    value: "$11,924,369",
    subtitle: "Monthly and quarterly attainment against our Net New ARR target.",
  },
  {
    title: "EOQ Net New ARR Target",
    value: "$4,500,000",
    subtitle: "Quarterly target for new revenue",
  },
  {
    title: "QTD Actual / EOQ Target",
    value: "48.15%",
    subtitle: "Progress towards Q2 2025 goal",
  },
  {
    title: "% of Quarter Elapsed",
    value: "20.00%",
    subtitle: "Time elapsed in current quarter",
  },
];

interface Anomaly {
  index: number
  type: 'peak' | 'valley' | 'spike'
  value: number
  series?: string
  label: string
  description: string
}

export function detectAnomalies(data: Array<any>, seriesNames: string[]): Anomaly[] {
  const anomalies: Anomaly[] = []
  const meanValues: { [key: string]: number } = {}

  // Calculate mean for each series first
  seriesNames.forEach((series) => {
    const values = data.map(d => d[series]).filter(v => typeof v === 'number')
    if (values.length > 0) {
      meanValues[series] = values.reduce((a, b) => a + b, 0) / values.length
    }
  })

  seriesNames.forEach((series) => {
    const values = data.map(d => d[series]).filter(v => typeof v === 'number')

    if (values.length < 3) return

    const mean = meanValues[series]
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
    const stdDev = Math.sqrt(variance)

    data.forEach((point, idx) => {
      const value = point[series]
      if (typeof value !== 'number') return

      const zScore = Math.abs((value - mean) / stdDev)

      // Detect significant deviations (>2 std devs)
      if (zScore > 2) {
        if (idx > 0 && idx < data.length - 1) {
          const prev = data[idx - 1][series]
          const next = data[idx + 1][series]

          if (value > prev && value > next) {
            // Peak
            anomalies.push({
              index: idx,
              type: 'peak',
              value,
              series,
              label: `Peak: ${value.toFixed(1)}`,
              description: `Unusual spike in ${series} on ${point.date}. Value exceeded average by ${((value - mean) / mean * 100).toFixed(0)}%.`
            })
          } else if (value < prev && value < next) {
            // Valley
            anomalies.push({
              index: idx,
              type: 'valley',
              value,
              series,
              label: `Valley: ${value.toFixed(1)}`,
              description: `Unusual dip in ${series} on ${point.date}. Value fell ${((mean - value) / mean * 100).toFixed(0)}% below average.`
            })
          } else {
            // Spike (sudden change)
            anomalies.push({
              index: idx,
              type: 'spike',
              value,
              series,
              label: `Spike: ${value.toFixed(1)}`,
              description: `Significant change in ${series} on ${point.date}. Z-score: ${zScore.toFixed(1)}.`
            })
          }
        }
      }
    })
  })

  return anomalies
}

function getColorForSeries(series: string): 'red' | 'green' | 'blue' {
  const colorMap: { [key: string]: 'red' | 'green' | 'blue' } = {
    'Pepsi': 'red',
    'CocaOriginal': 'red',
    'RedBull': 'green',
    'Gatorade': 'blue',
    'PepsiDiet': 'green'
  }
  return colorMap[series] || 'blue'
}

export { getColorForSeries }

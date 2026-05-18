interface SimpleRadarChartProps {
  data: Array<{
    dimension: string
    value: number
    benchmark?: number
  }>
}

export function SimpleRadarChart({ data }: SimpleRadarChartProps) {
  if (!data || data.length === 0) return null

  const width = 320
  const height = 320
  const centerX = width / 2
  const centerY = height / 2
  const maxRadius = Math.min(width, height) / 2 - 30
  const maxValue = 100
  const sides = data.length

  // Calculate points for the polygon
  const angle = (Math.PI * 2) / sides
  const points = data.map((d, i) => {
    const currentAngle = angle * i - Math.PI / 2
    const radius = (d.value / maxValue) * maxRadius
    return {
      x: centerX + radius * Math.cos(currentAngle),
      y: centerY + radius * Math.sin(currentAngle),
      dimension: d.dimension,
      value: d.value
    }
  })

  const benchmarkPoints = data.map((d, i) => {
    const currentAngle = angle * i - Math.PI / 2
    const benchmark = d.benchmark || d.value * 0.75
    const radius = (benchmark / maxValue) * maxRadius
    return {
      x: centerX + radius * Math.cos(currentAngle),
      y: centerY + radius * Math.sin(currentAngle)
    }
  })

  // Generate grid lines
  const gridLevels = [20, 40, 60, 80, 100]
  const gridLines = gridLevels.map(level => {
    const levelPoints = data.map((_, i) => {
      const currentAngle = angle * i - Math.PI / 2
      const radius = (level / maxValue) * maxRadius
      const x = centerX + radius * Math.cos(currentAngle)
      const y = centerY + radius * Math.sin(currentAngle)
      return `${x},${y}`
    })
    return levelPoints.join(' ')
  })

  // Generate axis lines
  const axes = data.map((_, i) => {
    const currentAngle = angle * i - Math.PI / 2
    const x = centerX + maxRadius * Math.cos(currentAngle)
    const y = centerY + maxRadius * Math.sin(currentAngle)
    return { x, y }
  })

  const actualPolygon = points.map(p => `${p.x},${p.y}`).join(' ')
  const benchmarkPolygon = benchmarkPoints.map(p => `${p.x},${p.y}`).join(' ')

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ background: 'transparent' }}>
      {/* Grid circles */}
      {gridLevels.map(level => (
        <circle
          key={`grid-${level}`}
          cx={centerX}
          cy={centerY}
          r={(level / maxValue) * maxRadius}
          fill="none"
          stroke="#1d1d20"
          strokeWidth="1"
          opacity="0.3"
        />
      ))}

      {/* Axis lines */}
      {axes.map((axis, i) => (
        <line
          key={`axis-${i}`}
          x1={centerX}
          y1={centerY}
          x2={axis.x}
          y2={axis.y}
          stroke="#1d1d20"
          strokeWidth="0.5"
          opacity="0.2"
        />
      ))}

      {/* Benchmark polygon */}
      <polygon
        points={benchmarkPolygon}
        fill="#6b7280"
        fillOpacity="0.05"
        stroke="#6b7280"
        strokeWidth="1.5"
        strokeOpacity="0.2"
      />

      {/* Actual polygon */}
      <polygon
        points={actualPolygon}
        fill="#3b82f6"
        fillOpacity="0.25"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeOpacity="0.8"
      />

      {/* Data points */}
      {points.map((p, i) => (
        <circle
          key={`point-${i}`}
          cx={p.x}
          cy={p.y}
          r="4"
          fill="#3b82f6"
          opacity="0.7"
        />
      ))}

      {/* Labels */}
      {points.map((p, i) => (
        <text
          key={`label-${i}`}
          x={p.x + (p.x > centerX ? 10 : -10)}
          y={p.y + 4}
          textAnchor={p.x > centerX ? 'start' : 'end'}
          fontSize="11"
          fill="#f4f4f5"
          opacity="0.8"
        >
          {data[i].dimension.split(' ')[0]}
        </text>
      ))}
    </svg>
  )
}

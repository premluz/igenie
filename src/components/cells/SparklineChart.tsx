interface SparklineChartProps {
  data: number[]
  color?: string
  width?: string | number
  height?: string | number
}

export function SparklineChart({ data, color = '#10b981', width = '100%', height = '100%' }: SparklineChartProps) {
  if (!data || data.length === 0) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const viewBoxWidth = data.length * 8
  const viewBoxHeight = 40
  const padding = 2

  // Normalize data to SVG coordinates
  const points = data.map((value, i) => {
    const x = i * 8 + padding
    const y = viewBoxHeight - padding - ((value - min) / range) * (viewBoxHeight - padding * 2)
    return `${x},${y}`
  })

  const pathData = `M ${points.join(' L ')}`

  // Create a gradient
  const gradientId = `gradient-${Math.random().toString(36).slice(2)}`

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      preserveAspectRatio="xMidYMid meet"
      className="w-full"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Gradient area under the line */}
      <path
        d={`${pathData} L ${viewBoxWidth - padding},${viewBoxHeight} L ${padding},${viewBoxHeight} Z`}
        fill={`url(#${gradientId})`}
      />

      {/* Line stroke */}
      <path
        d={pathData}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

import { BaseCell } from './cells/BaseCell'
import { type Cell } from '@/store/usePrestoStore'
import { ComboChartCell } from './cells/ComboChartCell'
import { RadarChartCell } from './cells/RadarChartCell'
import { DivergingBarCell } from './cells/DivergingBarCell'
import { SparklineCard } from './cells/SparklineCard'
import { TableCell } from './cells/TableCell'

function KpiCell({ data }: { data: any }) {
  // If data has sparkline trend data, use SparklineCard
  if (typeof data === 'object' && data?.sparkline) {
    return (
      <SparklineCard
        value={data.value}
        unit={data.unit}
        trend={data.sparkline}
      />
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-3xl font-bold text-accent mb-2">
        {typeof data === 'object' ? data.value : data}
      </div>
      <div className="text-xs text-muted-foreground">
        {typeof data === 'object' ? data.unit : ''}
      </div>
    </div>
  )
}

function LineChartCell({ data }: { data: any }) {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-xs text-muted-foreground text-center">
        Line Chart<br />
        {data?.length || 0} data points
      </p>
    </div>
  )
}


function NarrativeCell({ data }: { data: any }) {
  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
        {typeof data === 'string' ? data : JSON.stringify(data)}
      </p>
    </div>
  )
}

function PulseListCell({ data }: { data: any }) {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-xs text-muted-foreground text-center">
        Pulse List / Signal Feed
      </p>
    </div>
  )
}

// Main renderer — pure switch on cell.type
export function WidgetRenderer({ cell }: { cell: Cell }) {
  let content: React.ReactNode = null

  switch (cell.type) {
    case 'kpi':
      content = <KpiCell data={cell.data} />
      break
    case 'combo-chart':
      content = <ComboChartCell data={cell.data as any} />
      break
    case 'radar-chart':
      content = <RadarChartCell data={cell.data as any} />
      break
    case 'diverging-bar':
      content = <DivergingBarCell data={cell.data as any} />
      break
    case 'line-chart':
      content = <LineChartCell data={cell.data} />
      break
    case 'table':
      content = <TableCell data={cell.data as any} />
      break
    case 'narrative':
      content = <NarrativeCell data={cell.data} />
      break
    case 'pulse-list':
      content = <PulseListCell data={cell.data} />
      break
    default:
      content = <div className="text-xs text-danger">Unknown cell type: {cell.type}</div>
  }

  return (
    <BaseCell cell={cell}>
      {content}
    </BaseCell>
  )
}

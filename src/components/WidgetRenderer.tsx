import { BaseCell } from './cells/BaseCell'
import { type Cell } from '@/store/usePrestoStore'
import { ComboChartCell } from './cells/ComboChartCell'
import { RadarChartCell } from './cells/RadarChartCell'
import { DivergingBarCell } from './cells/DivergingBarCell'
import { ForecastChartCell } from './cells/ForecastChartCell'
import { SegmentStrengthCell } from './cells/SegmentStrengthCell'
import { RadarProperCell } from './cells/RadarProperCell'
import { SparklineCard } from './cells/SparklineCard'
import { TableCell } from './cells/TableCell'
import { InsightCard } from './cells/InsightCard'
import { ProgressBarCell } from './cells/ProgressBarCell'
import { ActionButtonCell } from './cells/ActionButtonCell'
import { SignalSourcesCell } from './cells/SignalSourcesCell'
import { GeminiStreamText } from './GeminiStreamText'

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
      <div className="text-md text-muted-foreground">
        {typeof data === 'object' ? data.unit : ''}
      </div>
    </div>
  )
}

function LineChartCell({ data }: { data: any }) {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-md text-subtle-foreground text-center">
        Line Chart<br />
        {data?.length || 0} data points
      </p>
    </div>
  )
}


function NarrativeCell({ data }: { data: any }) {
  const text = typeof data === 'string' ? data : JSON.stringify(data)

  // Check for button marker
  const hasButton = text.includes('___BUTTON___')
  let displayText = text
  let buttonTitle = ''
  let buttonSubtitle = ''

  if (hasButton) {
    const match = text.match(/___BUTTON___(.+?)___POWERED_BY_(.+?)___/)
    if (match) {
      buttonTitle = match[1]
      buttonSubtitle = `Powered by ${match[2]}`
      displayText = text.replace(/\n\n___BUTTON___(.+?)___POWERED_BY_(.+?)___/, '')
    }
  }

  // Parse text into paragraphs and lists
  const parts = displayText.split('\n\n').map(paragraph => {
    const lines = paragraph.split('\n').filter(line => line.trim())

    // Check if this paragraph contains bullet points
    const hasBullets = lines.some(line => line.trim().startsWith('•'))

    if (hasBullets) {
      return (
        <ul key={Math.random()} className="list-disc list-outside pl-5 space-y-1 text-md text-subtle-foreground mb-3">
          {lines.map((line, idx) => {
            const cleaned = line.trim().replace(/^•\s*/, '')
            return <li key={idx} className="ml-2">{cleaned}</li>
          })}
        </ul>
      )
    }

    return <p key={Math.random()} className="text-md text-subtle-foreground leading-relaxed mb-3">{paragraph}</p>
  })

  return (
    <div className="prose prose-invert prose-sm max-w-none flex flex-col h-full justify-between">
      <div>{parts}</div>
      {hasButton && buttonTitle && (
        <div className="mt-6 pt-4 border-t border-border/20">
          <ActionButtonCell title={buttonTitle} subtitle={buttonSubtitle} inline />
        </div>
      )}
    </div>
  )
}

function PulseListCell() {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-xs text-muted-foreground text-center">
        Pulse List / Signal Feed
      </p>
    </div>
  )
}

function HeadingCell({ title, isLoading }: { title: string; isLoading: boolean }) {
  if (isLoading) {
    // Show skeleton loader during Scenario 1 loading
    return (
      <div className="mt-4 mb-2">
        <div className="h-9 bg-gradient-to-r from-muted-foreground/10 via-muted-foreground/20 to-muted-foreground/10 rounded w-64 animate-pulse"></div>
      </div>
    )
  }

  return (
    <h2 className="text-3xl mt-4 mb-2 font-semibold text-foreground">
      <GeminiStreamText text={title} speed={8} showCursor={false} />
    </h2>
  )
}

// Main renderer — pure switch on cell.type
export function WidgetRenderer({ cell, isTransitioning = false }: { cell: Cell; isTransitioning?: boolean }) {
  // Headers show skeleton during Scenario 1 transitions
  if (cell.type === 'header') {
    return <HeadingCell title={cell.title} isLoading={isTransitioning && cell.status === 'thinking'} />
  }

  let content: React.ReactNode = null

  switch (cell.type) {
    case 'kpi':
      content = <KpiCell data={cell.data} />
      break
    case 'combo-chart':
      content = <ComboChartCell data={cell.data as any} descriptionBottom={cell.descriptionBottom} />
      break
    case 'radar-chart':
      content = <RadarChartCell data={cell.data as any} descriptionBottom={cell.descriptionBottom} />
      break
    case 'radar':
      content = <RadarProperCell data={cell.data as any} descriptionBottom={cell.descriptionBottom} />
      break
    case 'segment-strength':
      content = <SegmentStrengthCell data={cell.data as any} descriptionBottom={cell.descriptionBottom} />
      break
    case 'diverging-bar':
      content = <DivergingBarCell data={cell.data as any} descriptionBottom={cell.descriptionBottom} />
      break
    case 'forecast-chart':
      content = <ForecastChartCell data={cell.data as any} descriptionBottom={cell.descriptionBottom} />
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
      content = <PulseListCell />
      break
    case 'insight-card':
      content = <InsightCard data={cell.data as any} title={cell.title} subtitle={cell.subtitle} />
      break
    case 'progress-bar':
      content = <ProgressBarCell title={cell.title} subtitle={cell.subtitle || ''} descriptionTop={cell.descriptionTop} descriptionBottom={cell.descriptionBottom} metric={cell.data as any} />
      break
    case 'action-button':
      content = <ActionButtonCell title={cell.title} subtitle={cell.subtitle} status={cell.status} />
      break
    case 'signal-sources':
      content = <SignalSourcesCell data={cell.data as any} descriptionTop={cell.descriptionTop} descriptionBottom={cell.descriptionBottom} />
      break
    default:
      content = <div className="text-xs text-danger">Unknown cell type: {cell.type}</div>
  }

  return (
    <BaseCell cell={cell} isTransitioning={isTransitioning}>
      {content}
    </BaseCell>
  )
}

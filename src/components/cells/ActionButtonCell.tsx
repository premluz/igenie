import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ActionButtonCellProps {
  title: string
  subtitle?: string
  status?: 'ready' | 'thinking' | 'error'
  inline?: boolean
}

export function ActionButtonCell({ title, subtitle, status = 'ready', inline = false }: ActionButtonCellProps) {
  const isLoading = status === 'thinking'

  if (inline) {
    return (
      <div className="flex items-center gap-2">
        <Button
          disabled={isLoading}
          variant="magic"
          size="2xl"
          className="gap-2"
        >
          <Sparkles size={14} />
          {title}
        </Button>
        {subtitle && (
          <p className="text-sm text-muted-foreground/100">{subtitle}</p>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <Button
        disabled={isLoading}
        className="gap-2 bg-accent hover:bg-accent/90"
      >
        <Sparkles size={16} />
        {title}
      </Button>
      {subtitle && (
        <p className="text-xs text-muted-foreground/60">{subtitle}</p>
      )}
    </div>
  )
}

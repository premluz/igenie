import { Radio, TrendingUp, Search, Activity, Flame } from 'lucide-react'
import { SparklineChart } from './SparklineChart'
import { AnimatedCounter } from './AnimatedCounter'

interface Pillar {
  id: string
  icon?: string | null
  label: string
  value: string
  subtext: string
  sparklineData?: number[]
  color?: string
}

interface SignalSourcesCellProps {
  data: {
    total: string
    subtitle?: string
    pillars: Pillar[]
  }
  descriptionTop?: string
  descriptionBottom?: string
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Radio,
  TrendingUp,
  Search,
  Activity,
  Flame,
}

const colorMap: Record<string, string> = {
  emerald: '#10b981',
  blue: '#3b82f6',
  purple: '#8b5cf6',
  orange: '#f97316',
}

const colorClassMap: Record<string, string> = {
  emerald: 'text-emerald-500',
  blue: 'text-blue-500',
  purple: 'text-purple-500',
  orange: 'text-orange-500',
}

export function SignalSourcesCell({ data, descriptionTop, descriptionBottom }: SignalSourcesCellProps) {
  const { total, subtitle, pillars } = data

  return (
    <div className="flex flex-col h-full">
      <style>{`
        @keyframes pillar-fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .pillar-fade-in {
          opacity: 0;
          animation: pillar-fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .pillar-fade-in:nth-child(1) { animation-delay: 0.15s; }
        .pillar-fade-in:nth-child(2) { animation-delay: 0.3s; }
        .pillar-fade-in:nth-child(3) { animation-delay: 0.45s; }
      `}</style>

      {descriptionTop && (
        <p className="text-md text-muted-foreground mb-8">{descriptionTop}</p>
      )}
      <div className="grid grid-cols-3 gap-8 flex-1">
        {pillars.map((pillar) => {
          const Icon = pillar.icon ? iconMap[pillar.icon] : null
          const color = pillar.color ? colorMap[pillar.color] : '#94a3b8'
          const colorClass = pillar.color ? colorClassMap[pillar.color] : 'text-foreground'
          const sparklineData = pillar.sparklineData || [2, 3, 2, 4, 3, 5, 9]

          return (
            <div
              key={pillar.id}
              className="grid grid-cols-2 gap-4 h-full pillar-fade-in"
            >
              {/* Left column - icon, value, label, subtext */}
              <div className="flex flex-col justify-start">
                {/* Icon + value */}
                <div className="flex items-center gap-2 mb-3">
                  {Icon && (
                    <Icon size={24} style={{ color }} className="flex-shrink-0" />
                  )}
                  <p className={`text-3xl font-bold ${colorClass}`}>
                    <AnimatedCounter value={parseInt(pillar.value) || 0} precision={0} />
                  </p>
                </div>

                {/* Label + subtext */}
                <div>
                  <p className="text-sm text-foreground font-medium">{pillar.label}</p>
                  <p className="text-sm text-muted-foreground mt-1">{pillar.subtext}</p>
                </div>
              </div>

              {/* Right column - sparkline */}
              <div className="flex items-center justify-center w-full max-h-20">
                <SparklineChart data={sparklineData} color={color} width="100%" height="100%" />
              </div>
            </div>
          )
        })}
        
      </div>
      {(descriptionBottom || total) && (
        <div className="mt-8 mb-2 pb-0 pt-4border-b border-border/20">
          <p className="text-md text-subtle-foreground">{descriptionBottom || total}</p>
          {subtitle && <p className="text-md text-muted-foreground/60 mt-1">{subtitle}</p>}
        </div>
      )}
    </div>
    
  )
}

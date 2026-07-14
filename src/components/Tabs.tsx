import React from 'react'
import type { ReactNode } from 'react'

interface TabsProps {
  tabs: Array<{ id: string; label: string }>
  defaultTab?: string
  variant?: 'line' | 'pill'
  onChange?: (tabId: string) => void
  className?: string
}

export function Tabs({ tabs, defaultTab, variant = 'line', className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]?.id)

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`flex gap-6 relative overflow-visible w-full ${
          variant === 'pill' ? 'gap-2' : 'pb-0'
        }`}
      >
        {/* Full-width line for line variant */}
        {variant === 'line' && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-border/20" />
        )}

        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-1 py-2 text-base font-medium transition-colors whitespace-nowrap relative
              ${variant === 'pill' ? 'px-3 py-1.5 rounded-sm' : 'pb-2'}
              ${
                activeTab === tab.id
                  ? variant === 'pill'
                    ? 'bg-surface text-foreground'
                    : 'text-foreground border-b-2 border-accent'
                  : 'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

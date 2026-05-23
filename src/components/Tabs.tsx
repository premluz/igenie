import React, { ReactNode } from 'react'

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
    <div className={className}>
      <div
        className={`flex gap-6 border-b border-border/20 ${
          variant === 'pill' ? 'gap-2' : ''
        }`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-1 py-2 text-sm font-medium transition-colors whitespace-nowrap
              ${variant === 'pill' ? 'px-3 py-1.5 rounded-full' : ''}
              ${
                activeTab === tab.id
                  ? variant === 'pill'
                    ? 'bg-accent text-foreground'
                    : 'text-foreground border-b-2 border-accent -mb-0.5'
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

import { X, TrendingUp, Zap, CheckCircle2, MessageCircle, ShoppingCart, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface ValidationMetric {
  value: string
  label: string
  subtitle: string
  description: string
  icon: React.ReactNode
  color: string
}

interface SignalSourceDetail {
  id: string
  label: string
  count: number
  icon: React.ReactNode
  description: string
}

interface InsightInspectorModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  validation: {
    trend: ValidationMetric
    strength: ValidationMetric
    trust: ValidationMetric
  }
  signalSources: SignalSourceDetail[]
  signalSummary: string
  assumptions: string[]
  summary?: string
}

export function InsightInspectorModal({
  isOpen,
  onClose,
  title,
  subtitle,
  validation,
  signalSources,
  signalSummary,
  assumptions,
  summary
}: InsightInspectorModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'audit'>('overview')

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal - 2x Larger */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 bg-card border border-border rounded-sm shadow-2xl flex flex-col z-50 overflow-hidden max-w-3xl right-4 left-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/20">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Insight Inspector</h2>
                <p className="text-sm text-foreground mt-1 font-medium">{title}</p>
                {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-background/50 rounded transition-colors text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 px-6 py-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-sm ${
                  activeTab === 'overview'
                    ? 'text-foreground bg-surface'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('audit')}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-sm ${
                  activeTab === 'audit'
                    ? 'text-foreground bg-surface'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Audit
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6 space-y-6">
              {activeTab === 'overview' && (
                <>
                  {/* Insight Validation - 3 Column Grid */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Insight validation</h3>
                    <div className="grid grid-cols-3 gap-6">
                      {(['trend', 'strength', 'trust'] as const).map((key) => {
                        const metric = validation[key]
                        return (
                          <div key={key}>
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`p-2 rounded bg-background/50 ${metric.color}`}>
                                {metric.icon}
                              </div>
                              <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                            </div>
                            <p className="text-sm font-medium text-foreground mb-2">{metric.label}</p>
                            <p className="text-xs text-muted-foreground mb-2">{metric.subtitle}</p>
                            <p className="text-xs text-muted-foreground">{metric.description}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Signal Sources - 1 Large Card */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Signal sources — summary</h3>
                    <div className="bg-background/30 border border-border/20 rounded-sm p-6">
                      <div className="grid grid-cols-3 gap-6 mb-6">
                        {signalSources.map((source) => (
                          <div key={source.id}>
                            <div className="flex items-center gap-3 mb-2">
                              <div className="p-2 rounded bg-background/50 text-accent">
                                {source.icon}
                              </div>
                              <p className="text-lg font-bold text-foreground">{source.count}</p>
                            </div>
                            <p className="text-sm font-medium text-foreground mb-2">{source.label}</p>
                            <p className="text-xs text-muted-foreground">{source.description}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{signalSummary}</p>
                    </div>
                  </div>

                  {/* Summary */}
                  {summary && (
                    <div className="bg-background/30 border border-border/20 rounded-sm p-4">
                      <p className="text-sm text-foreground leading-relaxed">{summary}</p>
                    </div>
                  )}

                  {/* Assumptions */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Assumptions</h3>
                    <div className="space-y-2">
                      {assumptions.map((assumption, idx) => (
                        <div key={idx} className="flex gap-3 text-sm">
                          <span className="text-muted-foreground font-medium flex-shrink-0">{idx + 1}.</span>
                          <p className="text-muted-foreground leading-relaxed">{assumption}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'audit' && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Audit details coming soon</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

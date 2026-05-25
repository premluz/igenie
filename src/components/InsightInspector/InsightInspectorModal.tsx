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

          {/* Modal - Right Aligned, 2x Width */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 right-4 bottom-4 bg-card border border-border rounded-sm shadow-2xl flex flex-col z-50 overflow-hidden w-[48rem] relative"
          >
            {/* Header - Sticky */}
            <div className="sticky top-0 z-10 bg-card p-6 border-b border-border/20">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Insight Inspector</h2>
              <div>
                <p className="text-sm text-foreground font-medium">{title}</p>
                {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
              </div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-background/50 rounded transition-colors text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs - Line Style - Sticky */}
            <div className="sticky top-20 z-10 bg-card flex border-b border-border/20 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === 'overview'
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                } ${activeTab === 'overview' ? "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent" : ""}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('audit')}
                className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === 'audit'
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                } ${activeTab === 'audit' ? "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent" : ""}`}
              >
                Audit
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6 space-y-6">
              {activeTab === 'overview' && (
                <>
                  {/* Summary - Above Validation */}
                  {summary && (
                    <p className="text-sm text-foreground leading-relaxed">{summary}</p>
                  )}

                  {/* Insight Validation - 3 Column Grid with Cards */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Insight validation</h3>
                    <div className="grid grid-cols-3 gap-6">
                      {(['trend', 'strength', 'trust'] as const).map((key) => {
                        const metric = validation[key]
                        return (
                          <div key={key} className="bg-background/40 border border-border/30 rounded-sm p-4">
                            <p className={`text-3xl font-bold ${metric.color} mb-3`}>{metric.value}</p>
                            <div className="flex items-center gap-2 mb-3">
                              <div className={`p-2 rounded bg-background/50 ${metric.color}`}>
                                {metric.icon}
                              </div>
                              <p className={`text-sm font-medium ${metric.color}`}>{metric.label}</p>
                            </div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">{metric.subtitle}</p>
                            <p className="text-sm font-medium text-muted-foreground">{metric.description}</p>
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
                            <p className="text-3xl font-bold text-purple-400 mb-3">{source.count}</p>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="p-2 rounded bg-background/50 text-purple-400">
                                {source.icon}
                              </div>
                              <p className="text-sm font-medium text-purple-400">{source.label}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{source.description}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{signalSummary}</p>
                    </div>
                  </div>

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

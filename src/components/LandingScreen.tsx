import { Folder, TrendingUp, Zap, CheckCircle2, MessageCircle, ShoppingCart, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { AmbientGridBackground } from './AmbientGridBackground'
import { NeuralGridBackground } from './NeuralGridBackground'
import { CyclingGeminiText } from './CyclingGeminiText'
import { QueryInputBox } from './QueryInputBox'
import { InspectButton, InsightInspectorModal } from './InsightInspector'
import { useNavigate } from 'react-router-dom'
import { usePrestoStore } from '@/store/usePrestoStore'
import { getScenario } from '@/scenarios'
import { motion } from 'framer-motion'
import { useState } from 'react'

const LANDING_TRIGGERS = [
  { keywords: ['genz', 'gen-z', 'gen z'], scenarioId: 'cucumber-mint' },
  { keywords: ['energy'], scenarioId: 'energy-drinks-trends-genz' },
  { keywords: ['millennial', 'millennials'], scenarioId: 'neutrogena-natural' },
  { keywords: ['positioning', 'perception', 'cucumber-mint-5'], scenarioId: 'cucumber-mint-5' },
  { keywords: ['buzz', 'competitive', 'analysis'], scenarioId: 'buzz-competitive-analysis' }
]

const REPORTS = [
  { id: 1, title: 'Brand Pulse Report Card', count: 11 },
  { id: 2, title: 'Brand Salience And Activation Performance', count: 30 },
  { id: 3, title: 'Product Strength And Brand Attributes', count: 4 },
  { id: 4, title: 'Ecommerce Share Of Influence', count: 15 },
  { id: 5, title: 'Social Channels Share Of Influence', count: 9 },
  { id: 6, title: 'Consumer Voice', count: 8 },
  { id: 7, title: 'Summarise The Category Dynamics And...', count: 22 }
]

const QUICK_ACTIONS = [
  {
    id: 'snapshot',
    icon: '📷',
    title: 'Snapshot brands',
    description: 'Get a snapshot of my brands pulse score'
  },
  {
    id: 'top-brands',
    icon: '⭐',
    title: 'Top brands',
    description: 'Which are the top 5 brands by Brand Pulse score'
  },
  {
    id: 'breakthrough',
    icon: '🎯',
    title: 'Find breakthrough',
    description: 'Find breakthrough brands in the category'
  },
  {
    id: 'buzz',
    icon: '🔥',
    title: 'Snapshot Buzz',
    description: 'Get a snapshot of Buzz score for my brands'
  }
]

export function LandingScreen({ shouldAnimate = false }: { shouldAnimate?: boolean }) {
  const navigate = useNavigate()
  const { pushLog, setTransitioning, isPageTransitioning } = usePrestoStore()
  const [showInspector, setShowInspector] = useState(false)

  const handleLinkClick = (href: string) => {
    navigate('/brand-perception')
  }

  const handleQuerySubmit = (query: string) => {
    if (!query.trim()) return

    const lowerQuery = query.toLowerCase().trim()

    // Check for scenario triggers
    for (const trigger of LANDING_TRIGGERS) {
      for (const keyword of trigger.keywords) {
        if (lowerQuery.includes(keyword)) {
          // Add user message to logs
          pushLog({ text: query, type: 'query' })

          // Get the scenario
          const scenario = getScenario(trigger.scenarioId)

          if (scenario) {
            // Pre-load scenario detail into store BEFORE navigating
            // This prevents the listing view from flashing
            const store = usePrestoStore.getState()
            store.loadScenarioDetail(trigger.scenarioId)

            // Show loading state
            setTransitioning(true)

            // Trigger loading sequence
            const loadingMessages = (scenario as any)?.loadingMessages
            const loadingDelay = (scenario as any)?.loadingDelay
            const h1LoadingTitles = [
              (scenario as any)?.h1loading1 || 'Compiling data',
              (scenario as any)?.h1loading2 || 'Analyzing data points',
              (scenario as any)?.h1loading3 || 'Assembling dashboard'
            ]

            if (loadingMessages && loadingDelay) {
              const messages = loadingMessages
              const categories = Object.keys(messages).filter(k => k !== 'summary')
              const timePerCategory = loadingDelay / categories.length

              let currentTime = 0
              categories.forEach((categoryKey, categoryIndex) => {
                const category = messages[categoryKey]

                // Update h1 loading title based on category index
                if (categoryIndex < h1LoadingTitles.length) {
                  setTimeout(() => {
                    const { setLoadingTitle } = usePrestoStore.getState()
                    setLoadingTitle(h1LoadingTitles[categoryIndex])
                  }, currentTime)
                }

                // Show header
                setTimeout(() => {
                  pushLog({ text: category.header, type: 'header' })
                }, currentTime)

                // Show texts if available
                if (category.texts && Array.isArray(category.texts)) {
                  const textDelay = timePerCategory / (category.texts.length + 1)
                  category.texts.forEach((text: string, textIndex: number) => {
                    setTimeout(() => {
                      pushLog({ text, type: 'system' })
                    }, currentTime + textDelay * (textIndex + 1))
                  })
                }

                // Show header_done
                setTimeout(() => {
                  pushLog({ text: category.header_done, type: 'header-done' })
                }, currentTime + timePerCategory - 100)

                currentTime += timePerCategory
              })

              // Show summary at the end
              setTimeout(() => {
                pushLog({ text: messages.summary, type: 'header-done' })
              }, loadingDelay - 100)

              // Start revealing cells gradually at 50% of loading delay.
              // Cells already exist in store from pre-loading above.
              setTimeout(() => {
                const { revealCellsGradually: reveal } = usePrestoStore.getState()
                reveal(loadingDelay / 2)
              }, loadingDelay / 2)

              // Navigate to update URL (scenario already loaded in store)
              window.scrollTo(0, 0)
              navigate(`/insights/${trigger.scenarioId}`)

              // Hide loading state and ensure all cells are revealed after delay
              setTimeout(() => {
                const { revealCells } = usePrestoStore.getState()
                revealCells() // Ensure any remaining 'thinking' cells transition to 'ready'
                setTransitioning(false)
              }, loadingDelay)
            } else {
              // No loading messages defined, navigate immediately
              window.scrollTo(0, 0)
              navigate(`/insights/${trigger.scenarioId}`)
            }
          }
          return
        }
      }
    }

    // If no trigger matched, just log it
    console.log('Query:', query)
  }

  const handleQuickAction = (actionId: string) => {
    // TODO: Handle quick action click
    console.log('Quick action:', actionId)
  }

  return (
    <div className="flex-1 flex overflow-hidden relative">
      {/* Left Container - Reports List */}
      <motion.div
        initial={{ x: shouldAnimate ? -320 : 0, opacity: shouldAnimate ? 0 : 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: shouldAnimate ? 0.1 : 0 }}
        className="w-80 hidden flex-shrink-0 border-r border-border overflow-y-auto backdrop-blur-md bg-background/20"
      >
        <ul className="p-3 space-y-0 list-none">
          {REPORTS.map((report) => (
            <li
              key={report.id}
              className="list-text-item card-padding-md flex items-center gap-3 text-left group cursor-pointer rounded-sm"
            >
              <Folder size={18} className="text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
              <p className="text-sm font-medium text-foreground truncate flex-1 min-w-0">
                {report.title}
              </p>
              <Badge variant="outline" className="flex-shrink-0 text-xs ">
                {report.count}
              </Badge>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Right Container - Main Content with Genie Background */}
      <div
        className="flex-1 flex flex-col overflow-auto relative"
        style={{
         // backgroundImage: 'url(/images/genie-bg.png)',
          backgroundSize: 'auto 120%',
          backgroundPosition: '75%  20% ',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat'
        }}
      >
      {/*  <AmbientGridBackground
          showNodeLines={false}
          enableMagneticCursor={false}
          nodeLineColor="rgba(255, 255, 255, 0.5)"
          nodeLineOpacity={0.8}
          nodeLineDistance={50}
          nodeConnectionCount={1}
          activeNodeCount={920}
          magneticStrength={12}
          magneticRadius={180}
        /> *.}

        {/* Top section with greeting and subtitle */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 relative z-10">

        {/* Genie Image */}
        <motion.img
          src="/images/genie2.png"
          alt="Genie"
          initial={{ opacity: shouldAnimate ? 0 : 1, y: shouldAnimate ? -20 : 0 }}
          animate={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.6, delay: shouldAnimate ? 0.1 : 0 }}
          className="h-48 w-48 mb-6 object-contain"
        />

        <motion.h1
          initial={{ opacity: shouldAnimate ? 0 : 1, y: shouldAnimate ? 10 : 0 }}
          animate={{ opacity: isPageTransitioning ? 0 : 1, y: 0, filter: isPageTransitioning ? 'blur(20px)' : 'blur(0px)' }}
          transition={{ duration: isPageTransitioning ? 0.6 : 0.6, delay: shouldAnimate && !isPageTransitioning ? 0.2 : 0 }}
          className="text-4xl  h-16  font-normal text-foreground mb-3"
        >
          <CyclingGeminiText
            texts={['Good morning Trevor.']}
            speed={12}
            delayBetweenTexts={2600}
            showCursor={false}
            maxCycles={0}
          />
        </motion.h1>
        <motion.div
          initial={{ opacity: shouldAnimate ? 0 : 1, y: shouldAnimate ? 10 : 0 }}
          animate={{ opacity: isPageTransitioning ? 0 : 1, y: 0, filter: isPageTransitioning ? 'blur(20px)' : 'blur(0px)' }}
          transition={{ duration: isPageTransitioning ? 0.6 : 0.6, delay: shouldAnimate && !isPageTransitioning ? 0.3 : 0 }}
          className="text-lg opacity-0 text-muted-foreground text-center mb-12 min-h-14 flex items-center justify-center gap-2"
        >
          <p>
            <CyclingGeminiText
              texts={[
                'Pepsi is closing the gap on Coca-Cola Original. <a href="/brand-perception">Want to dig in?</a>'

              ]}
              speed={1}
              delayBetweenTexts={3000}
              showCursor={false}
              enableLinks={true}
              maxCycles={0}
              onLinkClick={handleLinkClick}
            />
          </p>
          <InspectButton onClick={() => setShowInspector(true)} />
        </motion.div>

        {/* Insight Inspector Modal */}
        <InsightInspectorModal
          isOpen={showInspector}
          onClose={() => setShowInspector(false)}
          title="Pepsi vs Coca-Cola Original"
          subtitle="Pepsi is closing the gap on Coca-Cola Original"
          validation={{
            trend: {
              value: '+15%',
              label: 'Trend',
              subtitle: 'YoY momentum delta',
              description: 'Structural shift — not a seasonal spike. Sustained across 6 consecutive months.',
              icon: <TrendingUp size={20} />,
              color: 'text-emerald-400'
            },
            strength: {
              value: '8.7',
              label: 'Strength',
              subtitle: '89th percentile',
              description: 'High viral durability. Signal is amplifying, not plateauing. Act with confidence.',
              icon: <Zap size={20} />,
              color: 'text-blue-400'
            },
            trust: {
              value: '92%',
              label: 'Trust',
              subtitle: '38-channel validated',
              description: 'Cross-channel convergence confirmed. Social, retail and search all pointing the same direction simultaneously.',
              icon: <CheckCircle2 size={20} />,
              color: 'text-green-400'
            }
          }}
          signalSources={[
            {
              id: 'social',
              label: 'Social Buzz',
              count: 4_400,
              icon: <MessageCircle size={20} />,
              description: 'TikTok & Instagram lifestyle mentions, challenger brand narrative building'
            },
            {
              id: 'retail',
              label: 'Retail Velocity',
              count: 3_100,
              icon: <ShoppingCart size={20} />,
              description: 'Convenience and e-commerce pull, repeat purchase uptick'
            },
            {
              id: 'search',
              label: 'Search Demand',
              count: 2_900,
              icon: <Search size={20} />,
              description: 'Ingredient curiosity and brand comparison queries rising'
            }
          ]}
          signalSummary="All three sources converging = high conviction."
          assumptions={[
            'Gap defined as Buzz score delta between Pepsi and Coca-Cola Original across 14-month window',
            'Gap was 18 points at period start (Aug 2024), currently 2 points',
            "Both Pepsi's gain and Coca-Cola's decline contribute equally to the closing trajectory",
            'Momentum based on 6-month rolling average, not point-in-time snapshot',
            'December 2024 spike seasonally adjusted and excluded from trend line',
            'Confidence reduces if Pepsi momentum reverses across 2 consecutive data cycles',
            'Retail velocity sourced from verified channels only — unverified marketplace data excluded'
          ]}
          summary="6,234 data points across 42 verified channels show convergence: Social Buzz > Search Demand > Retail Intent confirmation."
        />

        {/* Quick action cards */}
        <motion.div
          initial={{ opacity: shouldAnimate ? 0 : 1, y: shouldAnimate ? 10 : 0 }}
          animate={{ opacity: isPageTransitioning ? 0 : 1, y: 0, filter: isPageTransitioning ? 'blur(20px)' : 'blur(0px)' }}
          transition={{ duration: isPageTransitioning ? 0.6 : 0.6, delay: shouldAnimate && !isPageTransitioning ? 0.4 : 0 }}
          className="grid grid-cols-4 gap-3 mb-0 max-w-4xl w-full"
        >
          {QUICK_ACTIONS.map((action, idx) => (
            <motion.button
              key={action.id}
              initial={{ opacity: shouldAnimate ? 0 : 1, y: shouldAnimate ? 10 : 0 }}
              animate={{ opacity: isPageTransitioning ? 0 : 1, y: 0 }}
              transition={{ duration: shouldAnimate && !isPageTransitioning ? 0.4 : 0.6, delay: shouldAnimate && !isPageTransitioning ? 0.5 + idx * 0.08 : 0 }}
              onClick={() => handleQuickAction(action.id)}
              className="card-hover-glow card-padding-md text-left group cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-2">
                <span className="text-xl">{action.icon}</span>
                <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors text-lg">
                  {action.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
            </motion.button>
          ))}
        </motion.div>
        {/* Bottom input section - always in DOM to preserve layout */}
        <motion.div
          initial={false}
          animate={{
            opacity: isPageTransitioning ? 0 : 1,
            visibility: isPageTransitioning ? 'hidden' : 'visible',
           
          }}
          transition={{ duration: 0.3 }}
          className="px-8 w-full py-4 z-10 relative"
        >
          <QueryInputBox onSubmit={handleQuerySubmit} showGlow={true} />

          {/* Animated input overlay - starts from original position */}
          {isPageTransitioning && (
            <motion.div
              initial={{ position: 'absolute', width: 'calc(100% - 64px)', paddingLeft: 0, paddingRight: 0, bottom: 0, left: 32, right: 'auto' }}
              animate={{ position: 'fixed', right: 24, bottom: 24, width: 320, paddingLeft: 0, paddingRight: 0, left: 'auto' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="py-4 z-20"
            >
              <QueryInputBox onSubmit={handleQuerySubmit} showGlow={true} compact={true} glowSize={3} hoverGlowSize={16} />
            </motion.div>
          )}
        </motion.div>
        </div>
      </div>
    </div>
  )
}

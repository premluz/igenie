import { useRef, useEffect, useState } from 'react'
import { usePrestoStore } from '@/store/usePrestoStore'
import genieImage from '@/assets/genie.png'
import { useScenarioDetection } from '@/hooks/useScenarioDetection'
import { LoadingTimeline } from './LoadingTimeline'
import { GeminiStreamText } from './GeminiStreamText'
import { QueryInputBox } from './QueryInputBox'
import { AmbientGridBackground } from './AmbientGridBackground'

export function PrestoSidebar() {
  const { logs, agentStatus, runReasoning, pushLog, isTransitioning } = usePrestoStore()
  const [loadingStages, setLoadingStages] = useState<string[]>([])
  const [loadingDuration, setLoadingDuration] = useState(0)
  const logsEndRef = useRef<HTMLDivElement>(null)
  const { detectScenarioTransition, transitionToScenario } = useScenarioDetection()

  // Auto-scroll logs to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const handleQuerySubmit = async (input: string) => {
    if (!input.trim() || agentStatus === 'thinking') return

    // Check if input triggers a scenario transition
    const transition = detectScenarioTransition(input)

    if (transition.matched && transition.nextScenarioId && transition.delay && transition.loadingMessages) {
      // Add user message
      pushLog({ text: input, type: 'query' })

      // Start scenario transition with progressive loading messages
      transitionToScenario(transition.nextScenarioId, transition.delay)

      // Show progressive loading messages
      const messages = transition.loadingMessages
      const categories = Object.keys(messages).filter(k => k !== 'summary')
      const timePerCategory = transition.delay / categories.length

      // Set timeline stages
      setLoadingStages(categories)
      setLoadingDuration(transition.delay)

      let currentTime = 0
      categories.forEach((categoryKey) => {
        const category = messages[categoryKey]

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
        pushLog({ text: messages.summary, type: 'success' })
      }, transition.delay - 100)

      return
    }

    await runReasoning(input)
  }

  return (
    <aside className="w-80 flex flex-col  relative overflow-hidden">
      {/* Ambient Background - Static 
      <AmbientGridBackground
        showNodeLines={false}
        enableMagneticCursor={false}
        nodeLineColor="rgba(255, 255, 255, 0.5)"
        nodeLineOpacity={0.8}
        nodeLineDistance={50}
        nodeConnectionCount={1}
        activeNodeCount={920}
        magneticStrength={0}
        magneticRadius={0}
        isAnimated={false}
      />*/}

      {/* Log Terminal */}
      <div className="flex-1 overflow-auto p-4 text-md relative z-10 flex flex-col">
        {/* Presto Image + Text - Only in empty state, fades out when logs appear */}
        <div className={`flex flex-col items-center justify-center flex-1 transition-all duration-300 ${logs.length > 0 ? 'opacity-0 blur-sm' : 'opacity-100 blur-none'}`}>
          <img src={genieImage} alt="Presto" className="h-48 w-40 opacity-60 mb-6" />
          <h2 className="text-lg font-semibold text-foreground mb-2">
            What do you want to know?
          </h2>
          <p className="text-sm text-muted-foreground text-center">
            Ask questions about data, insights, and trends.{' '}
          
          </p>
        </div>

        {/* Loading Timeline */}
        {isTransitioning && loadingStages.length > 0 && (
          <LoadingTimeline
            stages={loadingStages}
            totalDuration={loadingDuration}
            isActive={true}
          />
        )}

        {/* Logs Content */}
        <div className="relative z-10">
          {logs.length === 0 ? null : (
            <div className="">
              {logs.map((log, idx) => {
                const isUserMessage = log.type === 'query'
                const isHeader = log.type === 'header' || log.type === 'header-done'
                const isHeaderDone = log.type === 'header-done'
                const isTextContent = log.type === 'system'

                // Skip standalone text items - they're rendered as part of headers
                if (isTextContent && idx > 0) {
                  const prevLog = logs[idx - 1]
                  if (prevLog.type === 'header' || prevLog.type === 'header-done' || prevLog.type === 'system') {
                    return null
                  }
                }

                // Collect content items that follow this header
                let contentItems: typeof logs = []
                if (isHeader) {
                  for (let i = idx + 1; i < logs.length; i++) {
                    if (logs[i].type === 'system') {
                      contentItems.push(logs[i])
                    } else {
                      break
                    }
                  }
                }

                return (
                  <div key={log.id}>
                    {isUserMessage ? (
                      // User chat bubble - prominent with left margin
                      <div className="ml-20 flex justify-end">
                        <div className="bg-slate-700/40 rounded-lg px-3 py-2 max-w-xs">
                          <div className="text-sm text-slate-200 font-medium leading-normal">
                            <GeminiStreamText
                              text={log.text}
                              speed={8}
                              showCursor={false}
                            />
                          </div>
                        </div>
                      </div>
                    ) : isHeader ? (
                      // Headers with timeline dots + grouped content
                      <div className="flex gap-2">
                        {/* Timeline column */}
                        <div className="flex flex-col items-center">
                          {/* Timeline dot */}
                          <div className="w-2 h-2 rounded-full bg-slate-500/60 flex-shrink-0" />
                          {/* Connecting line to next header */}
                          {logs.slice(idx + 1).some(l => l.type === 'header' || l.type === 'header-done') && (
                            <div className="w-0.5 h-full bg-slate-500/30" />
                          )}
                        </div>

                        {/* Message content wrapper - header + all following content together */}
                        <div className="flex-1 min-w-0 pb-5 ">
                          {/* Header */}
                          {isHeaderDone ? (
                            <div className="text-md  text-emerald font-medium leading-normal">
                              <GeminiStreamText
                                text={log.text}
                                speed={8}
                                showCursor={false}
                              />
                            </div>
                          ) : (
                            <div className="text-md text-subtle-foreground leading-normal">
                              <GeminiStreamText
                                text={log.text}
                                speed={6}
                                showCursor={false}
                              />
                            </div>
                          )}
                          {/* Content items */}
                          {contentItems.map(contentLog => (
                            <div key={contentLog.id} className="text-md text-muted-foreground/85 leading-normal">
                              <GeminiStreamText
                                text={contentLog.text}
                                speed={5}
                                showCursor={false}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : isTextContent ? (
                      // Skip - handled as part of header above
                      null
                    ) : null}
                  </div>
                )
              })}
            </div>
          )}
          {agentStatus === 'thinking' && (
            <div className="text-purple animate-shimmer text-md mt-4">
              ⚡ thinking...
            </div>
          )}
          <div ref={logsEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-3 mb-1">
        <QueryInputBox
          onSubmit={handleQuerySubmit}
          placeholder="Ask a question..."
          showGlow={true}
          compact={true}
          maxWidth="w-full"
          glowSize={5}
        />
      </div>
    </aside>
  )
}

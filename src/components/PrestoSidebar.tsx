import { Send } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import { usePrestoStore } from '@/store/usePrestoStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import genieImage from '@/assets/genie.png'
import { CyclingGeminiText } from './CyclingGeminiText'

export function PrestoSidebar() {
  const { logs, agentStatus, runReasoning } = usePrestoStore()
  const [input, setInput] = useState('')
  const logsEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll logs to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || agentStatus === 'thinking') return

    await runReasoning(input)
    setInput('')
  }

  return (
    <aside className="w-80 border-l border-border flex flex-col bg-background">
      {/* Header */}
      {/*<div className="h-14 border-b border-border flex items-center px-6 bg-card/20">
        <span className="text-xs font-semibold text-foreground">Ask Presto</span>
      </div>*/}

      {/* Log Terminal */}
      <div className="flex-1 overflow-auto p-4 bg-black/20 font-mono text-xs border-b border-border relative">
        {/* Genie Background Image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img src={genieImage} alt="Presto" className="h-60 w-40 opacity-70" />
        </div>

        {/* Logs Content */}
        <div className="relative z-10 space-y-2">
          {logs.length === 0 ? (
            <div className="text-muted-foreground text-center py-4">
              <CyclingGeminiText
                texts={['Presto ready to assist', 'What can I help you with?']}
                speed={15}
                delayBetweenTexts={3000}
                showCursor={true}
              />
            </div>
          ) : (
            logs.map(log => (
              <div
                key={log.id}
                className={`${
                  log.type === 'success'
                    ? 'text-emerald'
                    : log.type === 'error'
                    ? 'text-danger'
                    : log.type === 'query'
                    ? 'text-accent'
                    : 'text-terminal'
                }`}
              >
                <span className="text-muted-foreground">{log.type} </span>
                <span>{log.text}</span>
              </div>
            ))
          )}
          {agentStatus === 'thinking' && (
            <div className="text-purple animate-shimmer">
              ⚡ thinking...
            </div>
          )}
          <div ref={logsEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-background">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={agentStatus === 'thinking'}
            className="text-xs h-9 rounded-[4px]"
          />
          <Button
            type="submit"
            disabled={agentStatus === 'thinking' || !input.trim()}
            size="sm"
            className="h-9 w-9 p-0 rounded-[4px]"
          >
            <Send size={14} />
          </Button>
        </form>
      </div>
    </aside>
  )
}

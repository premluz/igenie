import { useState } from 'react'
import { Send } from 'lucide-react'
import { DelaunayMesh } from './DelaunayMesh'
import { NeuralGridBackground } from './NeuralGridBackground'

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

export function LandingScreen() {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // TODO: Handle query submission
      console.log('Query:', query)
    }
  }

  const handleQuickAction = (actionId: string) => {
    // TODO: Handle quick action click
    console.log('Quick action:', actionId)
  }

  return (
    <div className="flex-1 flex flex-col bg-background overflow-auto relative">
      <NeuralGridBackground />
      {/* Top section with greeting and subtitle */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 relative z-10">
        {/* Delaunay Mesh Visualization */}
        <div className="w-64 h-80 mb-8 rounded-lg overflow-hidden">
          <DelaunayMesh
            width={300}
            height={375} /*  256 320 was original*/
            maxEdgeLength={175}
            nodeRadius={1.2}
            nodeColor="FFFFFF"
            nodeOpacity={30}
            edgeColor="ffffff"
            edgeOpacity={1}
            interactionRadius={200}
            attractStrength={0.28}
          />
        </div>

        <h1 className="text-4xl font-bold text-foreground mb-3">
          Good morning!
        </h1>
        <p className="text-lg text-muted-foreground text-center max-w-md mb-12">
          Ask questions, explore trends, and uncover insights across your data.
        </p>

        {/* Quick action cards */}
        <div className="grid grid-cols-2 gap-4 mb-12 max-w-2xl w-full">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action.id)}
              className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card hover:border-accent/50 transition-all duration-200 text-left group"
            >
              <div className="flex items-start gap-3 mb-2">
                <span className="text-xl">{action.icon}</span>
                <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                  {action.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom input section */}
      <div className="border-t border-border bg-card/50 p-6 relative z-10">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about a brand, trend, or category..."
              className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
            />
            <button
              type="submit"
              className="px-4 py-3 rounded-lg bg-accent hover:bg-accent/90 text-background transition-colors duration-200 flex items-center gap-2"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

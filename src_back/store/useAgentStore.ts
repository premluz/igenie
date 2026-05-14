import { create } from 'zustand';
import { mockInsightsDetail } from '@/data/mockInsights';

interface LogEntry {
  id: string;
  text: string;
  type: 'system' | 'query' | 'success';
}

interface ThoughtItem {
  id: string;
  text: string;
  tokens: number;
  reasoning: string[];
  expanded: boolean;
}

interface AgentState {
  status: 'idle' | 'thinking' | 'generating';
  logs: LogEntry[];
  thoughts: ThoughtItem[];
  showCharts: boolean;
  selectedInsight: typeof mockInsightsDetail[0] | null;
  insights: typeof mockInsightsDetail;
  addLog: (text: string, type?: 'system' | 'query' | 'success') => void;
  addThought: (text: string, tokens: number, reasoning: string[]) => void;
  toggleThought: (id: string) => void;
  runReasoning: (query: string) => Promise<void>;
  setSelectedInsight: (insight: typeof mockInsightsDetail[0] | null) => void;
}

export const useAgentStore = create<AgentState>((set) => ({
  status: 'idle',
  logs: [{ id: '1', text: 'system_ready', type: 'system' }, { id: '2', text: '> await user_input', type: 'query' }],
  thoughts: [],
  showCharts: true,
  selectedInsight: null,
  insights: mockInsightsDetail,

  addLog: (text, type = 'query') => set((state) => ({
    logs: [...state.logs, { id: Math.random().toString(), text, type }]
  })),

  addThought: (text, tokens, reasoning) => set((state) => ({
    thoughts: [...state.thoughts, {
      id: Math.random().toString(),
      text,
      tokens,
      reasoning,
      expanded: false
    }]
  })),

  toggleThought: (id) => set((state) => ({
    thoughts: state.thoughts.map(t => t.id === id ? { ...t, expanded: !t.expanded } : t)
  })),

  setSelectedInsight: (insight) => set({ selectedInsight: insight }),

  runReasoning: async (query: string) => {
    set({ status: 'thinking', showCharts: false });

    const steps = [
      { text: `> analyzing: "${query}"`, type: 'query' as const },
      { text: 'fetching_databricks_delta_lake...', type: 'system' as const },
      { text: 'calculating_signal_convergence...', type: 'system' as const },
      { text: 'synthesizing_vega_lite_spec...', type: 'system' as const },
      { text: 'insight_generated_successfully', type: 'success' as const },
    ];

    for (const step of steps) {
      await new Promise(res => setTimeout(res, 800));
      set((state) => ({
        logs: [...state.logs, { id: Math.random().toString(), text: step.text, type: step.type }]
      }));
    }

    set({ status: 'idle', showCharts: true });
  }
}));
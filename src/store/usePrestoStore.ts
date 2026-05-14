import { create } from 'zustand'
import { getScenario } from '@/scenarios'

// ============= TYPES =============

export type CellType = 'kpi' | 'combo-chart' | 'radar-chart' | 'diverging-bar' | 'line-chart' | 'table' | 'narrative' | 'pulse-list'

export type CellStatus = 'thinking' | 'ready' | 'error'

export interface Cell {
  id: string
  type: CellType
  status: CellStatus
  title: string
  subtitle?: string
  data: CellData | null
  error?: string
}

export interface Row {
  id: string
  columns: 1 | 2 | 3 | 4
  cells: Cell[]
}

export interface LogEntry {
  id: string
  text: string
  type: 'system' | 'query' | 'success' | 'error'
  timestamp: number
}

export type CellData = unknown

export interface PrestoStore {
  rows: Row[]
  activeScenario: string | null
  activeInsight: any
  logs: LogEntry[]
  agentStatus: 'idle' | 'thinking' | 'updating'
  cellTypeFilter: CellType | null
  cellTitleFilter: string
  loadScenario: (id: string) => void
  runReasoning: (prompt: string) => void
  appendRow: (row: Omit<Row, 'id'>) => void
  replaceCell: (rowId: string, cellId: string, updates: Partial<Cell>) => void
  removeCell: (rowId: string, cellId: string) => void
  moveRow: (id: string, direction: 'up' | 'down') => void
  pushLog: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => void
  clearCanvas: () => void
  setCellTypeFilter: (type: CellType | null) => void
  setCellTitleFilter: (title: string) => void
  setCurrentPage: (page: 'listing' | 'detail') => void
}

// ============= STORE =============

const genId = () => `${Date.now()}_${Math.random().toString(36).slice(2)}`

const demoRows: Row[] = [
  {
    id: 'demo-row-1',
    columns: 1,
    cells: [
      {
        id: 'demo-1',
        type: 'narrative',
        status: 'ready',
        title: 'Welcome to Presto Intelligence',
        subtitle: 'Ask a question to compose insights',
        data: 'The canvas is ready. Type a question in the Presto panel on the right to begin reasoning. The system will compose data-driven insights across signals.'
      }
    ]
  },
  {
    id: 'demo-row-2',
    columns: 2,
    cells: [
      {
        id: 'demo-2',
        type: 'kpi',
        status: 'ready',
        title: 'Signal Velocity',
        data: { value: '8.4', unit: 'signals/hour' }
      },
      {
        id: 'demo-3',
        type: 'kpi',
        status: 'ready',
        title: 'Sentiment Score',
        data: { value: '73', unit: '%' }
      }
    ]
  }
]

const simulateReasoning = async (
  set: any,
  rowId: string,
  logs: string[],
  delaySeed: number = 1
) => {
  const logDelay = 400 * delaySeed
  for (const log of logs) {
    await new Promise(res => setTimeout(res, logDelay))
    set((state: PrestoStore) => ({
      logs: [...state.logs, {
        id: genId(),
        text: log,
        type: 'system' as const,
        timestamp: Date.now()
      }]
    }))
  }

  await new Promise(res => setTimeout(res, 800))

  set((state: PrestoStore) => ({
    rows: state.rows.map(r => r.id === rowId ? { ...r, cells: r.cells.map(c => ({ ...c, status: 'ready' as CellStatus })) } : r),
    agentStatus: 'idle' as const
  }))
}

export const usePrestoStore = create<PrestoStore>((set, get) => ({
  rows: demoRows,
  activeScenario: null,
  activeInsight: null,
  logs: [
    {
      id: genId(),
      text: 'system_ready',
      type: 'system' as const,
      timestamp: Date.now()
    }
  ],
  agentStatus: 'idle',
  cellTypeFilter: null,
  cellTitleFilter: '',

  loadScenario: async (id: string) => {
    const scenario = getScenario(id)
    if (!scenario) return

    set({
      activeScenario: id,
      activeInsight: scenario,
      rows: [],
      logs: [
        {
          id: genId(),
          text: `Loading scenario: ${scenario.brand} — ${scenario.category}`,
          type: 'system' as const,
          timestamp: Date.now()
        },
        {
          id: genId(),
          text: 'Composing canvas rows...',
          type: 'system' as const,
          timestamp: Date.now()
        }
      ],
      agentStatus: 'idle' as const
    })

    // Load all rows/cells at once with 'thinking' state
    const cellsToReveal: Array<{ rowId: string; cellId: string }> = []
    const allRows: Row[] = []

    for (let i = 0; i < scenario.initialLayout.length; i++) {
      const rowTemplate = scenario.initialLayout[i]
      const rowId = genId()

      // Inject data into cells - all start as 'thinking'
      const cellsWithData = rowTemplate.cells.map(cellTemplate => {
        let cellData = cellTemplate.data
        if (scenario.chartData[cellTemplate.title]) {
          cellData = scenario.chartData[cellTemplate.title]
        } else if (scenario.narratives[cellTemplate.title]) {
          cellData = scenario.narratives[cellTemplate.title]
        }
        const cellId = cellTemplate.id || genId()
        cellsToReveal.push({ rowId, cellId })
        return { ...cellTemplate, id: cellId, data: cellData, status: 'thinking' as CellStatus }
      })

      const newRow: Row = {
        ...rowTemplate,
        id: rowId,
        cells: cellsWithData
      }
      allRows.push(newRow)
    }

    // Set all rows at once
    set({
      rows: allRows,
      logs: [
        ...get().logs,
        {
          id: genId(),
          text: 'Canvas loaded. Revealing cards...',
          type: 'system' as const,
          timestamp: Date.now()
        }
      ]
    })

    // Randomize order of cell reveals
    const shuffled = [...cellsToReveal].sort(() => Math.random() - 0.5)

    // Reveal cells in randomized order with stagger
    for (const { rowId, cellId } of shuffled) {
      await new Promise(res => setTimeout(res, 100 + Math.random() * 200))
      set(state => ({
        rows: state.rows.map(r =>
          r.id === rowId
            ? {
                ...r,
                cells: r.cells.map(c => (c.id === cellId ? { ...c, status: 'ready' as CellStatus } : c))
              }
            : r
        )
      }))
    }

    set(state => ({
      logs: [
        ...state.logs,
        {
          id: genId(),
          text: 'Canvas ready. Ask a question to begin reasoning.',
          type: 'success' as const,
          timestamp: Date.now()
        }
      ]
    }))
  },

  runReasoning: async (prompt: string) => {
    const { activeInsight } = get()
    if (!activeInsight) return

    set({
      agentStatus: 'thinking' as const,
      logs: [
        {
          id: genId(),
          text: `> ${prompt}`,
          type: 'query' as const,
          timestamp: Date.now()
        }
      ]
    })

    const thinkingRowId = genId()
    const thinkingRow: Row = {
      id: thinkingRowId,
      columns: 1,
      cells: [
        {
          id: genId(),
          type: 'narrative',
          status: 'thinking',
          title: 'Reasoning...',
          data: null
        }
      ]
    }

    set(state => ({ rows: [...state.rows, thinkingRow] }))

    const reasoningLogs = [
      'Fetching active signals from Databricks Delta Lake...',
      'Running signal convergence algorithm...',
      'Calculating sentiment and velocity vectors...',
      'Composing narrative canvas...',
      'Rendering insights ready'
    ]

    await simulateReasoning(set, thinkingRowId, reasoningLogs, 0.8)
  },

  appendRow: (row: Omit<Row, 'id'>) => {
    set(state => ({
      rows: [...state.rows, { ...row, id: genId() } as Row]
    }))
  },

  replaceCell: (rowId: string, cellId: string, updates: Partial<Cell>) => {
    set(state => ({
      rows: state.rows.map(r =>
        r.id === rowId
          ? {
              ...r,
              cells: r.cells.map(c => (c.id === cellId ? { ...c, ...updates } : c))
            }
          : r
      )
    }))
  },

  removeCell: (rowId: string, cellId: string) => {
    set(state => ({
      rows: state.rows
        .map(r =>
          r.id === rowId ? { ...r, cells: r.cells.filter(c => c.id !== cellId) } : r
        )
        .filter(r => r.cells.length > 0)
    }))
  },

  moveRow: (id: string, direction: 'up' | 'down') => {
    set(state => {
      const index = state.rows.findIndex(r => r.id === id)
      if (index === -1) return state

      const newRows = [...state.rows]
      if (direction === 'up' && index > 0) {
        [newRows[index], newRows[index - 1]] = [newRows[index - 1], newRows[index]]
      } else if (direction === 'down' && index < newRows.length - 1) {
        [newRows[index], newRows[index + 1]] = [newRows[index + 1], newRows[index]]
      }
      return { rows: newRows }
    })
  },

  pushLog: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => {
    set(state => ({
      logs: [...state.logs, {
        id: genId(),
        timestamp: Date.now(),
        ...entry
      }]
    }))
  },

  clearCanvas: () => {
    set({
      rows: [],
      logs: [],
      agentStatus: 'idle'
    })
  },

  setCellTypeFilter: (type: CellType | null) => {
    set({ cellTypeFilter: type })
  },

  setCellTitleFilter: (title: string) => {
    set({ cellTitleFilter: title })
  }
}))

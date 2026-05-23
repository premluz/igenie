import { create } from 'zustand'
import { getScenario, scenarioMap } from '@/scenarios'

// ============= TYPES =============

export type CellType = 'kpi' | 'combo-chart' | 'radar-chart' | 'radar' | 'segment-strength' | 'diverging-bar' | 'forecast-chart' | 'line-chart' | 'treemap' | 'table' | 'narrative' | 'pulse-list' | 'insight-card' | 'progress-bar' | 'action-button' | 'signal-sources' | 'header'

export type CellStatus = 'thinking' | 'ready' | 'error'

export interface Cell {
  id: string
  type: CellType
  status: CellStatus
  title: string
  subtitle?: string
  descriptionTop?: string
  descriptionBottom?: string
  data: CellData | null
  error?: string
  magicLayer?: string
  prestosummary?: string
}

export interface Row {
  id: string
  columns: 1 | 2 | 3 | 4
  cells: Cell[]
}

export interface LogEntry {
  id: string
  text: string
  type: 'system' | 'query' | 'success' | 'error' | 'header' | 'header-done'
  timestamp: number
}

export type CellData = unknown

export interface ViewFrame {
  id: string
  label: string
  cells: Cell[]
  rows?: Row[]
  title?: string
  description?: string
  scrollY?: number
  scenarioId?: string
  detailId?: string
  scenarioTriggers?: Array<{ keywords: string[]; nextScenarioId: string }>
  animationSpeed?: { title?: number; description?: number }
  loadingDelay?: number
  loadingTitle?: string
}

export interface PrestoStore {
  rows: Row[]
  activeScenario: string | null
  activeInsight: any
  logs: LogEntry[]
  agentStatus: 'idle' | 'thinking' | 'updating'
  isTransitioning: boolean
  cellTypeFilter: CellType | null
  cellTitleFilter: string
  viewStack: ViewFrame[]
  currentView: ViewFrame | null
  enablePageTransition: boolean
  isPageTransitioning: boolean
  loadScenario: (id: string) => void
  pushView: (view: ViewFrame) => void
  popView: () => void
  loadScenarioDetail: (scenarioId: string) => void
  runReasoning: (prompt: string) => void
  appendRow: (row: Omit<Row, 'id'>) => void
  replaceCell: (rowId: string, cellId: string, updates: Partial<Cell>) => void
  removeCell: (rowId: string, cellId: string) => void
  moveRow: (id: string, direction: 'up' | 'down') => void
  pushLog: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => void
  clearCanvas: () => void
  setCellTypeFilter: (type: CellType | null) => void
  setCellTitleFilter: (title: string) => void
  setTransitioning: (transitioning: boolean) => void
  setLoadingTitle: (title: string) => void
  setEnablePageTransition: (enabled: boolean) => void
  setIsPageTransitioning: (transitioning: boolean) => void
  revealCells: () => void
  revealCellsGradually: (duration: number) => void
}

// ============= STORE =============

const genId = () => `${Date.now()}_${Math.random().toString(36).slice(2)}`

const createListingView = (): ViewFrame => {
  const listingCells: Cell[] = Object.entries(scenarioMap).map(([key, scenario]) => ({
    id: genId(),
    type: 'insight-card' as CellType,
    status: 'ready' as CellStatus,
    title: scenario.brand,
    subtitle: scenario.category,
    data: {
      scenarioId: key,
      title: scenario.title,
      description: scenario.description,
      velocityScore: scenario.velocityScore,
      sentimentScore: scenario.sentimentScore,
      sparklineData: scenario.sparklineData
    }
  }))

  return {
    id: 'listing',
    label: 'Insights',
    cells: listingCells
  }
}

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
  isTransitioning: false,
  cellTypeFilter: null,
  cellTitleFilter: '',
  viewStack: [],
  currentView: createListingView(),
  enablePageTransition: true,
  isPageTransitioning: false,

  pushView: (view: ViewFrame) => {
    set(state => ({
      viewStack: [...state.viewStack, state.currentView].filter(Boolean) as ViewFrame[],
      currentView: view
    }))
  },

  popView: () => {
    set(state => {
      if (state.viewStack.length === 0) return state
      const newStack = [...state.viewStack]
      const previousView = newStack.pop()
      return {
        viewStack: newStack,
        currentView: previousView || null
      }
    })
  },

  loadScenarioDetail: (scenarioId: string) => {
    const scenario = getScenario(scenarioId)
    if (!scenario) return

    // Create rows from scenario layout
    const cellsToReveal: Array<{ rowId: string; cellId: string }> = []
    const allRows: Row[] = []
    let allCells: Cell[] = []

    for (const rowTemplate of scenario.initialLayout) {
      const rowId = genId()

      const cellsWithData = rowTemplate.cells.map(cellTemplate => {
        let cellData = cellTemplate.data
        if (scenario.chartData && scenario.chartData[cellTemplate.title]) {
          cellData = scenario.chartData[cellTemplate.title]
        } else if (scenario.narratives && scenario.narratives[cellTemplate.title]) {
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
      allCells = [...allCells, ...cellsWithData]
    }

    const detailView: ViewFrame = {
      id: `detail-${scenarioId}`,
      label: scenario.brand,
      cells: allCells,
      rows: allRows,
      title: scenario.title,
      description: scenario.description,
      scenarioId: scenarioId,
      scenarioTriggers: scenario.scenarioTriggers,
      animationSpeed: scenario.animationSpeed,
      loadingDelay: scenario.loadingDelay
    }

    set({
      activeScenario: scenarioId,
      activeInsight: scenario,
      currentView: detailView,
      logs: []
    })
  },

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
        if (scenario.chartData && scenario.chartData[cellTemplate.title]) {
          cellData = scenario.chartData[cellTemplate.title]
        } else if (scenario.narratives && scenario.narratives[cellTemplate.title]) {
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
    const { currentView } = get()
    if (!currentView) return

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

    const thinkingCellId = genId()
    const thinkingCell: Cell = {
      id: thinkingCellId,
      type: 'narrative',
      status: 'thinking',
      title: 'Reasoning...',
      data: null
    }

    set(state => ({
      currentView: state.currentView ? {
        ...state.currentView,
        cells: [...state.currentView.cells, thinkingCell]
      } : null
    }))

    const reasoningLogs = [
      'Fetching active signals from Databricks Delta Lake...',
      'Running signal convergence algorithm...',
      'Calculating sentiment and velocity vectors...',
      'Composing narrative canvas...',
      'Rendering insights ready'
    ]

    // Simulate reasoning and update thinking cell status
    const logDelay = 400 * 0.8
    for (const log of reasoningLogs) {
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

    set(state => ({
      currentView: state.currentView ? {
        ...state.currentView,
        cells: state.currentView.cells.map(c =>
          c.id === thinkingCellId ? { ...c, status: 'ready' as CellStatus } : c
        )
      } : null,
      agentStatus: 'idle' as const
    }))
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
      agentStatus: 'idle',
      viewStack: [],
      currentView: createListingView()
    })
  },

  setCellTypeFilter: (type: CellType | null) => {
    set({ cellTypeFilter: type })
  },

  setCellTitleFilter: (title: string) => {
    set({ cellTitleFilter: title })
  },

  setTransitioning: (transitioning: boolean) => {
    set({ isTransitioning: transitioning })
  },

  setEnablePageTransition: (enabled: boolean) => {
    set({ enablePageTransition: enabled })
  },

  setIsPageTransitioning: (transitioning: boolean) => {
    set({ isPageTransitioning: transitioning })
  },

  setLoadingTitle: (title: string) => {
    set(state => ({
      currentView: state.currentView ? { ...state.currentView, loadingTitle: title } : null
    }))
  },

  revealCells: () => {
    set(state => {
      if (!state.currentView?.rows) return state

      const updatedRows = state.currentView.rows.map(row => ({
        ...row,
        cells: row.cells.map(cell => ({
          ...cell,
          status: 'ready' as CellStatus
        }))
      }))

      const updatedCells = state.currentView.cells.map(cell => ({
        ...cell,
        status: 'ready' as CellStatus
      }))

      return {
        currentView: {
          ...state.currentView,
          rows: updatedRows,
          cells: updatedCells
        }
      }
    })
  },

  revealCellsGradually: (duration: number) => {
    const state = get()
    if (!state.currentView?.rows) return

    // Collect all cells from all rows
    const cellsToReveal: Array<{ rowId: string; cellId: string }> = []
    for (const row of state.currentView.rows) {
      for (const cell of row.cells) {
        if (cell.status === 'thinking') {
          cellsToReveal.push({ rowId: row.id, cellId: cell.id })
        }
      }
    }

    // Shuffle the cells
    const shuffled = [...cellsToReveal].sort(() => Math.random() - 0.5)

    // Gradually reveal cells over the duration
    const revealInterval = duration / (shuffled.length + 1)
    shuffled.forEach((cellRef, index) => {
      setTimeout(() => {
        set(state => {
          if (!state.currentView?.rows) return state

          return {
            currentView: {
              ...state.currentView,
              rows: state.currentView.rows.map(row =>
                row.id === cellRef.rowId
                  ? {
                      ...row,
                      cells: row.cells.map(c =>
                        c.id === cellRef.cellId ? { ...c, status: 'ready' as CellStatus } : c
                      )
                    }
                  : row
              ),
              cells: state.currentView.cells.map(c =>
                c.id === cellRef.cellId ? { ...c, status: 'ready' as CellStatus } : c
              )
            }
          }
        })
      }, revealInterval * (index + 1))
    })
  }
}))

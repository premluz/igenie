# App Architecture Overview

## High-Level Structure

```
App (React Router)
├── Landing Page (unauthenticated)
│   └── LandingScreen + InteractiveGenieMesh (Three.js)
├── Main Dashboard (authenticated)
│   ├── Left Sidebar Nav (logo, search, navigation icons)
│   ├── Main Content Area
│   │   ├── PrestoSidebar (left drawer with filters/controls)
│   │   ├── CanvasGrid (main workspace)
│   │   │   └── Rows/Cells layout (react-grid-layout)
│   │   │       └── WidgetRenderer (routes to specific cell types)
│   │   └── PageTransitionOverlay (route transitions)
│   └── Right Details Panel (when viewing details)
└── Brand Perception Page (hardcoded page route)
```

## Component Ecosystem

61 components organized into layers:

### Layer 1: UI Primitives (shadcn/Radix)

`/components/ui/` (11 files)
```
├── button.tsx       (CVA variants, magic variant)
├── tooltip.tsx      (Radix Tooltip)
├── input.tsx
├── card.tsx
├── badge.tsx
├── progress.tsx
├── scroll-area.tsx
└── ...
```

**Key attributes:**
- Uses class-variance-authority (CVA) for variant composition
- radix-ui for accessible primitives (Tooltip, Slot, etc.)
- Slot component (asChild prop) for composition
- Tailwind classes + custom color tokens

### Layer 2: Data Visualization (Cell Types)

`/components/cells/` (26 files)
```
├── BaseCell.tsx              (wrapper with status/loading/header)
├── LineChartCell.tsx         (Vega-Lite multi-series)
├── TableCell.tsx             (TanStack React Table + hotspots)
├── ComboChartCell.tsx        (stacked bar + line)
├── RadarChartCell.tsx        (Vega-Lite radar)
├── RadarProperCell.tsx       (alternative radar)
├── DivergingBarCell.tsx      (diverging bar chart)
├── TreemapCell.tsx           (Vega treemap)
├── SegmentStrengthCell.tsx
├── SparklineCard.tsx         (KPI with trend sparkline)
├── ProgressBarCell.tsx
├── InsightCard.tsx           (custom insight cards)
├── SignalSourcesCell.tsx
└── ...
```

**Tech stack per cell type:**
- **Charts:** Vega-Lite (via react-vega) — 6+ cell types
- **Tables:** TanStack React Table + custom hotspots
- **Custom:** Framer Motion animations + Tailwind

### Layer 3: Page Layout & Navigation

`/components/` (22 files)
```
├── App.tsx                   (router, auth, main layout)
├── CanvasGrid.tsx            (react-grid-layout + cell container)
├── PrestoSidebar.tsx         (filters, scenario picker)
├── BrandPerceptionPage.tsx   (hardcoded page, not in router)
├── LandingScreen.tsx         (landing + auth)
├── PageTransitionOverlay.tsx (route animation)
├── Breadcrumb.tsx            (navigation trail)
├── SearchFilterBar.tsx       (search + filter UI)
├── Tabs.tsx                  (custom tab component)
├── WidgetRenderer.tsx        (switch dispatcher → cell types)
└── ...
```

### Layer 4: Visual Effects (Three.js + Framer Motion)

```
├── InteractiveGenieMesh.tsx  (Three.js mesh + particle effects)
├── HolographicAI.tsx         (3D text rendering)
├── DelaunayMesh.tsx          (procedural geometry)
├── NeuralGridBackground.tsx  (animated grid)
├── AmbientGridBackground.tsx (static grid overlay)
├── AnimatedGlow.tsx          (reusable glow component)
├── BorderGlowOverlay.tsx     (border glow effect)
├── GeminiStreamText.tsx      (typewriter animation)
└── ...
```

## State Management

### Single Zustand Store (usePrestoStore)

```typescript
export interface PrestoStore {
  // Layout
  rows: Row[]                    // grid layout
  activeScenario: string | null
  currentView: ViewFrame | null
  viewStack: ViewFrame[]         // breadcrumb history
  
  // Cell data
  rows[].cells[]                 // all cell instances
  activeInsight: any             // selected insight
  
  // UI state
  isTransitioning: boolean
  agentStatus: 'idle' | 'thinking' | 'updating'
  cellTypeFilter: CellType | null
  cellTitleFilter: string
  
  // Methods
  loadScenario(id)              // load scenario file
  pushView(view)                // navigate (breadcrumb)
  popView()                     // go back
  replaceCell(rowId, cellId, updates)
  appendRow(row)
  clearCanvas()
  setTransitioning(bool)
}
```

### Data Flow

```
Scenario File (TS)
   ↓
loadScenario() → parse cells/rows
   ↓
PrestoStore.rows[].cells[]
   ↓
CanvasGrid renders Row containers
   ↓
WidgetRenderer dispatches to cell type
   ↓
Cell component renders with data
```

**Issues with store:**
- Store is single global state — no context isolation
- No middleware — no logging, no devtools integration
- Cells hold all data types — union type CellData = unknown (not typed)
- No optimistic updates — status changes are synchronous
- Views are flattened — viewStack stores full copies (memory bloat)

## Library Integration

### Tailwind CSS Integration

```
@tailwindcss/vite (Vite plugin)
    ↓
index.css (@theme + @layer utilities)
    ↓
CVA variants (button, card, etc.)
    ↓
cn() utility (clsx + tailwind-merge)
```

**Issue:** Hardcoded hex colors in utilities layer (duplication with CSS vars)

### shadcn/Radix Integration

```
Radix Primitives
├── Tooltip (accessible, no animation)
├── Slot (composition primitives)
└── ...
    ↓
shadcn wrapper (adds Tailwind + CVA)
    ↓
Used in: App nav, button variants, dialog
```

**Issue:** shadcn only in /ui — rest of app doesn't use this pattern

### Chart Libraries

**Vega-Lite (6+ cell types)**
- Spec-based (JSON config)
- Via react-vega wrapper
- Colors hardcoded in cell components

**TanStack React Table (TableCell)**
- Headless table logic
- Manual rendering in JSX
- Custom hotspot integration

**Issue:** Chart colors don't reference design tokens

### Routing & Navigation

**React Router v7**
- BrowserRouter wraps App
- Routes with: /, /insights, /brand-perception
- Custom usePageTransition() hook (Framer Motion)

**Issue:** BrandPerceptionPage is hardcoded route, not dynamic

### Animation Library

**Framer Motion**
- Page transitions (PageTransitionOverlay)
- Cell reveal animations (BaseCell)
- Popover entrance/exit (TableCell hotspots)
- Streaming text animations (GeminiStreamText)

**Duplication:** Framer Motion + Three.js animation libraries (2 animation systems)

### Data Layout

**react-grid-layout**
- Draggable/resizable grid
- 12-column system
- Persists layout to PrestoStore

## Data Flow: Scenario → Render

### 1. Scenario Files

```typescript
// src/scenarios/brand-perception.ts
export const brandPerception: ScenarioData = {
  initialLayout: [
    {
      columns: 2,
      cells: [
        { id: 'x', type: 'table', data: {...}, prestosummary: '...' },
        { id: 'y', type: 'line-chart', data: {...} }
      ]
    }
  ]
}
```

### 2. Load Scenario

```
App.tsx (useNavigate)
   → navigateWithTransition('/brand-perception')
   → Route matches BrandPerceptionPage
   → useEffect() calls loadScenario('brand-perception')
```

### 3. Store Update

```
PrestoStore.loadScenario()
   → getScenario('brand-perception')
   → Parse initialLayout into rows
   → rows: Row[] ← state
```

### 4. Render

```
CanvasGrid (from PrestoStore.rows)
   → map rows → Row component
     → react-grid-layout
       → map cells → WidgetRenderer
         → switch(cell.type)
           → <LineChartCell data={cell.data} />
```

## Issues & Friction Points

### Architecture Issues
- **No separation of concerns** — components fetch from store directly, tightly coupled
- **No container/presenter pattern** — cells do data fetching + rendering
- **God store** — everything in Zustand, no context isolation, no scoping
- **No error boundaries** — errors in one cell crash entire grid
- **No suspense** — manually manage loading states in each cell

### Component Design
- **BaseCell wraps everything** — adds loading overlay, header, then content
  - Consequence: Hard to reuse cells outside BaseCell
  - Consequence: Inconsistent loading UX
- **WidgetRenderer is dispatcher, not router** — 17 cell types in one switch statement
- **No slot system** — can't customize cell headers or footers from parent
- **Cell type union** — CellType has 17 enum values, all in one place

### Styling
- **Design tokens split** — CSS vars defined, but utilities use hardcoded hex
- **Inline styles** — some components use style={{ }} for dynamic values (TableCell popover positioning)
- **No themeable cells** — cells hardcode colors (chart grid = #1d1d20, always)
- **Tailwind + custom CSS** — both used, hard to trace where styles come from
- **No color system for charts** — Vega specs use hardcoded color arrays

### Routing & Pages
- **BrandPerceptionPage is hardcoded** — not loaded via scenario system
  - Can't reuse cell definitions
  - Can't use dynamic layouts
- **No page builder** — can't compose pages from cells via UI
- **viewStack + React Router** — dual navigation (store + browser history)

### State Management
- **No derived state** — recompute filtered rows every render
- **No mutations** — Zustand actions don't batch updates
- **No persistence** — viewStack lost on refresh
- **Row positioning** — stored in PrestoStore, not in backend

### Data & Types
- **CellData = unknown** — no type safety
- **Cell.data is whatever** — some cells expect arrays, some objects, some primitives
- **No schema validation** — scenarios can have malformed data
- **Hardcoded sparkline generation** — not data-driven

### Accessibility
- **Interactive grids** — react-grid-layout not WCAG compliant (drag/drop)
- **Tooltip focus** — tooltips not keyboard accessible
- **No ARIA labels** — grid cells missing roles
- **Three.js visuals** — not screen-reader friendly

### Performance
- **No virtualization** — CanvasGrid renders all rows even if off-screen
- **No code splitting** — all 26 cell types loaded upfront
- **Vega specs regenerated** — generateMultiSeriesSpec() runs on every render
- **Store subscribers** — components re-render on any store change

## Oppositions / Tradeoffs

| Aspect | Current | Tradeoff |
|--------|---------|----------|
| State | Single Zustand store | Global vs. Scalability |
| Routing | React Router + Zustand stack | Browser history vs. Custom control |
| Animations | Framer Motion + Three.js | Flexibility vs. Bundle size |
| Charts | Vega-Lite (spec-based) | Type-safe config vs. Custom rendering |
| Component Design | BaseCell wrapper | Consistent UX vs. Flexibility |
| Styling | Tailwind + custom CSS | DRY vs. Escape hatches |
| Data | Untyped CellData | Flexibility vs. Runtime errors |

## Big effort to refactor design System?

**Effort: 54-87 hours (1-2 weeks)**

### Breakdown:
- **Token extraction (15-26 hrs):** Create design-tokens.ts, audit hardcoded hex, consolidate CSS vars + utilities, remove duplication
- **Component updates (18-28 hrs):** Update 11 shadcn primitives + 26 cell types + layout comps to reference tokens
- **Chart/Vega updates (6-9 hrs):** Migrate hardcoded color arrays & spec generation to use tokens
- **Testing/validation (9-14 hrs):** Visual regression, cross-browser, accessibility checks
- **Documentation (6-10 hrs):** Token reference, migration guide, examples

### Biggest challenges:
- **Vega specs are generated** — generateMultiSeriesSpec() hardcodes colors in functions (can't just find-replace)
- **No visual regression testing setup** — manual review risk
- **Inline styles** — popover positioning, dynamic classes scattered (harder to track)
- **61 components** — coordinating changes across many files
- **Chart color arrays** — need to ensure contrast/accessibility during migration

**Risk level: Medium** — high regression risk if not systematic

**Value unlock:** Token-driven theming (dark mode), design compliance checking, easier future palette changes, enables Storybook, eliminates duplication

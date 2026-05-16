/**
 * DelaunayMesh.tsx
 *
 * Proper Delaunay triangulation (Bowyer-Watson algorithm) with alpha shape
 * (maximum edge length) filtering, rendered on an SVG canvas.
 *
 * Coordinates are the 88 node (cx, cy) positions from the 1000x1000px SVG
 * silhouette. Regional constraints (ponytail isolation, arm clusters, tail
 * flow) are enforced entirely through the alpha-shape threshold — no manual
 * adjacency lists required.
 */

import { useEffect, useRef } from 'react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Pt {
  x: number
  y: number
  /** index into RAW_NODES; -1 for super-triangle vertices */
  id: number
}

interface Triangle {
  a: Pt
  b: Pt
  c: Pt
  /** circumcircle centre & radius² */
  cx: number
  cy: number
  r2: number
}

export interface DelaunayMeshProps {
  width?: number
  height?: number
  /** Alpha shape threshold — edges longer than this are discarded (px) */
  maxEdgeLength?: number
  showNodes?: boolean
  showTriangles?: boolean
  /** Node dot radius in pixels (default: 1.5 for 3x3 diameter) */
  nodeRadius?: number
  /** Node dot color in hex (default: 'FFFFFF') */
  nodeColor?: string
  /** Node dot opacity 0-100% (default: 20) */
  nodeOpacity?: number
  /** Edge line color in hex (default: 'D9D9D9') */
  edgeColor?: string
  /** Edge line opacity 0-100% (default: 40) */
  edgeOpacity?: number
  /** Cursor interaction radius in pixels (default: 200 for magnetic attraction from far away) */
  interactionRadius?: number
  /** Cursor attraction strength 0-1 (default: 0.18 for smooth damping) */
  attractStrength?: number
}

// ---------------------------------------------------------------------------
// Hard-coded node coordinates (88 nodes, 1000×1000 canvas)
// ---------------------------------------------------------------------------

const RAW_NODES: [number, number][] = [
  [511, 206], [488, 201], [488, 167], [471, 207], [462, 172], [443, 187],
  [433, 143], [461, 148], [413, 172], [408, 206], [428, 206], [375, 231],
  [362, 274], [384, 317], [457, 317], [476, 274], [418, 269], [372, 351],
  [335, 361], [296, 375], [265, 409], [252, 435], [252, 464], [394, 399],
  [394, 414], [377, 435], [432, 414], [413, 448], [367, 500], [283, 500],
  [325, 513], [327, 555], [330, 596], [357, 666], [413, 651], [394, 721],
  [456, 753], [451, 690], [466, 633], [471, 569], [471, 508], [413, 490],
  [461, 464], [515, 448], [505, 409], [500, 361], [462, 351], [543, 375],
  [568, 399], [585, 430], [585, 469], [563, 500], [590, 513], [573, 545],
  [543, 591], [515, 623], [505, 656], [490, 704], [530, 680], [583, 704],
  [637, 726], [690, 740], [717, 740], [743, 780], [707, 770], [707, 795],
  [672, 795], [589, 769], [521, 766], [605, 745], [553, 721], [661, 752],
  [648, 770], [761, 827], [751, 888], [738, 827], [733, 800], [381, 569],
  [325, 435], [461, 225],
]

// Node indices to completely isolate (blacklist ALL their edges)
const ISOLATED_NODE_INDICES = new Set<number>([
  // Empty — all nodes should connect normally now
])

// Blacklisted edge pairs (indices of nodes that should NOT connect)
// Coordinates mapped to RAW_NODES indices via nearest-neighbor matching
const EDGE_BLACKLIST = new Set<string>([
  // [471,269]→16 not to [538,370]→47 and [495,356]→45
  '16-47', '16-45',
  // [357,269]→12 not to [330,356]→18 and [291,370]→19
  '12-18', '12-19',
  // [438,182]→6 not to [456,220]→79
  '6-79',
  // [506,201]→1 not to [456,220]→79 and [471,269]→16
  '1-79', '1-16',
  // [278,495]→29 not to [325,591]→30 and [322,550]→31
  '29-30', '29-31',
  // [538,586]→54 not to [578,699]→59
  '54-59',
  // [667,790]→66 not to [746,883]→74
  '66-74',
])

function edgeKey(i: number, j: number): string {
  const [a, b] = i < j ? [i, j] : [j, i]
  return `${a}-${b}`
}

// ---------------------------------------------------------------------------
// Bowyer-Watson Delaunay triangulation
// ---------------------------------------------------------------------------

function circumcircle(a: Pt, b: Pt, c: Pt): { cx: number; cy: number; r2: number } | null {
  const ax = a.x, ay = a.y
  const bx = b.x - ax, by = b.y - ay
  const cx = c.x - ax, cy = c.y - ay
  const D = 2 * (bx * cy - by * cx)
  if (Math.abs(D) < 1e-10) return null          // degenerate (collinear)
  const ux = (cy * (bx * bx + by * by) - by * (cx * cx + cy * cy)) / D
  const uy = (bx * (cx * cx + cy * cy) - cx * (bx * bx + by * by)) / D
  const ccx = ax + ux
  const ccy = ay + uy
  const r2 = ux * ux + uy * uy
  return { cx: ccx, cy: ccy, r2 }
}

function makeTriangle(a: Pt, b: Pt, c: Pt): Triangle | null {
  const cc = circumcircle(a, b, c)
  if (!cc) return null
  return { a, b, c, ...cc }
}

function delaunay(points: Pt[], canvasW: number, canvasH: number): Triangle[] {
  // Super-triangle large enough to contain all points
  const M = Math.max(canvasW, canvasH) * 10
  const st: Pt[] = [
    { x: -M,      y: -M,      id: -1 },
    { x: M * 2,   y: 0,       id: -2 },
    { x: 0,       y: M * 2,   id: -3 },
  ]
  const superTri = makeTriangle(st[0], st[1], st[2])!
  let triangulation: Triangle[] = [superTri]

  for (const p of points) {
    // Find all triangles whose circumcircle contains p
    const bad: Triangle[] = []
    for (const tri of triangulation) {
      const dx = p.x - tri.cx
      const dy = p.y - tri.cy
      if (dx * dx + dy * dy < tri.r2) {
        bad.push(tri)
      }
    }

    // Find the boundary polygon of the "bad" triangles (unique edges)
    const boundary: [Pt, Pt][] = []
    for (const tri of bad) {
      const edges: [Pt, Pt][] = [[tri.a, tri.b], [tri.b, tri.c], [tri.c, tri.a]]
      for (const [ea, eb] of edges) {
        let shared = false
        for (const other of bad) {
          if (other === tri) continue
          const oedges: [Pt, Pt][] = [[other.a, other.b], [other.b, other.c], [other.c, other.a]]
          for (const [oa, ob] of oedges) {
            if (
              (ea.id === oa.id && eb.id === ob.id) ||
              (ea.id === ob.id && eb.id === oa.id)
            ) {
              shared = true
              break
            }
          }
          if (shared) break
        }
        if (!shared) boundary.push([ea, eb])
      }
    }

    // Remove bad triangles
    triangulation = triangulation.filter(t => !bad.includes(t))

    // Re-triangulate with p
    for (const [ea, eb] of boundary) {
      const t = makeTriangle(ea, eb, p)
      if (t) triangulation.push(t)
    }
  }

  // Remove triangles that share a vertex with the super-triangle
  return triangulation.filter(
    t => t.a.id >= 0 && t.b.id >= 0 && t.c.id >= 0
  )
}

// ---------------------------------------------------------------------------
// Alpha shape filtering
// ---------------------------------------------------------------------------

function edgeLen(a: Pt, b: Pt): number {
  return Math.hypot(b.x - a.x, b.y - a.y)
}

function alphaFilter(triangles: Triangle[], maxEdge: number): Triangle[] {
  return triangles.filter(t => {
    const d1 = edgeLen(t.a, t.b)
    const d2 = edgeLen(t.b, t.c)
    const d3 = edgeLen(t.c, t.a)

    // Alpha shape: discard if any edge exceeds threshold
    if (!(d1 <= maxEdge && d2 <= maxEdge && d3 <= maxEdge)) return false

    // Isolated nodes check: discard any triangle containing an isolated node
    if (ISOLATED_NODE_INDICES.has(t.a.id) || ISOLATED_NODE_INDICES.has(t.b.id) || ISOLATED_NODE_INDICES.has(t.c.id)) {
      return false
    }

    // Blacklist check: discard if any edge is blacklisted
    const edges = [
      edgeKey(t.a.id, t.b.id),
      edgeKey(t.b.id, t.c.id),
      edgeKey(t.c.id, t.a.id)
    ]
    if (edges.some(e => EDGE_BLACKLIST.has(e))) return false

    return true
  })
}

// ---------------------------------------------------------------------------
// Interaction constants
// ---------------------------------------------------------------------------

const INTERACTION_RADIUS = 100   // px — cursor attraction field
const ATTRACT_STRENGTH = 0.18    // fraction per frame toward cursor
const RESTORE_STRENGTH = 0.08    // fraction per frame back to base

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface LivePt extends Pt {
  /** original scaled position — the spring target */
  baseX: number
  baseY: number
  vx: number
  vy: number
}

export function DelaunayMesh({
  width = 1000,
  height = 1000,
  maxEdgeLength = 175,
  showNodes = true,
  showTriangles = true,
  nodeRadius = 1.5,
  nodeColor = 'FFFFFF',
  nodeOpacity = 20,
  edgeColor = 'D9D9D9',
  edgeOpacity = 40,
  interactionRadius = 200,
  attractStrength = 0.18,
}: DelaunayMeshProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  // Refs hold mutable state that the rAF loop reads directly (no re-renders)
  const livePointsRef = useRef<LivePt[]>([])
  const trianglesRef = useRef<Triangle[]>([])
  const cursorRef = useRef({ x: -99999, y: -99999 })
  const rafRef = useRef<number | null>(null)

  // ── Build geometry once (or when props change) ────────────────────────────
  useEffect(() => {
    // Scale raw 1000×1000 coords to the requested canvas size
    const scaleX = width / 1000
    const scaleY = height / 1000

    const pts: Pt[] = RAW_NODES.map(([cx, cy], i) => ({
      x: cx * scaleX,
      y: cy * scaleY,
      id: i,
    }))

    livePointsRef.current = pts.map(p => ({ ...p, baseX: p.x, baseY: p.y, vx: 0, vy: 0 }))

    const allTris = delaunay(pts, width, height)
    trianglesRef.current = alphaFilter(allTris, maxEdgeLength * Math.min(scaleX, scaleY))
  }, [width, height, maxEdgeLength])

  // ── Cursor tracking ───────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const svg = svgRef.current
      if (!svg) return
      const rect = svg.getBoundingClientRect()
      cursorRef.current = {
        x: (e.clientX - rect.left) * (width / rect.width),
        y: (e.clientY - rect.top) * (height / rect.height),
      }
    }
    const onLeave = () => { cursorRef.current = { x: -99999, y: -99999 } }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [width, height])

  // ── Animation loop ────────────────────────────────────────────────────────
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    // Cache references to the two layer groups created in JSX
    const triLayer = svg.querySelector<SVGGElement>('#tri-layer')!
    const edgeLayer = svg.querySelector<SVGGElement>('#edge-layer')!
    const nodeLayer = svg.querySelector<SVGGElement>('#node-layer')!

    // Pre-create DOM elements for triangles and edges the first time,
    // then just update their attributes — much cheaper than innerHTML.
    let triEls: SVGPolygonElement[] = []
    let edgeEls: SVGLineElement[] = []
    let nodeEls: SVGCircleElement[] = []

    const buildDOM = () => {
      // Triangles
      while (triLayer.firstChild) triLayer.removeChild(triLayer.firstChild)
      triEls = trianglesRef.current.map(() => {
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
        el.setAttribute('fill', 'rgba(217,217,217,0.05)')
        el.setAttribute('stroke', 'rgba(217,217,217,0.3)')
        el.setAttribute('stroke-width', '0.5')
        triLayer.appendChild(el)
        return el
      })

      // Unique edges
      while (edgeLayer.firstChild) edgeLayer.removeChild(edgeLayer.firstChild)
      const edgeSet = new Set<string>()
      const edgePairs: [number, number][] = []
      for (const t of trianglesRef.current) {
        const pairs: [number, number][] = [[t.a.id, t.b.id], [t.b.id, t.c.id], [t.c.id, t.a.id]]
        for (const [ia, ib] of pairs) {
          const key = ia < ib ? `${ia}-${ib}` : `${ib}-${ia}`
          if (!edgeSet.has(key)) { edgeSet.add(key); edgePairs.push([ia, ib]) }
        }
      }
      const edgeColorWithAlpha = `rgba(${parseInt(edgeColor.slice(0, 2), 16)}, ${parseInt(edgeColor.slice(2, 4), 16)}, ${parseInt(edgeColor.slice(4, 6), 16)}, ${edgeOpacity / 100})`
      edgeEls = edgePairs.map(([ia, ib]) => {
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        el.setAttribute('stroke', edgeColorWithAlpha)
        el.setAttribute('stroke-width', '0.5')
        // store indices so the loop can look them up
        el.dataset.ia = String(ia)
        el.dataset.ib = String(ib)
        edgeLayer.appendChild(el)
        return el
      })

      // Nodes
      while (nodeLayer.firstChild) nodeLayer.removeChild(nodeLayer.firstChild)
      const nodeColorWithAlpha = `rgba(${parseInt(nodeColor.slice(0, 2), 16)}, ${parseInt(nodeColor.slice(2, 4), 16)}, ${parseInt(nodeColor.slice(4, 6), 16)}, ${nodeOpacity / 100})`
      nodeEls = livePointsRef.current.map(() => {
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        el.setAttribute('r', String(nodeRadius))
        el.setAttribute('fill', nodeColorWithAlpha)
        nodeLayer.appendChild(el)
        return el
      })
    }

    buildDOM()

    // Rebuild DOM when triangulation changes (maxEdgeLength prop change triggers
    // livePointsRef + trianglesRef updates via the geometry useEffect above).
    // We poll for a triangles-count mismatch each frame.
    let lastTriCount = triEls.length

    const frame = () => {
      // Rebuild DOM layers if the triangle set changed
      if (trianglesRef.current.length !== lastTriCount) {
        buildDOM()
        lastTriCount = triEls.length
      }

      const pts = livePointsRef.current
      const cursor = cursorRef.current

      // Physics: attract toward cursor, restore to base
      for (const p of pts) {
        const dx = cursor.x - p.x
        const dy = cursor.y - p.y
        const dist = Math.hypot(dx, dy)

        if (dist < interactionRadius && dist > 0.1) {
          const pull = (1 - dist / interactionRadius) * attractStrength
          p.vx += (dx / dist) * pull
          p.vy += (dy / dist) * pull
        }

        // Spring toward base
        p.vx += (p.baseX - p.x) * RESTORE_STRENGTH
        p.vy += (p.baseY - p.y) * RESTORE_STRENGTH

        // Damping
        p.vx *= 0.75
        p.vy *= 0.75

        p.x += p.vx
        p.y += p.vy
      }

      // Update triangles
      if (showTriangles) {
        trianglesRef.current.forEach((t, i) => {
          const pa = pts[t.a.id]
          const pb = pts[t.b.id]
          const pc = pts[t.c.id]
          if (pa && pb && pc) {
            triEls[i]?.setAttribute(
              'points',
              `${pa.x},${pa.y} ${pb.x},${pb.y} ${pc.x},${pc.y}`
            )
          }
        })
      }

      // Update edges
      for (const el of edgeEls) {
        const ia = Number(el.dataset.ia)
        const ib = Number(el.dataset.ib)
        const pa = pts[ia]
        const pb = pts[ib]
        if (pa && pb) {
          el.setAttribute('x1', String(pa.x))
          el.setAttribute('y1', String(pa.y))
          el.setAttribute('x2', String(pb.x))
          el.setAttribute('y2', String(pb.y))
        }
      }

      // Update nodes
      if (showNodes) {
        pts.forEach((p, i) => {
          nodeEls[i]?.setAttribute('cx', String(p.x))
          nodeEls[i]?.setAttribute('cy', String(p.y))
        })
      }

      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [showNodes, showTriangles, edgeColor, edgeOpacity, interactionRadius, attractStrength])

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: 'block', margin: '0 auto', background: 'transparent' }}
    >
      {/* Render order: triangles behind, edges over, nodes on top */}
      <g id="tri-layer" />
      <g id="edge-layer" />
      <g id="node-layer" />
    </svg>
  )
}

export default DelaunayMesh

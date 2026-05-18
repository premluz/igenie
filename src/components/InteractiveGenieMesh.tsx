import { useEffect, useRef, useState } from 'react'

interface Point {
  x: number
  y: number
  baseX: number
  baseY: number
}

interface InteractiveGenieMeshProps {
  width?: number
  height?: number
  className?: string
}

// Node coordinates as x,y percentages (0-100) mapped from the genie.png silhouette.
// Origin (0,0) = top-left. X: 0=left edge, 100=right edge. Y: 0=top, 100=bottom.
// The silhouette has: ponytail spike (upper-left), oval head, neck, very broad crossed-arm
// shoulders, tapering torso, and a long flowing tail with S-curve and curl at the bottom.
const GENIE_TOPOLOGY = [
  // --- PONYTAIL (sharp spike curving upper-left from head, 6 nodes) ---
  // In genie.png: spike base is ~58% from left at ~8% down; tip is ~43% left at ~3% down
  { x: 58, y: 8 },   // ponytail: right base (junction with head)
  { x: 54, y: 4 },   // ponytail: ascending left
  { x: 49, y: 2 },   // ponytail: near tip
  { x: 44, y: 4 },   // ponytail: tip apex (leftmost point of spike)
  { x: 46, y: 8 },   // ponytail: descending right underside
  { x: 52, y: 11 },  // ponytail: left base (rejoins head)

  // --- HEAD (smooth oval slightly right of center, 8 nodes) ---
  // In genie.png: head center ~52% x, spans ~38-66% x, ~9-31% y
  { x: 57, y: 9 },   // head: top-right
  { x: 65, y: 15 },  // head: right cheek bulge
  { x: 66, y: 23 },  // head: right jaw
  { x: 60, y: 30 },  // head: chin right
  { x: 51, y: 32 },  // head: chin center
  { x: 43, y: 29 },  // head: chin left
  { x: 38, y: 21 },  // head: left cheek
  { x: 40, y: 12 },  // head: top-left

  // --- NECK (narrow waist between head and shoulders, 3 nodes) ---
  { x: 47, y: 33 },  // neck: left side
  { x: 53, y: 33 },  // neck: right side
  { x: 50, y: 37 },  // neck: center-bottom anchor

  // --- SHOULDERS / CROSSED ARMS (extreme width, 14 nodes) ---
  // In genie.png: arms cross creating leftmost extent ~14% x, rightmost ~86% x
  { x: 40, y: 38 },  // shoulder: left shoulder cap
  { x: 60, y: 38 },  // shoulder: right shoulder cap
  { x: 26, y: 42 },  // shoulder: left arm outer-top
  { x: 74, y: 42 },  // shoulder: right arm outer-top
  { x: 14, y: 49 },  // shoulder: left arm peak bulge (leftmost)
  { x: 86, y: 49 },  // shoulder: right arm peak bulge (rightmost)
  { x: 18, y: 57 },  // shoulder: left arm lower curve
  { x: 82, y: 57 },  // shoulder: right arm lower curve
  { x: 30, y: 63 },  // shoulder: left arm underside
  { x: 70, y: 63 },  // shoulder: right arm underside
  { x: 42, y: 59 },  // chest: left inner (arm-cross crease)
  { x: 58, y: 59 },  // chest: right inner (arm-cross crease)
  { x: 50, y: 52 },  // chest: sternum anchor
  { x: 50, y: 63 },  // chest: lower-center anchor

  // --- UPPER TORSO (tapering from arm width, 6 nodes) ---
  { x: 36, y: 68 },  // torso: left upper
  { x: 64, y: 68 },  // torso: right upper
  { x: 39, y: 74 },  // torso: left mid
  { x: 61, y: 74 },  // torso: right mid
  { x: 41, y: 79 },  // torso: left lower
  { x: 59, y: 79 },  // torso: right lower

  // --- MID TORSO / HIPS (narrowing toward tail, 6 nodes) ---
  { x: 43, y: 83 },  // hips: left
  { x: 57, y: 83 },  // hips: right
  { x: 45, y: 87 },  // hips-tail transition: left
  { x: 55, y: 87 },  // hips-tail transition: right
  { x: 47, y: 90 },  // tail-base: left edge
  { x: 53, y: 90 },  // tail-base: right edge

  // --- TAIL BASE (start of sweep, 4 nodes) ---
  // Tail begins centered then sweeps rightward (in image: right 60-70% then arcs down)
  { x: 50, y: 92 },  // tail: top center
  { x: 56, y: 93 },  // tail: biasing right
  { x: 44, y: 94 },  // tail: left inner edge
  { x: 62, y: 94 },  // tail: right outer edge

  // --- TAIL CURVE (S-curve sweeping far right then down and left, 10 nodes) ---
  // In genie.png: tail goes right to ~72% x at mid-y, then arcs down and swings back left
  { x: 66, y: 93 },  // tail-curve: upper right
  { x: 72, y: 95 },  // tail-curve: far right apex (rightmost tail point)
  { x: 70, y: 98 },  // tail-curve: beginning downward arc
  { x: 63, y: 99 },  // tail-curve: descending right
  { x: 55, y: 98 },  // tail-curve: descending center
  { x: 47, y: 97 },  // tail-curve: descending left
  { x: 40, y: 96 },  // tail-curve: swinging left
  { x: 35, y: 94 },  // tail-curve: approaching curl (leftmost tail extent)
  { x: 33, y: 91 },  // tail-curl: top of curl
  { x: 35, y: 88 },  // tail-curl: inner curl top

  // --- TAIL TIP / CURL (tight curl at bottom of tail, 5 nodes) ---
  { x: 40, y: 87 },  // tail-tip: curl middle
  { x: 45, y: 89 },  // tail-tip: curl inner right
  { x: 43, y: 93 },  // tail-tip: curl inner bottom
  { x: 38, y: 95 },  // tail-tip: curl underside
  { x: 34, y: 94 },  // tail-tip: curl endpoint
]

const INTERACTION_RADIUS = 80
const DAMPING = 0.15

export function InteractiveGenieMesh({
  width = 800,
  height = 600,
  className = ''
}: InteractiveGenieMeshProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const pointsRef = useRef<Point[]>([])
  const trianglesRef = useRef<number[][]>([])
  const cursorRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | undefined>(undefined)

  // Initialize geometry
  useEffect(() => {
    // Create point instances with base positions
    pointsRef.current = GENIE_TOPOLOGY.map(p => ({
      x: (p.x / 100) * width,
      y: (p.y / 100) * height,
      baseX: (p.x / 100) * width,
      baseY: (p.y / 100) * height
    }))

    // Generate triangles using proximity-based triangulation
    const points = pointsRef.current
    const triangles: number[][] = []
    // With ~70 densely-packed nodes, use a tighter threshold to avoid
    // cross-region spurious connections. ~90px on an 800-wide canvas ≈ 11%.
    const threshold = Math.min(width, height) * 0.12 // ~12% of shorter dimension

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        for (let k = j + 1; k < points.length; k++) {
          const pi = points[i]
          const pj = points[j]
          const pk = points[k]

          const d1 = Math.hypot(pj.x - pi.x, pj.y - pi.y)
          const d2 = Math.hypot(pk.x - pj.x, pk.y - pj.y)
          const d3 = Math.hypot(pi.x - pk.x, pi.y - pk.y)

          // Only create triangle if all edges are below threshold
          if (d1 < threshold && d2 < threshold && d3 < threshold) {
            triangles.push([i, j, k])
          }
        }
      }
    }

    trianglesRef.current = triangles
  }, [width, height])

  // Handle cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return
      const rect = svgRef.current.getBoundingClientRect()
      cursorRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    const handleMouseLeave = () => {
      cursorRef.current = { x: -10000, y: -10000 }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Animation loop
  useEffect(() => {
    const animate = () => {
      const points = pointsRef.current
      const cursor = cursorRef.current

      // Update point positions based on cursor proximity
      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        const dist = Math.hypot(cursor.x - p.baseX, cursor.y - p.baseY)

        if (dist < INTERACTION_RADIUS) {
          const pull = 1 - dist / INTERACTION_RADIUS
          const direction = Math.atan2(cursor.y - p.baseY, cursor.x - p.baseX)

          p.x += Math.cos(direction) * pull * DAMPING
          p.y += Math.sin(direction) * pull * DAMPING
        } else {
          // Snap back to base position
          p.x += (p.baseX - p.x) * 0.1
          p.y += (p.baseY - p.y) * 0.1
        }
      }

      // Trigger re-render
      renderMesh()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const renderMesh = () => {
    if (!svgRef.current) return

    const svg = svgRef.current
    const points = pointsRef.current
    const triangles = trianglesRef.current

    // Clear previous paths
    svg.querySelectorAll('polygon, line').forEach(el => el.remove())

    // Draw triangles (polygons)
    triangles.forEach((triangle, idx) => {
      const [i, j, k] = triangle
      const pi = points[i]
      const pj = points[j]
      const pk = points[k]

      const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
      polygon.setAttribute('points', `${pi.x},${pi.y} ${pj.x},${pj.y} ${pk.x},${pk.y}`)

      // Subtle color variation based on position
      const depthFactor = (pi.y + pj.y + pk.y) / 3 / height
      const opacity = 0.01 + depthFactor * 0.04
      const baseColor = `rgba(139, 92, 246, ${opacity})`

      polygon.setAttribute('fill', baseColor)
      polygon.setAttribute('stroke', 'rgba(255, 255, 255, 0.05)')
      polygon.setAttribute('stroke-width', '0.5')

      svg.appendChild(polygon)
    })

    // Draw edges (skeletal lines)
    const renderedEdges = new Set<string>()
    triangles.forEach(triangle => {
      const [i, j, k] = triangle
      const edges = [[i, j], [j, k], [k, i]]

      edges.forEach(([a, b]) => {
        const key = [Math.min(a, b), Math.max(a, b)].join('-')
        if (renderedEdges.has(key)) return

        renderedEdges.add(key)
        const pa = points[a]
        const pb = points[b]

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        line.setAttribute('x1', String(pa.x))
        line.setAttribute('y1', String(pa.y))
        line.setAttribute('x2', String(pb.x))
        line.setAttribute('y2', String(pb.y))
        line.setAttribute('stroke', 'rgba(255, 255, 255, 0.1)')
        line.setAttribute('stroke-width', '0.5')

        svg.appendChild(line)
      })
    })
  }

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={`${className} bg-transparent cursor-pointer`}
      style={{
        display: 'block',
        margin: '0 auto'
      }}
    />
  )
}

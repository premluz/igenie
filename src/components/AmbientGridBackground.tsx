import { useEffect, useRef } from 'react'

interface GridDot {
  x: number
  y: number
  offsetX?: number
  offsetY?: number
  targetOffsetX?: number
  targetOffsetY?: number
}

interface Attractor {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  maxScale: number
  opacityMultiplier: number
  isAutonomous: boolean
}

interface NodeLine {
  i: number
  j: number
  element: SVGLineElement
}

interface CursorLine {
  element: SVGLineElement
}

interface AmbientGridBackgroundProps {
  showBackground?: boolean
  baseDotRadius?: number
  baseOpacity?: number
  cursorOpacityMultiplier?: number
  autonomousOpacityMultiplier?: number
  cursorMaxScale?: number
  autonomousMaxScale?: number
  autonomousVelocity?: number
  showNodeLines?: boolean
  enableMagneticCursor?: boolean
  nodeLineColor?: string
  nodeLineOpacity?: number
  nodeLineDistance?: number
  nodeConnectionCount?: number
  activeNodeCount?: number
  magneticStrength?: number
  magneticRadius?: number
}

export function AmbientGridBackground({
  showBackground = true,
  baseDotRadius = 0.9,
  baseOpacity = 0.15,
  cursorOpacityMultiplier = 0.2,
  autonomousOpacityMultiplier = 0.5,
  cursorMaxScale = 1.2,
  autonomousMaxScale = 1.2,
  autonomousVelocity = 7,
  showNodeLines = false,
  enableMagneticCursor = true,
  nodeLineColor = 'rgba(255, 255, 255, 1)',
  nodeLineOpacity = 0.3,
  nodeLineDistance = 120,
  nodeConnectionCount = 3,
  activeNodeCount = 100,
  magneticStrength = 15,
  magneticRadius = 600
}: AmbientGridBackgroundProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const cursorSvgRef = useRef<SVGSVGElement>(null)
  const bgColorRef = useRef<string>(showBackground ? 'transparent' : 'transparent')
  const gridDotsRef = useRef<GridDot[]>([])
  const activeNodesRef = useRef<Set<number>>(new Set())
  const nodeLinesRef = useRef<NodeLine[]>([])
  const cursorLinesRef = useRef<CursorLine[]>([])
  const attractorsRef = useRef<Attractor[]>([])
  const cursorRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  console.log('AmbientGridBackground component rendering')

  const GRID_SPACING = 30
  const BASE_DOT_RADIUS = baseDotRadius
  const BASE_OPACITY = baseOpacity

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.error('Canvas ref is null')
      return
    }

    console.log('Canvas element found:', canvas)

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      console.error('Cannot get 2D context')
      return
    }

    // Canvas is transparent - shows the app background through it
    canvas.style.backgroundColor = 'transparent'

    console.log('Canvas context ready')

    // Setup canvas
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      console.log('Canvas resized:', window.innerWidth, window.innerHeight)
    }

    updateCanvasSize()

    // Generate grid dots
    const generateGridDots = () => {
      gridDotsRef.current = []
      for (let x = 0; x < window.innerWidth; x += GRID_SPACING) {
        for (let y = 0; y < window.innerHeight; y += GRID_SPACING) {
          gridDotsRef.current.push({ x, y })
        }
      }
      console.log('Grid dots generated:', gridDotsRef.current.length)
    }

    generateGridDots()

    // Initialize grid dots with offsets for magnetic effect
    gridDotsRef.current.forEach((dot) => {
      dot.offsetX = 0
      dot.offsetY = 0
      dot.targetOffsetX = 0
      dot.targetOffsetY = 0
    })

    // Randomly select active nodes
    const selectActiveNodes = () => {
      activeNodesRef.current.clear()
      const totalNodes = gridDotsRef.current.length
      const nodesToActivate = Math.min(activeNodeCount, totalNodes)

      const indices = Array.from({ length: totalNodes }, (_, i) => i)
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]]
      }

      for (let i = 0; i < nodesToActivate; i++) {
        activeNodesRef.current.add(indices[i])
      }
    }

    selectActiveNodes()

    // Create node lines if enabled (connect all nearby active nodes, varied diagonal angles)
    const createNodeLines = () => {
      if (!showNodeLines || !svgRef.current) return

      nodeLinesRef.current = []
      svgRef.current.innerHTML = ''
      const connectedPairs = new Set<string>()
      const activeIndices = Array.from(activeNodesRef.current)

      for (const i of activeIndices) {
        const dot1 = gridDotsRef.current[i]

        // Connect to ALL nearby active nodes with varied angles
        for (const j of activeIndices) {
          if (i === j) continue

          const dot2 = gridDotsRef.current[j]
          const dx = dot2.x - dot1.x
          const dy = dot2.y - dot1.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < nodeLineDistance) {
            const pairKey = [Math.min(i, j), Math.max(i, j)].join(',')

            // Skip if already connected
            if (connectedPairs.has(pairKey)) continue
            connectedPairs.add(pairKey)

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
            const opacity = nodeLineOpacity * (1 - distance / nodeLineDistance)
            const color = nodeLineColor.replace('1)', `${opacity})`)

            line.setAttribute('x1', String(dot1.x))
            line.setAttribute('y1', String(dot1.y))
            line.setAttribute('x2', String(dot2.x))
            line.setAttribute('y2', String(dot2.y))
            line.setAttribute('stroke', color)
            line.setAttribute('stroke-width', '0.5')

            svgRef.current.appendChild(line)
            nodeLinesRef.current.push({ i, j, element: line })
          }
        }
      }
    }

    createNodeLines()

    // Set background visibility
    console.log('Background visibility:', showBackground)

    // Initialize attractors
    attractorsRef.current = [
      // Cursor attractor
      {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: 0,
        vy: 0,
        radius: 250,
        maxScale: cursorMaxScale,
        opacityMultiplier: cursorOpacityMultiplier,
        isAutonomous: false
      },
      // Autonomous attractor 1
      {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * autonomousVelocity,
        vy: (Math.random() - 0.5) * autonomousVelocity,
        radius: 300,
        maxScale: autonomousMaxScale,
        opacityMultiplier: autonomousOpacityMultiplier,
        isAutonomous: true
      },
      // Autonomous attractor 2
      {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * autonomousVelocity,
        vy: (Math.random() - 0.5) * autonomousVelocity,
        radius: 300,
        maxScale: autonomousMaxScale,
        opacityMultiplier: autonomousOpacityMultiplier,
        isAutonomous: true
      }
    ]

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY }
      attractorsRef.current[0].x = e.clientX
      attractorsRef.current[0].y = e.clientY
    }

    // Handle resize
    const handleResize = () => {
      updateCanvasSize()
      generateGridDots()

      // Keep attractors on screen
      attractorsRef.current.forEach((attractor) => {
        if (attractor.isAutonomous) {
          if (attractor.x < 0 || attractor.x > window.innerWidth) {
            attractor.vx *= -1
          }
          if (attractor.y < 0 || attractor.y > window.innerHeight) {
            attractor.vy *= -1
          }
          attractor.x = Math.max(0, Math.min(window.innerWidth, attractor.x))
          attractor.y = Math.max(0, Math.min(window.innerHeight, attractor.y))
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    // Add cursor lines if enabled (only to active nodes)
    const addCursorLines = () => {
      if (!showNodeLines || !cursorSvgRef.current) return

      cursorSvgRef.current.innerHTML = ''
      cursorLinesRef.current = []
      const cursor = cursorRef.current

      for (const i of activeNodesRef.current) {
        const dot = gridDotsRef.current[i]
        const dotX = dot.x + (dot.offsetX || 0)
        const dotY = dot.y + (dot.offsetY || 0)
        const dx = cursor.x - dotX
        const dy = cursor.y - dotY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < magneticRadius) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
          const opacity = (1 - distance / magneticRadius) * 0.4
          const color = nodeLineColor.replace('1)', `${opacity})`)

          line.setAttribute('x1', String(cursor.x))
          line.setAttribute('y1', String(cursor.y))
          line.setAttribute('x2', String(dotX))
          line.setAttribute('y2', String(dotY))
          line.setAttribute('stroke', color)
          line.setAttribute('stroke-width', '0.5')

          cursorSvgRef.current.appendChild(line)
          cursorLinesRef.current.push({ element: line })
        }
      }
    }

    // Update node lines if enabled
    const updateNodeLines = () => {
      if (!showNodeLines || nodeLinesRef.current.length === 0) return

      nodeLinesRef.current.forEach((lineData) => {
        const dot1 = gridDotsRef.current[lineData.i]
        const dot2 = gridDotsRef.current[lineData.j]

        lineData.element.setAttribute('x1', String(dot1.x + (dot1.offsetX || 0)))
        lineData.element.setAttribute('y1', String(dot1.y + (dot1.offsetY || 0)))
        lineData.element.setAttribute('x2', String(dot2.x + (dot2.offsetX || 0)))
        lineData.element.setAttribute('y2', String(dot2.y + (dot2.offsetY || 0)))
      })
    }

    // Apply magnetic cursor effect to ALL nodes (active and inactive)
    const updateMagneticCursor = () => {
      if (!enableMagneticCursor) return

      const cursor = cursorRef.current
      // Pull ALL nodes, not just active ones
      gridDotsRef.current.forEach((dot) => {
        const dx = cursor.x - dot.x
        const dy = cursor.y - dot.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < magneticRadius) {
          const pull = (1 - distance / magneticRadius) * magneticStrength
          const angle = Math.atan2(dy, dx)

          dot.targetOffsetX = Math.cos(angle) * pull
          dot.targetOffsetY = Math.sin(angle) * pull
        } else {
          dot.targetOffsetX = 0
          dot.targetOffsetY = 0
        }

        // Smooth easing
        dot.offsetX = (dot.offsetX || 0) + ((dot.targetOffsetX || 0) - (dot.offsetX || 0)) * 0.1
        dot.offsetY = (dot.offsetY || 0) + ((dot.targetOffsetY || 0) - (dot.offsetY || 0)) * 0.1
      })
    }

    // Animation loop
    let frameCount = 0
    const animate = () => {
      frameCount++
      if (frameCount === 1) {
        console.log('Animation loop started')
      }

      // Clear canvas completely (transparent)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Update magnetic cursor effect
      updateMagneticCursor()
      updateNodeLines()
      addCursorLines()

      // Update autonomous attractors
      attractorsRef.current.forEach((attractor) => {
        if (!attractor.isAutonomous) return

        attractor.x += attractor.vx
        attractor.y += attractor.vy

        // Bounce off edges
        if (attractor.x - attractor.radius < 0 || attractor.x + attractor.radius > window.innerWidth) {
          attractor.vx *= -1
          attractor.x = Math.max(attractor.radius, Math.min(window.innerWidth - attractor.radius, attractor.x))
        }
        if (attractor.y - attractor.radius < 0 || attractor.y + attractor.radius > window.innerHeight) {
          attractor.vy *= -1
          attractor.y = Math.max(attractor.radius, Math.min(window.innerHeight - attractor.radius, attractor.y))
        }
      })

      // Draw dots
      gridDotsRef.current.forEach((dot) => {
        let maxInfluence = 0
        let closestAttractor: Attractor | null = null

        // Find closest attractor and calculate influence
        attractorsRef.current.forEach((attractor) => {
          const dx = dot.x - attractor.x
          const dy = dot.y - attractor.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < attractor.radius) {
            const influence = 1 - distance / attractor.radius
            if (influence > maxInfluence) {
              maxInfluence = influence
              closestAttractor = attractor
            }
          }
        })

        // Calculate dot properties
        let radius = BASE_DOT_RADIUS
        let opacity = BASE_OPACITY

        if (closestAttractor && maxInfluence > 0) {
          // @ts-ignore - TypeScript incorrectly infers closestAttractor as never due to useRef limitation
          radius = BASE_DOT_RADIUS + (closestAttractor.maxScale - BASE_DOT_RADIUS) * maxInfluence
          // @ts-ignore
          opacity = BASE_OPACITY + (closestAttractor.opacityMultiplier - BASE_OPACITY) * maxInfluence
        }

        // Draw dot
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2)
        ctx.fill()
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [showBackground, baseDotRadius, baseOpacity, cursorOpacityMultiplier, autonomousOpacityMultiplier, cursorMaxScale, autonomousMaxScale, autonomousVelocity, showNodeLines, enableMagneticCursor, nodeLineColor, nodeLineOpacity, nodeLineDistance, nodeConnectionCount, activeNodeCount, magneticStrength, magneticRadius])

  return (
    <>
      {showNodeLines && (
        <>
          <svg
            ref={svgRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          />
          <svg
            ref={cursorSvgRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          />
        </>
      )}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      />
    </>
  )
}

export default AmbientGridBackground

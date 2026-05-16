import { useEffect, useRef } from 'react'

interface Star {
  element: HTMLDivElement
  x: number
  y: number
  size: number
  offsetX: number
  offsetY: number
  targetOffsetX: number
  targetOffsetY: number
}

interface GridLine {
  element: SVGLineElement
  i: number
  j: number
  baseOpacity: number
  baseColor: string
}

interface NeuralGridConfig {
  starCount?: number
  lineDistance?: number
  lineOpacity?: number
  cursorDistance?: number
  magneticPullDistance?: number
  magneticPullStrength?: number
}

export function NeuralGridBackground({ config = {} }: { config?: NeuralGridConfig }) {
  const starsContainerRef = useRef<HTMLDivElement>(null)
  const gridLinesRef = useRef<SVGSVGElement>(null)
  const cursorLinesRef = useRef<SVGSVGElement>(null)

  const starsRef = useRef<Star[]>([])
  const gridLinesRef2 = useRef<GridLine[]>([])
  const cursorRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const rafRef = useRef<number | null>(null)

  const defaultConfig: NeuralGridConfig = {
    starCount: 100,
    lineDistance: 320,
    lineOpacity: 0.2,
    cursorDistance: 350,
    magneticPullDistance: 650,
    magneticPullStrength: 30,
    ...config
  }

  const distance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
  }

  const getElementCenter = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }
  }

  const createStars = () => {
    if (!starsContainerRef.current) return

    starsContainerRef.current.innerHTML = ''
    starsRef.current = []

    for (let i = 0; i < defaultConfig.starCount!; i++) {
      const starElement = document.createElement('div')
      starElement.className = 'neural-star'

      const size = Math.random() * Math.pow(Math.random(), 2) * 3.5 + 0.5
      const colorRandom = Math.random()
      let background, boxShadow

      if (colorRandom > 0.9) {
        background = 'radial-gradient(circle, rgba(230, 203, 166, 0.9), rgba(230, 203, 166, 0.3))'
        boxShadow = 'rgba(230, 203, 166, 0.6) 0px 0px 6px'
      } else if (colorRandom > 0.7) {
        background = 'radial-gradient(circle, rgba(139, 92, 246, 0.8), rgba(139, 92, 246, 0.2))'
        boxShadow = 'rgba(139, 92, 246, 0.4) 0px 0px 4px'
      } else {
        background = 'radial-gradient(circle, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2))'
        boxShadow = 'none'
      }

      const x = Math.random() * 100
      const y = Math.random() * 100
      const opacity = Math.random() * 0.6 + 0.4

      starElement.style.left = `${x}%`
      starElement.style.top = `${y}%`
      starElement.style.width = `${size}px`
      starElement.style.height = `${size}px`
      starElement.style.background = background
      starElement.style.boxShadow = boxShadow
      starElement.style.opacity = String(opacity)
      starElement.style.position = 'absolute'
      starElement.style.borderRadius = '50%'
      starElement.style.transition = 'transform 0.15s ease-out'

      starsContainerRef.current.appendChild(starElement)

      starsRef.current.push({
        element: starElement,
        x,
        y,
        size,
        offsetX: 0,
        offsetY: 0,
        targetOffsetX: 0,
        targetOffsetY: 0
      })
    }
  }

  const createGridLines = () => {
    if (!gridLinesRef.current) return

    gridLinesRef.current.innerHTML = ''
    gridLinesRef2.current = []

    for (let i = 0; i < starsRef.current.length; i++) {
      for (let j = i + 1; j < starsRef.current.length; j++) {
        const pos1 = getElementCenter(starsRef.current[i].element)
        const pos2 = getElementCenter(starsRef.current[j].element)
        const dist = distance(pos1.x, pos1.y, pos2.x, pos2.y)

        if (dist < defaultConfig.lineDistance!) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
          line.setAttribute('x1', String(pos1.x))
          line.setAttribute('y1', String(pos1.y))
          line.setAttribute('x2', String(pos2.x))
          line.setAttribute('y2', String(pos2.y))

          const opacity = defaultConfig.lineOpacity! * (1 - dist / defaultConfig.lineDistance!)
          const color = Math.random() > 0.5
            ? `rgba(230, 203, 166, ${opacity})`
            : `rgba(139, 92, 246, ${opacity})`

          line.setAttribute('stroke', color)
          line.setAttribute('stroke-width', '0.5')
          gridLinesRef.current.appendChild(line)

          gridLinesRef2.current.push({
            element: line,
            i,
            j,
            baseOpacity: opacity,
            baseColor: color
          })
        }
      }
    }
  }

  const updateGridLines = () => {
    for (const lineData of gridLinesRef2.current) {
      const star1 = starsRef.current[lineData.i]
      const star2 = starsRef.current[lineData.j]

      const pos1 = getElementCenter(star1.element)
      const pos2 = getElementCenter(star2.element)

      const offsetPos1X = pos1.x + star1.offsetX
      const offsetPos1Y = pos1.y + star1.offsetY
      const offsetPos2X = pos2.x + star2.offsetX
      const offsetPos2Y = pos2.y + star2.offsetY

      lineData.element.setAttribute('x1', String(offsetPos1X))
      lineData.element.setAttribute('y1', String(offsetPos1Y))
      lineData.element.setAttribute('x2', String(offsetPos2X))
      lineData.element.setAttribute('y2', String(offsetPos2Y))
    }
  }

  const updateMagneticPull = () => {
    const cursor = cursorRef.current
    for (const star of starsRef.current) {
      const pos = getElementCenter(star.element)
      const distToCursor = distance(cursor.x, cursor.y, pos.x, pos.y)

      if (distToCursor < defaultConfig.magneticPullDistance!) {
        const pullStrength = (1 - distToCursor / defaultConfig.magneticPullDistance!) * defaultConfig.magneticPullStrength!
        const angle = Math.atan2(cursor.y - pos.y, cursor.x - pos.x)

        star.targetOffsetX = Math.cos(angle) * pullStrength
        star.targetOffsetY = Math.sin(angle) * pullStrength
      } else {
        star.targetOffsetX = 0
        star.targetOffsetY = 0
      }

      star.offsetX += (star.targetOffsetX - star.offsetX) * 0.15
      star.offsetY += (star.targetOffsetY - star.offsetY) * 0.15

      star.element.style.transform = `translate(${star.offsetX}px, ${star.offsetY}px)`
    }
  }

  const updateCursorLines = () => {
    if (!cursorLinesRef.current) return

    cursorLinesRef.current.innerHTML = ''
    const cursor = cursorRef.current

    for (let i = 0; i < starsRef.current.length; i++) {
      const pos = getElementCenter(starsRef.current[i].element)
      const distToCursor = distance(cursor.x, cursor.y, pos.x, pos.y)

      if (distToCursor < defaultConfig.cursorDistance!) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')

        const offsetPosX = pos.x + starsRef.current[i].offsetX
        const offsetPosY = pos.y + starsRef.current[i].offsetY

        line.setAttribute('x1', String(cursor.x))
        line.setAttribute('y1', String(cursor.y))
        line.setAttribute('x2', String(offsetPosX))
        line.setAttribute('y2', String(offsetPosY))

        const opacity = (1 - distToCursor / defaultConfig.cursorDistance!) * 0.5
        line.setAttribute('stroke', `rgba(139, 92, 246, ${opacity})`)
        line.setAttribute('stroke-width', String((1 - distToCursor / defaultConfig.cursorDistance!) * 0.5 + 0.3))

        cursorLinesRef.current.appendChild(line)
      }
    }
  }

  const animationLoop = () => {
    updateMagneticPull()
    updateGridLines()
    updateCursorLines()
    rafRef.current = requestAnimationFrame(animationLoop)
  }

  useEffect(() => {
    createStars()
    createGridLines()

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animationLoop)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <style>{`
        .neural-star {
          animation: star-twinkle 3s ease-in-out infinite;
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: var(--star-opacity, 0.5); }
          50% { opacity: calc(var(--star-opacity, 0.5) * 0.5); }
        }
      `}</style>
      <div
        ref={starsContainerRef}
        className="absolute inset-0"
        style={{ overflow: 'hidden' }}
      />
      <svg
        ref={gridLinesRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />
      <svg
        ref={cursorLinesRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  )
}

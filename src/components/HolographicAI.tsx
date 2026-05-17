import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// Perlin-like noise using sin/cos for smooth variation
const NOISE_SHADER = `
float snoise(vec3 v) {
  vec3 p = floor(v);
  vec3 f = fract(v);
  f = f * f * (3.0 - 2.0 * f);

  float n = p.x + p.y * 157.0 + 113.0 * p.z;

  float a = sin(n) * 43758.5453;
  float b = sin(n + 1.0) * 43758.5453;
  float c = sin(n + 157.0) * 43758.5453;
  float d = sin(n + 158.0) * 43758.5453;
  float e = sin(n + 113.0) * 43758.5453;
  float f2 = sin(n + 114.0) * 43758.5453;
  float g = sin(n + 270.0) * 43758.5453;
  float h = sin(n + 271.0) * 43758.5453;

  a = fract(a) * 2.0 - 1.0;
  b = fract(b) * 2.0 - 1.0;
  c = fract(c) * 2.0 - 1.0;
  d = fract(d) * 2.0 - 1.0;
  e = fract(e) * 2.0 - 1.0;
  f2 = fract(f2) * 2.0 - 1.0;
  g = fract(g) * 2.0 - 1.0;
  h = fract(h) * 2.0 - 1.0;

  vec3 u = f;

  float ab = mix(a, b, u.x);
  float cd = mix(c, d, u.x);
  float ef = mix(e, f2, u.x);
  float gh = mix(g, h, u.x);

  float abcd = mix(ab, cd, u.y);
  float efgh = mix(ef, gh, u.y);

  return mix(abcd, efgh, u.z);
}
`

const vertexShader = `
${NOISE_SHADER}

uniform float u_time;
uniform float u_intensity;
uniform float u_scale;

varying vec3 vColor;
varying float vOpacity;

void main() {
  // Original position
  vec3 pos = position;

  // Normalize to get direction (for noise displacement)
  vec3 dir = normalize(pos);

  // Multi-octave noise for organic motion
  float noise = 0.0;
  float amp = 1.0;
  float freq = 1.0;
  float maxAmp = 0.0;

  // Layer multiple noise octaves
  for(int i = 0; i < 4; i++) {
    noise += snoise(pos * freq + u_time * 0.5) * amp;
    maxAmp += amp;
    amp *= 0.5;
    freq *= 2.0;
  }

  noise /= maxAmp;

  // Displace vertex along its normal
  float displacement = noise * u_intensity * u_scale;
  pos += dir * displacement;

  // Calculate opacity based on distance and intensity
  float dist = length(position);
  float basOpacity = 0.6 - (dist / u_scale) * 0.3;
  vOpacity = basOpacity * (0.5 + 0.5 * sin(u_time + noise * 3.14159));

  // Color transitions based on intensity
  vec3 cyan = vec3(0.0, 1.0, 1.0);
  vec3 purple = vec3(0.8, 0.0, 1.0);
  vec3 white = vec3(1.0, 1.0, 1.0);

  // Blend colors based on noise intensity
  float colorMix = 0.5 + 0.5 * sin(u_time * 0.5);
  vColor = mix(cyan, purple, colorMix);
  vColor = mix(vColor, white, u_intensity * 0.3);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

  // Size based on intensity (points get brighter when thinking)
  gl_PointSize = 1.5 + u_intensity * 2.0;
}
`

const fragmentShader = `
varying vec3 vColor;
varying float vOpacity;

void main() {
  // Create soft point sprite with radial gradient
  vec2 center = gl_PointCoord - 0.5;
  float dist = length(center) * 2.0;

  if(dist > 1.0) discard;

  // Soft edge falloff
  float alpha = (1.0 - dist * dist) * vOpacity;

  gl_FragColor = vec4(vColor, alpha);
}
`

interface HolographicAIProps {
  width?: number
  height?: number
  autoThink?: boolean
  thinkInterval?: number
}

export function HolographicAI({
  width = 400,
  height = 400,
  autoThink = true,
  thinkInterval = 5000
}: HolographicAIProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const pointsRef = useRef<THREE.Points | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const rafRef = useRef<number | null>(null)
  const timeRef = useRef(0)
  const targetIntensityRef = useRef(0)
  const currentIntensityRef = useRef(0)

  const [isThinking, setIsThinking] = useState(false)

  // Toggle thinking state with smooth easing
  const toggleThinking = (thinking: boolean) => {
    setIsThinking(thinking)
    targetIntensityRef.current = thinking ? 1.0 : 0.2
  }

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    camera.position.z = 15
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0.1)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create particle geometry
    const particleCount = 10000
    const geometry = new THREE.BufferGeometry()

    // Generate sphere points
    const positions = new Float32Array(particleCount * 3)
    const radius = 10

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // Custom shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_intensity: { value: 0.2 },
        u_scale: { value: radius }
      },
      vertexShader,
      fragmentShader,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: true,
      transparent: true
    })

    materialRef.current = material

    // Create points mesh
    const points = new THREE.Points(geometry, material)
    scene.add(points)
    pointsRef.current = points

    // Set initial intensity
    currentIntensityRef.current = 0.2

    // Auto-think interval
    let thinkTimer: NodeJS.Timeout | null = null
    if (autoThink) {
      const startThinking = () => {
        toggleThinking(true)
        thinkTimer = setTimeout(() => {
          toggleThinking(false)
          thinkTimer = setTimeout(startThinking, thinkInterval - 2000)
        }, 2000)
      }
      startThinking()
    }

    // Animation loop
    const animate = () => {
      timeRef.current += 0.016

      // Smooth intensity easing (lerp)
      currentIntensityRef.current += (targetIntensityRef.current - currentIntensityRef.current) * 0.1
      material.uniforms.u_intensity.value = currentIntensityRef.current
      material.uniforms.u_time.value = timeRef.current

      // Rotation for volumetric effect
      points.rotation.y += 0.0005
      points.rotation.x += 0.0001

      renderer.render(scene, camera)
      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const newWidth = containerRef.current.clientWidth
      const newHeight = containerRef.current.clientHeight

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (thinkTimer) clearTimeout(thinkTimer)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [width, height, autoThink, thinkInterval])

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={containerRef}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderRadius: '12px',
          overflow: 'hidden',
          background: 'radial-gradient(circle, rgba(0,20,40,0.8), rgba(0,0,0,1))',
          boxShadow: '0 0 30px rgba(0, 255, 255, 0.2), inset 0 0 30px rgba(0, 255, 255, 0.05)'
        }}
      />
      <button
        onClick={() => toggleThinking(!isThinking)}
        className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
          isThinking
            ? 'bg-accent text-background hover:bg-accent/90'
            : 'bg-card border border-border text-foreground hover:border-accent/50'
        }`}
      >
        {isThinking ? 'Stop Thinking' : 'Start Thinking'}
      </button>
    </div>
  )
}

export default HolographicAI

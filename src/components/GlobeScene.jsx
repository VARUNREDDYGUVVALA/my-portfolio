import { useEffect, useRef, useState } from 'react'
import { orbitLayers } from '../orbitData'

// Low-resolution, local coastline polygons keep the globe self-contained.
const continents = [
  [
    [-168, 70],
    [-140, 72],
    [-125, 60],
    [-110, 55],
    [-98, 50],
    [-80, 52],
    [-52, 57],
    [-60, 45],
    [-78, 25],
    [-85, 10],
    [-100, 18],
    [-115, 30],
    [-126, 50],
    [-155, 59],
  ],
  [
    [-80, 12],
    [-64, 10],
    [-48, -1],
    [-35, -8],
    [-42, -23],
    [-53, -35],
    [-68, -55],
    [-76, -37],
    [-78, -15],
  ],
  [
    [-17, 36],
    [10, 37],
    [34, 31],
    [50, 11],
    [42, -12],
    [29, -35],
    [15, -34],
    [7, -12],
    [-9, 5],
    [-17, 18],
  ],
  [
    [-10, 36],
    [-10, 57],
    [10, 71],
    [45, 68],
    [70, 75],
    [110, 73],
    [145, 65],
    [175, 58],
    [152, 45],
    [140, 35],
    [123, 23],
    [107, 5],
    [98, 9],
    [76, 8],
    [68, 25],
    [45, 30],
    [32, 41],
    [15, 39],
  ],
  [
    [112, -11],
    [135, -11],
    [153, -24],
    [146, -39],
    [125, -34],
    [113, -23],
  ],
  [
    [-53, 60],
    [-42, 60],
    [-23, 74],
    [-40, 83],
    [-60, 77],
  ],
  [
    [46, -13],
    [51, -16],
    [48, -26],
    [44, -24],
  ],
  [
    [130, 32],
    [141, 46],
    [146, 43],
    [137, 31],
  ],
]
function inside(lon, lat, polygon) {
  let result = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [x, y] = polygon[i],
      [xj, yj] = polygon[j]
    if (y > lat !== yj > lat && lon < ((xj - x) * (lat - y)) / (yj - y) + x)
      result = !result
  }
  return result
}
const land = []
for (let lat = -55; lat <= 82; lat += 3.5)
  for (let lon = -178; lon < 180; lon += 3.5)
    if (continents.some((p) => inside(lon, lat, p)))
      land.push([(lat * Math.PI) / 180, (lon * Math.PI) / 180])
function project(lat, lon, rotation, tilt = 0.16) {
  const x = Math.cos(lat) * Math.sin(lon + rotation),
    y = -Math.sin(lat),
    z = Math.cos(lat) * Math.cos(lon + rotation)
  return [
    x,
    y * Math.cos(tilt) - z * Math.sin(tilt),
    z * Math.cos(tilt) + y * Math.sin(tilt),
  ]
}
export default function GlobeScene({
  paused,
  reduced,
  system,
  onTechnology,
  onArchitecture,
}) {
  const container = useRef(null),
    canvas = useRef(null),
    nodes = useRef([]),
    angle = useRef(0.8)
  const [layer, setLayer] = useState(1)
  const [fallback, setFallback] = useState(false)
  useEffect(() => {
    const root = container.current,
      ctx = canvas.current.getContext('2d')
    if (!ctx) {
      const fallbackFrame = requestAnimationFrame(() => setFallback(true))
      return () => cancelAnimationFrame(fallbackFrame)
    }
    let width = 0,
      height = 0,
      frame = 0,
      last = 0,
      visible = true,
      dirty = true
    const resize = new ResizeObserver((entries) => {
      width = entries[0].contentRect.width
      height = entries[0].contentRect.height
      const ratio = Math.min(devicePixelRatio || 1, 1.5)
      canvas.current.width = width * ratio
      canvas.current.height = height * ratio
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      dirty = true
      if (visible && !frame) frame = requestAnimationFrame(draw)
    })
    resize.observe(root)
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting
      if (visible && !frame) frame = requestAnimationFrame(draw)
      if (!visible) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    })
    observer.observe(root)
    function draw(time) {
      frame = 0
      if (!visible || ((paused || reduced) && !dirty)) return
      if (time - last < 32 || !width) {
        frame = requestAnimationFrame(draw)
        return
      }
      const dt = Math.min((time - last) / 1000, 0.05)
      last = time
      if (!paused && !reduced) angle.current += dt * 0.055
      const cx = width / 2,
        cy = height / 2,
        r = Math.min(width * 0.27, height * 0.36),
        rot = angle.current
      ctx.clearRect(0, 0, width, height)
      const glow = ctx.createRadialGradient(cx, cy, r * 0.15, cx, cy, r * 1.6)
      glow.addColorStop(0, '#123b5836')
      glow.addColorStop(0.7, '#1555770b')
      glow.addColorStop(1, '#00000000')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath()
        for (let i = 0; i <= 90; i++) {
          const [x, y, z] = project(
            (lat * Math.PI) / 180,
            (i / 90) * Math.PI * 2,
            rot,
          )
          if (i === 0) ctx.moveTo(cx + x * r, cy + y * r)
          else ctx.lineTo(cx + x * r, cy + y * r)
          ctx.globalAlpha = z < 0 ? 0.08 : 0.19
        }
        ctx.strokeStyle = '#4c8ca5'
        ctx.lineWidth = 0.6
        ctx.stroke()
      }
      for (let lng = 0; lng < 360; lng += 30) {
        ctx.beginPath()
        for (let i = 0; i <= 60; i++) {
          const [x, y] = project(
            (i / 60 - 0.5) * Math.PI,
            (lng * Math.PI) / 180,
            rot,
          )
          if (i === 0) ctx.moveTo(cx + x * r, cy + y * r)
          else ctx.lineTo(cx + x * r, cy + y * r)
        }
        ctx.globalAlpha = 0.16
        ctx.strokeStyle = '#65afc7'
        ctx.stroke()
      }
      for (const [lat, lon] of land) {
        const [x, y, z] = project(lat, lon, rot)
        ctx.globalAlpha = z < 0 ? 0.12 : 0.45 + z * 0.5
        ctx.fillStyle = z < 0 ? '#3c829b' : '#79dcf7'
        ctx.beginPath()
        ctx.arc(
          cx + x * r,
          cy + y * r,
          z < 0 ? 0.65 : 1.1 + z * 0.55,
          0,
          Math.PI * 2,
        )
        ctx.fill()
      }
      ctx.globalAlpha = 0.45
      ctx.strokeStyle = '#79dcf7'
      ctx.lineWidth = 0.8
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.stroke()
      orbitLayers.forEach((item, j) => {
        const rx = r * (1.13 + j * 0.16),
          ry = r * (0.46 + j * 0.11),
          tilt = (j - 1.5) * 0.31
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(tilt)
        ctx.globalAlpha = layer === j ? 0.65 : 0.19
        ctx.strokeStyle = item.color
        ctx.lineWidth = layer === j ? 0.9 : 0.6
        ctx.beginPath()
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
        item.technologies.forEach((tech, k) => {
          const a =
            rot * (0.45 + j * 0.035) + (k * Math.PI * 2) / 3 + (j * Math.PI) / 6
          const ex = Math.cos(a) * rx,
            ey = Math.sin(a) * ry
          const x = ex * Math.cos(tilt) - ey * Math.sin(tilt),
            y = ex * Math.sin(tilt) + ey * Math.cos(tilt)
          const el = nodes.current[j * 3 + k]
          if (el) {
            el.style.transform = `translate(calc(-50% + ${x}px),calc(-50% + ${y}px))`
            el.style.opacity = layer === j ? '1' : '.86'
          }
          ctx.globalAlpha = layer === j ? 0.9 : 0.35
          ctx.fillStyle = item.color
          ctx.beginPath()
          ctx.arc(cx + x, cy + y, 2, 0, Math.PI * 2)
          ctx.fill()
        })
      })
      // Architectural arcs are visual routes, not geographic deployment claims.
      const paths = [
        [-0.9, 0.5, 0.6, -0.5],
        [-0.6, -0.45, 0.8, 0.4],
        [-0.3, 0.8, 0.65, -0.2],
      ]
      paths.forEach(([x1, y1, x2, y2], i) => {
        const start = { x: cx + x1 * r, y: cy + y1 * r },
          end = { x: cx + x2 * r, y: cy + y2 * r },
          control = { x: cx + (i - 1) * r * 0.25, y: cy - r * (0.8 + i * 0.15) }
        ctx.globalAlpha = 0.35
        ctx.strokeStyle = system.accent
        ctx.beginPath()
        ctx.moveTo(start.x, start.y)
        ctx.quadraticCurveTo(control.x, control.y, end.x, end.y)
        ctx.stroke()
        const t =
            reduced || paused ? 0.25 + i * 0.2 : (rot * 0.7 + i * 0.27) % 1,
          x =
            (1 - t) ** 2 * start.x +
            2 * (1 - t) * t * control.x +
            t * t * end.x,
          y =
            (1 - t) ** 2 * start.y + 2 * (1 - t) * t * control.y + t * t * end.y
        ctx.globalAlpha = 0.95
        ctx.fillStyle = system.accent
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
      dirty = false
      if (!paused && !reduced) frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      observer.disconnect()
    }
  }, [paused, reduced, layer, system])
  function pointerLayer(e) {
    if (e.pointerType === 'touch') return
    const rect = container.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2,
      y = e.clientY - rect.top - rect.height / 2
    const r = Math.min(rect.width * 0.27, rect.height * 0.36)
    const distance = Math.hypot(x, y * 1.5) / r
    setLayer(Math.min(3, Math.max(0, Math.round((distance - 1.05) / 0.18))))
  }
  return (
    <div
      className={`globe-scene ${fallback ? 'has-fallback' : ''}`}
      ref={container}
      onPointerMove={pointerLayer}
    >
      <canvas
        ref={canvas}
        role="img"
        aria-label={`Rotating 3D globe showing the ${system.name} engineering ecosystem. Use the technology buttons to explore.`}
      />
      {fallback && (
        <div
          className="globe-fallback"
          role="img"
          aria-label="Static engineering globe"
        >
          ◎<span>AI ORBIT</span>
        </div>
      )}
      <div className="globe-crosshair crosshair-top" />
      <div className="globe-crosshair crosshair-bottom" />
      {orbitLayers.flatMap((item, j) =>
        item.technologies.map((tech, k) => (
          <button
            key={tech}
            ref={(el) => {
              nodes.current[j * 3 + k] = el
            }}
            className={`orbit-tech layer-${j}`}
            style={{ '--node-color': item.color }}
            onFocus={() => setLayer(j)}
            onPointerEnter={() => setLayer(j)}
            onClick={() => {
              if (tech === 'MCP') onArchitecture('agents')
              else onTechnology(tech)
            }}
            aria-label={`Explore ${tech}`}
          >
            {tech}
            <span>↗</span>
          </button>
        )),
      )}
      <div className="globe-coordinate coordinate-left">
        SYS / 0{system.number}
        <span>CONCEPTUAL NETWORK</span>
      </div>
      <div className="globe-coordinate coordinate-right">
        AI ORBIT<span>LOCAL VISUALIZATION</span>
      </div>
      <div className="globe-layer-info" aria-live="polite">
        <span>
          ORBIT 0{layer + 1} / {orbitLayers[layer].name.toUpperCase()}
        </span>
        <p>{orbitLayers[layer].summary}</p>
      </div>
    </div>
  )
}

// "use client"

// import { useEffect, useRef } from "react

// export default function JugVisualizer({ capacity, current, label }) {
//   const canvasRef = useRef(null)

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     // Clear canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height)

//     // Set dimensions
//     const jugWidth = 80
//     const jugHeight = 20*capacity
//     const borderWidth = 3

//     // Calculate water height
//     const waterHeight = current > 0 ? (current / capacity) * (jugHeight - 2 * borderWidth) : 0

//     // Draw jug
//     ctx.fillStyle = "#e5e7eb" // Light gray for empty jug
//     ctx.fillRect((canvas.width - jugWidth) / 2, (canvas.height - jugHeight) / 2, jugWidth, jugHeight)

//     // Draw jug border
//     ctx.strokeStyle = "#6b7280" // Gray border
//     ctx.lineWidth = borderWidth
//     ctx.strokeRect((canvas.width - jugWidth) / 2, (canvas.height - jugHeight) / 2, jugWidth, jugHeight)

//     // Draw water
//     if (waterHeight > 0) {
//       ctx.fillStyle = "#3b82f6" // Blue water
//       ctx.fillRect(
//         (canvas.width - jugWidth) / 2 + borderWidth,
//         (canvas.height - jugHeight) / 2 + (jugHeight - borderWidth - waterHeight),
//         jugWidth - 2 * borderWidth,
//         waterHeight,
//       )
//     }

//     // Draw measurement lines
//     const lineSpacing = (jugHeight - 2 * borderWidth) / capacity
//     ctx.strokeStyle = "#9ca3af" // Gray lines
//     ctx.lineWidth = 1

//     for (let i = 1; i <= capacity; i++) {
//       const y = (canvas.height - jugHeight) / 2 + jugHeight - borderWidth - i * lineSpacing

//       ctx.beginPath()
//       ctx.moveTo((canvas.width - jugWidth) / 2, y)
//       ctx.lineTo((canvas.width - jugWidth) / 2 + 10, y)
//       ctx.stroke()

//       ctx.beginPath()
//       ctx.moveTo((canvas.width - jugWidth) / 2 + jugWidth - 10, y)
//       ctx.lineTo((canvas.width - jugWidth) / 2 + jugWidth, y)
//       ctx.stroke()

//       // // Add measurement text
//       // ctx.fillStyle = "#4b5563" // Text color
//       // ctx.font = "10px sans-serif"
//       // ctx.textAlign = "right"
//       // // ctx.fillText(i.toString(), (canvas.width - jugWidth) / 2 - 5, y + 3)
//     }

//     // Draw current amount text
//     ctx.fillStyle = "#1f2937" // Dark text
//     ctx.font = "bold 14px sans-serif"
//     ctx.textAlign = "center"
//     ctx.fillText(`${current}L / ${capacity}L`, canvas.width / 2, (canvas.height + jugHeight) / 2 + 25)
//   }, [capacity, current])

//   return (
//     <div className="flex flex-col items-center">
//       <h3 className="text-lg font-medium mb-2">{label}</h3>
//       <canvas ref={canvasRef} width={200} height={250} className="border rounded-md bg-white" />
//     </div>
//   )
// }

"use client"

import { useEffect, useRef } from "react"

export default function JugVisualizer({ capacity, current, label }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Dimensions
    const jugWidth = 80
    const jugHeight = 20 * capacity
    const borderWidth = 4
    const radius = 12 // Rounded corners

    const jugX = (canvas.width - jugWidth) / 2
    const jugY = (canvas.height - jugHeight) / 2

    // Water height
    const waterHeight = current > 0 ? (current / capacity) * (jugHeight - 2 * borderWidth) : 0
    const waterY = jugY + jugHeight - borderWidth - waterHeight

    // Draw jug background
    ctx.fillStyle = "#f3f4f6"
    ctx.strokeStyle = "#9ca3af"
    ctx.lineWidth = borderWidth

    ctx.beginPath()
    ctx.moveTo(jugX + radius, jugY)
    ctx.lineTo(jugX + jugWidth - radius, jugY)
    ctx.quadraticCurveTo(jugX + jugWidth, jugY, jugX + jugWidth, jugY + radius)
    ctx.lineTo(jugX + jugWidth, jugY + jugHeight - radius)
    ctx.quadraticCurveTo(jugX + jugWidth, jugY + jugHeight, jugX + jugWidth - radius, jugY + jugHeight)
    ctx.lineTo(jugX + radius, jugY + jugHeight)
    ctx.quadraticCurveTo(jugX, jugY + jugHeight, jugX, jugY + jugHeight - radius)
    ctx.lineTo(jugX, jugY + radius)
    ctx.quadraticCurveTo(jugX, jugY, jugX + radius, jugY)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Water fill
    if (waterHeight > 0) {
      const gradient = ctx.createLinearGradient(0, waterY, 0, waterY + waterHeight)
      gradient.addColorStop(0, "#60a5fa")
      gradient.addColorStop(1, "#3b82f6")
      ctx.fillStyle = gradient

      ctx.beginPath()
      ctx.moveTo(jugX + borderWidth, waterY)
      ctx.lineTo(jugX + jugWidth - borderWidth, waterY)
      ctx.lineTo(jugX + jugWidth - borderWidth, jugY + jugHeight - borderWidth)
      ctx.lineTo(jugX + borderWidth, jugY + jugHeight - borderWidth)
      ctx.closePath()
      ctx.fill()
    }

    // Measurement lines
    const lineSpacing = (jugHeight - 2 * borderWidth) / capacity
    ctx.strokeStyle = "#d1ddb"
    ctx.lineWidth = 1

    for (let i = 1; i <= capacity; i++) {
      const y = jugY + jugHeight - borderWidth - i * lineSpacing
      ctx.beginPath()
      ctx.moveTo(jugX + 5, y)
      ctx.lineTo(jugX + 15, y)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(jugX + jugWidth - 15, y)
      ctx.lineTo(jugX + jugWidth - 5, y)
      ctx.stroke()
    }

    // Amount text
    ctx.fillStyle = "#111827"
    ctx.font = "bold 15px 'Segoe UI', sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(`${current}L / ${capacity}L`, canvas.width / 2, jugY + jugHeight + 30)
  }, [capacity, current])

  return (
    <div className="flex flex-col items-center p-4 shadow-md rounded-xl bg-white">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{label}</h3>
      <canvas
        ref={canvasRef}
        width={200}
        height={300}
        className="bg-gradient-to-br from-slate-100 to-white rounded-lg"
      />
    </div>
  )
}

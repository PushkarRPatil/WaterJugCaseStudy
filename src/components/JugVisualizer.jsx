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

    // Set dimensions
    const jugWidth = 80
    const jugHeight = 160
    const borderWidth = 4

    // Calculate water height
    const waterHeight = current > 0 ? (current / capacity) * (jugHeight - 2 * borderWidth) : 0

    // Draw jug
    ctx.fillStyle = "#e5e7eb" // Light gray for empty jug
    ctx.fillRect((canvas.width - jugWidth) / 2, (canvas.height - jugHeight) / 2, jugWidth, jugHeight)

    // Draw jug border
    ctx.strokeStyle = "#6b7280" // Gray border
    ctx.lineWidth = borderWidth
    ctx.strokeRect((canvas.width - jugWidth) / 2, (canvas.height - jugHeight) / 2, jugWidth, jugHeight)

    // Draw water
    if (waterHeight > 0) {
      ctx.fillStyle = "#3b82f6" // Blue water
      ctx.fillRect(
        (canvas.width - jugWidth) / 2 + borderWidth,
        (canvas.height - jugHeight) / 2 + (jugHeight - borderWidth - waterHeight),
        jugWidth - 2 * borderWidth,
        waterHeight,
      )
    }

    // Draw measurement lines
    const lineSpacing = (jugHeight - 2 * borderWidth) / capacity
    ctx.strokeStyle = "#9ca3af" // Gray lines
    ctx.lineWidth = 1

    for (let i = 1; i <= capacity; i++) {
      const y = (canvas.height - jugHeight) / 2 + jugHeight - borderWidth - i * lineSpacing

      ctx.beginPath()
      ctx.moveTo((canvas.width - jugWidth) / 2, y)
      ctx.lineTo((canvas.width - jugWidth) / 2 + 10, y)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo((canvas.width - jugWidth) / 2 + jugWidth - 10, y)
      ctx.lineTo((canvas.width - jugWidth) / 2 + jugWidth, y)
      ctx.stroke()

      // Add measurement text
      ctx.fillStyle = "#4b5563" // Text color
      ctx.font = "10px sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(i.toString(), (canvas.width - jugWidth) / 2 - 5, y + 3)
    }

    // Draw current amount text
    ctx.fillStyle = "#1f2937" // Dark text
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(`${current}L / ${capacity}L`, canvas.width / 2, (canvas.height + jugHeight) / 2 + 25)
  }, [capacity, current])

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-medium mb-2">{label}</h3>
      <canvas ref={canvasRef} width={200} height={250} className="border rounded-md bg-white" />
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Alert, AlertDescription } from "./ui/alert"
import { Loader2, Play, Pause, SkipForward, RefreshCw } from "lucide-react"
import JugVisualizer from "./JugVisualizer"

export default function WaterJugSolver() {
  const [jug1Capacity, setJug1Capacity] = useState(5)
  const [jug2Capacity, setJug2Capacity] = useState(3)
  const [targetAmount, setTargetAmount] = useState(4)
  const [solution, setSolution] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1000)

  const solveDFS = () => {
    setIsLoading(true)
    setError("")
    setSolution([])
    setCurrentStep(0)
    setIsPlaying(false)

    if (jug1Capacity <= 0 || jug2Capacity <= 0 || targetAmount <= 0) {
      setError("All values must be positive numbers")
      setIsLoading(false)
      return
    }

    if (targetAmount > Math.max(jug1Capacity, jug2Capacity)) {
      setError("Target amount cannot be greater than the largest jug capacity")
      setIsLoading(false)
      return
    }

    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))
    const g = gcd(jug1Capacity, jug2Capacity)
    if (targetAmount % g !== 0) {
      setError(`This problem has no solution. Target must be a multiple of GCD(${jug1Capacity}, ${jug2Capacity}) = ${g}`)
      setIsLoading(false)
      return
    }

    const visited = new Set()
    const path = []
    let found = false

    const dfs = (jug1, jug2, steps) => {
      if (jug1 === targetAmount || jug2 === targetAmount) {
        setSolution([...steps])
        found = true
        return
      }

      const stateKey = `${jug1},${jug2}`
      if (visited.has(stateKey)) return
      visited.add(stateKey)
      if (found) return

      if (jug1 < jug1Capacity) dfs(jug1Capacity, jug2, [...steps, { jug1: jug1Capacity, jug2, operation: "Fill Jug 1" }])
      if (jug2 < jug2Capacity && !found) dfs(jug1, jug2Capacity, [...steps, { jug1, jug2: jug2Capacity, operation: "Fill Jug 2" }])
      if (jug1 > 0 && !found) dfs(0, jug2, [...steps, { jug1: 0, jug2, operation: "Empty Jug 1" }])
      if (jug2 > 0 && !found) dfs(jug1, 0, [...steps, { jug1, jug2: 0, operation: "Empty Jug 2" }])

      if (jug1 > 0 && jug2 < jug2Capacity && !found) {
        const amountToPour = Math.min(jug1, jug2Capacity - jug2)
        dfs(jug1 - amountToPour, jug2 + amountToPour, [...steps, { jug1: jug1 - amountToPour, jug2: jug2 + amountToPour, operation: "Pour Jug 1 → Jug 2" }])
      }

      if (jug2 > 0 && jug1 < jug1Capacity && !found) {
        const amountToPour = Math.min(jug2, jug1Capacity - jug1)
        dfs(jug1 + amountToPour, jug2 - amountToPour, [...steps, { jug1: jug1 + amountToPour, jug2: jug2 - amountToPour, operation: "Pour Jug 2 → Jug 1" }])
      }
    }

    dfs(0, 0, [{ jug1: 0, jug2: 0, operation: "Initial state" }])

    if (!found) {
      setError("No solution found using DFS. This might be due to the search depth limitation.")
    }

    setIsLoading(false)
  }

  useEffect(() => {
    let timer

    if (isPlaying && currentStep < solution.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
      }, playbackSpeed)
    } else if (currentStep >= solution.length - 1) {
      setIsPlaying(false)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isPlaying, currentStep, solution.length, playbackSpeed])

  const togglePlayback = () => setIsPlaying(!isPlaying)
  const resetAnimation = () => {
    setCurrentStep(0)
    setIsPlaying(false)
  }
  const skipToEnd = () => {
    setCurrentStep(solution.length - 1)
    setIsPlaying(false)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="jug1">Jug 1 Capacity (liters)</Label>
          <Input id="jug1" type="number" min="1" value={jug1Capacity} onChange={(e) => setJug1Capacity(Number.parseInt(e.target.value) || 0)} />
        </div>
        <div>
          <Label htmlFor="jug2">Jug 2 Capacity (liters)</Label>
          <Input id="jug2" type="number" min="1" value={jug2Capacity} onChange={(e) => setJug2Capacity(Number.parseInt(e.target.value) || 0)} />
        </div>
        <div>
          <Label htmlFor="target">Target Amount (liters)</Label>
          <Input id="target" type="number" min="1" value={targetAmount} onChange={(e) => setTargetAmount(Number.parseInt(e.target.value) || 0)} />
        </div>
      </div>

      <Button onClick={solveDFS} disabled={isLoading} className="w-full">
        {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Solving...</> : "Solve using DFS"}
      </Button>

      {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}

      {solution.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Solution: {currentStep + 1} of {solution.length} steps</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={resetAnimation}><RefreshCw className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" onClick={togglePlayback}>{isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</Button>
              <Button variant="outline" size="icon" onClick={skipToEnd}><SkipForward className="h-4 w-4" /></Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <JugVisualizer capacity={jug1Capacity} current={solution[currentStep].jug1} label="Jug 1" />
            <JugVisualizer capacity={jug2Capacity} current={solution[currentStep].jug2} label="Jug 2" />
          </div>

          <div className="bg-muted p-4 rounded-md">
            <p className="font-medium">Current operation:</p>
            <p>{solution[currentStep].operation}</p>
          </div>

          <div className="border rounded-md overflow-x-auto">
            <div className="bg-muted px-4 py-2 font-medium">Solution steps (scroll sideways):</div>
            <div className="flex space-x-4 px-4 py-2 whitespace-nowrap overflow-x-auto">
              {solution.map((step, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`cursor-pointer p-2 rounded-md border shadow-sm min-w-[200px] ${index === currentStep ? "bg-accent" : "bg-background"}`}
                >
                  <div className="font-medium">Step {index + 1}</div>
                  <div className="text-sm text-muted-foreground">{step.operation}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

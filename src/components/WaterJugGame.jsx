"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Alert, AlertDescription } from "./ui/alert"
import { RefreshCw, Trophy } from "lucide-react"
import JugVisualizer from "./JugVisualizer"

export default function WaterJugGame() {
  const [jug1Capacity, setJug1Capacity] = useState(5)
  const [jug2Capacity, setJug2Capacity] = useState(3)
  const [targetAmount, setTargetAmount] = useState(4)
  const [jug1, setJug1] = useState(0)
  const [jug2, setJug2] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [moves, setMoves] = useState([])
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  // Start a new game
  const startGame = () => {
    // Validate inputs
    if (jug1Capacity <= 0 || jug2Capacity <= 0 || targetAmount <= 0) {
      setError("All values must be positive numbers")
      return
    }

    if (targetAmount > Math.max(jug1Capacity, jug2Capacity)) {
      setError("Target amount cannot be greater than the largest jug capacity")
      return
    }

    // Check if the problem is solvable
    const gcd = (a, b) => {
      return b === 0 ? a : gcd(b, a % b)
    }

    const g = gcd(jug1Capacity, jug2Capacity)
    if (targetAmount % g !== 0) {
      setError(
        `This problem has no solution. Target must be a multiple of GCD(${jug1Capacity}, ${jug2Capacity}) = ${g}`,
      )
      return
    }

    setJug1(0)
    setJug2(0)
    setMoves([{ action: "Game started", jug1: 0, jug2: 0 }])
    setMessage("Game started! Try to get exactly " + targetAmount + " liters in either jug.")
    setGameStarted(true)
    setSuccess(false)
    setError("")
  }

  // Reset the game
  const resetGame = () => {
    setJug1(0)
    setJug2(0)
    setMoves([{ action: "Game reset", jug1: 0, jug2: 0 }])
    setMessage("Game reset. Try to get exactly " + targetAmount + " liters in either jug.")
    setSuccess(false)
  }

  // Check if the game is won
  useEffect(() => {
    if (gameStarted && (jug1 === targetAmount || jug2 === targetAmount)) {
      setSuccess(true)
      setMessage(
        `Congratulations! You've measured exactly ${targetAmount} liters in ${jug1 === targetAmount ? "Jug 1" : "Jug 2"} in ${moves.length} moves.`,
      )
    }
  }, [jug1, jug2, targetAmount, gameStarted, moves.length])

  // Game actions
  const fillJug1 = () => {
    if (jug1 < jug1Capacity) {
      setJug1(jug1Capacity)
      addMove("Fill Jug 1", jug1Capacity, jug2)
    }
  }

  const fillJug2 = () => {
    if (jug2 < jug2Capacity) {
      setJug2(jug2Capacity)
      addMove("Fill Jug 2", jug1, jug2Capacity)
    }
  }

  const emptyJug1 = () => {
    if (jug1 > 0) {
      setJug1(0)
      addMove("Empty Jug 1", 0, jug2)
    }
  }

  const emptyJug2 = () => {
    if (jug2 > 0) {
      setJug2(0)
      addMove("Empty Jug 2", jug1, 0)
    }
  }

  const pourJug1ToJug2 = () => {
    if (jug1 > 0 && jug2 < jug2Capacity) {
      const amountToPour = Math.min(jug1, jug2Capacity - jug2)
      const newJug1 = jug1 - amountToPour
      const newJug2 = jug2 + amountToPour
      setJug1(newJug1)
      setJug2(newJug2)
      addMove("Pour Jug 1 → Jug 2", newJug1, newJug2)
    }
  }

  const pourJug2ToJug1 = () => {
    if (jug2 > 0 && jug1 < jug1Capacity) {
      const amountToPour = Math.min(jug2, jug1Capacity - jug1)
      const newJug1 = jug1 + amountToPour
      const newJug2 = jug2 - amountToPour
      setJug1(newJug1)
      setJug2(newJug2)
      addMove("Pour Jug 2 → Jug 1", newJug1, newJug2)
    }
  }

  const addMove = (action, newJug1, newJug2) => {
    setMoves([...moves, { action, jug1: newJug1, jug2: newJug2 }])
  }

  return (
    <div className="space-y-6">
      {!gameStarted ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="game-jug1">Jug 1 Capacity (liters)</Label>
              <Input
                id="game-jug1"
                type="number"
                min="1"
                value={jug1Capacity}
                onChange={(e) => setJug1Capacity(Number.parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="game-jug2">Jug 2 Capacity (liters)</Label>
              <Input
                id="game-jug2"
                type="number"
                min="1"
                value={jug2Capacity}
                onChange={(e) => setJug2Capacity(Number.parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="game-target">Target Amount (liters)</Label>
              <Input
                id="game-target"
                type="number"
                min="1"
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number.parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <Button onClick={startGame} className="w-full">
            Start Game
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {success && (
            <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
              <Trophy className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-600 dark:text-green-400">{message}</AlertDescription>
            </Alert>
          )}

          {!success && message && (
            <Alert>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <JugVisualizer capacity={jug1Capacity} current={jug1} label="Jug 1" />
            <JugVisualizer capacity={jug2Capacity} current={jug2} label="Jug 2" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Button onClick={fillJug1} disabled={jug1 === jug1Capacity || success}>
              Fill Jug 1
            </Button>
            <Button onClick={fillJug2} disabled={jug2 === jug2Capacity || success}>
              Fill Jug 2
            </Button>
            <Button onClick={emptyJug1} disabled={jug1 === 0 || success}>
              Empty Jug 1
            </Button>
            <Button onClick={emptyJug2} disabled={jug2 === 0 || success}>
              Empty Jug 2
            </Button>
            <Button onClick={pourJug1ToJug2} disabled={jug1 === 0 || jug2 === jug2Capacity || success}>
              Pour 1 → 2
            </Button>
            <Button onClick={pourJug2ToJug1} disabled={jug2 === 0 || jug1 === jug1Capacity || success}>
              Pour 2 → 1
            </Button>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={resetGame} className="flex items-center" disabled={success}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Game
            </Button>
            <Button variant="outline" onClick={() => setGameStarted(false)}>
              New Game
            </Button>
          </div>

          <div className="border rounded-md overflow-hidden">
            <div className="bg-muted px-4 py-2 font-medium">Move History ({moves.length})</div>
            <div className="max-h-60 overflow-y-auto">
              {moves.map((move, index) => (
                <div key={index} className="px-4 py-2 border-t flex justify-between">
                  <span>
                    {index + 1}. {move.action}
                  </span>
                  <span>
                    Jug 1: {move.jug1}L, Jug 2: {move.jug2}L
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


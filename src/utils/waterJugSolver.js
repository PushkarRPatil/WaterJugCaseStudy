// Check if the problem is solvable using Bézout's identity
export function isSolvable(jug1Capacity, jug2Capacity, targetAmount) {
    // The target must be a multiple of the GCD of the two capacities
    const gcd = (a, b) => {
      return b === 0 ? a : gcd(b, a % b)
    }
  
    const g = gcd(jug1Capacity, jug2Capacity)
    return targetAmount % g === 0 && targetAmount <= Math.max(jug1Capacity, jug2Capacity)
  }
  
  // Solve the water jug problem using DFS
  export function solveDFS(jug1Capacity, jug2Capacity, targetAmount) {
    // Check if the problem is solvable first
    if (!isSolvable(jug1Capacity, jug2Capacity, targetAmount)) {
      return []
    }
  
    const visited = new Set()
    const path = []
    let found = false
    let solution = []
  
    const dfs = (jug1, jug2, steps) => {
      // Check if we've reached the target
      if (jug1 === targetAmount || jug2 === targetAmount) {
        solution = [...steps]
        found = true
        return
      }
  
      // Create a unique key for this state
      const stateKey = `${jug1},${jug2}`
  
      // Skip if we've already visited this state
      if (visited.has(stateKey)) return
  
      // Mark as visited
      visited.add(stateKey)
  
      // If we already found a solution, don't continue
      if (found) return
  
      // Try all possible operations
  
      // 1. Fill jug1
      if (jug1 < jug1Capacity) {
        const newSteps = [...steps, { jug1: jug1Capacity, jug2, operation: "Fill Jug 1" }]
        dfs(jug1Capacity, jug2, newSteps)
      }
  
      // 2. Fill jug2
      if (jug2 < jug2Capacity && !found) {
        const newSteps = [...steps, { jug1, jug2: jug2Capacity, operation: "Fill Jug 2" }]
        dfs(jug1, jug2Capacity, newSteps)
      }
  
      // 3. Empty jug1
      if (jug1 > 0 && !found) {
        const newSteps = [...steps, { jug1: 0, jug2, operation: "Empty Jug 1" }]
        dfs(0, jug2, newSteps)
      }
  
      // 4. Empty jug2
      if (jug2 > 0 && !found) {
        const newSteps = [...steps, { jug1, jug2: 0, operation: "Empty Jug 2" }]
        dfs(jug1, 0, newSteps)
      }
  
      // 5. Pour from jug1 to jug2
      if (jug1 > 0 && jug2 < jug2Capacity && !found) {
        const amountToPour = Math.min(jug1, jug2Capacity - jug2)
        const newSteps = [
          ...steps,
          {
            jug1: jug1 - amountToPour,
            jug2: jug2 + amountToPour,
            operation: "Pour Jug 1 → Jug 2",
          },
        ]
        dfs(jug1 - amountToPour, jug2 + amountToPour, newSteps)
      }
  
      // 6. Pour from jug2 to jug1
      if (jug2 > 0 && jug1 < jug1Capacity && !found) {
        const amountToPour = Math.min(jug2, jug1Capacity - jug1)
        const newSteps = [
          ...steps,
          {
            jug1: jug1 + amountToPour,
            jug2: jug2 - amountToPour,
            operation: "Pour Jug 2 → Jug 1",
          },
        ]
        dfs(jug1 + amountToPour, jug2 - amountToPour, newSteps)
      }
    }
  
    // Start DFS with both jugs empty
    dfs(0, 0, [{ jug1: 0, jug2: 0, operation: "Initial state" }])
  
    return solution
  }
  
  
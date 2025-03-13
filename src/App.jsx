import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import WaterJugSolver from "./components/WaterJugSolver"
import WaterJugGame from "./components/WaterJugGame"

function App() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Water Jug Problem</h1>

      <Tabs defaultValue="solver" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="solver">DFS Solver</TabsTrigger>
          <TabsTrigger value="game">Interactive Game</TabsTrigger>
        </TabsList>

        <TabsContent value="solver">
          <Card>
            <CardHeader>
              <CardTitle>Water Jug DFS Solver</CardTitle>
              <CardDescription>
                Enter the capacities of two jugs and the target amount to find a solution using DFS algorithm.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WaterJugSolver />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="game">
          <Card>
            <CardHeader>
              <CardTitle>Water Jug Game</CardTitle>
              <CardDescription>
                Try to measure the target amount of water using only the available operations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WaterJugGame />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default App


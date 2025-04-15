import React, { useState } from 'react';
import './App.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import WaterJugSolver from './components/WaterJugSolver';
import WaterJugGame from './components/WaterJugGame';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Water Jug Problem</h1>
          <p className="text-slate-600">A classic AI problem visualized</p>
        </header>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="dfs">DFS Solver</TabsTrigger>
            <TabsTrigger value="game">Interactive Game</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Understanding the Water Jug Problem</CardTitle>
                <CardDescription>A classic problem in artificial intelligence</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-800">The Problem</h3>
                  <p className="text-slate-600">
                    The Water Jug Problem is a classic AI problem where you must measure a specific amount 
                    of water using two jugs of different capacities. The challenge lies in reaching the goal 
                    using a limited set of actions (fill, empty, pour).
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-800">DFS (Depth-First Search)</h3>
                  <p className="text-slate-600">
                    DFS is a graph traversal algorithm that explores each branch deeply before backtracking. 
                    It's suitable for solving the Water Jug Problem by exhaustively checking all possible 
                    states until the goal is found.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-semibold mb-2 text-blue-800">How to use this app</h3>
                  <ol className="list-decimal pl-5 text-slate-700 space-y-2">
                    <li>Navigate to the <strong>DFS Solver</strong> tab to see a visualization of the algorithm solving the problem</li>
                    <li>Try the <strong>Interactive Game</strong> tab to attempt solving the problem yourself</li>
                    <li>Experiment with different jug capacities and target volumes</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dfs">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>DFS Solver</CardTitle>
                <CardDescription>Watch the algorithm find a solution</CardDescription>
              </CardHeader>
              <CardContent>
                <WaterJugSolver />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="game">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Interactive Game</CardTitle>
                <CardDescription>Try to solve the water jug problem yourself</CardDescription>
              </CardHeader>
              <CardContent>
                <WaterJugGame />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>© 2025 Water Jug Problem Solver</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
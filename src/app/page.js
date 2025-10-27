"use client"

import { useState, useEffect } from "react"
import RoastGenerator from "@/components/roast-generator"
import Leaderboard from "@/components/leaderboard"
import CustomRoasts from "@/components/custom-roasts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("roast")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
            ROAST MY FRIEND
          </h1>
          <p className="text-muted-foreground mt-2">The ultimate friend roasting experience</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="roast">Roast Generator</TabsTrigger>
            <TabsTrigger value="custom">Custom Roasts</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="roast" className="space-y-6">
            <RoastGenerator />
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <CustomRoasts />
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Leaderboard />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

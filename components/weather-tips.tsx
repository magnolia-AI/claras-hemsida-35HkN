'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb, Umbrella, Snowflake, Sun } from 'lucide-react'

interface WeatherTip {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

const getWeatherTips = (condition: string, temperature: number): WeatherTip[] => {
  const tips: WeatherTip[] = []

  if (condition.toLowerCase().includes('rain')) {
    tips.push({
      icon: <Umbrella className="w-5 h-5" />,
      title: "Don't forget your umbrella!",
      description: "It's looking rainy today. Stay dry and cozy!",
      color: "bg-blue-500/20"
    })
  }

  if (condition.toLowerCase().includes('snow')) {
    tips.push({
      icon: <Snowflake className="w-5 h-5" />,
      title: "Bundle up warm!",
      description: "Snow is expected. Wear layers and watch for icy conditions.",
      color: "bg-blue-300/20"
    })
  }

  if (temperature > 25) {
    tips.push({
      icon: <Sun className="w-5 h-5" />,
      title: "Stay hydrated!",
      description: "It's quite warm today. Drink plenty of water and seek shade.",
      color: "bg-yellow-500/20"
    })
  }

  if (temperature < 5) {
    tips.push({
      icon: <Snowflake className="w-5 h-5" />,
      title: "Dress warmly!",
      description: "Chilly temperatures ahead. Layer up and stay warm!",
      color: "bg-blue-400/20"
    })
  }

  // Default tip if no specific conditions
  if (tips.length === 0) {
    tips.push({
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Perfect weather!",
      description: "Enjoy this lovely day! Great time to be outdoors.",
      color: "bg-green-500/20"
    })
  }

  return tips
}

interface WeatherTipsProps {
  condition: string
  temperature: number
}

export default function WeatherTips({ condition, temperature }: WeatherTipsProps) {
  const tips = getWeatherTips(condition, temperature)

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center space-x-2">
          <Lightbulb className="w-5 h-5" />
          <span>Weather Tips</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg ${tip.color} border border-white/10 hover:bg-white/10 transition-all duration-200`}
            >
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  {tip.icon}
                </div>
                <div>
                  <h4 className="font-medium mb-1">{tip.title}</h4>
                  <p className="text-sm text-white/80">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

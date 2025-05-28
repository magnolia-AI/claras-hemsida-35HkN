'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sun, Cloud, CloudRain, CloudSnow } from 'lucide-react'

interface ForecastDay {
  day: string
  high: number
  low: number
  condition: string
  icon: React.ReactNode
}

const getWeatherIcon = (condition: string, size: string = "w-8 h-8") => {
  const iconClass = `${size} text-white/80`
  
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <Sun className={iconClass} />
    case 'cloudy':
      return <Cloud className={iconClass} />
    case 'rainy':
      return <CloudRain className={iconClass} />
    case 'snowy':
      return <CloudSnow className={iconClass} />
    default:
      return <Sun className={iconClass} />
  }
}

const generateForecast = (): ForecastDay[] => {
  const days = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const conditions = ['sunny', 'cloudy', 'rainy', 'sunny', 'cloudy']
  
  return days.slice(0, 5).map((day, index) => {
    const condition = conditions[index]
    const baseTemp = 20 + Math.floor(Math.random() * 15)
    
    return {
      day,
      high: baseTemp + Math.floor(Math.random() * 8),
      low: baseTemp - Math.floor(Math.random() * 8),
      condition,
      icon: getWeatherIcon(condition)
    }
  })
}

export default function WeatherForecast() {
  const forecast = generateForecast()

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {forecast.map((day, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                {day.icon}
                <div>
                  <div className="font-medium">{day.day}</div>
                  <div className="text-sm text-white/70 capitalize">{day.condition}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{day.high}°</div>
                <div className="text-sm text-white/70">{day.low}°</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

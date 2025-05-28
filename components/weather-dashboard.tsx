'use client'

import { useState, useEffect } from 'react'
import { useWeatherAnimation, useTemperatureColor } from '@/hooks/use-weather-animation'
import WeatherForecast from './weather-forecast'
import WeatherTips from './weather-tips'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  CloudLightning,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Gauge,
  MapPin,
  RefreshCw
} from 'lucide-react'

interface WeatherData {
  location: string
  temperature: number
  condition: string
  description: string
  humidity: number
  windSpeed: number
  pressure: number
  visibility: number
  feelsLike: number
  uvIndex: number
}

const getWeatherIcon = (condition: string) => {
  const iconClass = "w-16 h-16 text-white drop-shadow-lg"
  
  switch (condition.toLowerCase()) {
    case 'clear':
    case 'sunny':
      return <Sun className={iconClass} />
    case 'clouds':
    case 'cloudy':
      return <Cloud className={iconClass} />
    case 'rain':
    case 'drizzle':
      return <CloudRain className={iconClass} />
    case 'snow':
      return <CloudSnow className={iconClass} />
    case 'thunderstorm':
      return <CloudLightning className={iconClass} />
    default:
      return <Sun className={iconClass} />
  }
}

const getBackgroundGradient = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'clear':
    case 'sunny':
      return 'from-blue-400 via-blue-500 to-blue-600'
    case 'clouds':
    case 'cloudy':
      return 'from-gray-400 via-gray-500 to-gray-600'
    case 'rain':
    case 'drizzle':
      return 'from-gray-600 via-gray-700 to-gray-800'
    case 'snow':
      return 'from-blue-200 via-blue-300 to-blue-400'
    case 'thunderstorm':
      return 'from-gray-800 via-gray-900 to-black'
    default:
      return 'from-blue-400 via-blue-500 to-blue-600'
  }
}

// Mock weather data generator
const generateMockWeather = (): WeatherData => {
  const conditions = ['clear', 'clouds', 'rain', 'sunny', 'cloudy']
  const locations = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'San Francisco']
  const descriptions = {
    clear: 'Clear sky with bright sunshine',
    clouds: 'Partly cloudy with scattered clouds',
    rain: 'Light rain showers expected',
    sunny: 'Bright and sunny day',
    cloudy: 'Overcast with thick cloud cover'
  }
  
  const condition = conditions[Math.floor(Math.random() * conditions.length)]
  
  return {
    location: locations[Math.floor(Math.random() * locations.length)],
    temperature: Math.floor(Math.random() * 35) + 5, // 5-40°C
    condition,
    description: descriptions[condition as keyof typeof descriptions] || 'Pleasant weather',
    humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
    windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
    pressure: Math.floor(Math.random() * 50) + 1000, // 1000-1050 hPa
    visibility: Math.floor(Math.random() * 5) + 10, // 10-15 km
    feelsLike: Math.floor(Math.random() * 35) + 5, // 5-40°C
    uvIndex: Math.floor(Math.random() * 11) // 0-10
  }
}

export default function WeatherDashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const particles = useWeatherAnimation(weather?.condition || 'clear')
  const temperatureColor = useTemperatureColor(weather?.temperature || 20)

  const fetchWeather = () => {
    setLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      setWeather(generateMockWeather())
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">
        <div className="max-w-6xl mx-auto pt-20">
          <div className="text-center mb-8">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-48 mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Skeleton className="h-80 w-full rounded-xl" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!weather) return null

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient(weather.condition)} p-4 transition-all duration-1000`}>
      {/* Dynamic particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto pt-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Lovely Weather
          </h1>
          <p className="text-xl text-white/90 drop-shadow">
            Beautiful weather updates for beautiful days
          </p>
        </div>

        {/* Main Weather Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Current Weather Card */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300 transform hover:scale-[1.02]">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-6 h-6" />
                    <span className="text-2xl font-semibold">{weather.location}</span>
                  </div>
                  <Button
                    onClick={fetchWeather}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-6xl font-bold mb-2 ${temperatureColor} transition-colors duration-500`}>
                      {weather.temperature}°C
                    </div>
                    <div className="text-xl capitalize mb-2">
                      {weather.condition}
                    </div>
                    <div className="text-white/80">
                      {weather.description}
                    </div>
                    <div className="text-white/70 mt-2">
                      Feels like {weather.feelsLike}°C
                    </div>
                  </div>
                  <div className="text-right">
                    {getWeatherIcon(weather.condition)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weather Details */}
          <div className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Wind className="w-5 h-5" />
                  <span className="font-semibold">Wind Speed</span>
                </div>
                <div className="text-2xl font-bold">{weather.windSpeed} km/h</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Droplets className="w-5 h-5" />
                  <span className="font-semibold">Humidity</span>
                </div>
                <div className="text-2xl font-bold">{weather.humidity}%</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Gauge className="w-5 h-5" />
                  <span className="font-semibold">Pressure</span>
                </div>
                <div className="text-2xl font-bold">{weather.pressure} hPa</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Weather Forecast */}
        <div className="mb-8">
          <WeatherForecast />
        </div>

        {/* Additional Weather Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Eye className="w-8 h-8 mx-auto mb-3" />
              <div className="text-lg font-semibold mb-1">Visibility</div>
              <div className="text-2xl font-bold">{weather.visibility} km</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Thermometer className="w-8 h-8 mx-auto mb-3" />
              <div className="text-lg font-semibold mb-1">Feels Like</div>
              <div className="text-2xl font-bold">{weather.feelsLike}°C</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Sun className="w-8 h-8 mx-auto mb-3" />
              <div className="text-lg font-semibold mb-1">UV Index</div>
              <div className="text-2xl font-bold">{weather.uvIndex}</div>
              <Badge 
                variant={weather.uvIndex <= 2 ? "secondary" : weather.uvIndex <= 5 ? "default" : "destructive"}
                className="mt-2"
              >
                {weather.uvIndex <= 2 ? "Low" : weather.uvIndex <= 5 ? "Moderate" : weather.uvIndex <= 7 ? "High" : "Very High"}
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Wind className="w-8 h-8 mx-auto mb-3" />
              <div className="text-lg font-semibold mb-1">Wind</div>
              <div className="text-2xl font-bold">{weather.windSpeed}</div>
              <div className="text-sm text-white/70">km/h</div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-white/70">
          <p>Weather data updates every few seconds • Click refresh for new location</p>
        </div>
      </div>
    </div>
  )
}








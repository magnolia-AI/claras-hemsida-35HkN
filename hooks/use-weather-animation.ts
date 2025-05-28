import { useEffect, useState } from 'react'

export function useWeatherAnimation(condition: string) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    const particleCount = condition === 'rain' ? 50 : condition === 'snow' ? 30 : 20
    
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }))
    
    setParticles(newParticles)
  }, [condition])

  return particles
}

export function useTemperatureColor(temperature: number) {
  if (temperature <= 0) return 'text-blue-200'
  if (temperature <= 10) return 'text-blue-100'
  if (temperature <= 20) return 'text-green-100'
  if (temperature <= 30) return 'text-yellow-100'
  return 'text-red-100'
}

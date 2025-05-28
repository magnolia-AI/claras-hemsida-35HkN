'use client'

import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export default function ConfettiButton() {
  const [isAnimating, setIsAnimating] = useState(false)

  const triggerConfetti = () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    
    // Create a burst of confetti
    const count = 200
    const defaults = {
      origin: { y: 0.7 }
    }

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      })
    }

    // Multiple bursts for a more dramatic effect
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    })
    
    fire(0.2, {
      spread: 60,
    })
    
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    })
    
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    })
    
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    })

    // Reset animation state after confetti finishes
    setTimeout(() => {
      setIsAnimating(false)
    }, 3000)
  }

  return (
    <Button
      onClick={triggerConfetti}
      variant="ghost"
      size="sm"
      className={`
        fixed top-4 right-4 z-50
        bg-white/20 backdrop-blur-md border border-white/30
        text-white hover:bg-white/30 hover:scale-110
        transition-all duration-300 ease-out
        shadow-lg hover:shadow-xl
        ${isAnimating ? 'animate-pulse' : ''}
      `}
      disabled={isAnimating}
    >
      <Sparkles className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
    </Button>
  )
}

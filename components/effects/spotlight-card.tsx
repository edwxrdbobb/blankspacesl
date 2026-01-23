"use client"

import { useRef, useState, type MouseEvent, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
  spotlightSize?: number
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(255, 255, 255, 0.1)",
  spotlightSize = 300,
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: -1000, y: -1000 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setPosition({ x: -1000, y: -1000 })
      }}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Spotlight overlay */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  )
}

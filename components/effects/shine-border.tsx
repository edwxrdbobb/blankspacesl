"use client"

import { cn } from "@/lib/utils"
import { type ReactNode } from "react"

interface ShineBorderProps {
  children: ReactNode
  className?: string
  borderRadius?: number
  borderWidth?: number
  duration?: number
  color?: string | string[]
}

export function ShineBorder({
  children,
  className,
  borderRadius = 12,
  borderWidth = 1,
  duration = 8,
  color = ["#A07CFE", "#FE8FB5", "#FFBE7B"],
}: ShineBorderProps) {
  const colorArray = Array.isArray(color) ? color : [color]
  const gradient = `linear-gradient(90deg, ${colorArray.join(", ")})`

  return (
    <div
      className={cn("group relative overflow-hidden p-[1px]", className)}
      style={{
        borderRadius: `${borderRadius}px`,
      }}
    >
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: gradient,
          animation: `shine-border-rotate ${duration}s linear infinite`,
        }}
      />
      {/* Blurred glow */}
      <div
        className="absolute inset-0 rounded-[inherit] opacity-50 blur-sm"
        style={{
          background: gradient,
          animation: `shine-border-rotate ${duration}s linear infinite`,
        }}
      />
      {/* Content */}
      <div
        className="relative rounded-[inherit] bg-background"
        style={{
          borderRadius: `${borderRadius - borderWidth}px`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

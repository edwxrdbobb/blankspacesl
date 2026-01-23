"use client"

import React from "react"

import { cn } from "@/lib/utils"

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  borderWidth?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
}

export function BorderBeam({
  className,
  size = 200,
  duration = 12,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        className
      )}
      style={
        {
          "--size": size,
          "--duration": `${duration}s`,
          "--delay": `${delay}s`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--border-width": `${borderWidth}px`,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `linear-gradient(to right, ${colorFrom}, ${colorTo})`,
          mask: `
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0)
          `,
          maskComposite: "exclude",
          padding: `${borderWidth}px`,
          animation: `border-beam-spin ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  )
}

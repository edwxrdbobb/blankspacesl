"use client"

import React from "react"

import { useRef } from "react"
import { motion, useInView, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface BlurFadeProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  yOffset?: number
  blur?: string
  inView?: boolean
}

export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.4,
  yOffset = 6,
  blur = "6px",
  inView = true,
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const variants: Variants = {
    hidden: {
      y: yOffset,
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? (isInView ? "visible" : "hidden") : "visible"}
      variants={variants}
      transition={{
        delay: 0.04 + delay,
        duration,
        ease: "easeOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

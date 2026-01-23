"use client"

import React from "react"

import { useRef } from "react"
import { motion, useInView, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

type AnimationType = "fadeIn" | "blurIn" | "slideUp" | "staggerWords" | "staggerLetters"

interface TextAnimateProps {
  text: string
  className?: string
  type?: AnimationType
  delay?: number
  duration?: number
  staggerDelay?: number
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
}

export function TextAnimate({
  text,
  className,
  type = "fadeIn",
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.03,
  as: Component = "p",
}: TextAnimateProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const fadeInVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay, duration },
    },
  }

  const blurInVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay, duration },
    },
  }

  const slideUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration, ease: "easeOut" },
    },
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  }

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration },
    },
  }

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  if (type === "staggerWords") {
    const words = text.split(" ")
    return (
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className={cn("flex flex-wrap", className)}
      >
        {words.map((word, i) => (
          <motion.span key={i} variants={wordVariants} className="mr-[0.25em]">
            {word}
          </motion.span>
        ))}
      </motion.div>
    )
  }

  if (type === "staggerLetters") {
    const letters = text.split("")
    return (
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className={cn("flex", className)}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            variants={letterVariants}
            className={letter === " " ? "w-[0.25em]" : ""}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    )
  }

  const variants =
    type === "blurIn" ? blurInVariants : type === "slideUp" ? slideUpVariants : fadeInVariants

  const MotionComponent = motion.create(Component)

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {text}
    </MotionComponent>
  )
}

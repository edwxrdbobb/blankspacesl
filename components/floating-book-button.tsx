"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { useEffect, useState } from "react"

export function FloatingBookButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past the hero section
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 md:hidden transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      <Button asChild size="lg" className="shadow-xl shadow-foreground/20 gap-2 px-6 rounded-full">
        <Link href="/contact">
          <Calendar className="h-4 w-4" />
          Book Now
        </Link>
      </Button>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { X, Images } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Prata } from "next/font/google"

const prata = Prata({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export function EventPopup() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 8000)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Link
        href="/events/reggies-jazz-exchange/gallery"
        className="block bg-[#1a1a1a] rounded-2xl shadow-[0_16px_48px_-16px_rgba(0,0,0,0.6)] overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_24px_56px_-16px_rgba(0,0,0,0.7)] relative group"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-10 w-6 h-6 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200 opacity-0 group-hover:opacity-100"
        >
          <X className="h-3 w-3 text-white" />
        </button>

        {/* Top image strip */}
        <div className="relative h-28 overflow-hidden">
          <Image
            src="https://res.cloudinary.com/dhixhto9s/image/upload/v1777918962/blankspace/reggies-gallery/reggies-gallery-whatsapp-image-2026-05-04-at-00-49-49.jpg"
            alt="Reggie's Jazz Exchange"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1a1a]" />

          {/* Badge */}
          <div className="absolute bottom-3 left-4 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#f37335]/20 border border-[#f37335]/30 text-[#f37335] text-[10px] font-bold uppercase tracking-[0.2em]">
            <Images className="h-2.5 w-2.5" />
            Gallery is live
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-4 pt-2">
          <h2 className={`${prata.className} text-lg font-normal leading-[1.15] tracking-tight text-[#fdfaf3] mb-1.5`}>
            Thank you for{" "}
            <span className="text-[#f37335] italic">the night</span>
            <br />
            <span className="text-[#00aed9]">we won&apos;t forget.</span>
          </h2>

          <p className="text-[#fdfaf3]/50 text-xs leading-relaxed mb-3">
            Reggie&apos;s Jazz Exchange was a night to remember. See the moments — photos from April 30th are now live.
          </p>

          <div className="flex items-center gap-1.5 text-[#f37335] text-xs font-semibold">
            <span>View the gallery</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

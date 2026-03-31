"use client"

import { useState, useEffect } from "react"
import { X, Calendar, Clock, MapPin } from "lucide-react"
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
    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10000)

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
        href="/events/reggies-jazz-exchange"
        className="block bg-[#fdfaf3] rounded-2xl shadow-[0_16px_32px_-16px_rgba(0,0,0,0.3)] overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.4)] relative group"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-10 w-6 h-6 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200 shadow-lg opacity-0 group-hover:opacity-100"
        >
          <X className="h-3 w-3 text-[#1a1a1a]" />
        </button>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/paper-fibers.png")` }} />

        {/* Content */}
        <div className="relative p-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-[#f37335]/10 border border-[#f37335]/20 text-[#f37335] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f37335] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#f37335]"></span>
            </span>
            Upcoming Event
          </div>

          {/* Title */}
          <h2 className={`${prata.className} text-xl font-normal mb-2 leading-[1.1] tracking-tight text-[#1a1a1a]`}>
            Reggie&apos;s <span className="text-[#f37335] italic">Jazz</span> <br />
            <span className="text-[#00aed9]">Exchange</span>
          </h2>

          {/* Description */}
          <p className="text-[#4a4a4a] text-xs leading-relaxed mb-3">
            Join us for International Jazz Day with Reginald &ldquo;Bizzup&rdquo; Thompson.
          </p>

          {/* Event Details */}
          <div className="space-y-1.5 mb-3">
            <div className="flex items-center gap-2 text-xs">
              <Calendar className="h-3 w-3 text-[#f37335] shrink-0" />
              <span className="text-[#1a1a1a]">April 30th, 7:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <MapPin className="h-3 w-3 text-[#f37335] shrink-0" />
              <span className="text-[#1a1a1a]">Dove&apos;s Nest</span>
            </div>
          </div>

          {/* Small Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
            <Image
              src="/Reggies.jpeg"
              alt="Reggie's Jazz Exchange"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </Link>
    </div>
  )
}

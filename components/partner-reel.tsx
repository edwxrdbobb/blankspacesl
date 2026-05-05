"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ReggiesLogo } from "@/components/reggies-logo"

interface Partner {
  name: string
  logo: string
  url?: string
  description?: string
  useCustomLogo?: boolean
}

const partners: Partner[] = [
  {
    name: "Dove's Nest",
    logo: "/reggies-event-partners/dove's nest.jpg",
    description: "Venue Partner"
  },
  {
    name: "iLiquid",
    logo: "/reggies-event-partners/iLiquid.jpg",
    description: "Technology Partner"
  },
  {
    name: "Manikene",
    logo: "/reggies-event-partners/manikene.JPG",
    description: "Fashion Partner"
  },
  {
    name: "Ministry of Tourism & Cultural Affairs",
    logo: "/reggies-event-partners/min.tourishm.jpg",
    description: "Government Partner"
  },
  {
    name: "Shocks Inc.",
    logo: "/reggies-event-partners/shock-inc.jpg",
    description: "Audio Partner"
  },
  {
    name: "Studio Muyu",
    logo: "/reggies-event-partners/studio-muyu.jpg",
    description: "Production Partner"
  },
  {
    name: "Studio Z",
    logo: "/reggies-event-partners/studio-z.jpg",
    description: "Recording Partner"
  },
  {
    name: "Swit Salone News",
    logo: "/reggies-event-partners/Swit-salone-news.png",
    description: "Media Partner"
  },
  {
    name: "Yvonne Nics Events",
    logo: "/reggies-event-partners/yvonne.png",
    description: "Event Styling Partner"
  }
]

export function PartnerReel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const reelRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (reelRef.current) {
      const scrollAmount = reelRef.current.offsetWidth
      reelRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (reelRef.current) {
      const scrollAmount = reelRef.current.offsetWidth
      reelRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleScroll = () => {
    if (reelRef.current) {
      const scrollLeft = reelRef.current.scrollLeft
      const itemWidth = reelRef.current.children[0]?.clientWidth || 0
      const newIndex = Math.round(scrollLeft / itemWidth)
      setCurrentIndex(newIndex)
    }
  }

  useEffect(() => {
    const reel = reelRef.current
    if (reel) {
      reel.addEventListener('scroll', handleScroll)
      return () => reel.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="py-12 px-4 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a]">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-normal text-[#fdfaf3] mb-3">
            Our Partners
          </h2>
          <p className="text-[#fdfaf3]/60 text-sm md:text-base max-w-2xl mx-auto">
            Thank you to the amazing partners who helped make Reggie's Jazz Exchange possible.
          </p>
        </div>

        {/* Reel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#1a1a1a]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#f37335]/20 transition-all -ml-5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#1a1a1a]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#f37335]/20 transition-all -mr-5"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Partner Reel */}
          <div
            ref={reelRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {partners.map((partner, index) => (
              <div
                key={partner.name}
                className="flex-shrink-0 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl p-4 hover:border-[#f37335]/50 transition-all group"
              >
                {/* Partner Logo */}
                <div className="w-16 h-16 mx-auto mb-3 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-[#f37335]/10 transition-colors">
                  {partner.useCustomLogo ? (
                    <ReggiesLogo size="sm" className="scale-75" />
                  ) : (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={48}
                      height={48}
                      className="object-contain filter brightness-0 invert group-hover:brightness-100 transition-all"
                    />
                  )}
                </div>

                {/* Partner Info */}
                <div className="text-center">
                  <h3 className="text-[#fdfaf3] font-medium">
                    {partner.name}
                  </h3>
                  
                  {partner.url && (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-white/60 hover:text-[#f37335] text-xs transition-colors"
                    >
                      Visit
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {partners.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (reelRef.current) {
                    const itemWidth = reelRef.current.children[0]?.clientWidth || 0
                    reelRef.current.scrollTo({
                      left: index * itemWidth,
                      behavior: 'smooth'
                    })
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-[#f37335] w-6'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

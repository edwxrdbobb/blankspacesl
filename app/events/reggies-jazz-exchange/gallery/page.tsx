"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Prata, Inter } from "next/font/google"
import { GalleryClient } from "@/components/reggies-gallery-client"
import { EmailPopup } from "@/components/email-popup"
import { PartnerReel } from "@/components/partner-reel"
import galleryUrlsJson from "@/scripts/reggie-gallery-urls.json"

const prata = Prata({ weight: "400", subsets: ["latin"], display: "swap" })
const inter = Inter({ subsets: ["latin"] })

const galleryImages: string[] = Object.values(galleryUrlsJson)

export default function ReggiesGalleryPage() {
  const [showEmailPopup, setShowEmailPopup] = useState(false)

  useEffect(() => {
    // Check if user has already submitted or dismissed the popup
    const hasSubmitted = localStorage.getItem('emailPopupSubmitted') === 'true'
    const hasDismissed = localStorage.getItem('emailPopupDismissed') === 'true'
    
    if (hasSubmitted || hasDismissed) {
      return // Don't show popup if user has already interacted with it
    }

    // Show popup after 10 seconds or when user scrolls 50% down the page
    const timer = setTimeout(() => {
      setShowEmailPopup(true)
    }, 10000)

    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercentage > 50 && !showEmailPopup) {
        setShowEmailPopup(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [showEmailPopup])

  return (
    <main className={`bg-[#1a1a1a] ${inter.className} min-h-screen`}>
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-8 md:pt-44 md:pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-6 md:mb-8">
            <Image
              src="/reg-logo.png.png"
              alt="Reggie's Jazz Exchange Logo"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>
          <p className="text-[#f37335] text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] md:tracking-[0.3em] mb-4 md:mb-6">
            April 30th, 2026 · Dove&apos;s Nest
          </p>
          <h1 className={`${prata.className} text-4xl sm:text-5xl md:text-7xl font-normal leading-[1.05] mb-5 md:mb-8 text-[#fdfaf3]`}>
            Thank you for{" "}
            <span className="text-[#00aed9] italic">a magical night</span>
          </h1>
          <p className="text-[#fdfaf3]/50 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto px-2">
            Reggie&apos;s Jazz Exchange was more than an event — it was Salone speaking in rhythm. Thank you for being part of the conversation, and we look forward to seeing you again. Here are the moments:
          </p>
          <div className="h-px w-16 md:w-24 bg-[#f37335]/40 mx-auto mt-8 md:mt-10" />
        </div>
      </section>

      {/* Partner Reel */}
      <PartnerReel />

      {/* Gallery */}
      <section className="pb-20 md:pb-28 px-2 md:px-4">
        <div className="container mx-auto max-w-7xl">
          <GalleryClient images={galleryImages} />
        </div>
      </section>

      <Footer />

      {/* Email Popup */}
      <EmailPopup 
        isOpen={showEmailPopup} 
        onClose={() => {
          setShowEmailPopup(false)
          localStorage.setItem('emailPopupDismissed', 'true')
        }} 
      />
    </main>
  )
}

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Prata, Inter } from "next/font/google"
import { GalleryClient } from "@/components/reggies-gallery-client"
import galleryUrlsJson from "@/scripts/reggie-gallery-urls.json"
import type { Metadata } from "next"

const prata = Prata({ weight: "400", subsets: ["latin"], display: "swap" })
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Reggie's Jazz Exchange — Gallery",
  description: "A night of jazz, rhythm, and connection. Relive the moments from Reggie's Jazz Exchange at Dove's Nest.",
}

const galleryImages: string[] = Object.values(galleryUrlsJson)

export default function ReggiesGalleryPage() {
  return (
    <main className={`bg-[#1a1a1a] ${inter.className} min-h-screen`}>
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-44 md:pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-[#f37335] text-xs font-bold uppercase tracking-[0.3em] mb-6">
            April 30th, 2026 · Dove&apos;s Nest
          </p>
          <h1 className={`${prata.className} text-5xl md:text-7xl font-normal leading-[1.05] mb-8 text-[#fdfaf3]`}>
            Thank you for{" "}
            <span className="text-[#f37335] italic">the night</span>
            <br />
            <span className="text-[#00aed9]">we won&apos;t forget.</span>
          </h1>
          <p className="text-[#fdfaf3]/50 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Reggie&apos;s Jazz Exchange was more than an event — it was Salone speaking in rhythm.
            Thank you for being part of the conversation. Here are the moments.
          </p>
          <div className="h-px w-24 bg-[#f37335]/40 mx-auto mt-10" />
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <GalleryClient images={galleryImages} />
        </div>
      </section>

      <Footer />
    </main>
  )
}

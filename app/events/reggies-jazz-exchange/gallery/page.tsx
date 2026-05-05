import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Prata, Inter } from "next/font/google"
import { GalleryGrid } from "@/components/reggies-gallery-grid"

const prata = Prata({ weight: "400", subsets: ["latin"], display: "swap" })
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Reggie's Jazz Exchange — Gallery",
  description: "A night of jazz, rhythm, and connection. Relive the moments from Reggie's Jazz Exchange at Dove's Nest.",
}

export const galleryImages: string[] = [
  "https://res.cloudinary.com/dhixhto9s/image/upload/v1777918931/blankspace/reggies-gallery/reggies-gallery-whatsapp-image-2026-05-04-at-00-49-01.jpg",
  "https://res.cloudinary.com/dhixhto9s/image/upload/v1777918940/blankspace/reggies-gallery/reggies-gallery-whatsapp-image-2026-05-04-at-00-49-07.jpg",
  "https://res.cloudinary.com/dhixhto9s/image/upload/v1777918943/blankspace/reggies-gallery/reggies-gallery-whatsapp-image-2026-05-04-at-00-49-19.jpg",
  "https://res.cloudinary.com/dhixhto9s/image/upload/v1777918949/blankspace/reggies-gallery/reggies-gallery-whatsapp-image-2026-05-04-at-00-49-38.jpg",
  "https://res.cloudinary.com/dhixhto9s/image/upload/v1777918955/blankspace/reggies-gallery/reggies-gallery-whatsapp-image-2026-05-04-at-00-49-43.jpg",
  "https://res.cloudinary.com/dhixhto9s/image/upload/v1777918962/blankspace/reggies-gallery/reggies-gallery-whatsapp-image-2026-05-04-at-00-49-49.jpg",
  "https://res.cloudinary.com/dhixhto9s/image/upload/v1777918968/blankspace/reggies-gallery/reggies-gallery-whatsapp-image-2026-05-04-at-00-49-57.jpg",
  "https://res.cloudinary.com/dhixhto9s/image/upload/v1777918974/blankspace/reggies-gallery/reggies-gallery-whatsapp-image-2026-05-04-at-00-50-08.jpg",
  "https://res.cloudinary.com/dhixhto9s/image/upload/v1777918980/blankspace/reggies-gallery/reggies-gallery-whatsapp-image-2026-05-04-at-00-50-09.jpg",
  "https://res.cloudinary.com/dhixhto9s/image/upload/v1777918987/blankspace/reggies-gallery/reggies-gallery-whatsapp-image-2026-05-04-at-00-50-11.jpg",
  "https://res.cloudinary.com/dhixhto9s/image/upload/v1777918992/blankspace/reggies-gallery/reggies-gallery-whatsapp-image-2026-05-04-at-00-50-12.jpg",
  "https://res.cloudinary.com/dhixhto9s/image/upload/v1777918999/blankspace/reggies-gallery/reggies-gallery-whatsapp-image-2026-05-04-at-00-50-14.jpg",
  "https://res.cloudinary.com/dhixhto9s/image/upload/v1777919014/blankspace/reggies-gallery/reggies-gallery-whatsapp-image-2026-05-04-at-00-50-16.jpg",
  "https://res.cloudinary.com/dhixhto9s/image/upload/v1777919025/blankspace/reggies-gallery/reggies-gallery-whatsapp-image-2026-05-04-at-00-50-18.jpg",
  "https://res.cloudinary.com/dhixhto9s/image/upload/v1777919029/blankspace/reggies-gallery/reggies-gallery-whatsapp-image-2026-05-04-at-00-50-20.jpg",
  "https://res.cloudinary.com/dhixhto9s/image/upload/v1777919034/blankspace/reggies-gallery/reggies-gallery-whatsapp-image-2026-05-04-at-00-50-23.jpg",
  "https://res.cloudinary.com/dhixhto9s/image/upload/v1777919046/blankspace/reggies-gallery/reggies-gallery-whatsapp-image-2026-05-04-at-00-50-26.jpg",
  "https://res.cloudinary.com/dhixhto9s/image/upload/v1777919052/blankspace/reggies-gallery/reggies-gallery-whatsapp-image-2026-05-04-at-00-50-30.jpg",
]

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
          <GalleryGrid images={galleryImages} />
        </div>
      </section>

      <Footer />
    </main>
  )
}

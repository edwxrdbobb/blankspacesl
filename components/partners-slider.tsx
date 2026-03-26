"use client"

import Image from "next/image"
import { mediaUrl } from "@/lib/media"

type Partner = {
  name: string
  src?: string
}

const partners: Partner[] = [
  { name: "Centurion Engineering", src: "/Partners/centurion-sl-logo.png" },
  { name: "Ecobank", src: "/Partners/Ecobank_logo.png" },
  { name: "Vult", src: "/Partners/vult.png" },
  { name: "One Mobile", src: "/Partners/one-mobile.jpg" },
  { name: "Foodbly", src: "/Partners/foodbly.jpeg" },
  { name: "UNFPA", src: "/Partners/unfpa-vector-logo.png" },
  { name: "SLMDA", src: "/Partners/SLMDA-logo.png" },
  // { name: "BCC", src: "/Partners/bcc-logo.jpg" },
  { name: "Purposeful", src: "/Partners/Purposeful-logo-400px-v3.svg" },
  { name: "Leone Gadgets", src: "/Partners/LG-logo-e1667494305555-1024x675.png" },
  { name: "AWATS", src: "/Partners/AWATS.webp" },
  { name: "KIZURI INTERNATIONAL", src: "/Partners/Closer-logo-1-01-2.jpg" },
  { name: "BCCSL", src: "/Partners/bccsl.jpeg" },
]

type PartnersSliderProps = {
  title?: string
  compact?: boolean
}

export function PartnersSlider({
  title = "Trusted by our partners",
  compact = false,
}: PartnersSliderProps) {
  return (
    <section className={compact ? "py-12 md:py-16 bg-background" : "py-16 md:py-24 bg-background"}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-8 md:mb-10">
          <p className="text-muted-foreground uppercase tracking-[0.2em] text-xs mb-3">Partners</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">{title}</h2>
        </div>
      </div>

      <div className="overflow-hidden border-y border-border/60 bg-muted/40">
        <div className="animate-marquee flex w-max items-center py-5 md:py-6">
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="mx-4 md:mx-6 flex h-24 w-44 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-border/60 bg-background px-4 py-3 shadow-sm"
            >
              {partner.src && (
                <div className="relative h-10 w-full">
                  <Image
                    src={mediaUrl(partner.src)}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain"
                    sizes="176px"
                  />
                </div>
              )}
              <p className="text-center text-xs font-medium leading-tight text-muted-foreground">{partner.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

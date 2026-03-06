"use client"

import Image from "next/image"

const partners = [
  { name: "One Mobile", src: "/Partners/one-mobile.jpg" },
  { name: "UNFPA", src: "/Partners/unfpa-vector-logo.png" },
  { name: "Purposeful", src: "/Partners/Purposeful-logo-400px-v3.svg" },
  { name: "SLMDA", src: "/Partners/SLMDA-logo.png" },
  { name: "Foodbly", src: "/Partners/foodbly.jpeg" },
  { name: "Vult", src: "/Partners/vult.png" },
  { name: "Ecobank", src: "/Partners/Ecobank_logo.png" },
  { name: "BCC", src: "/Partners/bcc-logo.jpg" },
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
              className="mx-4 md:mx-6 flex h-20 w-40 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-background px-6 shadow-sm"
            >
              <div className="relative h-12 w-full">
                <Image
                  src={partner.src}
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

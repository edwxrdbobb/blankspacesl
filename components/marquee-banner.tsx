"use client"

const services = [
  "Recording Studio",
  "Rehearsal Space",
  "Music Production",
  "Video Production",
  "Brand Design",
  "Web Development",
  "Creative Strategy",
  "Artist Development",
]

export function MarqueeBanner() {
  return (
    <div className="bg-foreground text-background py-3 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...services, ...services, ...services].map((service, index) => (
          <span key={index} className="mx-8 text-sm uppercase tracking-wider flex items-center gap-8">
            {service}
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-700" />
          </span>
        ))}
      </div>
    </div>
  )
}

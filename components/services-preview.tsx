"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { BlurFade } from "@/components/effects/blur-fade"
import { SpotlightCard } from "@/components/effects/spotlight-card"
import { DotScreenShader } from "@/components/ui/dot-shader-background"
import { cn } from "@/lib/utils"
import { mediaUrl } from "@/lib/media"

const services = [
  {
    id: "recording-studio-rental",
    title: "Recording & Studio Rental",
    description: "Professional studio space with industry standard equipment for high level productions, acoustically treated, with uninterrupted power supply.",
    image: "/stud.png",
    href: "/services#recording",
  },
  {
    id: "audiovisual",
    title: "Audiovisual Productions",
    description:
      "From brand songs to radio and TV commercials, to visual projects with key sonic elements, we'll bring your vision to life.",
    image: "/audio.png",
    href: "/services#audiovisual",
  },
  {
    id: "web-development",
    title: "Web Solutions",
    description: "Get your digital footprint started right with a professional website worthy of your dream.",
    image: "/web dev.png",
    href: "/services#web-development",
  },
  {
    id: "events-entertainment",
    title: "Events & Entertainment",
    description: "Musical curations ranging from performing talents to bands or solo instrumentalists for events, retreats, and special moments.",
    image: "/events/WhatsApp%20Image%202026-03-14%20at%2010.57.30.jpeg",
    href: "/services#events-entertainment",
  },
]

export function ServicesPreview() {
  return (
    <section className="flex relative py-24 md:py-32 bg-background">
       <div className="absolute inset-0"> <DotScreenShader /> </div>
      <div className="container mx-auto px-4">
        {/* Header */}
        <BlurFade>
          <div className="max-w-3xl mb-16">
            <p className="text-muted-foreground uppercase tracking-[0.2em] text-xs mb-4">Our Services</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Everything you need to create, produce, and grow.
            </h2>
            <p className="text-muted-foreground text-lg">
              From studio sessions to digital launches and live experiences, we provide individual and end-to-end creative solutions.
            </p>
          </div>
        </BlurFade>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <BlurFade
              key={service.id}
              delay={0.1 * (index + 1)}
              className={cn(index === 0 || index === 3 ? "xl:col-span-2" : "xl:col-span-1")}
            >
              <Link href={service.href} className="block h-full">
                <SpotlightCard 
                  className="group h-full xl:h-[420px] flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-foreground/20 transition-all duration-300"
                  spotlightColor="rgba(255, 255, 255, 0.08)"
                >
                  <div className="relative overflow-hidden h-52 sm:h-60 xl:h-64 shrink-0">
                    <Image
                      src={mediaUrl(service.image || "/placeholder.svg")}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-heading text-xl font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                          {service.description}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center shrink-0 group-hover:bg-foreground group-hover:border-foreground transition-colors">
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-background transition-colors" />
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

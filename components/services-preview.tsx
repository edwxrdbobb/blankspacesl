"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { BlurFade } from "@/components/effects/blur-fade"
import { SpotlightCard } from "@/components/effects/spotlight-card"
import { DotScreenShader } from "@/components/ui/dot-shader-background";

const services = [
  {
    id: "recording-studio-rental",
    title: "Recording & Studio Rental",
    description: "Professional studio space with industry standard equipment for high level productions, acoustically treated, with uninterrupted power supply.",
    image: "/2383df5047047988ba513db21e630079.jpg",
    href: "/services#recording",
  },
  {
    id: "audiovisual",
    title: "Audiovisual Productions",
    description: "From radio and TV commercials to visual projects with key sonic elements, we'll bring your vision to life.",
    image: "/1190c1d6176009d625f7d93b0d973f5b.jpg",
    href: "/services#audiovisual",
  },
  {
    id: "web-development",
    title: "Web Development",
    description: "Get your digital footprint started right with a professional website worth of your dream.",
    image: "/videoframe_16889.png",
    href: "/services#web-development",
  },
  {
    id: "events-entertainment",
    title: "Events & Entertainment",
    description: "Musical curations ranging from performing talents to bands or solo instrumentalists for events, retreats, and special moments.",
    image: "/ad79ed2ac71a0fecb65425f4acccc4ae.jpg",
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
              From studio sessions to digital launches and live experiences, we provide end-to-end creative solutions.
            </p>
          </div>
        </BlurFade>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <BlurFade key={service.id} delay={0.1 * (index + 1)}>
              <Link href={service.href} className="block h-full">
                <SpotlightCard 
                  className="group h-full bg-card border border-border rounded-2xl overflow-hidden hover:border-foreground/20 transition-all duration-300"
                  spotlightColor="rgba(255, 255, 255, 0.08)"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-heading text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
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

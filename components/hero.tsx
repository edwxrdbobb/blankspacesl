"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { BlurFade } from "@/components/effects/blur-fade"
import { TextAnimate } from "@/components/effects/text-animate"
import { MagneticButton } from "@/components/effects/magnetic-button"
import EnergyBeam from '../components/ui/energy-beam';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-foreground">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {/* <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
          poster="/images/studio-poster.jpg"
        >
          <source src="https://www.youtube.com/watch?v=kr3iXUcNt2g" type="video/mp4" />
        </video> */}
        <EnergyBeam className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>


      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-foreground/20 via-transparent to-foreground/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <BlurFade delay={0.1}>
            <p className="text-background/70 uppercase tracking-[0.3em] text-xs md:text-sm mb-6">
              Recording Studio & Creative Agency
            </p>
          </BlurFade>

          {/* <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-background leading-tight mb-6 text-balance">
            <TextAnimate
              text="Endless Possibilities."
              type="staggerWords"
              delay={0.2}
              className="justify-center"
            />
            <TextAnimate
              text="Uninterrupted Power."
              type="staggerWords"
              delay={0.4}
              className="justify-center"
            />
            <span className="text-accent">
              <TextAnimate
                text="Unmatched Quality."
                type="staggerWords"
                delay={0.6}
                className="justify-center"
              />
            </span>
          </h1> */}


          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-background leading-tight mb-6 text-balance">
            <span className="text-white">
              <TextAnimate
                text="BLANKSPACE"
                type="staggerWords"
                delay={0.6}
                className="justify-center"
              />
            </span>
          </h1>

          <BlurFade delay={0.8}>
            <p className="text-background/80 text-md md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Freetown&apos;s premier destination for professional recording, rehearsal,
              and creative production. Where artists and brands come to create.
            </p>
          </BlurFade>

          <BlurFade delay={1}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Button asChild size="lg" className="text-base px-8 py-6 bg-background text-foreground hover:bg-background/90 rounded-full shadow-xl transition-transform">
                  <Link href="/contact">
                    Book a Session
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-base px-8 py-6 border-background/30 text-background hover:bg-background/10 bg-transparent rounded-full backdrop-blur-sm"
                >
                  <Link href="/portfolio">
                    View Our Work
                  </Link>
                </Button>
              </MagneticButton>
            </div>
          </BlurFade>
        </div>
      </div>

      {/* Scroll Indicator */}
      <BlurFade delay={1.2}>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-background/50 text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-px h-12 bg-background/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-background animate-pulse" />
          </div>
        </div>
      </BlurFade>
    </section>
  )
}

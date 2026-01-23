"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  Mic,
  Video,
  Palette,
  Check,
  Clock,
  Zap,
  Headphones,
  Play,
  Monitor,
  PenTool
} from "lucide-react"

const recordingFeatures = [
  "State-of-the-art recording equipment",
  "Acoustically treated studio rooms",
  "24/7 uninterrupted power supply",
  "Professional mixing & mastering",
  "Comfortable rehearsal space",
  "Instrument & gear rental available",
]

const avFeatures = [
  "4K cinema-quality cameras",
  "Professional lighting setups",
  "yellow screen capabilities",
  "Motion graphics & VFX",
  "Music video production",
  "Commercial & documentary filming",
]

const designFeatures = [
  "Brand strategy & positioning",
  "Visual identity systems",
  "Website design & development",
  "Marketing collateral",
  "Social media content",
  "Packaging design",
]

const videoShowcase = [
  { id: "ads", label: "Commercials", thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80" },
  { id: "music", label: "Music Videos", thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80" },
  { id: "eco", label: "Documentaries", thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80" },
]

export function ServicesContent() {
  const [activeVideo, setActiveVideo] = useState("ads")

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground uppercase tracking-[0.2em] text-xs mb-4">Our Services</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Creative solutions for artists and brands.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            From studio sessions to full-scale brand campaigns, we provide end-to-end creative services
            tailored to your vision.
          </p>
        </div>

        {/* Services Tabs */}
        <Tabs defaultValue="recording" className="space-y-12">
          <TabsList className="h-auto p-0 bg-transparent border-b border-border rounded-none w-full justify-start flex-wrap gap-0">
            <TabsTrigger
              value="recording"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none px-6 py-4 font-heading"
              id="recording"
            >
              <Mic className="h-4 w-4 mr-2" />
              Rehearsal & Recording
            </TabsTrigger>
            <TabsTrigger
              value="audiovisual"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none px-6 py-4 font-heading"
              id="audiovisual"
            >
              <Video className="h-4 w-4 mr-2" />
              Audiovisual Production
            </TabsTrigger>
            <TabsTrigger
              value="design"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none px-6 py-4 font-heading"
              id="design"
            >
              <Palette className="h-4 w-4 mr-2" />
              Brand & Design
            </TabsTrigger>
          </TabsList>

          {/* Recording Tab */}
          <TabsContent value="recording" className="mt-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-foreground flex items-center justify-center">
                    <Headphones className="h-6 w-6 text-background" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold">Rehearsal & Recording</h2>
                    <p className="text-muted-foreground">Professional studio space in Freetown</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Whether you&apos;re laying down tracks, perfecting your set, or producing your next hit,
                  our studio provides the professional environment you need with reliable power and top-tier equipment.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {recordingFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Hourly & Daily rates available</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                    <span>24/7 backup power</span>
                  </div>
                </div>

                <Button asChild size="lg">
                  <Link href="/contact?service=recording">
                    Book Studio Time
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80"
                  alt="Recording studio interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Pricing Preview */}
            <div className="mt-16 p-8 bg-muted">
              <h3 className="font-heading text-xl font-bold mb-6">Studio Rates</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-background p-6">
                  <p className="text-muted-foreground text-sm mb-2">Rehearsal</p>
                  <p className="font-heading text-3xl font-bold">$25<span className="text-lg font-normal text-muted-foreground">/hr</span></p>
                  <p className="text-muted-foreground text-sm mt-2">Basic room access</p>
                </div>
                <div className="bg-background p-6 border-2 border-foreground">
                  <p className="text-muted-foreground text-sm mb-2">Recording Session</p>
                  <p className="font-heading text-3xl font-bold">$50<span className="text-lg font-normal text-muted-foreground">/hr</span></p>
                  <p className="text-muted-foreground text-sm mt-2">Full studio access + engineer</p>
                </div>
                <div className="bg-background p-6">
                  <p className="text-muted-foreground text-sm mb-2">Full Day</p>
                  <p className="font-heading text-3xl font-bold">$350<span className="text-lg font-normal text-muted-foreground">/day</span></p>
                  <p className="text-muted-foreground text-sm mt-2">8 hours, all inclusive</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mt-6">* 50% deposit required to confirm booking</p>
            </div>
          </TabsContent>

          {/* Audiovisual Tab */}
          <TabsContent value="audiovisual" className="mt-12">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-foreground flex items-center justify-center">
                    <Monitor className="h-6 w-6 text-background" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold">Audiovisual Production</h2>
                    <p className="text-muted-foreground">Cinema-quality video content</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  From music videos to commercials, documentaries to social content, we bring your creative
                  vision to life with professional-grade production quality.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {avFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button asChild size="lg">
                  <Link href="/contact?service=audiovisual">
                    Start a Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Video Showcase */}
              <div className="space-y-4">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image
                    src={videoShowcase.find(v => v.id === activeVideo)?.thumbnail || videoShowcase[0].thumbnail}
                    alt="Video showcase"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
                    <button className="w-16 h-16 rounded-full bg-background flex items-center justify-center hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 text-foreground ml-1" />
                    </button>
                  </div>
                </div>
                <div className="flex gap-3">
                  {videoShowcase.map((video) => (
                    <button
                      key={video.id}
                      onClick={() => setActiveVideo(video.id)}
                      className={`flex-1 relative aspect-video overflow-hidden border-2 transition-all ${activeVideo === video.id ? "border-foreground" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                    >
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.label}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute bottom-0 left-0 right-0 bg-foreground/80 text-background text-xs py-1 px-2">
                        {video.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Design Tab */}
          <TabsContent value="design" className="mt-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-foreground flex items-center justify-center">
                    <PenTool className="h-6 w-6 text-background" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold">Brand & Design</h2>
                    <p className="text-muted-foreground">Strategic creative solutions</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  We create distinctive brand identities, websites, and visual communications that
                  make your brand unforgettable and connect with your audience.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {designFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button asChild size="lg">
                  <Link href="/contact?service=design">
                    Get a Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Design Portfolio Preview */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <Image
                      src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80"
                      alt="Brand design example"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src="https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?w=600&q=80"
                      alt="Web design example"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80"
                      alt="Identity design example"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <Image
                      src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=80"
                      alt="Packaging design example"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

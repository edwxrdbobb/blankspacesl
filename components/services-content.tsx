"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  ArrowUpRight,
  Mic,
  Video,
  Check,
  Clock,
  Zap,
  Headphones,
  Play,
  Monitor,
  Globe,
  Music
} from "lucide-react"

const recordingFeatures = [
  "Industry standard recording equipment",
  "Acoustically treated studio rooms",
  "24/7 uninterrupted power supply",
  "Professional mixing & mastering",
  "Studio rental for high-level productions",
  "Comfortable rehearsal and recording environment",
]

const avFeatures = [
  "Voice Acting Services",
  "Voice Over Direction and Production",
  "Explainer Videos",
  "Radio and TV commercial production",
  "Sound design for visual projects",
  "Editing and post-production",
]

const webDevelopmentFeatures = [
  "Custom business and portfolio websites",
  "Responsive design for mobile and desktop",
  "Landing pages for launches and campaigns",
  "Copy and content structure support",
  "Performance-focused front-end builds",
  "Ongoing site updates and maintenance",
]

const eventsFeatures = [
  "Live music curation for private events",
  "Bands, solo acts, and instrumentalists",
  "Mood-based programming for the occasion",
  "Entertainment planning support",
  "Sound coordination for event flow",
  "Bookings for retreats and special moments",
]

const eventsGallery = [
  "/events/WhatsApp%20Image%202026-03-14%20at%2010.57.30.jpeg",
  "/events/WhatsApp%20Image%202026-03-14%20at%2010.57.32.jpeg",
  "/events/WhatsApp%20Image%202026-03-14%20at%2010.58.55.jpeg",
  "/events/WhatsApp%20Image%202026-03-14%20at%2010.59.08.jpeg",
]

const audioAds = [
  { title: "1 Mobile", src: "/our-work/audio-ads/1%20Mobile.mp3" },
  { title: "AWATS Ad", src: "/our-work/audio-ads/AWATS%20ad.mp3" },
  { title: "Vult App (English)", src: "/our-work/audio-ads/Vult%20App%20English.mp3" },
]

const videoShowcase = [
  {
    id: "showcase-1",
    label: "Showcase",
    thumbnail: "/videoframe_2764.png",
    src: "/our-work/VIDEO-2026-03-02-12-10-51.mp4",
  },
  {
    id: "showcase-2",
    label: "Spotlight",
    thumbnail: "/videoframe_3051.png",
    src: "/our-work/VIDEO-2026-03-02-12-19-48.mp4",
  },
]

const webWorks = [
  {
    title: "Smove Vehicles",
    href: "https://smovevehicles.com/",
    image: "/our-work/website/Smove-Vehicles-03-14-2026_05_18_PM.png",
  },
  {
    title: "Leone Gadgets",
    href: "https://leonegadgets.com/",
    image: "/our-work/website/HOME-Leone-Gadgets-03-14-2026_05_20_PM.png",
  },
  {
    title: "Kizuri International",
    href: "https://kizuri-international.com/",
    image: "/our-work/website/Kizuri-International-%E2%80%93-HR-Solutions-Across-Borders-03-14-2026_05_22_PM.png",
  },
  {
    title: "Centurion Engineering",
    href: "https://centurion.sl/",
    image: "/our-work/website/Centurion-Engineering-%E2%80%93-Building-a-concrete-future-03-14-2026_05_23_PM.png",
  },
]

const usdToSleRate = 22.58

const studioRates = [
  { label: "Space Rental", sle: 300, period: "/hr", note: "Basic room access" },
  {
    label: "Recording Session",
    sle: 450,
    period: "/hr",
    note: "Full studio access + engineer",
    featured: true,
    secondary: { sle: 600, label: "for 2 hours" },
  },
  { label: "Full Day", sle: 7903, period: "/day", note: "8 hours, all inclusive" },
]

export function ServicesContent() {
  const [activeVideo, setActiveVideo] = useState(videoShowcase[0]?.id ?? "showcase-1")
  const [currency, setCurrency] = useState<"SLE" | "USD">("SLE")

  const formatPrice = (sleAmount: number) => {
    if (currency === "USD") {
      return {
        symbol: "$",
        amount: (sleAmount / usdToSleRate).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      }
    }

    return {
      symbol: "Le ",
      amount: sleAmount.toLocaleString("en-SL", {
        maximumFractionDigits: 0,
      }),
    }
  }

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
            From studio sessions to digital launches and live experiences, we provide end-to-end creative services
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
              Recording & Studio Rental
            </TabsTrigger>
            <TabsTrigger
              value="audiovisual"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none px-6 py-4 font-heading"
              id="audiovisual"
            >
              <Video className="h-4 w-4 mr-2" />
              Audiovisual Productions
            </TabsTrigger>
            <TabsTrigger
              value="web-development"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none px-6 py-4 font-heading"
              id="web-development"
            >
              <Globe className="h-4 w-4 mr-2" />
              Web Solutions
            </TabsTrigger>
            <TabsTrigger
              value="events-entertainment"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none px-6 py-4 font-heading"
              id="events-entertainment"
            >
              <Music className="h-4 w-4 mr-2" />
              Events & Entertainment
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
                    <h2 className="font-heading text-2xl md:text-3xl font-bold">Recording & Studio Rental</h2>
                    <p className="text-muted-foreground">Professional studio space in Freetown</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Professional studio space with industry standard equipment for high level productions,
                  acoustically treated, with uninterrupted power supply.
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
                    <span>Hourly and daily rentals available</span>
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
                  src="/d21421eb008f0db473c6036b75be58d6.jpg"
                  alt="Recording studio interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Pricing Preview */}
            <div className="mt-16 p-8 bg-muted">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h3 className="font-heading text-xl font-bold">Studio Rates</h3>
                  <p className="text-muted-foreground text-sm">Toggle pricing between Leones and US dollars.</p>
                </div>
                <div className="inline-flex w-fit rounded-full border border-border bg-background p-1">
                  <button
                    type="button"
                    onClick={() => setCurrency("SLE")}
                    className={`rounded-full px-4 py-2 text-sm transition-colors ${
                      currency === "SLE" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-pressed={currency === "SLE"}
                  >
                    Leones
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency("USD")}
                    className={`rounded-full px-4 py-2 text-sm transition-colors ${
                      currency === "USD" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-pressed={currency === "USD"}
                  >
                    Dollars
                  </button>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                {studioRates.map((rate) => {
                  const price = formatPrice(rate.sle)
                  const secondaryPrice = rate.secondary ? formatPrice(rate.secondary.sle) : null

                  return (
                    <div
                      key={rate.label}
                      className={`bg-background p-6 ${rate.featured ? "border-2 border-foreground" : ""}`}
                    >
                      <p className="text-muted-foreground text-sm mb-2">{rate.label}</p>
                      <p className="font-heading text-3xl font-bold">
                        {price.symbol}
                        {price.amount}
                        <span className="text-lg font-normal text-muted-foreground">{rate.period}</span>
                      </p>
                      <p className="text-muted-foreground text-sm mt-2">{rate.note}</p>
                      {rate.secondary && secondaryPrice ? (
                        <p className="text-muted-foreground text-sm">
                          {secondaryPrice.symbol}
                          {secondaryPrice.amount} {rate.secondary.label}
                        </p>
                      ) : null}
                    </div>
                  )
                })}
              </div>
              <p className="text-muted-foreground text-sm mt-6">
                * 50% deposit required to confirm booking. Dollar pricing uses an approximate conversion of 1 USD = Le 22.58.
              </p>
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
                    <h2 className="font-heading text-2xl md:text-3xl font-bold">Audiovisual Productions</h2>
                    <p className="text-muted-foreground">High quality audio and visual content</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  From brand songs to radio and TV commercials, to visual projects with key sonic
                  elements, we&apos;ll bring your vision to life.
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
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="relative aspect-video w-full overflow-hidden bg-muted"
                      aria-label="Play showcase video"
                    >
                      <Image
                        src={
                          videoShowcase.find((video) => video.id === activeVideo)?.thumbnail ??
                          videoShowcase[0].thumbnail
                        }
                        alt="Audiovisual showcase"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
                        <span className="w-16 h-16 rounded-full bg-background flex items-center justify-center hover:scale-110 transition-transform">
                          <Play className="h-6 w-6 text-foreground ml-1" />
                        </span>
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-black">
                    <div className="relative aspect-video w-full">
                      <video
                        key={activeVideo}
                        src={videoShowcase.find((video) => video.id === activeVideo)?.src ?? videoShowcase[0].src}
                        className="h-full w-full"
                        controls
                        autoPlay
                        playsInline
                        preload="metadata"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
                <div className="flex gap-3">
                  {videoShowcase.map((video) => (
                    <button
                      key={video.id}
                      type="button"
                      onClick={() => setActiveVideo(video.id)}
                      className={`flex-1 relative aspect-video overflow-hidden border-2 transition-all ${
                        activeVideo === video.id
                          ? "border-foreground"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      aria-label={`Show ${video.label}`}
                    >
                      <Image src={video.thumbnail} alt={video.label} fill className="object-cover" />
                      <span className="absolute bottom-0 left-0 right-0 bg-foreground/80 text-background text-xs py-1 px-2">
                        {video.label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="pt-4">
                  <h3 className="font-heading text-sm uppercase tracking-wider text-muted-foreground mb-3">
                    Audio Samples
                  </h3>
                  <div className="space-y-3">
                    {audioAds.map((sample) => (
                      <div key={sample.src} className="border border-border bg-background p-3">
                        <p className="text-sm font-medium mb-2">{sample.title}</p>
                        <audio className="w-full" controls preload="none" src={sample.src} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Web Solutions Tab */}
          <TabsContent value="web-development" className="mt-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-foreground flex items-center justify-center">
                    <Globe className="h-6 w-6 text-background" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold">Web Solutions</h2>
                    <p className="text-muted-foreground">Professional websites for your digital presence</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Get your digital footprint started right with a professional website worth of your dream.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {webDevelopmentFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button asChild size="lg">
                  <Link href="/contact?service=web-development">
                    Get a Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Web Portfolio Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {webWorks.map((work) => (
                  <a
                    key={work.href}
                    href={work.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-[16/10] overflow-hidden bg-muted"
                    aria-label={`Open ${work.title} website`}
                  >
                    <Image
                      src={work.image}
                      alt={`${work.title} website`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-medium text-background bg-foreground/70 px-2 py-1">
                        {work.title}
                      </span>
                      <span className="h-8 w-8 shrink-0 bg-background/90 flex items-center justify-center">
                        <ArrowUpRight className="h-4 w-4 text-foreground" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events-entertainment" className="mt-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-foreground flex items-center justify-center">
                    <Music className="h-6 w-6 text-background" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold">Events & Entertainment</h2>
                    <p className="text-muted-foreground">Curated live experiences for every setting</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Musical curations ranging from performing talents to bands or solo instrumentalists.
                  Get in touch to bring the right ambience and mood to your events, staff retreats,
                  and special moments.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {eventsFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button asChild size="lg">
                  <Link href="/contact?service=events-entertainment">
                    Plan an Event
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <Image
                      src={eventsGallery[0]}
                      alt="Live event entertainment"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src={eventsGallery[1]}
                      alt="Live event entertainment"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src={eventsGallery[2]}
                      alt="Live event entertainment"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <Image
                      src={eventsGallery[3]}
                      alt="Live event entertainment"
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

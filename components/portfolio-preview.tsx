"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mediaUrl } from "@/lib/media"

const webWorks = [
  {
    title: "Smove Vehicles",
    image: "/our-work/website/Smove-Vehicles-03-14-2026_05_18_PM.png",
  },
  {
    title: "Leone Gadgets",
    image: "/our-work/website/HOME-Leone-Gadgets-03-14-2026_05_20_PM.png",
  },
  {
    title: "Kizuri International",
    image: "/our-work/website/Kizuri-International-%E2%80%93-HR-Solutions-Across-Borders-03-14-2026_05_22_PM.png",
  },
  {
    title: "Centurion Engineering",
    image: "/our-work/website/Centurion-Engineering-%E2%80%93-Building-a-concrete-future-03-14-2026_05_23_PM.png",
  },
]

const projects = [
  {
    id: "nassit-animation",
    title: "NASSIT Animation",
    category: "Creative Production",
    client: "NASSIT",
    image: "https://res.cloudinary.com/dhixhto9s/video/upload/so_1,f_jpg/v1773913989/blankspace/our-work/video-2026-03-02-12-19-48.jpg",
    featured: true,
    hasVideo: true,
    href: "/portfolio/eco-initiative",
  },
  {
    id: "events-entertainment",
    title: "Events & Entertainment",
    category: "Events & Entertainment",
    client: "Blank Space",
    image: "https://res.cloudinary.com/dhixhto9s/image/upload/v1773513655/blankspace/events/whatsapp-image-2026-03-14-at-10.58.55.jpg",
    featured: false,
    hasVideo: false,
    href: "/services#events-entertainment",
  },
  {
    id: "web-solutions",
    title: "Web Solutions",
    category: "Web Solution",
    client: "Various Clients",
    featured: false,
    isCarousel: true,
    href: "/services#web-development",
  },
  {
    id: "audio-ads",
    title: "Audio Ads Collection",
    category: "Audio Ads",
    client: "Various Brands",
    image: "/audio1.png",
    featured: false,
    hasVideo: false,
    href: "/portfolio/audio-ads",
  },
]

function WebSolutionsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % webWorks.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-full group/carousel">
      {webWorks.map((work, index) => (
        <div
          key={work.title}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={mediaUrl(work.image)}
            alt={work.title}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/30 transition-colors" />
          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm text-foreground text-[10px] uppercase tracking-wider px-2 py-1 rounded">
            {work.title}
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {webWorks.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              index === currentIndex ? "bg-background" : "bg-background/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export function PortfolioPreview() {
  const featuredProject = projects.find((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section className="py-24 md:py-32 bg-foreground text-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="text-background/60 uppercase tracking-[0.2em] text-xs mb-4">Select Works</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
              Proof in every project.
            </h2>
          </div>
          <Button asChild variant="outline" className="border-background/30 text-background hover:bg-background/10 bg-transparent w-fit rounded-full">
            <Link href="/portfolio">
              View All Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured Project */}
          {featuredProject && (
            <Link
              href={featuredProject.href || `/portfolio/${featuredProject.id}`}
              className="group md:col-span-3 lg:col-span-3 relative aspect-[21/9] md:aspect-[21/7] overflow-hidden rounded-2xl"
            >
              <Image
                src={mediaUrl(featuredProject.image || "/placeholder.svg")}
                alt={featuredProject.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/30 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs uppercase tracking-wider text-background/70">
                    {featuredProject.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-background/50" />
                  <span className="text-xs text-background/70">{featuredProject.client}</span>
                </div>
                <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-background">
                  {featuredProject.title}
                </h3>
              </div>
              {featuredProject.hasVideo && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center">
                    <Play className="h-6 w-6 text-foreground ml-1" />
                  </div>
                </div>
              )}
            </Link>
          )}

          {/* Other Projects */}
          {otherProjects.map((project) => (
            <div
              key={project.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-background/10"
            >
              <Link href={project.href || `/portfolio/${project.id}`} className="absolute inset-0 z-10 transition-transform duration-500 group-hover:scale-105">
                {project.isCarousel ? (
                  <WebSolutionsCarousel />
                ) : (
                  <>
                    <Image
                      src={mediaUrl(project.image || "/placeholder.svg")}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/30 transition-colors" />
                  </>
                )}
              </Link>
              
              <div className="absolute bottom-0 left-0 right-0 p-5 z-20 pointer-events-none">
                <span className="text-xs uppercase tracking-wider text-background/70 mb-2 block">
                  {project.category}
                </span>
                <h3 className="font-heading text-lg font-semibold text-background">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

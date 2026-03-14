"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    id: "before-you-wake",
    title: "Before You Wake",
    category: "Music Video",
    client: "tar1k",
    image: "/ad79ed2ac71a0fecb65425f4acccc4ae.jpg",
    featured: true,
    hasVideo: true,
  },
  {
    id: "eco-initiative",
    title: "Sustainability Forward",
    category: "Brand Campaign",
    client: "EcoSL Initiative",
    image: "/9e484b919d09faaa3f7f698b4889713c.jpg",
    featured: false,
    hasVideo: true,
  },
  {
    id: "afrobeats-sessions",
    title: "Afrobeats Sessions Vol. 1",
    category: "Album Recording",
    client: "Various Artists",
    image: "/b3a086476f7cafa9ad54ad9d0e133f3f.jpg",
    featured: false,
    hasVideo: false,
  },
  {
    id: "audio-ads",
    title: "Audio Ads Collection",
    category: "Audio Ads",
    client: "Various Brands",
    image: "/audio1.png",
    featured: false,
    hasVideo: false,
  },
]

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
              href={`/portfolio/${featuredProject.id}`}
              className="group md:col-span-2 lg:col-span-2 relative aspect-[16/9] overflow-hidden rounded-2xl"
            >
              <Image
                src={featuredProject.image || "/placeholder.svg"}
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
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-background">
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
            <Link
              key={project.id}
              href={`/portfolio/${project.id}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/30 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-xs uppercase tracking-wider text-background/70 mb-2 block">
                  {project.category}
                </span>
                <h3 className="font-heading text-lg font-semibold text-background">
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

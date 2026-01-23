"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Play, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  { id: "all", label: "All Work" },
  { id: "music", label: "Music" },
  { id: "video", label: "Video" },
  { id: "brand", label: "Brand" },
  { id: "recording", label: "Recording" },
]

const projects = [
  {
    id: "before-you-wake",
    title: "Before You Wake",
    category: "music",
    type: "Music Video",
    client: "tar1k",
    year: "2024",
    description: "A cinematic music video exploring themes of love and longing, shot across multiple locations in Freetown.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
    featured: true,
    hasVideo: true,
  },
  {
    id: "eco-initiative",
    title: "Sustainability Forward",
    category: "video",
    type: "Documentary",
    client: "EcoSL Initiative",
    year: "2024",
    description: "An environmental awareness campaign highlighting sustainable practices in Sierra Leone.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    featured: false,
    hasVideo: true,
  },
  {
    id: "afrobeats-sessions",
    title: "Afrobeats Sessions Vol. 1",
    category: "recording",
    type: "Album",
    client: "Various Artists",
    year: "2024",
    description: "A collaborative album featuring emerging Afrobeats artists from Sierra Leone.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    featured: false,
    hasVideo: false,
  },
  {
    id: "heritage-rebrand",
    title: "Heritage Bank Rebrand",
    category: "brand",
    type: "Brand Identity",
    client: "Heritage Bank SL",
    year: "2023",
    description: "Complete brand overhaul including visual identity, digital presence, and marketing collateral.",
    image: "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?w=800&q=80",
    featured: false,
    hasVideo: false,
  },
  {
    id: "freetown-nights",
    title: "Freetown Nights",
    category: "music",
    type: "Music Video",
    client: "DJ Rampage",
    year: "2024",
    description: "High-energy music video capturing the vibrant nightlife of Freetown.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    featured: false,
    hasVideo: true,
  },
  {
    id: "telecom-campaign",
    title: "Connect SL Campaign",
    category: "video",
    type: "Commercial",
    client: "Africell",
    year: "2023",
    description: "National advertising campaign promoting mobile connectivity across Sierra Leone.",
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80",
    featured: false,
    hasVideo: true,
  },
  {
    id: "tourism-brand",
    title: "Visit Sierra Leone",
    category: "brand",
    type: "Brand Campaign",
    client: "National Tourist Board",
    year: "2023",
    description: "Tourism brand identity and promotional materials showcasing Sierra Leone's natural beauty.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    featured: false,
    hasVideo: false,
  },
  {
    id: "rising-stars-ep",
    title: "Rising Stars EP",
    category: "recording",
    type: "EP Recording",
    client: "Star Academy SL",
    year: "2023",
    description: "Professional recording and mixing for emerging talent competition winners.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
    featured: false,
    hasVideo: false,
  },
]

export function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-muted-foreground uppercase tracking-[0.2em] text-xs mb-4">Portfolio</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Select Works
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            A showcase of our creative projects spanning music, video, brand, and recording work.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className="font-medium"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.id}`}
              className={`group relative overflow-hidden bg-muted ${
                project.featured && index === 0 ? "md:col-span-2 lg:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/30 transition-colors" />
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs uppercase tracking-wider text-background/70">
                    {project.type}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-background/50" />
                  <span className="text-xs text-background/70">{project.year}</span>
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-background mb-1">
                  {project.title}
                </h3>
                <p className="text-background/70 text-sm">{project.client}</p>
              </div>

              {/* Play Button for Videos */}
              {project.hasVideo && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center">
                    <Play className="h-5 w-5 text-foreground ml-0.5" />
                  </div>
                </div>
              )}

              {/* Arrow for non-video */}
              {!project.hasVideo && (
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
                    <ArrowUpRight className="h-4 w-4 text-foreground" />
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

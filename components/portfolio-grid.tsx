"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Play, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mediaUrl } from "@/lib/media"

const categories = [
  { id: "all", label: "All Work" },
  { id: "music", label: "Music" },
  { id: "video", label: "Video" },
  { id: "web", label: "Web" },
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
    image: "/ad79ed2ac71a0fecb65425f4acccc4ae.jpg",
    featured: true,
    hasVideo: true,
  },
  {
    id: "smove-vehicles",
    title: "Smove Vehicles",
    category: "web",
    type: "Web Solution",
    client: "Smove Vehicles",
    year: "2024",
    description: "A comprehensive vehicle marketplace and rental platform built for the Sierra Leonean market.",
    image: "/our-work/website/Smove-Vehicles-03-14-2026_05_18_PM.png",
    featured: false,
    hasVideo: false,
  },
  {
    id: "centurion-engineering",
    title: "Centurion Engineering",
    category: "web",
    type: "Web Solution",
    client: "Centurion Engineering",
    year: "2024",
    description: "Corporate website for a leading engineering firm, showcasing major infrastructure projects.",
    image: "/our-work/website/Centurion-Engineering-%E2%80%93-Building-a-concrete-future-03-14-2026_05_23_PM.png",
    featured: false,
    hasVideo: false,
  },
  {
    id: "kizuri-international",
    title: "Kizuri International",
    category: "web",
    type: "Web Solution",
    client: "Kizuri International",
    year: "2024",
    description: "HR solutions platform connecting talent with opportunities across borders.",
    image: "/our-work/website/Kizuri-International-%E2%80%93-HR-Solutions-Across-Borders-03-14-2026_05_22_PM.png",
    featured: false,
    hasVideo: false,
  },
  {
    id: "audiovisual-showcase",
    title: "Creative Showcase",
    category: "video",
    type: "Audiovisual",
    client: "Blank Space",
    year: "2024",
    description: "A collection of our best audiovisual productions and brand storytelling.",
    image: "/videoframe_2764.png",
    featured: false,
    hasVideo: true,
  },
  {
    id: "audio-ads",
    title: "Audio Ads Collection",
    category: "recording",
    type: "Audio Ads",
    client: "Various Brands",
    year: "2026",
    description: "A selection of radio and digital audio ads produced for brands and campaigns.",
    image: "/audio1.png",
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
            A showcase of our creative endeavours spanning music, video, web development and other solo and collaborative creative work.
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
              className={`group relative overflow-hidden bg-muted ${project.featured && index === 0 ? "md:col-span-2 lg:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                }`}
            >
              <Image
                src={mediaUrl(project.image || "/placeholder.svg")}
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

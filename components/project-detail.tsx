"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectDetailProps {
  project: {
    title: string
    type: string
    client: string
    year: string
    fullDescription: string
    image: string
    gallery: string[]
    credits: { role: string; name: string }[]
    hasVideo: boolean
  }
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-8 -ml-4">
          <Link href="/portfolio">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Link>
        </Button>

        {/* Hero Image */}
        <div className="relative aspect-[21/9] mb-12 overflow-hidden bg-muted">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          {project.hasVideo && (
            <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
              <button className="w-20 h-20 rounded-full bg-background flex items-center justify-center hover:scale-110 transition-transform">
                <Play className="h-8 w-8 text-foreground ml-1" />
              </button>
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm uppercase tracking-wider text-muted-foreground">
                {project.type}
              </span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span className="text-sm text-muted-foreground">{project.year}</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              {project.title}
            </h1>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-12">
              {project.fullDescription}
            </p>

            {/* Gallery */}
            {project.gallery.length > 0 && (
              <div className="space-y-6">
                <h2 className="font-heading text-xl font-semibold">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.gallery.map((image, index) => (
                    <div key={index} className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} gallery image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Client */}
              <div>
                <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Client</h3>
                <p className="font-heading text-lg font-semibold">{project.client}</p>
              </div>

              {/* Credits */}
              <div>
                <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">Credits</h3>
                <div className="space-y-3">
                  {project.credits.map((credit, index) => (
                    <div key={index} className="flex justify-between items-baseline border-b border-border pb-2">
                      <span className="text-sm text-muted-foreground">{credit.role}</span>
                      <span className="text-sm font-medium">{credit.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <p className="text-muted-foreground text-sm mb-4">
                  Interested in creating something similar?
                </p>
                <Button asChild className="w-full">
                  <Link href="/contact">Start a Project</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

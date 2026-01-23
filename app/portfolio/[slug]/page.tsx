import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProjectDetail } from "@/components/project-detail"
import { FloatingBookButton } from "@/components/floating-book-button"
import type { Metadata } from "next"

const projects: Record<string, {
  title: string
  type: string
  client: string
  year: string
  description: string
  fullDescription: string
  image: string
  gallery: string[]
  credits: { role: string; name: string }[]
  hasVideo: boolean
}> = {
  "before-you-wake": {
    title: "Before You Wake",
    type: "Music Video",
    client: "tar1k",
    year: "2024",
    description: "A cinematic music video exploring themes of love and longing.",
    fullDescription: "Before You Wake is a deeply personal music video that follows the journey of a love story through the streets of Freetown. Shot over five days across multiple locations, the video combines intimate close-ups with sweeping drone footage to create a visual narrative that mirrors the song's emotional arc. Working closely with tar1k, we developed a visual language that blends contemporary cinematography with traditional Sierra Leonean aesthetics.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    ],
    credits: [
      { role: "Director", name: "Blank Space" },
      { role: "Artist", name: "tar1k" },
      { role: "Director of Photography", name: "Ibrahim K." },
      { role: "Editor", name: "Blank Space" },
      { role: "Color Grade", name: "Studio SL" },
    ],
    hasVideo: true,
  },
  "eco-initiative": {
    title: "Sustainability Forward",
    type: "Documentary",
    client: "EcoSL Initiative",
    year: "2024",
    description: "Environmental awareness campaign for Sierra Leone.",
    fullDescription: "Sustainability Forward is a documentary series highlighting environmental conservation efforts across Sierra Leone. The project combines interviews with local activists, stunning nature photography, and data-driven storytelling to create a compelling case for sustainable development. The campaign reached over 500,000 viewers across social media and broadcast channels.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      "https://images.unsplash.com/photo-1518173946687-a4c036bc2995?w=800&q=80",
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80",
    ],
    credits: [
      { role: "Director", name: "Blank Space" },
      { role: "Producer", name: "EcoSL Initiative" },
      { role: "Cinematography", name: "Blank Space" },
      { role: "Sound Design", name: "Blank Space" },
    ],
    hasVideo: true,
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = projects[slug]
  
  if (!project) {
    return { title: "Project Not Found | Blank Space" }
  }

  return {
    title: `${project.title} | Blank Space Portfolio`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects[slug]

  if (!project) {
    return (
      <main>
        <Navigation />
        <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground">The project you&apos;re looking for doesn&apos;t exist.</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <ProjectDetail project={project} />
      </div>
      <Footer />
      <FloatingBookButton />
    </main>
  )
}

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
    image: "/ad79ed2ac71a0fecb65425f4acccc4ae.jpg",
    gallery: [
      "/1190c1d6176009d625f7d93b0d973f5b.jpg",
      "/videoframe_3051.png",
      "/b3a086476f7cafa9ad54ad9d0e133f3f.jpg",
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
    image: "/9e484b919d09faaa3f7f698b4889713c.jpg",
    gallery: [
      "/2383df5047047988ba513db21e630079.jpg",
      "/e6e36705fc1d199c05bc8dfb896e32b8.jpg",
      "/8cb9359c1f0bf4179033816b49a1a00d.jpg",
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

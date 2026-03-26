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
  videoSrc?: string
  audioSamples?: { title: string; src: string }[]
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
    videoSrc: "/our-work/VIDEO-2026-03-02-12-10-51.mp4",
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
    videoSrc: "/our-work/VIDEO-2026-03-02-12-19-48.mp4",
  },
  "afrobeats-sessions": {
    title: "Afrobeats Sessions Vol. 1",
    type: "Album",
    client: "Various Artists",
    year: "2024",
    description: "A collaborative album recording featuring emerging Afrobeats artists from Sierra Leone.",
    fullDescription: "Afrobeats Sessions Vol. 1 captures a range of styles from new and established voices. We handled recording sessions, vocal production, and mix direction to help each track land with clarity, punch, and a cohesive sonic identity across the project.",
    image: "/b3a086476f7cafa9ad54ad9d0e133f3f.jpg",
    gallery: ["/fd16b5b0a8e9322c5698493bc82a50ae.jpg", "/e6e36705fc1d199c05bc8dfb896e32b8.jpg"],
    credits: [
      { role: "Recording", name: "Blank Space" },
      { role: "Mix Direction", name: "Blank Space" },
      { role: "Artists", name: "Various" },
    ],
    hasVideo: false,
  },
  "freetown-nights": {
    title: "Freetown Nights",
    type: "Music Video",
    client: "DJ Rampage",
    year: "2024",
    description: "High-energy music video capturing the vibrant nightlife of Freetown.",
    fullDescription: "Freetown Nights is a fast-paced music video built around movement, atmosphere, and neon-drenched scenes. From location scouting to edit rhythm, we focused on energy and storytelling that matches the track’s tempo and late-night mood.",
    image: "/1f2b7feac884ebb75004ccf47a96ce52.jpg",
    gallery: ["/1f2b7feac884ebb75004ccf47a96ce52.jpg", "/1190c1d6176009d625f7d93b0d973f5b.jpg"],
    credits: [
      { role: "Director", name: "Blank Space" },
      { role: "Artist", name: "DJ Rampage" },
      { role: "Edit", name: "Blank Space" },
    ],
    hasVideo: false,
  },
  "telecom-campaign": {
    title: "Connect SL Campaign",
    type: "Commercial",
    client: "Africell",
    year: "2023",
    description: "National campaign promoting mobile connectivity across Sierra Leone.",
    fullDescription: "Connect SL is a multi-format campaign designed for radio, social, and broadcast. We supported concept development, production planning, and post-production workflows to deliver clean, brand-aligned assets across platforms.",
    image: "/30ebf51e02c4894bf0d4162e506b333e.jpg",
    gallery: ["/30ebf51e02c4894bf0d4162e506b333e.jpg", "/videoframe_2764.png"],
    credits: [
      { role: "Production", name: "Blank Space" },
      { role: "Client", name: "Africell" },
    ],
    hasVideo: false,
  },
  "rising-stars-ep": {
    title: "Rising Stars EP",
    type: "EP Recording",
    client: "Star Academy SL",
    year: "2023",
    description: "Professional recording and mixing for emerging talent competition winners.",
    fullDescription: "Rising Stars EP is a focused studio project built to showcase new talent with professional polish. We handled vocal tracking, production support, and mixing to achieve a consistent sound across songs while keeping each artist’s character intact.",
    image: "/f14281875b7b16d18596fab170cd9b29.jpg",
    gallery: ["/f14281875b7b16d18596fab170cd9b29.jpg", "/b6929bd059977a8238dcbc74008f31f4.jpg"],
    credits: [
      { role: "Recording", name: "Blank Space" },
      { role: "Mixing", name: "Blank Space" },
      { role: "Client", name: "Star Academy SL" },
    ],
    hasVideo: false,
  },
  "audio-ads": {
    title: "Audio Ads Collection",
    type: "Audio Ads",
    client: "Various Brands",
    year: "2026",
    description: "A selection of radio and digital audio ads produced for brands and campaigns.",
    fullDescription: "This collection highlights our approach to audio advertising: clear messaging, tight pacing, and a mix that translates across phones, cars, and broadcast systems. From script support to voice direction and final mastering, we build ads that feel energetic, modern, and on-brand.",
    image: "/audio1.png",
    gallery: ["/audio.png", "/bs-studio-room.jpeg"],
    credits: [
      { role: "Production", name: "Blank Space" },
      { role: "Sound Design", name: "Blank Space" },
      { role: "Mix & Master", name: "Blank Space" },
    ],
    hasVideo: false,
    audioSamples: [
      { title: "One Mobile", src: "/our-work/audio-ads/1%20Mobile.mp3" },
      { title: "AWATS Ad", src: "/our-work/audio-ads/AWATS%20ad.mp3" },
      { title: "Vult App (English)", src: "/our-work/audio-ads/Vult%20App%20English.mp3" },
    ],
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

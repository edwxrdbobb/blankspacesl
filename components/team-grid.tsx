"use client"

import Image from "next/image"
import Link from "next/link"
import { Instagram, Twitter, Music } from "lucide-react"
import { Button } from "@/components/ui/button"

const coreTeam = [
  {
    id: "tarik-ali",
    name: "Tarik Ali ",
    role: "Founder and Creative Director",
    bio: "Tarik leads Blank Space with a focus on world-class creative output across music, audiovisual, and digital projects.",
    image: "/ad79ed2ac71a0fecb65425f4acccc4ae.jpg",
    social: {
      instagram: "https://instagram.com/tar1k",
      twitter: "https://twitter.com/tar1k",
      music: "https://spotify.com/artist/tar1k",
    },
  },
  {
    id: "edward-bob-kamara",
    name: "Edward Bob Kamara",
    role: "Systems & Tech",
    bio: "Edward leads our web and digital solutions, helping brands build strong online presence and reliable platforms.",
    image: "/placeholder-user.jpg",
    social: {},
  },
  {
    id: "reginald-thompson",
    name: "Reginald Thompson",
    role: "Music & Operations Director",
    bio: "Reginald supports productions and live sessions with performance, arrangement support, and musical direction.",
    image: "/placeholder-user.jpg",
    social: {},
  },
  {
    id: "olor",
    name: "Leonis “Oloh” Martyn",
    role: "Studio Lead",
    bio: "Olor collaborates across projects, supporting creative development from concept to delivery.",
    image: "/placeholder-user.jpg",
    social: {},
  },
]

const collaborators = [
  {
    name: "Mohamed Camera",
    role: "Cinematographer",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Mariatu Conteh",
    role: "Motion Designer",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Abdul Rahman",
    role: "Sound Designer",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Isatu Jalloh",
    role: "Makeup Artist",
    image: "/placeholder-user.jpg",
  },
  {
    name: "David Williams",
    role: "Music Producer",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Aminata Kamara",
    role: "Stylist",
    image: "/placeholder-user.jpg",
  },
]

export function TeamGrid() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground uppercase tracking-[0.2em] text-xs mb-4">The Collective</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            The minds behind the magic.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            The Blank Space represents a collective of creatives and dreamers united by a passion for creative excellence.
          </p>
        </div>

        {/* Core Team */}
        <div className="mb-24">
          <h2 className="font-heading text-xl font-semibold mb-8 uppercase tracking-wider">Core Team</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {coreTeam.map((member) => (
              <div key={member.id} className="group">
                <div className="grid sm:grid-cols-[200px_1fr] gap-6">
                  <div className="relative aspect-[3/4] sm:aspect-auto overflow-hidden bg-muted rounded-2xl">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-heading text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-accent text-sm font-medium mb-4">{member.role}</p>
                    <div className="flex-grow" />
                    <div className="flex items-center gap-3">
                      {member.social.instagram && (
                        <a
                          href={member.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                          aria-label={`${member.name} Instagram`}
                        >
                          <Instagram className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                          aria-label={`${member.name} Twitter`}
                        >
                          <Twitter className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {member.social.music && (
                        <a
                          href={member.social.music}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                          aria-label={`${member.name} Music`}
                        >
                          <Music className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collaborators */}
        {/* <div className="mb-24">
          <h2 className="font-heading text-xl font-semibold mb-8 uppercase tracking-wider">Collaborators</h2>
          <p className="text-muted-foreground max-w-2xl mb-8">
            We work with an extended network of talented individuals who bring specialized skills to our projects.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {collaborators.map((collab) => (
              <div key={collab.name} className="group text-center">
                <div className="relative aspect-square overflow-hidden bg-muted mb-3 rounded-2xl">
                  <Image
                    src={collab.image || "/placeholder.svg"}
                    alt={collab.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h4 className="font-medium text-sm">{collab.name}</h4>
                <p className="text-muted-foreground text-xs">{collab.role}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Join CTA */}
        <div className="bg-foreground text-background p-8 md:p-12 rounded-3xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                Want to join the collective?
              </h2>
              <p className="text-background/70 leading-relaxed">
                We&apos;re always looking for talented creatives to collaborate with. Whether you&apos;re an artist,
                producer, designer, or have other creative skills, we&apos;d love to hear from you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
              <Button asChild variant="secondary" size="lg" className="rounded-full">
                <Link href="/contact?type=collaborate">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

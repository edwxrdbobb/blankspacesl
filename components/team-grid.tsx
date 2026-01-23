"use client"

import Image from "next/image"
import Link from "next/link"
import { Instagram, Twitter, Music } from "lucide-react"
import { Button } from "@/components/ui/button"

const coreTeam = [
  {
    id: "amara",
    name: "Amara Koroma",
    role: "Founder & Creative Director",
    bio: "Amara founded Blank Space in 2019 with a vision to create a world-class creative hub in Freetown. With over 15 years in the music and advertising industry, she brings a unique blend of artistic vision and business acumen to every project.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    social: {
      instagram: "https://instagram.com/amarakoroma",
      twitter: "https://twitter.com/amarakoroma",
    },
  },
  {
    id: "ibrahim",
    name: "Ibrahim Sesay",
    role: "Studio Manager & Lead Engineer",
    bio: "Ibrahim oversees all studio operations and brings 10 years of audio engineering experience. He's worked with some of Sierra Leone's biggest artists and ensures every session meets international standards.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    social: {
      instagram: "https://instagram.com/ibrahimsesay",
    },
  },
  {
    id: "tarik",
    name: "tar1k",
    role: "Artist-in-Residence & Creative Lead",
    bio: "tar1k is an award-winning artist and one of Sierra Leone's most recognized voices. As our artist-in-residence, he mentors emerging talent and leads creative direction on flagship projects.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&q=80",
    social: {
      instagram: "https://instagram.com/tar1k",
      twitter: "https://twitter.com/tar1k",
      music: "https://spotify.com/artist/tar1k",
    },
  },
  {
    id: "fatou",
    name: "Fatou Bangura",
    role: "Head of Brand & Design",
    bio: "Fatou leads our design team, bringing a fresh perspective to brand identity and visual communications. Her work has been recognized at the African Design Awards.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    social: {
      instagram: "https://instagram.com/fatoubangura",
    },
  },
]

const collaborators = [
  {
    name: "Mohamed Camera",
    role: "Cinematographer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
  {
    name: "Mariatu Conteh",
    role: "Motion Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
  {
    name: "Abdul Rahman",
    role: "Sound Designer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    name: "Isatu Jalloh",
    role: "Makeup Artist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
  {
    name: "David Williams",
    role: "Music Producer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
  },
  {
    name: "Aminata Kamara",
    role: "Stylist",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
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
            We&apos;re a collective of artists, producers, designers, and dreamers united by a passion 
            for creative excellence and a commitment to putting Sierra Leone on the global creative map.
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
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                      {member.bio}
                    </p>
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
        <div className="mb-24">
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
        </div>

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

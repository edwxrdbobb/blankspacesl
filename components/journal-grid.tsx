"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpRight, Mail } from "lucide-react"

const categories = [
  { id: "all", label: "All Posts" },
  { id: "spotlight", label: "Artist Spotlights" },
  { id: "tips", label: "Creative Tips" },
  { id: "behind", label: "Behind the Scenes" },
  { id: "industry", label: "Industry" },
]

const articles = [
  {
    id: "tar1k-interview",
    title: "Finding Your Voice: A Conversation with tar1k",
    category: "spotlight",
    excerpt: "Sierra Leone's breakout artist shares his journey from bedroom producer to international stages, and the role Blank Space played in his evolution.",
    image: "/ad79ed2ac71a0fecb65425f4acccc4ae.jpg",
    author: "Amara Koroma",
    date: "January 15, 2024",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "home-recording-tips",
    title: "5 Tips for Better Home Recordings",
    category: "tips",
    excerpt: "Professional recording doesn't always require a studio. Here are essential techniques to improve your home setup.",
    image: "/d21421eb008f0db473c6036b75be58d6.jpg",
    author: "Ibrahim Sesay",
    date: "January 10, 2024",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: "before-you-wake-bts",
    title: "Making 'Before You Wake': Behind the Scenes",
    category: "behind",
    excerpt: "A look at the creative process behind tar1k's latest music video, from concept to final cut.",
    image: "/videoframe_2764.png",
    author: "Blank Space",
    date: "January 5, 2024",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: "afrobeats-rise",
    title: "The Rise of Sierra Leonean Afrobeats",
    category: "industry",
    excerpt: "How a new generation of artists is putting Freetown on the global music map.",
    image: "/b3a086476f7cafa9ad54ad9d0e133f3f.jpg",
    author: "Fatou Bangura",
    date: "December 28, 2023",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: "brand-identity-basics",
    title: "Building a Brand Identity That Lasts",
    category: "tips",
    excerpt: "The fundamentals of creating a memorable brand identity for artists and businesses.",
    image: "/videoframe_16889.png",
    author: "Fatou Bangura",
    date: "December 20, 2023",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: "studio-tour",
    title: "A Day at Blank Space Studio",
    category: "behind",
    excerpt: "Take a virtual tour of our facilities and see where the magic happens.",
    image: "/30ebf51e02c4894bf0d4162e506b333e.jpg",
    author: "Ibrahim Sesay",
    date: "December 15, 2023",
    readTime: "4 min read",
    featured: false,
  },
]

export function JournalGrid() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [email, setEmail] = useState("")

  const filteredArticles = activeCategory === "all"
    ? articles
    : articles.filter(a => a.category === activeCategory)

  const featuredArticle = filteredArticles.find(a => a.featured) || filteredArticles[0]
  const otherArticles = filteredArticles.filter(a => a.id !== featuredArticle?.id)

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-muted-foreground uppercase tracking-[0.2em] text-xs mb-4">Journal</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Stories from the studio.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Artist spotlights, creative tips, behind-the-scenes stories, and insights from
            Sierra Leone&apos;s creative community.
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

        {/* Featured Article */}
        {featuredArticle && (
          <Link
            href={`/journal/${featuredArticle.id}`}
            className="group block mb-12"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <Image
                  src={featuredArticle.image || "/placeholder.svg"}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs uppercase tracking-wider text-accent font-medium">
                    {categories.find(c => c.id === featuredArticle.category)?.label}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{featuredArticle.readTime}</span>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 group-hover:text-accent transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">{featuredArticle.author}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{featuredArticle.date}</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Article Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {otherArticles.map((article) => (
            <Link
              key={article.id}
              href={`/journal/${article.id}`}
              className="group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted mb-4">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider text-accent font-medium">
                  {categories.find(c => c.id === article.category)?.label}
                </span>
                <span className="text-xs text-muted-foreground">· {article.readTime}</span>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                {article.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                {article.excerpt}
              </p>
              <div className="text-xs text-muted-foreground">
                {article.author} · {article.date}
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-foreground text-background p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                Stay in the loop.
              </h2>
              <p className="text-background/70 leading-relaxed">
                Get the latest artist spotlights, creative tips, and studio updates delivered
                straight to your inbox. No spam, just good content.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50 flex-grow"
              />
              <Button type="submit" variant="secondary" className="gap-2">
                <Mail className="h-4 w-4" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

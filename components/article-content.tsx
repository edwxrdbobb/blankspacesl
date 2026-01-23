"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Twitter, Linkedin, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ArticleContentProps {
  article: {
    title: string
    category: string
    content: string
    image: string
    author: string
    authorImage: string
    date: string
    readTime: string
  }
}

export function ArticleContent({ article }: ArticleContentProps) {
  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = article.title

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank")
        break
      case "linkedin":
        window.open(`https://linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`, "_blank")
        break
      case "copy":
        navigator.clipboard.writeText(url)
        break
    }
  }

  return (
    <article className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-8 -ml-4">
          <Link href="/journal">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journal
          </Link>
        </Button>

        {/* Article Header */}
        <header className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-xs uppercase tracking-wider text-accent font-medium">
              {article.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span className="text-xs text-muted-foreground">{article.readTime}</span>
          </div>
          
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            {article.title}
          </h1>

          <div className="flex items-center justify-center gap-4">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
              <Image
                src={article.authorImage || "/placeholder.svg"}
                alt={article.author}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <p className="font-medium text-sm">{article.author}</p>
              <p className="text-muted-foreground text-xs">{article.date}</p>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative aspect-[21/9] mb-12 overflow-hidden bg-muted max-w-5xl mx-auto">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="max-w-2xl mx-auto">
          <div 
            className="prose prose-lg prose-headings:font-heading prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Share Buttons */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Share this article</p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare("twitter")}
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare("linkedin")}
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare("copy")}
                  aria-label="Copy link"
                >
                  <Link2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-8 p-6 bg-muted">
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-background shrink-0">
                <Image
                  src={article.authorImage || "/placeholder.svg"}
                  alt={article.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-heading font-semibold mb-1">{article.author}</p>
                <p className="text-muted-foreground text-sm">
                  Part of the Blank Space team, sharing insights and stories from Sierra Leone&apos;s creative community.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Inspired to create?</p>
            <Button asChild size="lg">
              <Link href="/contact">Book a Session</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

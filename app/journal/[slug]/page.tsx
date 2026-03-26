import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArticleContent } from "@/components/article-content"
import { FloatingBookButton } from "@/components/floating-book-button"
import type { Metadata } from "next"

const articles: Record<string, {
  title: string
  category: string
  excerpt: string
  content: string
  image: string
  author: string
  authorImage: string
  date: string
  readTime: string
}> = {
  "tar1k-interview": {
    title: "Finding Your Voice: A Conversation with tar1k",
    category: "Artist Spotlight",
    excerpt: "Sierra Leone's breakout artist shares his journey from bedroom producer to international stages.",
    content: `
      <p>When tar1k first walked into Blank Space three years ago, he was carrying a laptop full of beats and a head full of dreams. Today, he's one of Sierra Leone's most recognized musical voices, with millions of streams and a growing international following.</p>
      
      <p>We sat down with the artist to discuss his journey, creative process, and what's next for his career.</p>
      
      <h2>The Beginning</h2>
      
      <p>"I started making music in my bedroom when I was 15," tar1k recalls. "I had this old computer, some cracked software, and a USB microphone. The quality was terrible, but I didn't care. I just needed to express what I was feeling."</p>
      
      <p>His early work caught the attention of local DJs, leading to his first performances at small venues around Freetown. But it wasn't until he connected with Blank Space that his career truly took off.</p>
      
      <h2>Finding the Right Environment</h2>
      
      <p>"The studio changed everything for me," he explains. "Not just the equipment, though that was incredible. It was having a space where I could focus entirely on the music. No power cuts, no distractions. Just pure creativity."</p>
      
      <p>His debut album, recorded entirely at Blank Space, earned critical acclaim and established him as a serious artist in the Afrobeats scene.</p>
      
      <h2>Looking Forward</h2>
      
      <p>With a European tour on the horizon and collaborations with international artists in the works, tar1k shows no signs of slowing down. But he remains grounded in his roots.</p>
      
      <p>"Sierra Leone is my home. No matter how big things get, I'll always come back here. This is where my story started, and Blank Space is a big part of that story."</p>
    `,
    image: "/ad79ed2ac71a0fecb65425f4acccc4ae.jpg",
    author: "Amara Koroma",
    authorImage: "/0eb14988cda007dd63b35be6d5020dc6.jpg",
    date: "January 15, 2024",
    readTime: "8 min read",
  },
  "home-recording-tips": {
    title: "5 Tips for Better Home Recordings",
    category: "Creative Tips",
    excerpt: "Professional recording doesn't always require a studio. Here are essential techniques to improve your home setup.",
    content: `
      <p>While professional studios offer unmatched quality, there's a lot you can do to improve your home recordings. Here are five essential tips from our studio engineers.</p>
      
      <h2>1. Treat Your Space</h2>
      
      <p>Sound treatment doesn't have to be expensive. Hang blankets on walls, use bookshelves as diffusers, and record in smaller spaces to minimize reverb. The goal is to capture a clean, dry signal that you can process later.</p>
      
      <h2>2. Invest in a Good Microphone</h2>
      
      <p>Your microphone is the first link in the audio chain. A quality condenser microphone in the $200-400 range can produce results that compete with much more expensive options.</p>
      
      <h2>3. Mind Your Gain Staging</h2>
      
      <p>Record at appropriate levels – aim for peaks around -12dB to -6dB. This gives you headroom for processing while maintaining a healthy signal-to-noise ratio.</p>
      
      <h2>4. Use a Pop Filter</h2>
      
      <p>A simple pop filter eliminates plosives (those harsh 'P' and 'B' sounds) and helps maintain consistent distance from the microphone.</p>
      
      <h2>5. Record Multiple Takes</h2>
      
      <p>Don't settle for "good enough." Record multiple takes and comp together the best parts. This is how professional records are made.</p>
      
      <p>Of course, when you're ready to take your sound to the next level, our doors are always open. Book a session and experience the difference professional equipment and environment can make.</p>
    `,
    image: "/bs-studio-room.jpeg",
    author: "Ibrahim Sesay",
    authorImage: "/f14281875b7b16d18596fab170cd9b29.jpg",
    date: "January 10, 2024",
    readTime: "5 min read",
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = articles[slug]

  if (!article) {
    return { title: "Article Not Found | Blank Space" }
  }

  return {
    title: `${article.title} | Blank Space Journal`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles[slug]

  if (!article) {
    return (
      <main>
        <Navigation />
        <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground">The article you&apos;re looking for doesn&apos;t exist.</p>
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
        <ArticleContent article={article} />
      </div>
      <Footer />
      <FloatingBookButton />
    </main>
  )
}

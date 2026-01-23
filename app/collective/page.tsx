import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TeamGrid } from "@/components/team-grid"
import { FloatingBookButton } from "@/components/floating-book-button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "The Collective | Blank Space - Our Team",
  description: "Meet the creative minds behind Blank Space - artists, producers, designers, and collaborators shaping Sierra Leone's creative industry.",
}

export default function CollectivePage() {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <TeamGrid />
      </div>
      <Footer />
      <FloatingBookButton />
    </main>
  )
}

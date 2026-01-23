import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { JournalGrid } from "@/components/journal-grid"
import { FloatingBookButton } from "@/components/floating-book-button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Journal | Blank Space - Artist Spotlights & Creative Tips",
  description: "Discover artist spotlights, creative tips, behind-the-scenes stories, and industry insights from Freetown's creative community.",
}

export default function JournalPage() {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <JournalGrid />
      </div>
      <Footer />
      <FloatingBookButton />
    </main>
  )
}

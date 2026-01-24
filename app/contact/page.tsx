import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContactForms } from "@/components/contact-forms"
import type { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Contact & Booking | Blank Space",
  description: "Book studio time, inquire about services, or start a creative project with Blank Space in Freetown, Sierra Leone.",
}

export default function ContactPage() {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <Suspense fallback={<div className="container mx-auto px-4 py-24 text-center">Loading...</div>}>
          <ContactForms />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}

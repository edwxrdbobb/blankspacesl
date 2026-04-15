import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | Blank Space",
  description: "Privacy policy for Blank Space website visitors, clients, and event attendees.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-4">Privacy Policy</p>
          <h1 className="font-heading text-4xl md:text-5xl leading-tight mb-6">How Blank Space handles your information</h1>
          <p className="text-foreground/70 text-base md:text-lg leading-relaxed mb-12 max-w-3xl">
            This policy explains what information we collect through our website, contact forms, newsletter signups,
            bookings, and event RSVPs, and how we use that information to operate Blank Space.
          </p>

          <div className="space-y-10 text-sm md:text-base leading-7 text-foreground/80">
            <section>
              <h2 className="font-heading text-2xl text-foreground mb-3">Information We Collect</h2>
              <p>
                We may collect your name, email address, phone number, organization details, event RSVP details,
                guest information you provide, and any other information you choose to submit through our forms.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-3">How We Use It</h2>
              <p>
                We use submitted information to respond to inquiries, manage bookings, confirm RSVPs, communicate event
                details, send requested updates, and improve our services and website experience.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-3">Marketing Communications</h2>
              <p>
                If you opt in to updates, we may send you news about Blank Space activations, projects, services, and
                events. You can opt out of these communications at any time by contacting us directly.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-3">Data Sharing</h2>
              <p>
                We do not sell your personal information. We may share data with service providers that support our
                website, communications, bookings, payments, or event operations, only to the extent necessary for them
                to perform those services.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-3">Data Retention</h2>
              <p>
                We keep personal information only as long as needed for the purpose it was collected, including business,
                legal, operational, and event-management needs.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-3">Your Rights</h2>
              <p>
                You may request access to, correction of, or deletion of your information by contacting us at{" "}
                <a className="underline underline-offset-4" href="mailto:info@blankspacesl.com">info@blankspacesl.com</a>.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-3">Updates</h2>
              <p>
                We may update this policy from time to time. Continued use of the website after changes are published
                means you accept the revised policy.
              </p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

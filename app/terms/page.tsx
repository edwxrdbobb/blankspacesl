import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms of Service | Blank Space",
  description: "Terms of service for using the Blank Space website and related services.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-4">Terms of Service</p>
          <h1 className="font-heading text-4xl md:text-5xl leading-tight mb-6">Terms for using Blank Space</h1>
          <p className="text-foreground/70 text-base md:text-lg leading-relaxed mb-12 max-w-3xl">
            These terms govern your use of the Blank Space website, inquiries, bookings, event RSVPs, and related
            communications. By using the site, you agree to these terms.
          </p>

          <div className="space-y-10 text-sm md:text-base leading-7 text-foreground/80">
            <section>
              <h2 className="font-heading text-2xl text-foreground mb-3">Use of the Website</h2>
              <p>
                You agree to use this website lawfully and not to interfere with its operation, attempt unauthorized
                access, or submit false, misleading, or abusive information through any form or booking channel.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-3">Bookings and RSVPs</h2>
              <p>
                Submitting a booking request or RSVP does not guarantee acceptance unless confirmed by Blank Space.
                Event access, reservations, and service availability may be limited, adjusted, or declined at our
                discretion.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-3">Content and Intellectual Property</h2>
              <p>
                All website content, branding, copy, imagery, and creative materials on this site belong to Blank Space
                or its licensors unless otherwise stated. You may not reuse or reproduce them without permission.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-3">Third-Party Services</h2>
              <p>
                Some website functions may rely on third-party tools or platforms. We are not responsible for outages,
                delays, or policy changes introduced by those external services.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-3">Limitation of Liability</h2>
              <p>
                Blank Space provides this website on an as-available basis. To the fullest extent permitted by law, we
                are not liable for indirect, incidental, or consequential losses arising from use of the website or
                reliance on its content.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-3">Changes to These Terms</h2>
              <p>
                We may revise these terms at any time by updating this page. Continued use of the site after changes are
                posted means you accept the revised terms.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl text-foreground mb-3">Contact</h2>
              <p>
                Questions about these terms can be sent to{" "}
                <a className="underline underline-offset-4" href="mailto:info@blankspacesl.com">info@blankspacesl.com</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

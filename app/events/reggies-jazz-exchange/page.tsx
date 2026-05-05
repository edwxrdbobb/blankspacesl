import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Calendar, MapPin, Clock, Ticket, Images } from "lucide-react"
import { Prata, Inter, Caveat } from "next/font/google"

const prata = Prata({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({ subsets: ['latin'] })
const caveat = Caveat({ subsets: ['latin'] })

const eventDetails = [
  { icon: Calendar, label: "Date", value: "Thursday, April 30th, 2026" },
  { icon: Clock, label: "Time", value: "7:00 PM" },
  { icon: MapPin, label: "Venue", value: "Dove's Nest" },
  { icon: Ticket, label: "Dress Code", value: "Afro Chic (Comfortable, Simple)" },
]

export default function ReggiesJazzExchangePage() {
  return (
    <main className={`bg-[#fdfaf3] selection:bg-[#f37335]/30 ${inter.className} min-h-screen`}>
      <Navigation />

      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] mix-blend-multiply"
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/paper-fibers.png")` }} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column */}
            <div className="max-w-xl">

              {/* Post-event badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a1a1a]/8 border border-[#1a1a1a]/10 text-[#1a1a1a]/60 text-xs font-bold uppercase tracking-[0.2em] mb-8">
                <span className="w-2 h-2 rounded-full bg-[#00aed9]" />
                April 30th, 2026 · It happened.
              </div>

              <h1 className={`${prata.className} text-5xl md:text-6xl lg:text-8xl font-normal mb-8 leading-[1.1] tracking-tight text-[#1a1a1a]`}>
                Reggie&apos;s <span className="text-[#f37335] italic">Jazz</span> <br />
                <span className="text-[#00aed9]">Exchange</span>
              </h1>

              <div className="space-y-8 text-lg text-[#4a4a4a] leading-relaxed mb-10">
                <p className={`${prata.className} text-2xl text-[#1a1a1a] italic border-l-4 border-[#f37335] pl-6 py-2`}>
                  &quot;On International Jazz Day every year, the world speaks one language. And this year, Salone is joining the conversation.&quot;
                </p>
                <p className="font-medium opacity-80">
                  At the heart of this dialogue is Reginald Thompson (affectionately known in the industry as Bizzup) — a virtuoso multi-instrumentalist and a cornerstone of the Sierra Leonean Jazz scene.
                </p>
                <p className="font-medium opacity-80">
                  Reggie&apos;s Jazz Exchange was an acknowledgement of the rhythm that has always lived in our coast. Thank you to everyone who came, listened, and felt it.
                </p>
              </div>

              {/* Gallery CTA */}
              <Link
                href="/events/reggies-jazz-exchange/gallery"
                className="group inline-flex items-center gap-3 bg-[#1a1a1a] text-[#fdfaf3] rounded-2xl px-6 py-4 mb-10 hover:bg-[#f37335] transition-colors duration-300"
              >
                <Images className="h-5 w-5 shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-[#fdfaf3]/50 group-hover:text-[#fdfaf3]/70 uppercase tracking-widest font-bold mb-0.5">Photos from the night</p>
                  <p className={`${prata.className} text-base leading-tight`}>View the Gallery →</p>
                </div>
              </Link>

              {/* Event Details Grid */}
              <div className="grid sm:grid-cols-2 gap-px bg-[#1a1a1a]/10 border border-[#1a1a1a]/10 rounded-2xl overflow-hidden shadow-sm">
                {eventDetails.map((detail) => (
                  <div key={detail.label} className="bg-[#fdfaf3]/50 p-6 flex items-start gap-4">
                    <detail.icon className="h-5 w-5 text-[#f37335] mt-1 shrink-0" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#4a4a4a]/60 font-bold mb-1">{detail.label}</p>
                      <p className={`${prata.className} text-base text-[#1a1a1a] leading-tight`}>{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="space-y-12 relative">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#00aed9]/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#f37335]/10 rounded-full blur-3xl -z-10" />

              <Link href="/events/reggies-jazz-exchange/gallery">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] transform -rotate-3 hover:rotate-0 transition-all duration-1000 group cursor-pointer">
                  <Image
                    src="https://res.cloudinary.com/dhixhto9s/image/upload/v1777919034/blankspace/reggies-gallery/reggies-gallery-whatsapp-image-2026-05-04-at-00-50-23.jpg"
                    alt="Reggie's Jazz Exchange — Live"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white/70 text-xs uppercase tracking-widest font-bold mb-1">April 30th · Dove&apos;s Nest</p>
                    <p className={`${prata.className} text-white text-xl`}>See all photos →</p>
                  </div>
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Banner */}
      <section className="py-16 bg-[#1a1a1a] text-[#fdfaf3] overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
             style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/paper-fibers.png")` }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className={`${caveat.className} text-5xl md:text-6xl text-[#f37335] mb-6 rotate-[-2deg]`}>
              Thank you for coming
            </h2>
            <div className="h-px w-24 bg-[#00aed9]/30 mx-auto mb-6" />
            <p className="text-[#fdfaf3]/50 text-sm leading-relaxed max-w-xl mx-auto mb-8">
              Salone spoke in rhythm on April 30th. We are grateful for every person who showed up and made it what it was.
            </p>
            <Link
              href="/events/reggies-jazz-exchange/gallery"
              className="inline-flex items-center gap-2 text-[#00aed9] hover:text-[#f37335] transition-colors text-sm font-semibold uppercase tracking-widest"
            >
              <Images className="h-4 w-4" />
              Browse the Gallery
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

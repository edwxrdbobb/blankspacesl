import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { EventRSVPForm } from "@/components/event-rsvp-form"
import { Calendar, MapPin, Clock, Ticket, Phone, Info } from "lucide-react"
import type { Metadata } from "next"
import { Prata, Inter } from "next/font/google"

const prata = Prata({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Reggie's Jazz Exchange | Blank Space Events",
  description: "Join us for International Jazz Day on April 30th with Reginald Thompson and Freetown's finest musicians.",
}

const eventDetails = [
  { icon: Calendar, label: "Date", value: "30th April, 2026" },
  { icon: Clock, label: "Time", value: "Doors Open: 7:00 PM" },
  { icon: MapPin, label: "Venue", value: "Dove's Nest, Grammar School Jct." },
  { icon: Ticket, label: "Entry", value: "Le. 500 (Standard Entry)" },
  { icon: Phone, label: "Enquiries", value: "074464034 / 079871267" },
]

export default function RejgiesJazzExchangePage() {
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
            {/* Left Column - Content */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f37335]/10 border border-[#f37335]/20 text-[#f37335] text-xs font-bold uppercase tracking-[0.2em] mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f37335] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f37335]"></span>
                </span>
                Upcoming Event
              </div>
              
              <h1 className={`${prata.className} text-5xl md:text-6xl lg:text-8xl font-normal mb-8 leading-[1.1] tracking-tight text-[#1a1a1a]`}>
                Reggie&apos;s <span className="text-[#f37335] italic">Jazz</span> <br />
                <span className="text-[#00aed9]">Exchange</span>
              </h1>
              
              <div className="space-y-8 text-lg text-[#4a4a4a] leading-relaxed mb-12">
                <p className={`${prata.className} text-2xl text-[#1a1a1a] italic border-l-4 border-[#f37335] pl-6 py-2`}>
                  &quot;Dis wan na for di people dem way sabi fine tin. Reggie’s Jazz Exchange is a cultural moment.&quot;
                </p>
                <p className="font-medium opacity-80">
                  On the 30th of April, Freetown joins the global stage for International Jazz Day. 
                  Led by none other than Reginald &ldquo;Bizzup&rdquo; Thompson and his saxophone. 
                  Come experience a concert like no other - our best musicians in their element.
                </p>
              </div>

              {/* Event Details Grid - Retro Style */}
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

            {/* Right Column - Image & RSVP */}
            <div className="space-y-12 relative">
              {/* Decorative Elements */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#00aed9]/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#f37335]/10 rounded-full blur-3xl -z-10" />

              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] transform -rotate-3 hover:rotate-0 transition-all duration-1000 group">
                <Image
                  src="/Reggies.jpeg"
                  alt="Reggie's Jazz Exchange Flyer"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
              </div>

              <div id="rsvp" className="relative z-20 pt-4">
                <EventRSVPForm 
                  eventId="reggies-jazz-exchange-2026" 
                  eventName="Reggie's Jazz Exchange" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Banner - Retro Style */}
      <section className="py-16 bg-[#1a1a1a] text-[#fdfaf3] overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/paper-fibers.png")` }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <Info className="h-8 w-8 text-[#00aed9] mx-auto mb-6" />
            <h2 className={`${prata.className} text-3xl md:text-4xl mb-6`}>Limited spots available for this exclusive session.</h2>
            <div className="h-px w-24 bg-[#f37335] mx-auto mb-6" />
            <p className="text-[#fdfaf3]/60 uppercase tracking-[0.3em] text-xs font-bold">Secure your place now</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

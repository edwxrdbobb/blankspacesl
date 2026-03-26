import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { EventRSVPForm } from "@/components/event-rsvp-form"
import { Calendar, MapPin, Clock, Ticket, Phone, Info } from "lucide-react"
import type { Metadata } from "next"

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
    <main className="bg-background selection:bg-accent/30">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-10" />
          <Image
            src="/Reggies.jpeg"
            alt="Reggie playing saxophone"
            fill
            className="object-cover opacity-20 scale-110 blur-sm"
            priority
          />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Content */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Upcoming Event
              </div>
              
              <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight text-foreground">
                Reggie&apos;s <span className="text-accent italic font-serif">Jazz</span> Exchange
              </h1>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed mb-10">
                <p className="font-medium text-foreground italic border-l-4 border-accent pl-4">
                  &quot;Dis wan na for di people dem way sabi fine tin. Reggie’s Jazz Exchange is a cultural moment.&quot;
                </p>
                <p>
                  On the 30th of April, Freetown joins the global stage for International Jazz Day. 
                  Led by none other than Reginald &ldquo;Bizzup&rdquo; Thompson and his saxophone. 
                  Come experience a concert like no other - our best musicians in their element.
                </p>
              </div>

              {/* Event Details Grid */}
              <div className="grid sm:grid-cols-2 gap-6 p-8 bg-muted/30 border border-border/50 rounded-3xl backdrop-blur-sm">
                {eventDetails.map((detail) => (
                  <div key={detail.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-background border border-border/50 flex items-center justify-center shrink-0 shadow-sm">
                      <detail.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">{detail.label}</p>
                      <p className="text-sm font-bold text-foreground leading-snug">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Image & RSVP */}
            <div className="space-y-12">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 group ring-1 ring-border/50">
                <Image
                  src="/Reggies.jpeg"
                  alt="Reggie's Jazz Exchange Flyer"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div id="rsvp">
                <EventRSVPForm 
                  eventId="reggies-jazz-exchange-2026" 
                  eventName="Reggie's Jazz Exchange" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-12 bg-accent/5 border-y border-accent/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
            <div className="flex items-center gap-3">
              <Info className="h-6 w-6 text-accent" />
              <p className="text-lg font-medium">Limited spots available for this exclusive session.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

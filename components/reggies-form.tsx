'use client'

import Image from "next/image"
import { Prata, Inter, Caveat } from "next/font/google"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Loader2, CheckCircle2, Ticket } from "lucide-react"

const prata = Prata({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({ subsets: ['latin'] })
const caveat = Caveat({ subsets: ['latin'] })

interface TicketConfig {
  id: string;
  name: string;
  tableSize: number | null;
  bgColor: string;
  textColor: string;
  accentColor: string;
  accentColorHover: string;
  labelColor: string;
  inputBg: string;
  borderColor: string;
  focusRing: string;
  badge: string | null;
  script: string;
  mainTitle: string;
}

const ticketTypeConfig: Record<'stnd' | 'v1' | 'v2' | 'v3', TicketConfig> = {
  stnd: {
    id: 'stnd',
    name: "Standard Entry",
    tableSize: null,
    bgColor: "bg-[#1a1a1a]",
    textColor: "text-white",
    accentColor: "bg-[#f37335]",
    accentColorHover: "hover:bg-[#e56230]",
    labelColor: "text-[#a0a0a0]",
    inputBg: "bg-[#2a2a2a]",
    borderColor: "border-[#4a4a4a]",
     focusRing: "focus:ring-[#f37335]",
    badge: null,
    script: "Standard",
    mainTitle: "STANDARD ENTRY"
  },
  v1: {
    id: 'v1',
    name: "VIP Single",
    tableSize: null,
    bgColor: "bg-[#1a1a1a] border border-[#d4af37]/20",
    textColor: "text-white",
    accentColor: "bg-[#d4af37]",
    accentColorHover: "hover:bg-[#b8962e]",
    labelColor: "text-[#d4af37]",
    inputBg: "bg-[#1f1f1f]",
    borderColor: "border-[#3d3419]",
    focusRing: "focus:ring-[#d4af37]",
    badge: "VIP",
    script: "VIP",
    mainTitle: "VIP SINGLE ENTRY"
  },
  v2: {
    id: 'v2',
    name: "VIP Table of 4",
    tableSize: 3, 
    bgColor: "bg-[#1a1a1a] border-2 border-[#d4af37]/30",
    textColor: "text-white",
    accentColor: "bg-[#d4af37]",
    accentColorHover: "hover:bg-[#b8962e]",
    labelColor: "text-[#d4af37]",
    inputBg: "bg-[#1f1f1f]",
    borderColor: "border-[#3d3419]",
    focusRing: "focus:ring-[#d4af37]",
    badge: "VIP",
    script: "Table of 4",
    mainTitle: "VIP TABLE FOR 4"
  },
  v3: {
    id: 'v3',
    name: "VIP Table of 5",
    tableSize: 4, 
    bgColor: "bg-[#1a1a1a] border-4 border-[#d4af37]/40 shadow-[0_0_50px_-12px_rgba(212,175,55,0.2)]",
    textColor: "text-white",
    accentColor: "bg-[#d4af37]",
    accentColorHover: "hover:bg-[#b8962e]",
    labelColor: "text-[#d4af37]",
    inputBg: "bg-[#1f1f1f]",
    borderColor: "border-[#3d3419]",
    focusRing: "focus:ring-[#d4af37]",
    badge: "VIP",
    script: "Table of 5",
    mainTitle: "VIP TABLE FOR 5"
  },
}

export function ReggiesForm() {
  const searchParams = useSearchParams()
  const [ticketType, setTicketType] = useState<'stnd' | 'v1' | 'v2' | 'v3'>('stnd')
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  // Form State
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [community, setCommunity] = useState("The Vibe (Community, friend, general supporter)")
   const [affiliation, setAffiliation] = useState("")
  const [guests, setGuests] = useState<{name: string, phone: string}[]>([])
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)

  useEffect(() => {
    setMounted(true)
    const tt = searchParams.get('tt') as 'stnd' | 'v1' | 'v2' | 'v3' | null
    if (tt && ['stnd', 'v1', 'v2', 'v3'].includes(tt)) {
      setTicketType(tt)
    }
  }, [searchParams])

   const maxGuests = ticketType === 'v2' ? 3 : ticketType === 'v3' ? 4 : 0

  useEffect(() => {
    // Sync guest state with maxGuests
    setGuests(Array.from({ length: maxGuests }).map(() => ({ name: "", phone: "" })))
  }, [maxGuests])

  if (!mounted) return null

  const config = ticketTypeConfig[ticketType]

  const getTicketTypeDisplay = () => {
    const typeNames = {
      stnd: 'STANDARD',
      v1: 'VIP SINGLE ENTRY',
      v2: 'VIP TABLE FOR 4',
      v3: 'VIP TABLE FOR 5',
    }
    return typeNames[ticketType]
  }

  const handleGuestChange = (index: number, field: 'name' | 'phone', value: string) => {
    const newGuests = [...guests]
    newGuests[index] = { ...newGuests[index], [field]: value }
    setGuests(newGuests)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!acceptedTerms) {
      toast.error("Please accept the terms before submitting.")
      return
    }

    if (!fullName || !email) {
      toast.error("Name and Email are required.")
      return
    }

    setIsSubmitting(true)

    const submissionData = {
      eventId: "reggies-jazz-exchange",
      eventName: "Reggie's Jazz Exchange",
      name: fullName,
      email,
      phone,
      community,
       affiliation,
      ticketType: ticketTypeConfig[ticketType].name,
      guests: guests.filter(g => g.name.trim() !== ""), 
      acceptedTerms,
      marketingConsent
    }

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success("RSVP Confirmed! Check your email for details.")
        setIsSuccess(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        throw new Error(result.error || "Failed to submit RSVP")
      }
    } catch (error: any) {
      console.error("RSVP Error:", error)
      toast.error(error.message || "An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className={`${config.bgColor} rounded-3xl p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 -mr-32 -mt-32 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 config.accentColor/10 -ml-32 -mb-32 rounded-full blur-3xl" />
        
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-8 relative">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
          <div className="absolute inset-0 rounded-full border-4 border-green-500/30 animate-ping" />
        </div>
        
        <h2 className={`${prata.className} text-4xl text-white mb-6 relative z-10`}>
          You&apos;re on the list!
        </h2>
        
        <p className={`${config.labelColor} text-lg mb-10 max-w-sm relative z-10 font-medium`}>
          Thank you for joining <span className="text-white font-bold">Reggie&apos;s Jazz Exchange</span>. 
          A confirmation invitation has been sent to <span className="text-white">{email}</span>.
        </p>

        <button 
          onClick={() => setIsSuccess(false)}
          className={`relative z-10 flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-bold hover:bg-white/10 transition-all active:scale-95`}
        >
          <Ticket className="h-5 w-5 opacity-70" />
          RSVP for Another
        </button>
      </div>
    )
  }

   return (
    <div className="w-full">
    <div className={`${config.bgColor} rounded-3xl p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] transition-all duration-500`}>
      <div className="flex justify-between items-start mb-2">
        <p className={`${config.labelColor} text-xs uppercase tracking-[0.2em] font-bold`}>
          Ticket Type
        </p>
      </div>
      
      <div className="mb-6">
        <h2 className={`text-5xl md:text-6xl font-bold ${config.labelColor} leading-none`}>
          {config.mainTitle}
        </h2>
      </div>

      <h3 className={`${prata.className} text-4xl ${config.textColor} mb-4`}>
        Join the Exchange
      </h3>
      <p className={`${config.labelColor} text-sm mb-8 opacity-75 leading-relaxed`}>Please complete the form below to secure your spot in the space.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="full-name" className={`block ${config.labelColor} text-sm font-medium mb-1`}>Full Name *</label>
          <input 
            type="text" 
            id="full-name" 
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`w-full ${config.inputBg} border ${config.borderColor} rounded-md px-4 py-2 text-white placeholder-[#7a7a7a] ${config.focusRing} focus:outline-none focus:ring-2 transition-all`} 
            placeholder="Your name" 
          />
        </div>
        <div>
          <label htmlFor="affiliation" className={`block ${config.labelColor} text-sm font-medium mb-1`}>Organization</label>
           <input 
            type="text" 
            id="affiliation" 
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            className={`w-full ${config.inputBg} border ${config.borderColor} rounded-md px-4 py-2 text-white placeholder-[#7a7a7a] ${config.focusRing} focus:outline-none focus:ring-2 transition-all`} 
            placeholder="Office, Brand, Organisation" 
          />
        </div>

        <div>
          <label htmlFor="community" className={`block ${config.labelColor} text-sm font-medium mb-1`}>Community</label>
           <select 
            id="community" 
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
            className={`w-full ${config.inputBg} border ${config.borderColor} rounded-md px-4 py-3 text-white ${config.focusRing} focus:outline-none focus:ring-2 transition-all cursor-pointer`}
          >
            <option>The Vibe (Community, Friend, General)</option>
            <option>The Maker (Artist, Designer, Musician)</option>
            <option>The Storyteller (Media, Press)</option>
            <option>The Enabler (Patron, Investor, Sponsor)</option>
          </select>
        </div>

        {/* Guest Details for Table Tickets */}
        {maxGuests > 0 && (
          <div className={`border-t ${config.borderColor} pt-6 mt-6 animate-in fade-in slide-in-from-top-4 duration-500`}>
            <h4 className={`text-lg font-semibold ${config.labelColor} mb-4`}>Guest Details</h4>
            <div className="space-y-4">
              {guests.map((guest, index) => (
                <div key={index} className={`p-4 rounded-md border ${config.borderColor} bg-opacity-50 ${config.inputBg} transition-all`}>
                  <p className={`text-xs font-medium ${config.labelColor} mb-2 opacity-75`}>Guest {index + 1}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`guest-name-${index}`} className={`block ${config.labelColor} text-xs font-medium mb-1`}>Name</label>
                      <input 
                        type="text" 
                        id={`guest-name-${index}`}
                        value={guest.name}
                        onChange={(e) => handleGuestChange(index, 'name', e.target.value)}
                        className={`w-full ${config.inputBg} border ${config.borderColor} rounded-md px-3 py-2 text-white placeholder-[#7a7a7a] text-sm ${config.focusRing} focus:outline-none focus:ring-2 transition-all`} 
                        placeholder="Guest name" 
                      />
                    </div>
                    <div>
                      <label htmlFor={`guest-phone-${index}`} className={`block ${config.labelColor} text-xs font-medium mb-1`}>Phone</label>
                      <input 
                        type="tel" 
                        id={`guest-phone-${index}`}
                        value={guest.phone}
                        onChange={(e) => handleGuestChange(index, 'phone', e.target.value)}
                        className={`w-full ${config.inputBg} border ${config.borderColor} rounded-md px-3 py-2 text-white placeholder-[#7a7a7a] text-sm ${config.focusRing} focus:outline-none focus:ring-2 transition-all`} 
                        placeholder="Guest phone" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label htmlFor="phone" className={`block ${config.labelColor} text-sm font-medium mb-1`}>Phone</label>
          <input 
            type="tel" 
            id="phone" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full ${config.inputBg} border ${config.borderColor} rounded-md px-4 py-2 text-white placeholder-[#7a7a7a] ${config.focusRing} focus:outline-none focus:ring-2 transition-all`} 
            placeholder="+232 XX XXX XXX" 
          />
        </div>

        <div>
          <label htmlFor="email" className={`block ${config.labelColor} text-sm font-medium mb-1`}>Email *</label>
          <input 
            type="email" 
            id="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full ${config.inputBg} border ${config.borderColor} rounded-md px-4 py-2 text-white placeholder-[#7a7a7a] ${config.focusRing} focus:outline-none focus:ring-2 transition-all`} 
            placeholder="your@email.com" 
          />
        </div>

       <div className="pt-4 border-t border-white/5 mt-4">
        <div className="">
          <div className="flex items-start mb-4">
            <input
              type="checkbox"
              id="accepted-terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className={`mt-1 h-4 w-4 rounded border-[#4a4a4a] text-[#f37335] focus:ring-[#f37335] cursor-pointer`}
            />
            <label htmlFor="accepted-terms" className={`ml-3 text-sm ${config.labelColor} cursor-pointer select-none leading-tight`}>
              I accept that by honoring this invitation, I confirm my willingness to have a good time on a beautiful Friday night in Freetown.
            </label>
          </div>

          <div className="flex items-start mt-2">
            <input 
              type="checkbox" 
              id="marketing-consent" 
              checked={marketingConsent}
              onChange={(e) => setMarketingConsent(e.target.checked)}
              className={`mt-1 h-4 w-4 rounded border-[#4a4a4a] text-[#f37335] focus:ring-[#f37335] cursor-pointer`} 
            />
            <label htmlFor="marketing-consent" className={`ml-3 text-sm ${config.labelColor} cursor-pointer select-none leading-tight`}>
              Keep me updated on future Blank Space activations and creative projects (Optional)
            </label>
          </div>
        </div>
      </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full ${config.accentColor} ${config.accentColorHover} text-black font-bold py-4 px-6 rounded-md transition-all duration-200 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>Submit RSVP</>
          )}
        </button>
       </form>
    </div>

     </div>
  )
}

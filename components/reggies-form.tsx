'use client'

import Image from "next/image"
import { Prata, Inter } from "next/font/google"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

const prata = Prata({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({ subsets: ['latin'] })

const ticketTypeConfig = {
  stnd: {
    name: "Standard",
    tableSize: null,
    bgColor: "bg-[#1a1a1a]",
    textColor: "text-white",
    accentColor: "bg-[#f37335]",
    accentColorHover: "hover:bg-[#e56230]",
    labelColor: "text-[#a0a0a0]",
    inputBg: "bg-[#2a2a2a]",
    borderColor: "border-[#4a4a4a]",
    focusRing: "focus:ring-[#f37335]",
  },
  v1: {
    name: "VIP Gold",
    tableSize: 'single',
    bgColor: "bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]",
    textColor: "text-white",
    accentColor: "bg-gradient-to-r from-[#d4af37] to-[#f4d03f]",
    accentColorHover: "hover:from-[#c9a227] hover:to-[#e6c200]",
    labelColor: "text-[#d4af37]",
    inputBg: "bg-[#2a2a2a] border-l-2 border-l-[#d4af37]",
    borderColor: "border-[#d4af37]",
    focusRing: "focus:ring-[#d4af37]",
  },
  v2: {
    name: "VIP Diamond",
    tableSize: 4,
    bgColor: "bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]",
    textColor: "text-white",
    accentColor: "bg-gradient-to-r from-[#e8e8e8] to-[#ffffff]",
    accentColorHover: "hover:from-[#d0d0d0] hover:to-[#f0f0f0]",
    labelColor: "text-[#e8e8e8]",
    inputBg: "bg-[#2a2a2a] border-l-2 border-l-[#e8e8e8]",
    borderColor: "border-[#e8e8e8]",
    focusRing: "focus:ring-[#e8e8e8]",
  },
  v3: {
    name: "VIP Platinum",
    tableSize: 5,
    bgColor: "bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]",
    textColor: "text-white",
    accentColor: "bg-gradient-to-r from-[#c0c0c0] via-[#d4af37] to-[#e8e8e8]",
    accentColorHover: "hover:from-[#a0a0a0] hover:via-[#c9a227] hover:to-[#d0d0d0]",
    labelColor: "text-[#c0c0c0]",
    inputBg: "bg-[#2a2a2a] border-l-2 border-l-[#c0c0c0]",
    borderColor: "border-[#c0c0c0]",
    focusRing: "focus:ring-[#d4af37]",
  },
}

export function ReggiesForm() {
  const searchParams = useSearchParams()
  const [ticketType, setTicketType] = useState<'stnd' | 'v1' | 'v2' | 'v3'>('stnd')
  const [mounted, setMounted] = useState(false)
  const [guestCount, setGuestCount] = useState<number>(0)

  useEffect(() => {
    setMounted(true)
    const tt = searchParams.get('tt') as 'stnd' | 'v1' | 'v2' | 'v3' | null
    if (tt && ['stnd', 'v1', 'v2', 'v3'].includes(tt)) {
      setTicketType(tt)
    }
  }, [searchParams])

  if (!mounted) return null

  const config = ticketTypeConfig[ticketType]

  const getTicketTypeDisplay = () => {
    const typeNames = {
      stnd: 'STANDARD',
      v1: 'SINGLE ENTRY',
      v2: 'VIP TABLE FOR 4',
      v3: 'VIP TABLE FOR 5',
    }
    return typeNames[ticketType]
  }

  const maxGuests = ticketType === 'v2' ? 4 : ticketType === 'v3' ? 5 : 0

  return (
    <div className={`${config.bgColor} rounded-3xl p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)]`}>
      <p className={`${config.labelColor} text-xs uppercase tracking-[0.2em] font-bold mb-2`}>
        Ticket Type
      </p>
      <h2 className={`text-5xl md:text-6xl font-bold ${config.labelColor} mb-6`}>
        {getTicketTypeDisplay()}
      </h2>
      <h3 className={`${prata.className} text-4xl ${config.textColor} mb-4`}>
        Join the Exchange
      </h3>
      <p className={`${config.labelColor} text-sm mb-6 opacity-75`}>Please complete the form below to secure your spot in the space.</p>

      <form className="space-y-4">
        <div>
          <label htmlFor="full-name" className={`block ${config.labelColor} text-sm font-medium mb-1`}>Full Name</label>
          <input 
            type="text" 
            id="full-name" 
            className={`w-full ${config.inputBg} border ${config.borderColor} rounded-md px-4 py-2 text-white placeholder-[#7a7a7a] ${config.focusRing} focus:outline-none focus:ring-2`} 
            placeholder="" 
          />
        </div>
        <div>
          <label htmlFor="email" className={`block ${config.labelColor} text-sm font-medium mb-1`}>Email</label>
          <input 
            type="email" 
            id="email" 
            className={`w-full ${config.inputBg} border ${config.borderColor} rounded-md px-4 py-2 text-white placeholder-[#7a7a7a] ${config.focusRing} focus:outline-none focus:ring-2`} 
            placeholder="" 
          />
        </div>
        <div>
          <label htmlFor="phone" className={`block ${config.labelColor} text-sm font-medium mb-1`}>Phone</label>
          <input 
            type="tel" 
            id="phone" 
            className={`w-full ${config.inputBg} border ${config.borderColor} rounded-md px-4 py-2 text-white placeholder-[#7a7a7a] ${config.focusRing} focus:outline-none focus:ring-2`} 
            placeholder="" 
          />
        </div>
        <div>
          <label htmlFor="community" className={`block ${config.labelColor} text-sm font-medium mb-1`}>Community</label>
          <select 
            id="community" 
            className={`w-full ${config.inputBg} border ${config.borderColor} rounded-md px-4 py-2 text-white ${config.focusRing} focus:outline-none focus:ring-2`}
          >
            <option>The Vibe (Community, friend, general supporter)</option>
            <option>The Maker (Fellow artists, designers, musicians)</option>
            <option>The Storyteller (Media, journalists, press)</option>
            <option>The Enabler (Patrons, investors, executives, sponsors)</option>
          </select>
        </div>
        <div>
          <label htmlFor="affiliation" className={`block ${config.labelColor} text-sm font-medium mb-1`}>Affiliation</label>
          <input 
            type="text" 
            id="affiliation" 
            className={`w-full ${config.inputBg} border ${config.borderColor} rounded-md px-4 py-2 text-white placeholder-[#7a7a7a] ${config.focusRing} focus:outline-none focus:ring-2`} 
            placeholder="Office, Brand, Organisation" 
          />
        </div>

        {/* Guest Details for Table Tickets */}
        {maxGuests > 0 && (
          <div className={`border-t ${config.borderColor} pt-6 mt-6`}>
            <h4 className={`text-lg font-semibold ${config.labelColor} mb-4`}>Guest Details (Max {maxGuests})</h4>
            <div className="space-y-4">
              {Array.from({ length: maxGuests }).map((_, index) => (
                <div key={index} className={`p-4 rounded-md border ${config.borderColor} bg-opacity-50 ${config.inputBg}`}>
                  <p className={`text-xs font-medium ${config.labelColor} mb-2 opacity-75`}>Guest {index + 1}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`guest-name-${index}`} className={`block ${config.labelColor} text-xs font-medium mb-1`}>Name</label>
                      <input 
                        type="text" 
                        id={`guest-name-${index}`}
                        className={`w-full ${config.inputBg} border ${config.borderColor} rounded-md px-3 py-2 text-white placeholder-[#7a7a7a] text-sm ${config.focusRing} focus:outline-none focus:ring-2`} 
                        placeholder="Guest name" 
                      />
                    </div>
                    <div>
                      <label htmlFor={`guest-phone-${index}`} className={`block ${config.labelColor} text-xs font-medium mb-1`}>Phone</label>
                      <input 
                        type="tel" 
                        id={`guest-phone-${index}`}
                        className={`w-full ${config.inputBg} border ${config.borderColor} rounded-md px-3 py-2 text-white placeholder-[#7a7a7a] text-sm ${config.focusRing} focus:outline-none focus:ring-2`} 
                        placeholder="Guest phone" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-start">
          <input 
            type="checkbox" 
            id="accept-terms" 
            className={`mt-1 h-4 w-4 ${config.accentColor} rounded border-[#4a4a4a] ${config.focusRing}`} 
          />
          <label htmlFor="accept-terms" className={`ml-2 text-sm ${config.labelColor}`}>
            I accept that by honoring this invitation, I confirm my willingness to have a good time on a beautiful Thursday night in Freetown.
          </label>
        </div>
        <button 
          type="submit" 
          className={`w-full ${config.accentColor} ${config.accentColorHover} text-black font-bold py-3 px-6 rounded-md transition-all duration-200`}
        >
          Submit RSVP
        </button>
      </form>
    </div>
  )
}

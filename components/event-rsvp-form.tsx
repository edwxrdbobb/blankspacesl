"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react"
import { Prata } from "next/font/google"

const prata = Prata({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

import { toast } from "sonner"

interface EventRSVPFormProps {
  eventId: string
  eventName: string
}

export function EventRSVPForm({ eventId, eventName }: EventRSVPFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailDelivered, setEmailDelivered] = useState(true)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      eventId,
      eventName,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    }

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) throw new Error(result.error || "Failed to submit RSVP")

      setEmailDelivered(result.emailDelivered !== false)
      if (result.emailDelivered === false) {
        toast.warning("RSVP saved, but the confirmation email could not be sent.")
      } else {
        toast.success("RSVP Confirmed! See you there.")
      }
      setIsSubmitted(true)
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-[#fdfaf3] border-2 border-[#1a1a1a] p-10 rounded-2xl text-center shadow-[8px_8px_0_0_#f37335]">
        <div className="w-16 h-16 bg-[#00aed9]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-8 w-8 text-[#00aed9]" />
        </div>
        <h3 className={`${prata.className} text-3xl font-normal mb-4 text-[#1a1a1a]`}>You&apos;re on the list!</h3>
        <p className="text-[#4a4a4a] mb-8 leading-relaxed">
          Thank you for RSVPing for <span className="font-bold">{eventName}</span>.{" "}
          {emailDelivered
            ? "We've sent a confirmation to your email. See you there!"
            : "Your RSVP is saved, but the confirmation email could not be delivered right now."}
        </p>
        <Button 
          variant="outline" 
          onClick={() => setIsSubmitted(false)} 
          className="rounded-none border-2 border-[#1a1a1a] px-8 py-6 uppercase tracking-widest text-xs font-bold hover:bg-[#1a1a1a] hover:text-[#fdfaf3] transition-colors"
        >
          RSVP For Another
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-[#fdfaf3] border-2 border-[#1a1a1a] p-10 rounded-2xl shadow-[12px_12px_0_0_#1a1a1a] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00aed9]/5 -mr-16 -mt-16 rounded-full" />
      
      <h3 className={`${prata.className} text-3xl font-normal mb-8 text-[#1a1a1a] relative z-10`}>RSVP for the Event</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-[#4a4a4a]">Full Name *</Label>
          <Input 
            id="name" 
            name="name" 
            required 
            placeholder="John Doe" 
            className="bg-transparent border-0 border-b-2 border-[#1a1a1a]/20 focus:border-[#f37335] rounded-none px-0 shadow-none text-lg placeholder:text-[#1a1a1a]/20" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-[#4a4a4a]">Email Address *</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            required 
            placeholder="john@example.com" 
            className="bg-transparent border-0 border-b-2 border-[#1a1a1a]/20 focus:border-[#f37335] rounded-none px-0 shadow-none text-lg placeholder:text-[#1a1a1a]/20" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-[#4a4a4a]">Phone Number</Label>
          <Input 
            id="phone" 
            name="phone" 
            type="tel" 
            placeholder="+232 XX XXX XXX" 
            className="bg-transparent border-0 border-b-2 border-[#1a1a1a]/20 focus:border-[#f37335] rounded-none px-0 shadow-none text-lg placeholder:text-[#1a1a1a]/20" 
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full h-14 bg-[#1a1a1a] text-[#fdfaf3] hover:bg-[#f37335] rounded-none text-sm uppercase tracking-[0.3em] font-bold shadow-lg shadow-[#1a1a1a]/20 transition-all active:scale-[0.98] mt-4"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Confirm My Attendance
              <ArrowRight className="ml-3 h-5 w-5" />
            </>
          )}
        </Button>
        <p className="text-[10px] text-center text-[#4a4a4a]/60 uppercase tracking-widest font-bold mt-6">
          Limited space available. RSVP closes soon.
        </p>
      </form>
    </div>
  )
}

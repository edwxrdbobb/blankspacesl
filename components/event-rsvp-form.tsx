"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react"

interface EventRSVPFormProps {
  eventId: string
  eventName: string
}

export function EventRSVPForm({ eventId, eventName }: EventRSVPFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      eventId,
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

      if (!res.ok) throw new Error("Failed to submit RSVP")
      setIsSubmitted(true)
    } catch (err) {
      setError("Something went wrong. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-background/80 backdrop-blur-sm border border-accent/20 p-8 rounded-3xl text-center shadow-2xl shadow-accent/5">
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-8 w-8 text-accent" />
        </div>
        <h3 className="font-heading text-2xl font-bold mb-3 text-foreground">You&apos;re on the list!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for RSVPing for {eventName}. We&apos;ve sent a confirmation to your email. See you there!
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)} className="rounded-full">
          RSVP Another Person
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-background/60 backdrop-blur-md border border-border/50 p-8 rounded-3xl shadow-2xl shadow-foreground/5">
      <h3 className="font-heading text-2xl font-bold mb-6 text-foreground text-center sm:text-left">RSVP for the Event</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-semibold">Full Name *</Label>
          <Input id="name" name="name" required placeholder="John Doe" className="bg-background/50 border-border/50 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold">Email Address *</Label>
          <Input id="email" name="email" type="email" required placeholder="john@example.com" className="bg-background/50 border-border/50 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-semibold">Phone Number</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+232 XX XXX XXX" className="bg-background/50 border-border/50 rounded-xl" />
        </div>
        
        {error && <p className="text-sm text-destructive font-medium">{error}</p>}
        
        <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-xl text-lg font-semibold shadow-lg shadow-foreground/10 group transition-all active:scale-[0.98]">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Confirm My Attendance
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
        <p className="text-[10px] text-center text-muted-foreground mt-4 italic">
          * Your information is only used for event management and will not be shared.
        </p>
      </form>
    </div>
  )
}

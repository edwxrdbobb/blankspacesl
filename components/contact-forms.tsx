"use client"

import React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Mail, MapPin, Phone, CheckCircle2, ArrowRight } from "lucide-react"

type FormType = "artist" | "corporate"

export function ContactForms() {
  const searchParams = useSearchParams()
  const serviceParam = searchParams.get("service")
  const typeParam = searchParams.get("type")
  
  const [formType, setFormType] = useState<FormType>(typeParam === "corporate" ? "corporate" : "artist")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <section className="py-16 md:py-24 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              We&apos;ve received your message!
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Thank you for reaching out. Our team will review your inquiry and get back to you 
              within 24-48 hours. Keep an eye on your inbox!
            </p>
            <div className="bg-muted p-6 text-left mb-8 rounded-xl">
              <h3 className="font-heading font-semibold mb-3">What happens next?</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="font-heading font-bold text-foreground">1.</span>
                  Our team reviews your request
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-heading font-bold text-foreground">2.</span>
                  We&apos;ll reach out to discuss details and availability
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-heading font-bold text-foreground">3.</span>
                  Once confirmed, we&apos;ll send booking details and deposit instructions
                </li>
              </ol>
            </div>
            <Button onClick={() => setIsSubmitted(false)} variant="outline" className="rounded-full">
              Submit Another Inquiry
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column - Info */}
          <div className="lg:col-span-1">
            <p className="text-muted-foreground uppercase tracking-[0.2em] text-xs mb-4">Contact</p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Let&apos;s create something together.
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Ready to book studio time or start a creative project? Fill out the form and 
              our team will get back to you within 24-48 hours.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <a href="mailto:hello@blankspace.sl" className="flex items-center gap-3 text-sm hover:text-accent transition-colors">
                <Mail className="h-4 w-4 text-muted-foreground" />
                hello@blankspace.sl
              </a>
              <a href="tel:+23276123456" className="flex items-center gap-3 text-sm hover:text-accent transition-colors">
                <Phone className="h-4 w-4 text-muted-foreground" />
                +232 76 123 456
              </a>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span>
                  15 Wilkinson Road<br />
                  Freetown, Sierra Leone
                </span>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-muted p-6 rounded-xl">
              <h3 className="font-heading font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Studio Hours
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span>9:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span>10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span>By appointment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Forms */}
          <div className="lg:col-span-2">
            {/* Form Type Selector */}
            <div className="mb-8">
              <Label className="text-sm font-medium mb-3 block">I am a/an:</Label>
              <RadioGroup
                value={formType}
                onValueChange={(value) => setFormType(value as FormType)}
                className="flex gap-4"
              >
                <div className="flex items-center">
                  <RadioGroupItem value="artist" id="artist" className="peer sr-only" />
                  <Label
                    htmlFor="artist"
                    className={`px-6 py-3 border rounded-full cursor-pointer transition-all ${
                      formType === "artist"
                        ? "bg-foreground text-background border-foreground shadow-lg"
                        : "border-border hover:border-foreground/50"
                    }`}
                  >
                    Artist / Individual
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="corporate" id="corporate" className="peer sr-only" />
                  <Label
                    htmlFor="corporate"
                    className={`px-6 py-3 border rounded-full cursor-pointer transition-all ${
                      formType === "corporate"
                        ? "bg-foreground text-background border-foreground shadow-lg"
                        : "border-border hover:border-foreground/50"
                    }`}
                  >
                    Corporate / Agency
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Artist Form */}
            {formType === "artist" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="artist-name">Full Name *</Label>
                    <Input id="artist-name" required placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="artist-email">Email *</Label>
                    <Input id="artist-email" type="email" required placeholder="you@example.com" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="artist-phone">Phone Number</Label>
                    <Input id="artist-phone" type="tel" placeholder="+232 XX XXX XXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-type">Session Type *</Label>
                    <Select defaultValue={serviceParam || undefined}>
                      <SelectTrigger id="session-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rehearsal">Rehearsal</SelectItem>
                        <SelectItem value="recording">Recording Session</SelectItem>
                        <SelectItem value="mixing">Mixing / Mastering</SelectItem>
                        <SelectItem value="full-day">Full Day Booking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="preferred-date">Preferred Date *</Label>
                    <div className="relative">
                      <Input id="preferred-date" type="date" required />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferred-time">Preferred Time</Label>
                    <Select>
                      <SelectTrigger id="preferred-time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                        <SelectItem value="evening">Evening (5PM - 10PM)</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="artist-message">Additional Details</Label>
                  <Textarea
                    id="artist-message"
                    placeholder="Tell us about your project, any special requirements, equipment needs, etc."
                    rows={4}
                  />
                </div>

                <div className="bg-muted p-4 text-sm text-muted-foreground rounded-xl">
                  <p>
                    <strong className="text-foreground">Note:</strong> A 50% deposit is required to confirm your booking. 
                    We&apos;ll send payment details after confirming availability.
                  </p>
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto rounded-full shadow-lg" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}

            {/* Corporate Form */}
            {formType === "corporate" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="corp-name">Contact Name *</Label>
                    <Input id="corp-name" required placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="corp-company">Company / Agency *</Label>
                    <Input id="corp-company" required placeholder="Organization name" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="corp-email">Work Email *</Label>
                    <Input id="corp-email" type="email" required placeholder="you@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="corp-phone">Phone Number *</Label>
                    <Input id="corp-phone" type="tel" required placeholder="+232 XX XXX XXXX" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="project-type">Project Type *</Label>
                    <Select defaultValue={serviceParam || undefined}>
                      <SelectTrigger id="project-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video Production</SelectItem>
                        <SelectItem value="commercial">Commercial / Advertising</SelectItem>
                        <SelectItem value="brand">Brand Identity</SelectItem>
                        <SelectItem value="web">Web Design</SelectItem>
                        <SelectItem value="campaign">Full Campaign</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget-range">Budget Range *</Label>
                    <Select>
                      <SelectTrigger id="budget-range">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-1k">Under $1,000</SelectItem>
                        <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                        <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                        <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                        <SelectItem value="over-25k">$25,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Project Timeline *</Label>
                    <Select>
                      <SelectTrigger id="timeline">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">ASAP / Urgent</SelectItem>
                        <SelectItem value="1-month">Within 1 month</SelectItem>
                        <SelectItem value="2-3-months">2-3 months</SelectItem>
                        <SelectItem value="3-6-months">3-6 months</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="decision-maker">Are you the decision maker?</Label>
                    <Select>
                      <SelectTrigger id="decision-maker">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No, part of a team</SelectItem>
                        <SelectItem value="partial">Partially</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-scope">Project Scope & Deliverables *</Label>
                  <Textarea
                    id="project-scope"
                    required
                    placeholder="Describe your project goals, required deliverables, target audience, and any specific requirements."
                    rows={5}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto rounded-full shadow-lg" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Brief"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

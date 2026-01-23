"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground uppercase tracking-[0.2em] text-xs mb-4">
            Ready to Create?
          </p>
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Let&apos;s bring your vision to life.
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Whether you&apos;re an artist looking for studio time or a brand seeking creative excellence, 
            we&apos;re here to make it happen.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="text-base px-8 py-6 rounded-full shadow-lg">
              <Link href="/contact">
                Book a Session
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 bg-transparent rounded-full">
              <Link href="/contact?type=corporate">
                Corporate Inquiry
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-12 border-t border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="font-heading text-3xl md:text-4xl font-bold">150+</p>
                <p className="text-muted-foreground text-sm mt-1">Sessions Recorded</p>
              </div>
              <div>
                <p className="font-heading text-3xl md:text-4xl font-bold">50+</p>
                <p className="text-muted-foreground text-sm mt-1">Artists Hosted</p>
              </div>
              <div>
                <p className="font-heading text-3xl md:text-4xl font-bold">25+</p>
                <p className="text-muted-foreground text-sm mt-1">Brand Campaigns</p>
              </div>
              <div>
                <p className="font-heading text-3xl md:text-4xl font-bold">24/7</p>
                <p className="text-muted-foreground text-sm mt-1">Power Supply</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

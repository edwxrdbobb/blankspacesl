"use client"

import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, Youtube, Twitter, Mail, MapPin, Phone } from "lucide-react"

const footerLinks = {
  services: [
    { label: "Recording & Studio Rental", href: "/services#recording" },
    { label: "Audiovisual Productions", href: "/services#audiovisual" },
    { label: "Web Development", href: "/services#web-development" },
    { label: "Events & Entertainment", href: "/services#events-entertainment" },
  ],
  company: [
    { label: "Select Works", href: "/portfolio" },
    { label: "The Collective", href: "/collective" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com/blankspace", icon: Instagram },
    { label: "YouTube", href: "https://youtube.com/blankspace", icon: Youtube },
    { label: "Twitter", href: "https://twitter.com/blankspace", icon: Twitter },
  ],
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/navbar-logo-light.png"
                alt="BLANK SPACE Logo"
                width={160}
                height={46}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Freetown&apos;s premier destination for professional sound recording, content
              development and creative productions
            </p>
            <div className="flex items-center gap-4">
              {footerLinks.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-background/20 rounded-full flex items-center justify-center hover:bg-background/10 transition-colors"
                  aria-label={item.label}
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-background text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-background text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider">Stay Updated</h4>
            <p className="text-background/70 text-sm mb-4">
              Get updates on new releases, artist spotlights, and creative tips.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50 rounded-full"
              />
              <Button type="submit" variant="secondary" size="icon" className="shrink-0 rounded-full">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <a href="mailto:hello@blankspace.sl" className="flex items-center gap-2 text-background/70 hover:text-background text-sm transition-colors">
                <Mail className="h-4 w-4" />
                hello@blankspace.sl
              </a>
              <a href="tel:+23276123456" className="flex items-center gap-2 text-background/70 hover:text-background text-sm transition-colors">
                <Phone className="h-4 w-4" />
                +232 76 123 456
              </a>
              <span className="flex items-center gap-2 text-background/70 text-sm">
                <MapPin className="h-4 w-4" />
                Freetown, Sierra Leone
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-background/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-background/50 text-xs">
            &copy; {new Date().getFullYear()} Blank Space. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-background/50 hover:text-background/70 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-background/50 hover:text-background/70 text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

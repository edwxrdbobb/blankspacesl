"use client"

import { useState, useEffect } from "react"
import { X, Mail, Send } from "lucide-react"

interface EmailPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function EmailPopup({ isOpen, onClose }: EmailPopupProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mark as submitted in localStorage to prevent future popups
      localStorage.setItem('emailPopupSubmitted', 'true')
      
      setIsSubmitted(true)
      setTimeout(() => {
        onClose()
        // Reset form after closing
        setTimeout(() => {
          setEmail("")
        setIsSubmitted(false)
        setError("")
        }, 300)
      }, 2000)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#f37335]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-6 w-6 text-[#f37335]" />
          </div>
          
          <h3 className="text-xl font-semibold text-[#fdfaf3] mb-2">
            Stay Connected
          </h3>
          
          <p className="text-[#fdfaf3]/60 text-sm leading-relaxed">
            Join the inner circle, Reggie's Jazz Exchange was just the beginning, we're building the future of creativity in Sierra Leone and we want you in the room for what's next.<br/><br/>
            Drop your email below to get first notice on upcoming events, exclusive project drops, and everything happening within the Blank Space ecosystem.
          </p>
        </div>

        {/* Form */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#f37335] focus:bg-white/10 transition-all"
                required
              />
              {error && (
                <p className="text-red-400 text-xs mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email}
              className="w-full bg-[#f37335] hover:bg-[#f37335]/90 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Subscribing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Subscribe
                </>
              )}
            </button>

            <p className="text-[#fdfaf3]/30 text-xs text-center">
              Unsubscribe at any time. We respect your privacy.
            </p>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h4 className="text-lg font-semibold text-[#fdfaf3] mb-2">
              You're on the list!
            </h4>
            
            <p className="text-[#fdfaf3]/60 text-sm">
              Thanks for subscribing. We'll keep you updated on our latest events and projects.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

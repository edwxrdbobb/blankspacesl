'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Send, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { AudienceSelector, AudienceMember } from './audience-selector'

interface MessagesFormProps {
  initialMembers: AudienceMember[]
}

export function MessagesForm({ initialMembers }: MessagesFormProps) {
  const searchParams = useSearchParams()
  const initialTo = searchParams.get('to') || ''

  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [sentCount, setSentCount] = useState(0)

  useEffect(() => {
    if (initialTo) setSelectedEmails([initialTo])
  }, [initialTo])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedEmails.length === 0) {
      toast.error('Please select at least one recipient.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: selectedEmails, subject, message }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(`Message sent successfully to ${data.count} recipients`)
        setIsSent(true)
        setSentCount(data.count)
        setSubject('')
        setMessage('')
        setSelectedEmails([])
      } else {
        toast.error(data.error || 'Failed to send message')
      }
    } catch (error) {
      toast.error('An error occurred while sending the message')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSent) {
    return (
      <Card className="bg-zinc-900/40 border-white/5 text-center py-16 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
        <CardContent className="space-y-6 relative z-10">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center ring-1 ring-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Message Sent!</h2>
            <p className="text-zinc-400 font-medium">Your message has been delivered to <span className="text-white">{sentCount}</span> recipients.</p>
          </div>
          <Button 
            onClick={() => setIsSent(false)} 
            variant="outline" 
            className="border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 text-zinc-300 hover:text-white transition-all h-12 px-8 rounded-xl"
          >
            Send another message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(320px,400px)_1fr] gap-8 relative items-start w-full">
      <div className="w-full flex items-start relative z-10">
        <AudienceSelector 
          members={initialMembers} 
          selectedEmails={selectedEmails} 
          onChange={setSelectedEmails} 
        />
      </div>

      <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden w-full">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform translate-x-32 -translate-y-32 pointer-events-none z-0" />
        
        <CardHeader className="border-b border-white/5 pb-6 relative z-10">
          <CardTitle className="text-2xl font-bold text-white tracking-tight">New Message</CardTitle>
          <CardDescription className="text-zinc-400 font-medium text-base">
            Draft a message to send via email to your audience.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-8 relative z-10">
          <form onSubmit={handleSend} className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="subject" className="text-zinc-300 font-semibold uppercase text-xs tracking-wider">Subject</Label>
              <Input
                id="subject"
                placeholder="Query regarding your submission"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="h-14 rounded-xl bg-white/[0.02] border-white/10 text-white placeholder:text-zinc-600 focus:bg-white/[0.04] focus:border-white/20 transition-all text-lg"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="message" className="text-zinc-300 font-semibold uppercase text-xs tracking-wider">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[240px] p-4 rounded-xl bg-white/[0.02] border-white/10 text-white placeholder:text-zinc-600 focus:bg-white/[0.04] focus:border-white/20 transition-all text-lg resize-none custom-scrollbar"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 bg-white/[0.02] px-3 py-1.5 rounded-lg border border-white/5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Sent via Resend from info@blankspacesl.com</span>
              </div>
              <Button
                type="submit"
                disabled={isLoading || selectedEmails.length === 0}
                className="w-full sm:w-auto h-12 px-8 rounded-xl bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all font-semibold text-base disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

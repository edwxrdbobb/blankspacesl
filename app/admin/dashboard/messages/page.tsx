import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { MessagesForm } from '@/components/admin/messages-form'
import { supabaseAdmin } from '@/lib/supabase'
import { AudienceMember } from '@/components/admin/audience-selector'

async function getAudienceMembers(): Promise<AudienceMember[]> {
  const [
    { data: newsletter },
    { data: contact },
    { data: rsvps }
  ] = await Promise.all([
    supabaseAdmin.from('newsletter_subscriptions').select('id, email'),
    supabaseAdmin.from('contact_submissions').select('id, form_type, artist_name, corp_contact_name, artist_email, corp_email'),
    supabaseAdmin.from('event_rsvps').select('id, name, email, event_name')
  ])

  const members: AudienceMember[] = []

  if (newsletter) {
    newsletter.forEach(n => {
      if (n.email) {
        members.push({ id: `newsletter-${n.id}`, email: n.email, source: 'Newsletter' })
      }
    })
  }

  if (contact) {
    contact.forEach(c => {
      const email = c.form_type === 'artist' ? c.artist_email : c.corp_email
      const name = c.form_type === 'artist' ? c.artist_name : c.corp_contact_name
      if (email) {
        members.push({ id: `contact-${c.id}`, email, name, source: `Contact (${c.form_type})` })
      }
    })
  }

  if (rsvps) {
    rsvps.forEach(r => {
      if (r.email) {
        members.push({ id: `rsvp-${r.id}`, email: r.email, name: r.name, source: `RSVP (${r.event_name || 'General'})` })
      }
    })
  }

  // Deduplicate by email
  const uniqueMembers = members.filter((v, i, a) => a.findIndex(t => (t.email.toLowerCase() === v.email.toLowerCase())) === i)
  
  return uniqueMembers
}

export default async function MessagesPage() {
  const members = await getAudienceMembers()

  return (
    <div className="space-y-8 w-full max-w-7xl mx-auto animate-fade-in-up">
      <div className="border-b border-white/[0.05] pb-8 mb-8">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">Communications</h1>
        <p className="text-zinc-400 font-medium tracking-wide text-sm md:text-base">Send direct email messages to your contacts and subscribers.</p>
      </div>

      <Suspense fallback={
        <div className="h-[600px] w-full bg-zinc-900/20 border border-white/5 rounded-2xl animate-pulse flex items-center justify-center backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-white/20 animate-spin" />
            <p className="text-zinc-500 font-medium animate-pulse">Loading audience data...</p>
          </div>
        </div>
      }>
        <MessagesForm initialMembers={members} />
      </Suspense>
    </div>
  )
}

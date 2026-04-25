import { supabaseAdmin } from '@/lib/supabase'
import { SubmissionsTable } from '@/components/admin/submissions-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

async function getSubmissions() {
  const [
    { data: newsletter },
    { data: contact },
    { data: rsvps }
  ] = await Promise.all([
    supabaseAdmin.from('newsletter_subscriptions').select('*').order('created_at', { ascending: false }),
    supabaseAdmin.from('contact_submissions').select('*').order('created_at', { ascending: false }),
    supabaseAdmin.from('event_rsvps').select('*').order('created_at', { ascending: false })
  ])

  return {
    newsletter: newsletter || [],
    contact: contact || [],
    rsvps: rsvps || []
  }
}

export default async function SubmissionsPage() {
  const data = await getSubmissions()

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/[0.05] pb-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">Submissions</h1>
          <p className="text-zinc-400 font-medium tracking-wide text-sm md:text-base">View and manage all form submissions from the website.</p>
        </div>
      </div>

      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="bg-white/[0.02] border border-white/5 p-1.5 rounded-xl w-full overflow-x-auto justify-start inline-flex h-auto sm:w-auto shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <TabsTrigger value="contact" className="data-[state=active]:bg-white/10 data-[state=active]:shadow-sm data-[state=active]:text-white text-zinc-400 rounded-lg px-6 py-2.5 transition-all text-sm font-medium whitespace-nowrap">
            Contact Requests <span className="ml-2 bg-white/10 text-white text-xs py-0.5 px-2 rounded-full">{data.contact.length}</span>
          </TabsTrigger>
          <TabsTrigger value="rsvps" className="data-[state=active]:bg-white/10 data-[state=active]:shadow-sm data-[state=active]:text-white text-zinc-400 rounded-lg px-6 py-2.5 transition-all text-sm font-medium whitespace-nowrap">
            Event RSVPs <span className="ml-2 bg-white/10 text-white text-xs py-0.5 px-2 rounded-full">{data.rsvps.length}</span>
          </TabsTrigger>
          <TabsTrigger value="newsletter" className="data-[state=active]:bg-white/10 data-[state=active]:shadow-sm data-[state=active]:text-white text-zinc-400 rounded-lg px-6 py-2.5 transition-all text-sm font-medium whitespace-nowrap">
            Newsletter <span className="ml-2 bg-white/10 text-white text-xs py-0.5 px-2 rounded-full">{data.newsletter.length}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="contact" className="mt-8 focus-visible:outline-none focus-visible:ring-0">
          <SubmissionsTable type="contact" data={data.contact} />
        </TabsContent>
        
        <TabsContent value="rsvps" className="mt-8 focus-visible:outline-none focus-visible:ring-0">
          <SubmissionsTable type="rsvp" data={data.rsvps} />
        </TabsContent>
        
        <TabsContent value="newsletter" className="mt-8 focus-visible:outline-none focus-visible:ring-0">
          <SubmissionsTable type="newsletter" data={data.newsletter} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

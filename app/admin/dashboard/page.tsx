import { supabaseAdmin } from '@/lib/supabase'
import { 
  Inbox, 
  Users, 
  Calendar, 
  ArrowUpRight,
  MessageSquare
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

async function getStats() {
  const [
    { count: newsletterCount },
    { count: contactCount },
    { count: rsvpCount }
  ] = await Promise.all([
    supabaseAdmin.from('newsletter_subscriptions').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('contact_submissions').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('event_rsvps').select('*', { count: 'exact', head: true })
  ])

  return {
    newsletterCount: newsletterCount || 0,
    contactCount: contactCount || 0,
    rsvpCount: rsvpCount || 0,
    total: (newsletterCount || 0) + (contactCount || 0) + (rsvpCount || 0)
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats()

  const cards = [
    {
      title: 'Total Submissions',
      value: stats.total,
      icon: Inbox,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      title: 'RSVPs',
      value: stats.rsvpCount,
      icon: Calendar,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      title: 'Contact Requests',
      value: stats.contactCount,
      icon: MessageSquare,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    {
      title: 'Newsletter Subs',
      value: stats.newsletterCount,
      icon: Users,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10'
    }
  ]

  return (
    <div className="space-y-10 pb-8 relative animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/[0.05] pb-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">Dashboard Overview</h1>
          <p className="text-zinc-400 font-medium tracking-wide text-sm md:text-base">Welcome back, Administrator. Here's what's happening today.</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <Card 
            key={card.title} 
            className="group relative overflow-hidden bg-zinc-900/40 border-white/5 backdrop-blur-md hover:bg-zinc-800/40 hover:border-white/10 transition-all duration-500 ease-out hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl transform translate-x-10 -translate-y-10 group-hover:bg-white/10 transition-colors duration-500" />
            
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10">
              <CardTitle className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-xl transition-transform duration-500 group-hover:scale-110 ${card.bg}`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl md:text-4xl font-bold text-white tracking-tighter mt-1">{card.value}</div>
              <p className="text-xs text-zinc-500 mt-3 font-medium flex items-center gap-1.5 group-hover:text-zinc-400 transition-colors">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Live updating
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-md hover:border-white/10 transition-all duration-500 group">
          <CardHeader>
            <CardTitle className="text-xl font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button asChild variant="outline" className="w-full justify-between items-center group/btn border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 text-zinc-300 hover:text-white transition-all h-14 rounded-xl">
              <Link href="/admin/dashboard/submissions">
                <span className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 group-hover/btn:bg-white/10 transition-colors">
                    <Inbox className="w-4 h-4 text-zinc-300 group-hover/btn:text-white" />
                  </div>
                  <span className="font-medium tracking-wide">View all submissions</span>
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-50 transition-all duration-300 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-between items-center group/btn border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 text-zinc-300 hover:text-white transition-all h-14 rounded-xl">
              <Link href="/admin/dashboard/messages">
                <span className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 group-hover/btn:bg-white/10 transition-colors">
                    <MessageSquare className="w-4 h-4 text-zinc-300 group-hover/btn:text-white" />
                  </div>
                  <span className="font-medium tracking-wide">Send a new message</span>
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-50 transition-all duration-300 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-md hover:border-white/10 transition-all duration-500 overflow-hidden relative">
          {/* Subtle gradient blob background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
          
          <CardHeader className="flex flex-row items-center justify-between relative z-10 border-b border-white/5 pb-4 mb-4 mx-6">
            <CardTitle className="text-xl font-semibold tracking-tight text-white/90">System Status</CardTitle>
            <div className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 pt-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group/item">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20 group-hover/item:ring-emerald-500/40 transition-all">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  </div>
                  <span className="text-sm font-medium text-zinc-300 group-hover/item:text-white transition-colors">Database Connection</span>
                </div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500/20 px-3 py-1.5 rounded-full">
                  Healthy
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group/item">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20 group-hover/item:ring-emerald-500/40 transition-all">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  </div>
                  <span className="text-sm font-medium text-zinc-300 group-hover/item:text-white transition-colors">Email Provider (Resend)</span>
                </div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500/20 px-3 py-1.5 rounded-full">
                  Active
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

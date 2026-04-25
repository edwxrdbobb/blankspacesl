'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Inbox, 
  MessageSquare, 
  LogOut, 
  ChevronRight,
  Shield
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const navItems = [
  {
    title: 'Overview',
    href: '/admin/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Submissions',
    href: '/admin/dashboard/submissions',
    icon: Inbox
  },
  {
    title: 'Messages',
    href: '/admin/dashboard/messages',
    icon: MessageSquare
  }
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' })
      if (res.ok) {
        toast.success('Logged out successfully')
        router.push('/admin')
      }
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  return (
    <aside className="w-64 border-r border-white/5 bg-white/[0.01] backdrop-blur-xl flex flex-col h-screen sticky top-0 z-20">
      <div className="p-6 md:p-8">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-white to-white/70 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] group-hover:scale-105 transition-all duration-300">
            <Shield className="w-5 h-5 text-black" />
          </div>
          <span className="font-bold text-white tracking-tight text-lg">ADMIN PANEL</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden",
                isActive 
                  ? "text-white bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" 
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50" />
              )}
              <item.icon className={cn(
                "w-4 h-4 transition-colors relative z-10",
                isActive ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : "text-zinc-500 group-hover:text-zinc-300"
              )} />
              <span className="relative z-10">{item.title}</span>
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute left-0 w-1 h-full bg-white rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <ChevronRight className={cn(
                "w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 relative z-10",
                isActive ? "opacity-100 text-white/50" : "-translate-x-2 group-hover:translate-x-0"
              )} />
            </Link>
          )
        })}
      </nav>

      <div className="p-6 border-t border-white/5">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 h-12 rounded-xl"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}

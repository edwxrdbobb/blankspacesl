'use client'

import { useState } from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { Eye, Mail, Phone, Calendar, User, Building, MapPin, Inbox } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SubmissionsTableProps {
  type: 'newsletter' | 'contact' | 'rsvp'
  data: any[]
}

export function SubmissionsTable({ type, data }: SubmissionsTableProps) {
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const getColumns = () => {
    switch (type) {
      case 'newsletter':
        return ['Email', 'Subscribed At', 'Actions']
      case 'contact':
        return ['Name', 'Type', 'Email', 'Date', 'Actions']
      case 'rsvp':
        return ['Name', 'Event', 'Ticket', 'Email', 'Actions']
      default:
        return []
    }
  }

  const renderRow = (item: any) => {
    switch (type) {
      case 'newsletter':
        return (
          <>
            <TableCell className="font-medium">{item.email}</TableCell>
            <TableCell className="text-zinc-400">
              {format(new Date(item.created_at), 'PPP')}
            </TableCell>
            <TableCell>
              <Button 
                variant="ghost" 
                size="icon"
                asChild
              >
                <Link href={`/admin/dashboard/messages?to=${item.email}`}>
                  <Mail className="w-4 h-4" />
                </Link>
              </Button>
            </TableCell>
          </>
        )
      case 'contact':
        const name = item.form_type === 'artist' ? item.artist_name : item.corp_contact_name
        const email = item.form_type === 'artist' ? item.artist_email : item.corp_email
        return (
          <>
            <TableCell className="font-medium">{name}</TableCell>
            <TableCell>
              <Badge variant={item.form_type === 'artist' ? 'secondary' : 'outline'} className="capitalize text-zinc-300 border-white/20 hover:bg-white/10 hover:text-white transition-colors">
                {item.form_type}
              </Badge>
            </TableCell>
            <TableCell className="text-zinc-400">{email}</TableCell>
            <TableCell className="text-zinc-400">
              {format(new Date(item.created_at), 'MMM d, yyyy')}
            </TableCell>
            <TableCell className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setSelectedItem(item)}>
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/admin/dashboard/messages?to=${email}`}>
                  <Mail className="w-4 h-4" />
                </Link>
              </Button>
            </TableCell>
          </>
        )
      case 'rsvp':
        return (
          <>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell className="max-w-[150px] truncate">{item.event_name}</TableCell>
            <TableCell>
              <Badge variant="outline" className="text-zinc-300 border-white/20 hover:bg-white/10 hover:text-white transition-colors">{item.ticket_type}</Badge>
            </TableCell>
            <TableCell className="text-zinc-400">{item.email}</TableCell>
            <TableCell className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setSelectedItem(item)}>
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/admin/dashboard/messages?to=${item.email}`}>
                  <Mail className="w-4 h-4" />
                </Link>
              </Button>
            </TableCell>
          </>
        )
    }
  }

  return (
    <div className="bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      <Table>
        <TableHeader className="bg-white/[0.02] border-b border-white/5 relative z-10">
          <TableRow className="border-white/5 hover:bg-transparent">
            {getColumns().map((col) => (
              <TableHead key={col} className="text-zinc-400 font-medium tracking-wide uppercase text-xs">{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="relative z-10">
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-16">
                <div className="flex flex-col items-center justify-center text-zinc-500">
                  <Inbox className="w-8 h-8 mb-3 opacity-50" />
                  <p className="font-medium">No submissions found.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id} className="border-white/5 hover:bg-white/[0.03] transition-colors duration-300">
                {renderRow(item)}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <DetailView 
        item={selectedItem} 
        type={type} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  )
}

function DetailView({ item, type, onClose }: { item: any; type: string; onClose: () => void }) {
  if (!item) return null

  const getDetails = () => {
    if (type === 'contact') {
      if (item.form_type === 'artist') {
        return [
          { label: 'Name', value: item.artist_name, icon: User },
          { label: 'Email', value: item.artist_email, icon: Mail },
          { label: 'Phone', value: item.artist_phone, icon: Phone },
          { label: 'Session Type', value: item.session_type, icon: Calendar },
          { label: 'Preferred Date', value: item.preferred_date, icon: Calendar },
          { label: 'Preferred Time', value: item.preferred_time, icon: Calendar },
          { label: 'Message', value: item.artist_message, fullWidth: true },
        ]
      } else {
        return [
          { label: 'Name', value: item.corp_contact_name, icon: User },
          { label: 'Company', value: item.corp_company, icon: Building },
          { label: 'Email', value: item.corp_email, icon: Mail },
          { label: 'Phone', value: item.corp_phone, icon: Phone },
          { label: 'Project Type', value: item.corp_project_type },
          { label: 'Budget', value: item.corp_budget },
          { label: 'Timeline', value: item.corp_timeline },
          { label: 'Decision Maker', value: item.corp_decision_maker },
          { label: 'Scope', value: item.corp_project_scope, fullWidth: true },
        ]
      }
    } else if (type === 'rsvp') {
      return [
        { label: 'Name', value: item.name, icon: User },
        { label: 'Email', value: item.email, icon: Mail },
        { label: 'Phone', value: item.phone, icon: Phone },
        { label: 'Event', value: item.event_name, icon: MapPin },
        { label: 'Ticket', value: item.ticket_type },
        { label: 'Community', value: item.community },
        { label: 'Affiliation', value: item.affiliation },
        { label: 'Dietary', value: item.dietary_requirements, fullWidth: true },
      ]
    }
    return []
  }

  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#0A0A0A]/95 border-white/10 text-white max-w-2xl backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        <DialogHeader className="border-b border-white/5 pb-4">
          <DialogTitle className="text-xl font-bold tracking-tight text-white/90">Submission Details</DialogTitle>
          <DialogDescription className="text-zinc-500 font-medium">
            Submitted on {format(new Date(item.created_at), 'PPPP p')}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 py-6">
          {getDetails().map((detail, idx) => (
            <div key={idx} className={detail.fullWidth ? 'col-span-2' : ''}>
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                {detail.label}
              </p>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-colors">
                {detail.icon && <detail.icon className="w-4 h-4 text-zinc-500 mt-0.5 group-hover:text-white transition-colors" />}
                <p className={cn(
                  "text-sm text-zinc-300 group-hover:text-white transition-colors",
                  detail.fullWidth ? 'whitespace-pre-wrap leading-relaxed' : ''
                )}>
                  {detail.value || <span className="italic text-zinc-600">Not provided</span>}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 flex justify-end gap-3 pt-4 border-t border-white/5">
          <Button variant="ghost" className="hover:bg-white/5 text-zinc-400 hover:text-white" onClick={onClose}>
            Close
          </Button>
          <Button asChild className="bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all">
            <Link href={`/admin/dashboard/messages?to=${item.email || item.artist_email || item.corp_email}`}>
              <Mail className="w-4 h-4 mr-2" />
              Reply via Email
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

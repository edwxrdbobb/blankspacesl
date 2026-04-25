'use client'

import { useState, useMemo } from 'react'
import { Check, MailPlus, Search, User, CheckCircle2, Circle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface AudienceMember {
  id: string
  email: string
  name?: string
  source: string
}

interface AudienceSelectorProps {
  members: AudienceMember[]
  selectedEmails: string[]
  onChange: (emails: string[]) => void
}

export function AudienceSelector({ members, selectedEmails, onChange }: AudienceSelectorProps) {
  const [search, setSearch] = useState('')
  const [customEmail, setCustomEmail] = useState('')
  const [customMembers, setCustomMembers] = useState<AudienceMember[]>([])

  const allMembers = useMemo(() => [...customMembers, ...members], [members, customMembers])

  const filteredMembers = useMemo(() => {
    if (!search.trim()) return allMembers
    const query = search.toLowerCase()
    return allMembers.filter(m => 
      m.email.toLowerCase().includes(query) || 
      (m.name && m.name.toLowerCase().includes(query)) ||
      m.source.toLowerCase().includes(query)
    )
  }, [allMembers, search])

  const allFilteredSelected = filteredMembers.length > 0 && filteredMembers.every(m => selectedEmails.includes(m.email))

  const toggleSelectAll = () => {
    if (allFilteredSelected) {
      // Deselect all filtered
      const filteredEmails = new Set(filteredMembers.map(m => m.email))
      onChange(selectedEmails.filter(email => !filteredEmails.has(email)))
    } else {
      // Select all filtered (keeping already selected ones that might not be in the filter)
      const newSelections = new Set([...selectedEmails, ...filteredMembers.map(m => m.email)])
      onChange(Array.from(newSelections))
    }
  }

  const toggleMember = (email: string) => {
    if (selectedEmails.includes(email)) {
      onChange(selectedEmails.filter(e => e !== email))
    } else {
      onChange([...selectedEmails, email])
    }
  }

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customEmail || !customEmail.includes('@')) return
    
    // Check if already exists
    if (!allMembers.some(m => m.email === customEmail)) {
      const newCustom: AudienceMember = {
        id: `custom-${customEmail}`,
        email: customEmail,
        name: customEmail.split('@')[0],
        source: 'Custom',
      }
      setCustomMembers([newCustom, ...customMembers])
    }
    
    if (!selectedEmails.includes(customEmail)) {
      onChange([...selectedEmails, customEmail])
    }
    
    setCustomEmail('')
  }

  return (
    <div className="flex flex-col bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden w-full max-w-md shadow-2xl">
      <div className="p-4 border-b border-white/5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <User className="w-5 h-5" />
            <h3 className="font-semibold text-lg tracking-tight">Audience</h3>
          </div>
          <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-zinc-300">
            {filteredMembers.length} found
          </div>
        </div>

        {/* Search & Select All */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input 
              placeholder="Search recipients"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 pl-9 bg-black/40 border-white/10 text-white placeholder:text-zinc-500 rounded-xl focus:bg-white/5 transition-all text-sm"
            />
          </div>
          <button 
            type="button"
            onClick={toggleSelectAll}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors shrink-0 outline-none select-none"
          >
            {allFilteredSelected ? (
              <CheckCircle2 className="w-5 h-5 text-white" />
            ) : (
              <Circle className="w-5 h-5 text-zinc-600" />
            )}
            <span>Select all</span>
          </button>
        </div>

        {/* Add custom email */}
        <form onSubmit={handleAddCustom} className="flex items-center gap-2 pt-2">
          <Input 
            placeholder="Add custom email..."
            type="email"
            value={customEmail}
            onChange={(e) => setCustomEmail(e.target.value)}
            className="flex-1 h-10 bg-black/40 border-white/10 text-white placeholder:text-zinc-500 rounded-xl focus:bg-white/5 transition-all text-sm"
          />
          <Button 
            type="submit" 
            variant="secondary" 
            disabled={!customEmail}
            className="bg-white/10 text-white hover:bg-white/20 border-0 h-10 rounded-xl px-5 transition-all"
          >
            Add
          </Button>
        </form>
      </div>

      {/* List */}
      <div className="p-4 overflow-y-auto max-h-[400px] custom-scrollbar space-y-2 bg-[#121212]">
        {filteredMembers.length === 0 ? (
          <div className="text-center py-8 text-zinc-500 text-sm">
            No audience members found.
          </div>
        ) : (
          filteredMembers.map(member => {
            const isSelected = selectedEmails.includes(member.email)
            return (
              <div 
                key={member.id}
                onClick={() => toggleMember(member.email)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 group",
                  isSelected 
                    ? "bg-white/[0.04] border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]" 
                    : "bg-transparent border-white/5 hover:border-white/15 hover:bg-white/[0.02]"
                )}
              >
                <div className="shrink-0 flex items-center justify-center">
                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <Circle className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-white text-sm truncate">
                      {member.name || member.email.split('@')[0]}
                    </span>
                    <span className="shrink-0 text-[10px] font-bold tracking-wider uppercase text-zinc-400 bg-white/10 px-2 py-0.5 rounded-full">
                      {member.source}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500 font-medium truncate">
                    {member.email}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

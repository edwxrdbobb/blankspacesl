import { AdminSidebar } from '@/components/admin/admin-sidebar'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-white/20">
      {/* Ambient background glow */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[10%] w-[40%] h-[40%] bg-white/[0.03] blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[10%] w-[40%] h-[40%] bg-white/[0.02] blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 flex w-full h-screen">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto relative custom-scrollbar">
          <div className="container max-w-7xl mx-auto p-6 lg:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

import { Outlet } from 'react-router'

import { AppSidebar } from '@/shared/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/shared/components/ui/Sidebar'

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

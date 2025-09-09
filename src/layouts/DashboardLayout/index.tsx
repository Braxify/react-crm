import { Outlet } from 'react-router'

import { AppSidebar } from '@/shared/components/layout/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/shared/components/layout/sidebar'

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full p-4'>
        <SidebarTrigger />
        <div className='p-2'>
          {' '}
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}

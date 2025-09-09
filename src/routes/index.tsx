import { createBrowserRouter } from 'react-router'

import type { QueryClient } from '@tanstack/react-query'

import { DashboardLayout } from '@/layouts/DashboardLayout'

import { HomePage } from '@/pages/Home'
import { Path } from '@/shared/constants/path.ts'

export const createAppRouter = (queryClient: QueryClient) => {
  return createBrowserRouter([
    {
      element: <DashboardLayout />,
      children: [
        {
          path: Path.HOME,
          element: <HomePage />,
          index: true,
        },
      ],
    },
  ])
}

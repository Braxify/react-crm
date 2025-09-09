import { createBrowserRouter, Navigate } from 'react-router'

import { DashboardLayout } from '@/layouts/DashboardLayout'

import { CustomerDetails } from '@/pages/CustomerDetails'
import { HomePage } from '@/pages/Home'
import { Path } from '@/shared/constants/path.ts'

import type { QueryClient } from '@tanstack/react-query'

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
        {
          path: Path.CUSTOMER_DETAILS,
          element: <CustomerDetails />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to={Path.HOME} replace />,
    },
  ])
}

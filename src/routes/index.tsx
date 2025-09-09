import { createBrowserRouter, Navigate } from 'react-router'

import { DashboardLayout } from '@/layouts/DashboardLayout'

import { CustomerDetails } from '@/pages/CustomerDetails'
import { HomePage } from '@/pages/Home'
import { Path } from '@/shared/constants/path.ts'

export const createAppRouter = () => {
  return createBrowserRouter(
    [
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
    ],
    { basename: '/react-crm' },
  )
}

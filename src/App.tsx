import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import dayjs from 'dayjs'
import { RouterProvider } from 'react-router'

import { createAppRouter } from '@/routes'
import { Toaster } from '@/shared/components/layout/toaster'
import { Time } from '@/shared/constants/time'

dayjs.locale('ua')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Time.ONE_MINUTE,
    },
  },
})

const router = createAppRouter(queryClient)

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
      <Toaster expand={false} position='top-center' richColors />
    </QueryClientProvider>
  )
}

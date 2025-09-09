import { getApiInstance } from '@/shared/api/api-instance'

import type { IOrder } from '@/models/order'

export type IOrdersResponse = IOrder[]

export const useOrders = () => {
  const api = getApiInstance()

  const fetchOrders = async (): Promise<IOrdersResponse> => {
    const res = await api.get<IOrdersResponse>(`/orders.json`)
    return res.data
  }

  return {
    fetchOrders,
  }
}

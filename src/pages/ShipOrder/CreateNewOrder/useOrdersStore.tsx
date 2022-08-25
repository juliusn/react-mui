import create from "zustand";
import { NewOrder } from "./index";

export interface OrdersStoreValues {
  orders: NewOrder[],
  setNewOrder: (newOrder:NewOrder) => void,
  removeAllOrders: () => void,
  getOrderById: (id: string) => NewOrder|undefined,
  updateOrder: (updatedOrder: NewOrder) => void,
}

const useOrdersStore = create<OrdersStoreValues>((set, get) => ({
  orders: [],
  setNewOrder: (newOrder) => set((state) => ({ orders: state.orders.concat(newOrder) })),
  getOrderById: (id ) => get().orders.find(o => o.id === id),
  removeAllOrders: () => set({ orders: [] }),
  updateOrder: (updatedOrder) => set((state) => (
    { orders: state.orders.map(a => a.id === updatedOrder.id ? updatedOrder : a ) }
  )),
}));

export default useOrdersStore;

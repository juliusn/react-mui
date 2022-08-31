import create from "zustand";
import { NewOrder } from "Types";

export interface OrdersStoreValues {
  orders: NewOrder[],
  setNewOrder: (newOrder:NewOrder) => void,
  removeAllOrders: () => void,
  getOrderById: (id: string) => NewOrder|undefined,
  updateOrder: (updatedOrder: NewOrder) => void,
  deleteOrderById: (id: string) => void,
}

const useOrdersStore = create<OrdersStoreValues>((set, get) => ({
  orders: [],
  setNewOrder: (newOrder) => set((state) => {
    return { orders: state.orders.concat(newOrder) };
  }),
  getOrderById: (id ) => get().orders.find(o => o.id === id),
  removeAllOrders: () => set({ orders: [] }),
  deleteOrderById: (id) => set((state) => (
    { orders: state.orders.filter(o => o.id !== id) }
  )),
  updateOrder: (updatedOrder) => set((state) => (
    { orders: state.orders.map(a => a.id === updatedOrder.id ? updatedOrder : a ) }
  )),
}));

export default useOrdersStore;

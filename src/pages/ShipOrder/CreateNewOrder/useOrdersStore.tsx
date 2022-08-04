import create from "zustand";
import { NewOrder } from "./index";

export type Page = "create"|"modify";
export interface OrdersStoreValues {
  orders: NewOrder[],
  page: Page
  modifiableOrder: NewOrder|null,
  setNewOrder: (newOrder:NewOrder) => void,
  setPage: (page:Page) => void,
  setModifiableOrder: (newOrder:NewOrder) => void,
  removeAllOrders: () => void,
  getOrderById: (id: string) => NewOrder|undefined,
  updateOrder: (updatedOrder: NewOrder) => void,
}

const useOrdersStore = create<OrdersStoreValues>((set, get) => ({
  orders: [],
  modifiableOrder: null,
  page: "create",
  setModifiableOrder: (newOrder) => set(() => ({ modifiableOrder: newOrder })),
  setPage: (page) => set(() => ({ page })),
  setNewOrder: (newOrder) => set((state) => ({ orders: state.orders.concat(newOrder) })),
  getOrderById: (id ) => get().orders.find(o => o.id === id),
  removeAllOrders: () => set({ orders: [] }),
  updateOrder: (updatedOrder) => set((state) => (
    { orders: state.orders.map(a => a.id === updatedOrder.id ? updatedOrder : a ) }
  )),
}));

export default useOrdersStore;

export type OrderTypes = "hourwork" | "event";
export type Client = "SFPS"
export interface OrderBase {
  id: string,
  dateTime: Date,
  dateOrdered: Date,
  client: Client,
  status: boolean,
  type: OrderTypes,
}
export interface OrderByHourlyWork extends OrderBase{
  type:"hourwork",
  description?: string,
  port: string,
  duration: number,
  persons: number,
}
export interface OrderByEvent extends OrderBase{
  type: "event",
  event?: string,
  description?: string,
  ship: string,
  port: string,
  dock?: string,
  services: Service[],
}
export interface OrderTemplateValues {
  business_day: OrderTemplate[],
  friday: OrderTemplate[],
  saturday: OrderTemplate[],
  sunday: OrderTemplate[]
}
export interface OrderTemplate {
  ship: string,
  time: string,
  port: string,
  dock?: string,
  event: string,
  services: Service[],
}
export interface Service {
  persons: number,
  place: string,
  service: string,
  readiness: number,
}
export type Order = OrderByEvent | OrderByHourlyWork;
export type NewOrder = NewOrderByEvent | NewOrderByHourlyWork;
export type NewOrderByEvent = Omit<OrderByEvent, "dateOrdered"|"status">;
export type NewOrderByHourlyWork = Omit<OrderByHourlyWork, "dateOrdered"|"status">;

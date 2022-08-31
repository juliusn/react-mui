export interface orderBase {
  id: string,
  dateTime: Date,
  dateOrdered: Date,
  from: string,
  status: boolean,
  type:"hourwork"|"event",
}
export interface OrderByHourlyWork extends orderBase{
  type:"hourwork",
  description?: string,
  port: string,
  duration: number,
  persons: number,
}
export interface OrderByEvent extends orderBase{
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

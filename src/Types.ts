import { z } from "zod";
import {
  Service as zService,
  Services,
  OrderUnion,
  OrderBase,
  OrderByHourlyWork,
  OrderByEvent,
  NewOrderByEvent,
  NewOrderByHourlyWork,
  NewOrder,
  Status,
  OrderTypes,
  ClientType,
  PostOrder,
  OrderFormHourly,
  OrderFormEvent,
} from "utils/ZodSchemas";

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
  services: Services,
}

export type OrderTypes = z.infer<typeof OrderTypes>;
export type Client = z.infer<typeof ClientType>;
export type Status = z.infer<typeof Status>

export type Service = zService;
export type Services = z.infer<typeof Services>;
export type OrderBase = z.infer<typeof OrderBase>;
export type OrderByHourlyWork = z.infer<typeof OrderByHourlyWork>;
export type OrderByEvent = z.infer<typeof OrderByEvent>;
export type Order = z.infer<typeof OrderUnion>;
export type NewOrderByEvent = z.infer<typeof NewOrderByEvent>;
export type NewOrderByHourlyWork = z.infer<typeof NewOrderByHourlyWork>;
export type NewOrder = z.infer<typeof NewOrder>;
export type PostOrder = z.infer<typeof PostOrder>;
export type OrderFormEvent = z.infer<typeof OrderFormEvent>
export type OrderFormHourly = z.infer<typeof OrderFormHourly>

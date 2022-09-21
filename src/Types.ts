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

export type OrderTypesI = z.infer<typeof OrderTypes>;
export type ClientI = z.infer<typeof ClientType>;
export type StatusI = z.infer<typeof Status>

export type ServiceI = zService;
export type Services = z.infer<typeof Services>;
export type OrderBaseI = z.infer<typeof OrderBase>;
export type OrderByHourlyWorkI = z.infer<typeof OrderByHourlyWork>;
export type OrderByEventI = z.infer<typeof OrderByEvent>;
export type OrderI = z.infer<typeof OrderUnion>;
export type NewOrderByEventI = z.infer<typeof NewOrderByEvent>;
export type NewOrderByHourlyWorkI = z.infer<typeof NewOrderByHourlyWork>;
export type NewOrderI = z.infer<typeof NewOrder>;
export type PostOrderI = z.infer<typeof PostOrder>;
export type OrderFormEventI = z.infer<typeof OrderFormEvent>
export type OrderFormHourlyI = z.infer<typeof OrderFormHourly>

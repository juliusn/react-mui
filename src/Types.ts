import { z } from "zod";
import {
  Service as zService,
  Services as zServices,
  OrderUnion,
  OrderBase as zOrderBase,
  OrderByHourlyWork as zOrderByHourlyWork,
  OrderByEvent as zOrderByEvent,
  NewOrderByEvent as zNewOrderByEvent,
  NewOrderByHourlyWork as zNewOrderByHourlyWork,
  NewOrder as zNewOrder,
  Status as zStatus,
  OrderTypes as zOrderTypes,
  ClientType as zClientType,
  PostOrder as zPostOrder,
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

export type OrderTypes = z.infer<typeof zOrderTypes>;
export type Client = z.infer<typeof zClientType>;
export type Status = z.infer<typeof zStatus>

export type Service = zService;
export type Services = z.infer<typeof zServices>;
export type OrderBase = z.infer<typeof zOrderBase>;
export type OrderByHourlyWork = z.infer<typeof zOrderByHourlyWork>;
export type OrderByEvent = z.infer<typeof zOrderByEvent>;
export type Order = z.infer<typeof OrderUnion>;
export type NewOrderByEvent = z.infer<typeof zNewOrderByEvent>;
export type NewOrderByHourlyWork = z.infer<typeof zNewOrderByHourlyWork>;
export type NewOrder = z.infer<typeof zNewOrder>;
export type PostOrder = z.infer<typeof zPostOrder>;

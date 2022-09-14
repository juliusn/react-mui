import { z } from "zod";

export const ClientType = z.enum(["SFPS"]);
const firebaseTimestamp = z.object({
  nanoseconds: z.number(),
  seconds: z.number(),
});
const eventType = z.literal("event");
const hourlyType = z.literal("hourwork");
export const OrderTypes = z.union([eventType, hourlyType]);

const statusPending = z.literal("pending");
const statusAccepted = z.literal("accepted");
export const Status = z.union([statusAccepted, statusPending]);

export const Service = z.object({
  persons: z.number(),
  place: z.string(),
  service: z.string(),
  readiness: z.number(),
});
export const Services = z.array(z.object({
  persons: z.number(),
  place: z.string(),
  service: z.string(),
  readiness: z.number(),
}));
export type Service = z.infer<typeof Service>;
export const OrderBase = z.object({
  id: z.string(),
  dateBegin: z.date(),
  dateOrdered: z.date(),
  client: ClientType,
  description: z.string().optional(),
  status: Status,
  type: OrderTypes,
  port: z.string(),
});
export const OrderByHourlyWork = OrderBase.extend({
  type: hourlyType,
  duration: z.number(),
  persons: z.number(),
});
export const OrderByEvent = OrderBase.extend({
  type: eventType,
  event: z.string().optional(),
  ship: z.string(),
  dock: z.string().optional(),
  services: Services,
});
const FirebaseOrdersBase = z.object({
  dateBegin: firebaseTimestamp,
  dateOrdered: firebaseTimestamp,
  client: ClientType,
  description: z.string().optional(),
  status: z.string(),
  port: z.string(),
  type: OrderTypes,
});
const FirebaseOrderEvent = FirebaseOrdersBase.extend({
  type: eventType,
  event: z.string().optional(),
  ship: z.string(),
  dock: z.string().optional(),
  services: Services,
});
const FirebaseOrderHourly = FirebaseOrdersBase.extend({
  type: hourlyType,
  duration: z.number(),
  persons: z.number(),
});
export const FirebaseOrders = z.union([ FirebaseOrderEvent, FirebaseOrderHourly ]);
export const OrderUnion = z.union([OrderByEvent, OrderByHourlyWork]);
export const PostOrder = z.union([ OrderByEvent.omit({ dateOrdered: true }), OrderByHourlyWork.omit({ dateOrdered: true }) ]);
export const NewOrderByEvent = OrderByEvent.omit({ dateOrdered: true, status: true });
export const NewOrderByHourlyWork = OrderByHourlyWork.omit({ dateOrdered: true, status: true });
export const NewOrder = z.union([ NewOrderByEvent , NewOrderByHourlyWork ]);

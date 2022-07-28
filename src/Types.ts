export interface ServiceProvider {
  nimi: string
}
export interface Keikka {
  keikkaId: string
  toteuttaja: ServiceProvider
  keikalleLahdetty: boolean
  suoritteet: suorite[]
}
export interface suorite {
  aika: string
  paikka: string
  laituriTieto: LaituriTieto
  tehtava: string
  laiva: Laiva
}
export interface Laiva {
  nimi: string
}
export interface LaituriTieto {
  satama: string
  laituri?: string
}

export interface Order {
  id: number,
  dateBegin: string,
  event: string,
  dateOrdered: string,
  description?: string,
  from: string,
  status: boolean,
  ship: string,
  port: string,
  dock?: string,
  services?: Service[],
}
export interface OrderTemplateValues {
  business_day: OrderTemplate[],
  friday: OrderTemplate[],
  saturday: OrderTemplate[],
  sunday: OrderTemplate[]
}
export interface OrderTemplate {
  ship: string,
  dateBegin: string,
  port: string,
  dock?: string,
  services?: Service[],
}
export interface Service {
  persons: number,
  place: string,
  service: string,
}

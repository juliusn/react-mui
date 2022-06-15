import { Order, OrderTemplateValues } from "../Types";

let id = 0;
function getId() {
  id+=1;
  return id;
}

let orders: Order[] = [
  { id: getId(), ship: "Mega Star", dateBegin: "16-6-2022 12:15", dateOrdered: "10-6-2022 09:00", status: false, from: "SFPS", port: "Länsisatama", dock: "LJ6" },
  { id: getId(), ship: "Europa", dateBegin: "17-6-2022 16:00", dateOrdered:"10-6-2022 09:01", status: true, from: "SFPS", port: "Länsisatama", dock: "Lj6" },
];
export const getOrders = () => orders;

export const postOrder = ({ order } : {order: Order}) => orders = orders.concat(order);
export const getOrderTemplates = () => orderTemplates;

const orderTemplates: OrderTemplateValues = {
  business_day: {
    templates: [
      {
        ship: "XPRS",
        ETA: "09:30",
        port: "Katajanokka",
        dock: "EK5",
        services: [
          {
            id: getId(),
            place: "Keula",
            service: "Kiinnitys",
          },
          {
            id: getId(),
            place: "Keula",
            service: "Irrotus",
          },
          {
            id: getId(),
            place: "Keula",
            service: "Kiinnitys",
          },
          {
            id: getId(),
            place: "Silta",
            service: "Yläsillan ajo kiinni",
          },
          {
            id: getId(),
            place: "Silta",
            service: "Yläsillan ajo irti",
          },
          {
            id: getId(),
            place: "Perä",
            service: "Irrotus",
          },
          {
            id: getId(),
            place: "Perä",
            service: "Kiinnitys",
          },
        ]
      },
      {
        ship: "XPRS",
        ETA: "19:30",
        port: "Katajanokka",
        dock: "EK5",
        services: [
          {
            id: getId(),
            place: "Keula",
            service: "Kiinnitys",
          },
          {
            id: getId(),
            place: "Keula",
            service: "Irrotus",
          },
          {
            id: getId(),
            place: "Keula",
            service: "Kiinnitys",
          },
          {
            id: getId(),
            place: "Silta",
            service: "Yläsillan ajo kiinni",
          },
          {
            id: getId(),
            place: "Silta",
            service: "Yläsillan ajo irti",
          },
          {
            id: getId(),
            place: "Perä",
            service: "Irrotus",
          },
          {
            id: getId(),
            place: "Perä",
            service: "Kiinnitys",
          },
        ]
      },
      {
        ship: "Finlandia",
        ETA: "8:15",
        port: "Länsisatama",
        dock: "LJ6",
        services: [
          {
            id: getId(),
            place: "Liikenteenohjaus",
            service: "Liput",
          },
          {
            id: getId(),
            place: "Liikenteenohjaus",
            service: "Rekat",
          },
          {
            id: getId(),
            place: "Liikenteenohjaus",
            service: "Henkilöautot",
          },
          {
            id: getId(),
            place: "Silta",
            service: "Sillan ajo kiinni",
          },
          {
            id: getId(),
            place: "Silta",
            service: "Sillan ajo irti",
          },
        ]
      }
    ]
  },
  friday: {
    templates: []
  },
  saturday: {
    templates: []
  },
  sunday: {
    templates: []
  },


};

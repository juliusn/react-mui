import { Order, OrderTemplateValues } from "../Types";
import { parse } from "date-fns";
import { v4 as uuidv4 } from "uuid";

function getId(): string {
  return uuidv4();
}

let orders: Order[] = [
  {
    id: getId(),
    event:"Kiinnitys",
    ship: "Mega Star",
    dateTime: parse("16/6/2022 12:15", "d/MM/yyyy HH:mm", new Date()),
    dateOrdered: "10/6/2022 09:00",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis neque et ex feugiat fermentum. Pellentesque porta purus sed purus porttitor, ac dictum quam rutrum. Etiam ipsum lacus, semper accumsan mollis vitae, dignissim molestie odio. Nullam sed felis libero. Phasellus sed mauris id nisl elementum auctor. Praesent nisl justo, feugiat vel leo imperdiet, posuere faucibus eros. Sed sodales laoreet congue. Maecenas congue odio in efficitur pellentesque.",
    status: false,
    from: "SFPS",
    port: "Länsisatama",
    dock: "LJ6",
    services:[
      {
        persons: 2,
        place: "Silta",
        service: "Sillan ajo",
        readiness: 15

      },
    ]
  },
  {
    id: getId(),
    event: "Kiinnitys",
    ship: "Europa",
    dateTime: parse("17/6/2022 16:00", "d/MM/yyyy HH:mm", new Date()),
    dateOrdered:"10/6/2022 09:01",
    status: true,
    from: "SFPS",
    port: "Länsisatama",
    dock: "Lj6",
    services:[
      {
        place: "Keula",
        service: "Narut",
        persons: 2,
        readiness: 15
      },
      {
        place: "Perä",
        service: "Narut",
        persons: 1,
        readiness: 15
      },
      {
        place: "Silta",
        service: "Sillan ajo",
        persons: 1,
        readiness: 15
      },
    ]
  },
  {
    id: getId(),
    event: "Irrotus",
    ship: "Europa",
    dateTime: parse("17/6/2022 18:30", "dd/MM/yyyy HH:mm", new Date()),
    dateOrdered:"10/6/2022 09:01",
    status: false,
    from: "SFPS",
    port: "Länsisatama",
    dock: "Lj6",
  }
];
export const getOrders = () => orders;

export const postOrder = ({ order } : {order: Order}) => orders = orders.concat(order);
export const getOrderTemplates = () => orderTemplates;

const orderTemplates: OrderTemplateValues = {
  business_day: [
    {
      time: "09:30",
      ship: "XPRS",
      port: "Katajanokka",
      event: "Kiinnitys",
      dock: "EK5",
      services: [
        {
          persons: 2,
          place: "Keula",
          service: "Kiinnitys",
          readiness: 15

        },
        {
          persons: 1,
          place: "Silta",
          service: "Yläsillan ajo kiinni",
          readiness: 15
        },
        {
          persons: 1,
          place: "Perä",
          service: "Kiinnitys",
          readiness: 15
        },
      ]
    },
    {
      time: "10:30",
      ship: "XPRS",
      port: "Katajanokka",
      event: "Irrotus",
      dock: "EK5",
      services: [
        {
          persons: 1,
          place: "Irrotus",
          service: "Irrotus",
          readiness: 15
        },
        {
          persons:1,
          place: "Silta",
          service: "Yläsillan ajo irti",
          readiness: 15
        },
        {
          persons: 1,
          place: "Perä",
          service: "Irrotus",
          readiness: 15
        },
      ]
    },

    {
      ship: "XPRS",
      time: "19:30",
      port: "Katajanokka",
      event: "Kiinnitys",
      dock: "EK5",
      services: [
        {
          persons: 2,
          place: "Keula",
          service: "Kiinnitys",
          readiness: 15
        },
        {
          persons: 1,
          place: "Silta",
          service: "Yläsillan ajo kiinni",
          readiness: 15
        },
        {
          persons: 1,
          place: "Perä",
          service: "Kiinnitys",
          readiness: 15
        },
      ]
    },
    {
      ship: "XPRS",
      time: "20:30",
      port: "Katajanokka",
      event: "Irrotus",
      dock: "EK5",
      services: [
        {
          persons: 1,
          place: "Keula",
          service: "Irrotus",
          readiness: 15
        },
        {
          persons: 1,
          place: "Silta",
          service: "Yläsillan ajo irti",
          readiness: 15
        },
        {
          persons: 1,
          place: "Perä",
          service: "Irrotus",
          readiness: 15
        },
      ]
    },

    {
      ship: "Finlandia",
      time: "8:15",
      port: "Länsisatama",
      dock: "LJ6",
      event: "Kiinnitys",
      services: [
        {
          persons: 1,
          place: "Liikenteenohjaus",
          service: "Liput",
          readiness: 15
        },
        {
          persons: 1,
          place: "Liikenteenohjaus",
          service: "Rekat",
          readiness: 15
        },
        {
          persons: 1,
          place: "Liikenteenohjaus",
          service: "Henkilöautot",
          readiness: 15
        },
        {
          persons: 1,
          place: "Silta",
          service: "Sillan ajo kiinni",
          readiness: 15
        },
      ]
    }
  ],
  friday: [
    {
      ship: "Finlandia",
      time: "8:15",
      port: "Länsisatama",
      dock: "LJ6",
      event: "Kiinnitys",
      services: [
        {
          persons: 1,
          place: "Liikenteenohjaus",
          service: "Liput",
          readiness: 15
        },
        {
          persons: 1,
          place: "Liikenteenohjaus",
          service: "Rekat",
          readiness: 15
        },
        {
          persons: 1,
          place: "Liikenteenohjaus",
          service: "Henkilöautot",
          readiness: 15
        },
        {
          persons: 1,
          place: "Silta",
          service: "Sillan ajo kiinni",
          readiness: 15
        },
      ]
    }
  ],
  saturday: [],
  sunday: []
};

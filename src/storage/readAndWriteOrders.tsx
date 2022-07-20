import { Order, OrderTemplateValues } from "../Types";

let id = 0;
function getId() {
  id+=1;
  return id;
}

let orders: Order[] = [
  {
    id: getId(),
    event:"Kiinnitys",
    ship: "Mega Star",
    dateBegin: "16/6/2022 12:15",
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
        service: "Sillan ajo"
      },
    ]
  },
  {
    id: getId(),
    event: "Kiinnitys",
    ship: "Europa",
    dateBegin: "17/6/2022 16:00",
    dateOrdered:"10/6/2022 09:01",
    status: true,
    from: "SFPS",
    port: "Länsisatama",
    dock: "Lj6",
    services:[
      {
        place: "Keula",
        service: "Narut",
        persons: 2
      },
      {
        place: "Perä",
        service: "Narut",
        persons: 1
      },
      {
        place: "Silta",
        service: "Sillan ajo",
        persons: 1
      },
    ]
  },
  {
    id: getId(),
    event: "Irrotus",
    ship: "Europa",
    dateBegin: "17/6/2022 18:30",
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
  business_day: {
    templates: [
      {
        dateBegin: "09:30",
        ship: "XPRS",
        port: "Katajanokka",
        dock: "EK5",
        services: [
          {
            persons: 2,
            place: "Keula",
            service: "Kiinnitys",
          },
          {
            persons: 1,
            place: "Irrotus",
            service: "Irrotus",
          },
          {
            persons: 1,
            place: "Silta",
            service: "Yläsillan ajo kiinni",
          },
          {
            persons:1,
            place: "Silta",
            service: "Yläsillan ajo irti",
          },
          {
            persons: 1,
            place: "Perä",
            service: "Irrotus",
          },
          {
            persons: 1,
            place: "Perä",
            service: "Kiinnitys",
          },
        ]
      },
      {
        ship: "XPRS",
        dateBegin: "19:30",
        port: "Katajanokka",
        dock: "EK5",
        services: [
          {
            persons: 2,
            place: "Keula",
            service: "Kiinnitys",
          },
          {
            persons: 1,
            place: "Keula",
            service: "Irrotus",
          },
          {
            persons: 1,
            place: "Silta",
            service: "Yläsillan ajo kiinni",
          },
          {
            persons: 1,
            place: "Silta",
            service: "Yläsillan ajo irti",
          },
          {
            persons: 1,
            place: "Perä",
            service: "Irrotus",
          },
          {
            persons: 1,
            place: "Perä",
            service: "Kiinnitys",
          },
        ]
      },
      {
        ship: "Finlandia",
        dateBegin: "8:15",
        port: "Länsisatama",
        dock: "LJ6",
        services: [
          {
            persons: 1,
            place: "Liikenteenohjaus",
            service: "Liput",
          },
          {
            persons: 1,
            place: "Liikenteenohjaus",
            service: "Rekat",
          },
          {
            persons: 1,
            place: "Liikenteenohjaus",
            service: "Henkilöautot",
          },
          {
            persons: 1,
            place: "Silta",
            service: "Sillan ajo kiinni",
          },
          {
            persons: 1,
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

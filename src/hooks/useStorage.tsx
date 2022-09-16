import { useEffect, useState } from "react";
import { getDoc, doc, deleteDoc, onSnapshot, query, collection } from "firebase/firestore";
import { Order } from "Types";
import { FirebaseOrders, OrderUnion, Status as zStatus } from "utils/ZodSchemas";
import { db } from "../firebase";

export const useSubscribeOrders = () => {
  const [ orders, setOrders ] = useState<Order[]>([]);
  useEffect(() => {
    const q = query(collection(db, "orders"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const data : Order[] = [];
      querySnapshot.forEach(a => {
        try{
          const parsedOrder = FirebaseOrders.parse(a.data());
          const order = { id: a.id, ...parsedOrder, status: zStatus.parse(parsedOrder.status),  dateBegin: new Date(parsedOrder.dateBegin.seconds*1000), dateOrdered: new Date(parsedOrder.dateOrdered.seconds*1000) };
          data.push(OrderUnion.parse(order));
        }catch(e){
          console.log("Data corrupted", e );
        }
      });
      setOrders(data);
    });

    return () => unsub();
  }, []);

  return { orders };
};
export const useSubscribeOrderById = (id : string) => {
  const [ order, setOrder ] = useState<Order>();
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "orders", id), (doc) => {
      try{
        const parsedOrder = FirebaseOrders.parse(doc.data());
        const order = { id: doc.id, ...parsedOrder, status: zStatus.parse(parsedOrder.status),  dateBegin: new Date(parsedOrder.dateBegin.seconds*1000), dateOrdered: new Date(parsedOrder.dateOrdered.seconds*1000) };
        setOrder(OrderUnion.parse(order));
      }catch(e){
        console.log("Data corrupted", e );
      }
    });
    return () => unsub();
  }, [id]);

  return { order };
};

export const useModifyStorage = () => {

  const deleteOrderById = (id : string) => {
    void (async () => {

      await deleteDoc(doc(db, "orders", id));
    })();
  };

  return { deleteOrderById };
};

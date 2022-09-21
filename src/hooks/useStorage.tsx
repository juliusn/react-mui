import { useEffect, useState } from "react";
import { updateDoc, doc, deleteDoc, onSnapshot, query, collection, serverTimestamp } from "firebase/firestore";
import { Order } from "Types";
import { FirebaseOrdersLocal, FirebaseOrders, OrderUnion, Status as zStatus } from "utils/ZodSchemas";
import { db } from "../firebase";

export const useSubscribeOrders = () => {
  const [ orders, setOrders ] = useState<Order[]>([]);
  useEffect(() => {
    const q = query(collection(db, "orders"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const data : Order[] = [];
      const fromCache = querySnapshot.metadata.fromCache;
      querySnapshot.forEach(a => {
        try{
          if(fromCache){
            if(!FirebaseOrders.safeParse(a.data()).success) {
              const parsedOrder = FirebaseOrdersLocal.parse(a.data());
              const parsedStatus = zStatus.parse(parsedOrder.status);
              const order = { id: a.id, ...parsedOrder, status: parsedStatus, dateBegin: new Date(parsedOrder.dateBegin.seconds*1000) };
              data.push(OrderUnion.parse(order));
              return;
            }
          }
          const parsedOrder = FirebaseOrders.parse(a.data());
          const order = { id: a.id, ...parsedOrder, status: zStatus.parse(parsedOrder.status),  dateBegin: new Date(parsedOrder.dateBegin.seconds*1000), dateOrdered: new Date(parsedOrder.dateOrdered.seconds*1000) };
          data.push(OrderUnion.parse(order));
        }catch(e){
          console.log("Data corrupted", a.data(), e );
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

  const orderRef = (id: string) => doc(db, "orders", id);
  const deleteOrderById = (id : string) => {
    void (async () => {

      await deleteDoc(orderRef(id));
    })();
  };
  const updateOrderByid = ( updatedOrder: Order) => {
    void (async () => {
      await updateDoc(orderRef(updatedOrder.id), {
        ...updatedOrder,
        dateOrdered: serverTimestamp()
      });
    })();
  };

  return { deleteOrderById, updateOrderByid };
};

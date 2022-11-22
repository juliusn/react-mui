import { useCallback, useRef, useEffect, useState } from "react";
import { compareAsc, isFriday, isWeekend, format, parse } from "date-fns";
import { Unsubscribe, QueryDocumentSnapshot, DocumentData, startAfter, orderBy, limit, addDoc, writeBatch, where, getDocs, updateDoc, doc, deleteDoc, onSnapshot, query, collection, serverTimestamp } from "firebase/firestore";
import { TemplateDayOfWeek, PostOrderI, OrderI, OrderTemplateI } from "Types";
import { FirebaseOrderTemplate, FirebaseOrders, OrderUnion, Status as zStatus } from "utils/ZodSchemas";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";

interface listenersI {
  listener: Unsubscribe,
  cursor: 
}
export const useSubscribeOrders = () => {
  const [ orders, setOrders ] = useState<OrderI[]>([]);
  const [ after, setAfter ] = useState<QueryDocumentSnapshot<DocumentData>>();
  const cursor = useRef<QueryDocumentSnapshot<DocumentData>>();
  const listeners: listenersI[] = []
  /*
  useEffect(() => {
    const q = after
      ? query(collection(db, "orders"), orderBy("dateBegin"), startAfter(after), limit(15))
      : query(collection(db, "orders"), orderBy("dateBegin"), limit(15));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let data : OrderI[] = [];
      querySnapshot.forEach(a => {
        try{
          const parsedOrder = FirebaseOrders.parse(a.data());
          console.log(parsedOrder);
          const initialOrder = { id: a.id, ...parsedOrder, status: zStatus.parse(parsedOrder.status),  dateBegin: new Date(parsedOrder.dateBegin.seconds*1000), dateOrdered: parsedOrder.dateOrdered ? new Date(parsedOrder.dateOrdered.seconds*1000): null };
          data.push(OrderUnion.parse(initialOrder));
        }catch(e){
          console.log("Data corrupted", a.data(), e );
        }
        if(querySnapshot.docs) cursor.current = querySnapshot.docs[querySnapshot.docs.length-1];
      });
      setOrders(r => r.concat(data));
      data = [];
    });
    return () => unsub();
  }, [after]);
  */

  const newListener = (last) => {
    const q = query(collection(db, "orders"), orderBy("dateBegin"), limit(15));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const data : OrderI[] = [];
      querySnapshot.forEach(a => {
        try{
          const parsedOrder = FirebaseOrders.parse(a.data());
          console.log(parsedOrder);
          const initialOrder = { id: a.id, ...parsedOrder, status: zStatus.parse(parsedOrder.status),  dateBegin: new Date(parsedOrder.dateBegin.seconds*1000), dateOrdered: parsedOrder.dateOrdered ? new Date(parsedOrder.dateOrdered.seconds*1000): null };
          data.push(OrderUnion.parse(initialOrder));
        }catch(e){
          console.log("Data corrupted", a.data(), e );
        }
        if(querySnapshot.docs) cursor.current = querySnapshot.docs[querySnapshot.docs.length-1];
      });
    });
    return unsub;
  }
  function nextPage() {
    setAfter(cursor.current);
  }
  return { orders, nextPage };
};
export const useSubscribeOrderById = (id : string) => {
  const [ order, setOrder ] = useState<OrderI>();
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "orders", id), (doc) => {
      try{
        const parsedOrder = FirebaseOrders.parse(doc.data());
        const order = { id: doc.id, ...parsedOrder, status: zStatus.parse(parsedOrder.status),  dateBegin: new Date(parsedOrder.dateBegin.seconds*1000), dateOrdered: parsedOrder.dateOrdered ? new Date(parsedOrder.dateOrdered.seconds*1000): null };
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
  const updateOrderByid = ( updatedOrder: OrderI) => {
    void (async () => {
      await updateDoc(orderRef(updatedOrder.id), {
        ...updatedOrder,
        dateOrdered: serverTimestamp()
      });
    })();
  };
  const postOrderTemplate = async (order: OrderTemplateI ) => {
    const initialOrder = { ...order, time: format(order.time, "HH:mm") };
    await addDoc(collection(db, "orderTemplates"), initialOrder);
    return order;
  };

  const postOrders = (orders: PostOrderI[]) => {

    const batch = writeBatch(db);
    const order: PostOrderI[] = orders.map(o => ({ ...o, id: uuid(), status: "pending" }));
    order.forEach((o : PostOrderI) => {
      const orderRef = doc(db, "orders", o.id);
      batch.set(orderRef, { ...o, dateOrdered: serverTimestamp() });
    });
    batch.commit().catch(e => console.log(e));
  };

  const getOrderTemplates = useCallback( async (date: Date) => {
    const templates: OrderTemplateI[] = [];
    console.log(`fetch templates from ${format(date, "EEEE")} `);
    let q = query(collection(db, "orderTemplates"), where("dayOfWeek", "==", format(date, "EEEE")));
    if(!isFriday(date) && !isWeekend(date)){
      console.log("businessday");
      q = query(collection(db, "orderTemplates"), where("dayOfWeek", "==", TemplateDayOfWeek.workday));
    }
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const fbTemplate = FirebaseOrderTemplate.safeParse(doc.data());
      if(fbTemplate.success) {
        templates.push({ ...fbTemplate.data, time: parse(fbTemplate.data.time, "HH:mm", new Date())
        });
      }
    });
    return templates;
  }, []);
  return { deleteOrderById, updateOrderByid, postOrderTemplate, getOrderTemplates, postOrders };
};

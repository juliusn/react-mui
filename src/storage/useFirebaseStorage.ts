import React from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "firebase";

const unsub = onSnapshot(doc(db, "orders"), (doc) => {
  console.log("Current date:", doc.data());
});


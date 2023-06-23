import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";

export const handleProgramas = async (setProgramas: any) => {
  try {
    console.log("[CHAT]: handleProgramas");

    const programasCol = collection(db, "PROGRAMAS");
    return onSnapshot(programasCol, (snapshot) => {
      const programasList = snapshot.docs.map((doc) => {
        return { _id: doc?.id, ...doc.data() };
      });
      setProgramas(programasList);
    });
  } catch (error: any) {
    toast.error("Falha ao pegar programas: " + error.message);
    return [];
  }
};

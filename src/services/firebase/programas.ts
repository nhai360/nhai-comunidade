import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
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

export const handleCreatePrograma = async (name: string) => {
  try {
    const messageColRef = collection(db, "PROGRAMAS");

    const newMessage = {
      name,
      modules: [],
    };

    await addDoc(messageColRef, newMessage);
  } catch (error: any) {
    console.error("Falha ao criar novo arquivo:", error);
    toast.error("Falha ao criar novo arquivo: " + error.message);
  }
};

export const handleAddProgramaModule = async (id: string, modules: any[]) => {
  try {
    const messageColRef = collection(db, "PROGRAMAS");
    const commentDocRef = doc(messageColRef, id);

    await updateDoc(commentDocRef, { modules });
  } catch (error: any) {
    console.error("Falha ao criar novo arquivo:", error);
    toast.error("Falha ao criar novo arquivo: " + error.message);
  }
};

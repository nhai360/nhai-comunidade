import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";

export const handleProgramas = (setProgramas: any) => {
  console.log("[CHAT]: handleProgramas");

  const programasCol = collection(db, "PROGRAMAS");
  return onSnapshot(programasCol, (snapshot) => {
    const programasList = snapshot.docs.map((doc) => {
      return { _id: doc?.id, ...doc.data() };
    });
    setProgramas(programasList);
  });
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

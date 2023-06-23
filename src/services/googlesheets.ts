import axios from "axios";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { toast } from "react-toastify";

export const SubscribeSummit = async (userId: string, params: any) => {
  await handleSummitFirebase(userId);
  return axios.post("https://sheetdb.io/api/v1/14zso2a5908wx", params, {
    headers: {
      Authorization: `Bearer os2ebbzsr2qez4txf0dqvo7lsd6gsbpmgpctk5ro`,
    },
  });
};

export const handleSummitFirebase = async (userId: string) => {
  try {
    const messageColRef = collection(db, "SUMMIT-06");

    const newSubscribe = {
      userId,
      createdAt: serverTimestamp(),
    };

    await addDoc(messageColRef, newSubscribe);
  } catch (error: any) {
    console.error("Falha ao criar novo arquivo:", error);
    toast.error("Falha ao criar novo arquivo: " + error.message);
  }
};

export const handleGetSubscribe = async (userId: string) => {
  try {
    console.log("[SUMMIT]: handleGetSubscribe");

    const messageCol = collection(db, "SUMMIT-06");
    const q = query(messageCol, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Se houver um documento correspondente, você pode acessá-lo assim:
      const documentSnapshot = querySnapshot.docs[0];
      const data = documentSnapshot.data();
      return !!data;
    } else {
      // Se não houver documento correspondente
      return false;
    }
  } catch (error: any) {
    toast.error("Falha ao pegar inscrição: " + error.message);
    return [];
  }
};

interface ISubscribeSummit {
  nome: string;
  email: string;
  nascimento: string;
  telefone: string;
  etnia: string;
  genero: string;
  orientacao: string;
}

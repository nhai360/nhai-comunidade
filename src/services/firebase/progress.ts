import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { Video } from "@/client/videos";

export const GetUserProgress = async (userId: string, setProgress: any) => {
  try {
    console.log("[PROGRESS]: GetUserProgress");
    const liveChatDoc = doc(db, "PROGRESS", userId);

    const progressCol = collection(liveChatDoc, "VIDEOS");
    return onSnapshot(progressCol, (snapshot) => {
      const videoList = snapshot.docs.map((doc) => {
        return { _id: doc?.id, ...doc.data() };
      });
      setProgress(videoList || []);
    });
  } catch (error: any) {
    toast.error("Falha ao pegar progresso: " + error.message);
    return [];
  }
};

export const handleCreateUserProgress = async (
  userId: string,
  video: Video
) => {
  try {
    const liveChatDocRef = doc(db, "PROGRESS", userId); // Substitua "liveChatId" pelo ID do documento desejado
    const messageColRef = collection(liveChatDocRef, "VIDEOS");
    const viewerDocRef = doc(messageColRef, video?.id);

    await setDoc(viewerDocRef, { id: video?.id, title: video?.title });
  } catch (error: any) {
    console.error("Erro ao gerar progresso", error);
    toast.error("Erro ao gerar progresso " + error.message);
  }
};

export interface IWatchedVideo {
  id: string;
  title: string;
}

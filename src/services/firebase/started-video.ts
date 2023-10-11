import {
  serverTimestamp,
  collection,
  onSnapshot,
  doc,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { Video } from "@/client/videos";

export const GetUserStartedVideo = async (userId: string, setProgress: any) => {
  try {
    console.log("[STARTED-VIDEO]: GetUserStartedVideo");
    const startedVideoDoc = doc(db, "STARTED-VIDEO", userId);
    const startedVideoCol = collection(startedVideoDoc, "VIDEOS");

    return onSnapshot(startedVideoCol, (snapshot) => {
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

export const handleCreateUserStartedVideo = async (
  userId: string,
  video: Video
) => {
  try {
    const startedVideoDocRef = doc(db, "STARTED-VIDEO", userId);
    const messageColRef = collection(startedVideoDocRef, "VIDEOS");
    const viewerDocRef = doc(messageColRef, video?.id);

    await setDoc(viewerDocRef, {
      id: video?.id,
      title: video?.title,
      createdAt: serverTimestamp(),
    });
  } catch (error: any) {
    console.error("Erro ao gerar progresso", error);
    toast.error("Erro ao gerar progresso " + error.message);
  }
};

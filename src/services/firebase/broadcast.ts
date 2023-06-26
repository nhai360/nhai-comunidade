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
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";

export const GetFirebaseBroadcastStatus = async (
  liveId: string,
  setStatus: any
) => {
  try {
    console.log("GetFirebaseBroadcastStatus");

    const liveCol = collection(db, "LIVECHAT");
    return onSnapshot(
      query(liveCol, where("liveId", "==", liveId)),
      (snapshot) => {
        const messageList: any = snapshot.docs.map((doc) => {
          return { _id: doc?.id, ...doc.data() };
        });
        setStatus(messageList[0]?.status);
      }
    );
  } catch (error: any) {
    console.log("[GetFirebaseBroadcastStatus]", error);
    return [];
  }
};

export const ChangeFirebaseBroadcastStatus = async (
  liveId: string,
  status: "STARTED" | "FINISHED"
) => {
  try {
    const liveChatDocRef = doc(db, "LIVECHAT", liveId);

    await setDoc(liveChatDocRef, { liveId, status });
  } catch (error: any) {
    console.error("Falha ao criar novo arquivo:", error);
    toast.error("Falha ao criar novo arquivo: " + error.message);
  }
};

interface ICreateChatMessage {
  userId: string;
  userName: string;
  nickname: string;
  message: string;
}

interface ICreateLiveViewer {
  userId: string;
  fullName: string;
  nickname: string;
}

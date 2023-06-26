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

// export const GetFirebaseBroadcastStatus = async (liveId: string) => {
//   try {
//     console.log("GetFirebaseBroadcastStatus");
//     const liveChatDoc = doc(db, "LIVECHAT", liveId);

//     const messageCol = collection(liveChatDoc, "MESSAGES");
//     return onSnapshot(
//       query(messageCol, orderBy("createdAt", "asc")),
//       (snapshot) => {
//         const messageList = snapshot.docs.map((doc) => {
//           return { _id: doc?.id, ...doc.data() };
//         });
//         setChat(messageList);
//       }
//     );
//   } catch (error: any) {
//     toast.error("Falha ao pegar chat: " + error.message);
//     return [];
//   }
// };

export const ChangeFirebaseBroadcastStatus = async (
  liveId: string,
  status: "STARTED" | "FINISHED"
) => {
  try {
    const liveChatDocRef = doc(db, "LIVECHAT", liveId);

    await setDoc(liveChatDocRef, { status });
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

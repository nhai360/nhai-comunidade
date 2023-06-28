import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { User } from "@/client/users";

export const handleGetChat = async (liveId: string, setChat: any) => {
  try {
    console.log("[GET CHAT]");
    const liveChatDoc = doc(db, "LIVECHAT", liveId);

    const messageCol = query(
      collection(liveChatDoc, "MESSAGES"),
      orderBy("createdAt", "asc")
    );
    return onSnapshot(messageCol, (snapshot) => {
      const messageList = snapshot.docs
        .map((doc) => {
          return { _id: doc?.id, ...doc.data() };
        })
        .filter((m: any) => !m.deleted);
      setChat(messageList);
    });
  } catch (error: any) {
    toast.error("Falha ao pegar chat :(");
    console.log("[GET CHAT ERROR]", error.message);
    return [];
  }
};

export const handleCreateChatMessage = async (
  liveId: string,
  chatmessage: ICreateChatMessage
) => {
  try {
    const liveChatDocRef = doc(db, "LIVECHAT", liveId); // Substitua "liveChatId" pelo ID do documento desejado
    const messageColRef = collection(liveChatDocRef, "MESSAGES");

    const newMessage = {
      ...chatmessage,
      createdAt: serverTimestamp(),
    };

    await addDoc(messageColRef, newMessage);
  } catch (error: any) {
    console.error("Falha ao criar novo arquivo:", error);
    toast.error("Falha ao criar novo arquivo: " + error.message);
  }
};

export const handleDeleteChatComment = async (
  liveId: string,
  comment: any,
  user: User
) => {
  try {
    console.log("[DELETE CHAT COMMENT]");
    const liveChatDocRef = doc(db, "LIVECHAT", liveId);
    const messageColRef = collection(liveChatDocRef, "MESSAGES");

    const commentDocRef = doc(messageColRef, comment?._id);
    await setDoc(commentDocRef, {
      ...comment,
      deleted: true,
      deleter: {
        userId: user?.id,
        name: user?.fullName,
      },
      deletedAt: serverTimestamp(),
    });

    console.log("Documento excluído com sucesso!");
  } catch (error: any) {
    toast.error("Falha ao excluir comentário: " + error.message);
  }
};

export const handleCreateLiveViewer = async (
  liveId: string,
  viewer: ICreateLiveViewer
) => {
  try {
    const liveChatDocRef = doc(db, "LIVECHAT", liveId); // Substitua "liveChatId" pelo ID do documento desejado
    const messageColRef = collection(liveChatDocRef, "VIEWERS");
    const viewerDocRef = doc(messageColRef, viewer?.userId);

    await setDoc(viewerDocRef, viewer);
  } catch (error: any) {
    console.error("Falha ao criar novo arquivo:", error);
    toast.error("Falha ao criar novo arquivo: " + error.message);
  }
};

export const GetLiveMetrics = async (liveId: string) => {
  try {
    console.log("GetLiveMetrics");
    const liveChatDoc = doc(db, "LIVECHAT", liveId);

    const messageCol = collection(liveChatDoc, "MESSAGES");
    const chatSnapshot = await getDocs(
      query(messageCol, orderBy("createdAt", "asc"))
    );

    const chat = chatSnapshot.docs.map((doc) => {
      return { _id: doc.id, ...doc.data() };
    });

    const viewersCol = collection(liveChatDoc, "VIEWERS");
    const viewersSnapshot = await getDocs(viewersCol);

    const viewers = viewersSnapshot.docs.map((doc) => {
      return { _id: doc.id, ...doc.data() };
    });

    return { chat, viewers };
  } catch (error: any) {
    toast.error("Falha ao pegar métricas: " + error.message);
    return {
      chat: [],
      viewers: [],
    };
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

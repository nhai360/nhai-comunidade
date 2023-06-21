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

export const handleGetChat = async (liveId: string, setChat: any) => {
  try {
    console.log("[CHAT]: handleGetChat");
    const liveChatDoc = doc(db, "LIVECHAT", liveId);

    const messageCol = collection(liveChatDoc, "MESSAGES");
    return onSnapshot(
      query(messageCol, orderBy("createdAt", "asc")),
      (snapshot) => {
        const messageList = snapshot.docs.map((doc) => {
          return { ...doc.data() };
        });
        setChat(messageList);
      }
    );
  } catch (error: any) {
    toast.error("Falha ao pegar chat: " + error.message);
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
  commentId: string
) => {
  try {
    console.log("[CHAT]: handleDeleteChatComment");
    const liveChatDocRef = doc(db, "LIVECHAT", liveId);
    const messageColRef = collection(liveChatDocRef, "MESSAGES");

    const commentDocRef = doc(messageColRef, commentId);
    await deleteDoc(commentDocRef);

    console.log("Documento excluído com sucesso!");
  } catch (error: any) {
    toast.error("Falha ao excluir comentário: " + error.message);
  }
};

interface ICreateChatMessage {
  userId: string;
  userName: string;
  nickname: string;
  message: string;
}

import {
  collection,
  getDocs,
  query,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

export interface UserInformations {
  id: string;
  data: UserInformationsData;
}

interface UserInformationsData {
  browser: string;
  date: string;
  ip: string;
  session: string;
}

export const GetOneUserInfo = async (id: string) => {
  try {
    const userInfoRef = doc(db, "USER_INFORMATIONS", id);
    const userInfoSnap = await getDoc(userInfoRef);

    const data = {
      id: userInfoSnap.id,
      data: userInfoSnap.data()
    }

    return data
  } catch (error: any) {
    console.error("Falha ao obter dados do usuário", error);
    toast.error("Falha ao obter dados do usuário: " + error.message);
    return {};
  }
}

export const CreateUserInformations = async (
  userId: string,
  data: UserInformationsData,
  setLoading?: (value: boolean) => void,
  callback?: () => void
) => {
  setLoading?.(true);

  try {
    const userInfoRef = doc(db, "USER_INFORMATIONS", userId)
    await setDoc(userInfoRef, data);

    setLoading?.(false);
    callback?.();
  } catch (error: any) {
    console.error("Erro ao registrar informações", error);
    toast.error("Erro ao registrar informações" + error.message);
  }
};

import {
  collection,
  getDocs,
  query,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

export interface ResponsesData {
  id: string;
  data: ResponsesQuizData;
}

interface ResponsesQuizData {
  user_email: string;
  user_fullname: string;
  user_phone?: string | null;
  user_birthdate?: string | null;
}

interface QuizData {
  options: OptionsData[]
  id: string
}

export interface OptionsData {
  option: string;
  response: number;
}

export const GetOneResponsesQuiz = async (userId: string) => {
  try {
    const responseQuizRef = doc(db, "RESPONSE-QUIZ", userId);
    const q = query(collection(responseQuizRef, "QUIZ"));

    const responseQuizSnap = await getDoc(responseQuizRef);
    const quizSnap = await getDocs(q);


    let data: any = {
      id: responseQuizSnap.id,
      data: {
        ...responseQuizSnap.data(),
        quiz: []
      }
    }

    quizSnap.forEach((doc) => {
      data = {
        id: responseQuizSnap.id,
        data: {
          ...responseQuizSnap.data(),
          quiz: [...data.data.quiz, {
            id: doc.id,
            data: doc.data()
          }]
        }
      }
    });

    return data
  } catch (error: any) {
    console.error("Falha ao obter resposta", error);
    toast.error("Falha ao obter resposta: " + error.message);
    return {};
  }
}

export const CreateResponsesQuiz = async (
  userId: string,
  data: ResponsesQuizData,
  dataQuiz: QuizData,
  setLoading: (value: boolean) => void,
  callback?: () => void
) => {
  setLoading(true);

  try {
    const responseQuizRef = doc(db, "RESPONSE-QUIZ", userId)
    const quizColRef = collection(responseQuizRef, "QUIZ");
    const quizRef = doc(quizColRef, dataQuiz?.id);

    await setDoc(responseQuizRef, data);
    await setDoc(quizRef, {
      options: dataQuiz?.options,
      createdAt: serverTimestamp()
    });

    toast.success("Resposta registrada com sucesso!");
    setLoading(false);
    callback?.();
  } catch (error: any) {
    console.error("Erro ao registrar resposta", error);
    toast.error("Erro ao registrar resposta " + error.message);
  }
};

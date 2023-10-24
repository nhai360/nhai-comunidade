import {
  collection,
  getDocs,
  query,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

export interface QuizzesData {
  id: string
  data: QuizData
}

interface QuizData {
  title: string
  options: string[]
  show_percentage: number
}

export const GetQuizzes = async () => {
  try {
    const quizRef = collection(db, "QUIZ");
    const q = query(quizRef);

    const querySnapshot = await getDocs(q);

    const data: QuizzesData[] = []

    querySnapshot.forEach((doc: any) => {
      data.push({
        id: doc.id,
        data: doc.data()
      })
    });

    return data
  } catch (error: any) {
    console.error("Falha ao obter questionários", error);
    toast.error("Falha ao obter questionários: " + error.message);
    return [];
  }
};

export const GetOneQuiz = async (id: string) => {
  try {
    const quizRef = doc(db, "QUIZ", id);
    const quizSnap = await getDoc(quizRef);

    const data = {
      id: quizSnap.id,
      data: quizSnap.data()
    }

    return data
  } catch (error: any) {
    console.error("Falha ao obter questionário", error);
    toast.error("Falha ao obter questionário: " + error.message);
    return {};
  }
}

export const CreateQuiz = async (
  data: QuizData,
  setLoading: (value: boolean) => void
) => {
  setLoading(true);

  try {
    await setDoc(doc(db, "QUIZ", uuidv4()), data);

    toast.success("Questionário criado com sucesso!");
    setLoading(false);
  } catch (error: any) {
    console.error("Erro ao gerar questionário", error);
    toast.error("Erro ao gerar questionário " + error.message);
  }
};

export const UpdateQuiz = async (
  id: string,
  data: QuizData,
  setLoading: (value: boolean) => void
) => {
  setLoading(true);

  try {
    await setDoc(
      doc(db, "QUIZ", id),
      data,
      { merge: true }
    );

    toast.success("Questionário atualizado com sucesso!");
    setLoading(false);
  } catch (error: any) {
    console.error("Erro ao atualizar questionário", error);
    toast.error("Erro ao atualizar questionário " + error.message);
  }
};

export const DeleteQuiz = async (
  id: string,
  setLoading: (value: boolean) => void
) => {
  setLoading(true);

  try {
    await deleteDoc(doc(db, "QUIZ", id));
    
    toast.success("Questionário excluído com sucesso!");
    setLoading(false);
  } catch (error: any) {
    console.error("Erro ao excluir questionário", error);
    toast.error("Erro ao excluir questionário " + error.message);
  }
}

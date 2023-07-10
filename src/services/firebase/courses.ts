import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { ICourses } from "@/@types/cousers";
import { v4 as uuidv4 } from "uuid";

export const GetFirebaseCourses = async (setCourses: any) => {
  try {
    const programasCol = collection(db, "PROGRAMAS");
    return onSnapshot(programasCol, (snapshot) => {
      const programasList = snapshot.docs.map((doc) => {
        return { _id: doc?.id, ...doc.data() };
      });
      setCourses(programasList);
    });
  } catch (error: any) {
    toast.error("Falha ao pegar programas: " + error.message);
    return [];
  }
};

export const handleCreateCourse = async (program: ICreateCourse) => {
  try {
    const messageColRef = collection(db, "PROGRAMAS");

    const newCourse = {
      ...program,
      modules: [],
      public: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: "",
    };

    await addDoc(messageColRef, newCourse);
  } catch (error: any) {
    console.error("Não foi possível criar o programa", error);
    toast.error("Não foi possível criar o programa :(");
  }
};

export const handleCreateCourseModule = async (
  program: any,
  newModule: ICreateCourseModule
) => {
  try {
    const messageColRef = collection(db, "PROGRAMAS");
    const commentDocRef = doc(messageColRef, program._id);
    const id = uuidv4();

    const modules = [
      ...program.modules,
      {
        ...newModule,
        _id: id,
        public: false,
        episodes: [],
        order: program.modules.length + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: "",
      },
    ];

    await updateDoc(commentDocRef, { ...program, modules });
  } catch (error: any) {
    console.error("Não foi possível criar o módulo", error);
    toast.error("Não foi possível criar o módulo :(");
  }
};

export const handleEditProgram = async (newProgram: ICourses) => {
  try {
    const messageColRef = collection(db, "PROGRAMAS");
    const commentDocRef = doc(messageColRef, newProgram._id);

    const { watchedPercent, _id, createdAt, modules, ...rest } = newProgram;

    const adjustedProgram = {
      ...rest,
      modules: modules?.map((a) => {
        const { watchedPercent, ...rest } = a;
        return {
          ...rest,
          episodes: rest?.episodes?.map((e) => {
            const { watched, ...restEpisode } = e;

            return restEpisode;
          }),
        };
      }),
      updatedAt: new Date(),
    };

    await updateDoc(commentDocRef, adjustedProgram);
  } catch (error: any) {
    console.error("Não foi possível alterar o programa", error);
    toast.error("Não foi possível alterar o programa :(");
  }
};

interface ICreateCourse {
  name: string;
  order: number;
}

interface ICreateCourseModule {
  name: string;
  bannerUrl: string;
}

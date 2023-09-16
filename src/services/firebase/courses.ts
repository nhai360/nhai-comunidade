import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { ICourseModule, ICourses } from "@/@types/cousers";

import * as uuid from 'uuid'

export const GetFirebaseCourses = async (setCourses: any) => {
  try {
    const programasCol = collection(db, "PROGRAMAS");
    return onSnapshot(programasCol, (snapshot) => {
      const programasList = snapshot.docs.map((doc) => {
        return { _id: doc?.id, ...doc.data() };
      });
      const programs = programasList
        ?.filter((p: any) => !p?.deletedAt)
        ?.map((p: any) => {
          return {
            ...p,
            modules: p?.modules
              .filter((m: any) => !m?.deletedAt)
              .map((p: any) => {
                return {
                  ...p,
                  episodes: p?.episodes.filter((m: any) => !m?.deletedAt),
                };
              }),
          };
        });
      setCourses(programs);
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
    const id = Math.floor(Math.random() * 1000)
    

    const modules = [
      ...program.modules,
      {
        ...newModule,
        _id: 'ajajajaj',
        public: false,
        episodes: [],
        order: program.modules.length + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: "",
      },
    ];

    console.log("FIELD:::: ",  { ...program, modules } );

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

export const handleDeleteProgram = async (program: ICourses) => {
  try {
    console.log("[DELETE PROGRAM]");
    const programRef = doc(db, "PROGRAMAS", program?._id);

    const { watchedPercent, _id, createdAt, modules, ...rest } = program;

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
      deletedAt: new Date(),
    };

    await updateDoc(programRef, adjustedProgram);

    console.log("Programa excluído com sucesso!");
    toast.success("Programa excluído com sucesso!");
  } catch (error: any) {
    console.log("Falha ao excluir programa =>", error);
    toast.error("Falha ao excluir programa");
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

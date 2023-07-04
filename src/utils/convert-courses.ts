import { ICourses } from "@/@types/cousers";
import { IWatchedVideo } from "@/services/firebase/progress";

export const ConvertCourses = (
  courses: ICourses[],
  progress: IWatchedVideo[],
  nickname: string | undefined
) => {
  const isAdmin = nickname === process.env.NEXT_PUBLIC_NEGOCIOS_DE_ORGULHO;

  const cursos = courses
    ?.sort((a, b) => a?.order - b?.order)
    .map((course) => {
      const modulos = course?.modules
        .sort((a, b) => a?.order - b?.order)
        ?.map((module) => {
          const watchedEpis =
            module?.episodes
              ?.map((v) => {
                return {
                  ...v,
                  videoId: v?.public || isAdmin ? v?.videoId : "",
                  watched: progress.find((w) => w.id === v.videoId),
                };
              })
              .filter((e) => !!e?.videoId) || [];

          const watchedPercent = (
            (watchedEpis.filter((e) => e.watched).length /
              watchedEpis?.length) *
            100
          ).toFixed(0);

          return {
            ...module,
            _id: module?.public || isAdmin ? module?._id : "",
            episodes: watchedEpis.sort((a, b) => a?.order - b?.order),
            watchedPercent: parseInt(watchedPercent) || 0,
          };
        });

      const percentTotal = modulos
        ?.map((m) => m.watchedPercent === 100)
        .reduce(function (acumulador: any, valorAtual: any) {
          return acumulador + valorAtual;
        }, 0);

      const modulesWatchedPercent = (percentTotal / modulos?.length).toFixed(0);

      return {
        ...course,
        modules: modulos,
        watchedPercent: parseInt(modulesWatchedPercent) * 100 || 0,
      };
    });

  return cursos;
};

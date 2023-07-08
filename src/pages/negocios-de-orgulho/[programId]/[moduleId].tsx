"use client";
import styles from "./index.module.scss";
import Player from "@/components/Player";
import ModuleList from "@/components/ModuleList";
import { withAuth } from "@/middlewares";
import { useRouter } from "next/router";
import { useAuthContext } from "@/contexts";

import { Video, useVideo } from "@/client/videos";
import { useEffect, useState } from "react";
import useWindowDimensions from "@/hooks/useWindowDimension";
import { GetUserProgress, IWatchedVideo } from "@/services/firebase/progress";
import { Amstel } from "@/features/negociosdeorgulho";
import { ConvertCourses } from "@/utils/convert-courses";
import { handleProgramas } from "@/services/firebase/programas";
import { ICourseEpisode, ICourses } from "@/@types/cousers";
import { useUserFromNickname } from "@/client/users";

const PlayerScreen = () => {
  const router = useRouter();
  const { width = 0 } = useWindowDimensions();
  const { session } = useAuthContext();

  const { programId, moduleId } = router.query;

  const [selectedVideo, setSelectedVideo] = useState<ICourseEpisode>();
  const [programas, setProgramas] = useState<any[]>([]);
  const [watchedVideos, setWatchedVideos] = useState<IWatchedVideo[]>([]);
  const [modulo, setModulo] = useState<any[]>([]);

  const { user } = useUserFromNickname({ id: session?.userId });

  useEffect(() => {
    handleProgramas(setProgramas);
  }, []);

  useEffect(() => {
    session?.userId && GetUserProgress(session?.userId, setWatchedVideos);
  }, [session]);

  useEffect(() => {
    const mod = ConvertCourses(programas, watchedVideos, user?.nickname)
      .find((p) => p?._id === programId)
      ?.modules.find((m) => m?._id === moduleId);
    setModulo(mod as any);

    mod && setSelectedVideo(mod?.episodes[0] as any);
  }, [programas, watchedVideos]);

  const isWatched = !!watchedVideos?.find(
    (w) => w?.id == selectedVideo?.videoId
  );

  const { video } = useVideo({
    videoId: selectedVideo?.videoId as string,
  });

  return (
    <>
      <Amstel.DesktopLayout hasSider={false}></Amstel.DesktopLayout>
      <Amstel.AppLayout></Amstel.AppLayout>
      <div className={styles.Container}>
        <div className={styles.RowVideo}>
          <Player video={video as any} watched={isWatched} />
          <ModuleList
            modulo={modulo as any}
            setSelectedVideo={setSelectedVideo}
            selectedVideo={selectedVideo as any}
          />
        </div>
      </div>
    </>
  );
};

export default withAuth(PlayerScreen);

"use client";
import styles from "./index.module.scss";
import Player from "@/components/Player";
import ModuleList from "@/components/ModuleList";
import { withAuth } from "@/middlewares";
import { useRouter } from "next/router";
import { useAuthContext } from "@/contexts";
import { User, useUser } from "@/client/users";
import { usePlaylist } from "@/client/playlists/usePlaylist";
import { Header } from "@/layouts/desktop/DefaultLayout/Header";
import { Header as HeaderMobile } from "@/layouts/app/DefaultLayout/Header";

import { Video, useVideo } from "@/client/videos";
import { useEffect, useState } from "react";
import useWindowDimensions from "@/hooks/useWindowDimension";
import { GetUserProgress, IWatchedVideo } from "@/services/firebase/progress";
import { Amstel } from "@/features/negociosdeorgulho";

const PlayerScreen = () => {
  const router = useRouter();
  const { width = 0 } = useWindowDimensions();
  const { session } = useAuthContext();

  const [selectedVideo, setSelectedVideo] = useState();
  const [watchedVideos, setWatchedVideos] = useState<IWatchedVideo[]>([]);

  const { playlistId } = router.query;

  const { user } = useUser({
    id: session?.userId,
  });

  const { playlist } = usePlaylist({ playlistId: playlistId as any });

  const programModule = {
    id: playlistId,
    title: playlist?.title,
    thumbnail: playlist?.videos[0]?.thumbnail?.url,
    watched: 0,
    episodes: playlist?.videos || [],
  };

  useEffect(() => {
    user && GetUserProgress(user?.id, setWatchedVideos);
  }, []);

  useEffect(() => {
    !selectedVideo && setSelectedVideo(programModule.episodes[0]);
  }, [programModule]);

  return (
    <>
      <Amstel.DesktopLayout hasSider={false}></Amstel.DesktopLayout>
      <Amstel.AppLayout></Amstel.AppLayout>
      <div className={styles.Container}>
        <div className={styles.RowVideo}>
          {selectedVideo && <Player video={selectedVideo as any} />}
          <ModuleList
            programModule={programModule as any}
            setSelectedVideo={setSelectedVideo}
          />
        </div>
      </div>
    </>
  );
};

export default withAuth(PlayerScreen);

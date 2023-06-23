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

const PlayerScreen = () => {
  const router = useRouter();
  const { session } = useAuthContext();

  const { playlistId } = router.query;

  const { user } = useUser({
    id: session?.userId,
  });

  const { playlist } = usePlaylist({ playlistId: playlistId as any });

  const video = [
    {
      id: 0,
      thumbnail: "image-1.png",
      title: "Por que bons relacionamentos são importantes?",
      postDate: "Há 3 horas",
      url: "https://joy1.videvo.net/videvo_files/video/free/2012-08/large_watermarked/hd0029_preview.mp4",
    },
  ];

  const module = {
    id: playlistId,
    title: playlist?.title,
    thumbnail: playlist?.videos[0]?.thumbnail?.url,
    watched: 0,
    episodes: playlist?.videos?.length,
  };

  return (
    <>
      <Header user={user as User} />
      <div className={styles.Container}>
        <div className={styles.RowVideo}>
          <Player video={video} />
          <ModuleList module={module as any} />
        </div>
      </div>
    </>
  );
};

export default withAuth(PlayerScreen);

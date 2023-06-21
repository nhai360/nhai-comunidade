"use client";
import styles from "./index.module.scss";
import Player from "@/components/Player";
import ModuleList from "@/components/ModuleList";
import { withAuth } from "@/middlewares";
import { useRouter } from "next/router";
import { useAuthContext } from "@/contexts";
import { useUser } from "@/client/users";

const PlayerScreen = () => {
  const router = useRouter();
  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const isAdmin = user?.role?.name === "ADMIN";

  if (!isAdmin) {
    router.push("/");
    return null;
  }

  const video = [
    {
      id: 0,
      thumbnail: "image-1.png",
      title: "Por que bons relacionamentos são importantes?",
      postDate: "Há 3 horas",
      url: "https://joy1.videvo.net/videvo_files/video/free/2012-08/large_watermarked/hd0029_preview.mp4",
    },
  ];

  const modules = [
    {
      id: 0,
      title: "ADMINISTRAÇÃO DE NEGÓCIOS",
      thumbnail: "image-1.png",
      watchedPercentage: 25,
      episodes: 4,
      watchedEpisodes: 1,
      duration: 240,
      videos: [
        {
          id: 0,
          title: "INTRODUÇÃO",
          thumbnail: "image-1.png",
          watchedPercentage: 100,
          duration: 60,
        },
        {
          id: 0,
          title: "Por que bons relacionamentos são importantes?",
          thumbnail: "image-1.png",
          watchedPercentage: 25,
          duration: 60,
        },
        {
          id: 0,
          title: "ADMINISTRAÇÃO DE NEGÓCIOS",
          thumbnail: "image-1.png",
          watchedPercentage: 25,
          duration: 60,
        },
        {
          id: 0,
          title: "ADMINISTRAÇÃO DE NEGÓCIOS",
          thumbnail: "image-1.png",
          watchedPercentage: 25,
          duration: 60,
        },
      ],
    },
  ];

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Row}>
          <div className={styles.Breadcrumb}>
            <span className={styles.BreadcrumbText}>
              {"Contaí Comunidade > Vídeos > "} <strong>Espaço Amstel</strong>
            </span>
          </div>
        </div>

        <div className={styles.RowVideo}>
          <Player video={video} />
          <ModuleList modules={modules} />
        </div>
      </div>
    </>
  );
};

export default withAuth(PlayerScreen);

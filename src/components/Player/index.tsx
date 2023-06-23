import { CommentProvider, useAuthContext } from "@/contexts";
import styles from "./index.module.scss";
import { Post } from "@/features/posts";
import { Video } from "@/client/videos";
import { MuxVideo, Typography } from "@/ui";
import { useUser } from "@/client/users";

interface VideoProps {
  video: Video;
}

const Player: React.FC<VideoProps> = ({ video }) => {
  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const isCreator = video?.author?.id === user?.id;

  return (
    <div className={styles.video}>
      <div style={{ paddingLeft: 20, marginTop: 16 }}>
        <div className={styles.Breadcrumb}>
          <span className={styles.BreadcrumbText}>
            {"Contaí Comunidade > Vídeos > Espaço Amstel > "}{" "}
            <strong>Assistindo Vídeo</strong>
          </span>
        </div>
      </div>

      <div className={styles.videoWrapper}>
      
        <MuxVideo
          playbackId={video.playbackId}
          streamType="on-demand"
          metadata={{
            video_id: video.playbackId,
            video_title: video.title,
            viewer_user_id: session?.userId,
            env_key: process.env.MUX_ENV_KEY_DATA,
          }}
          video={video}
          isCreator={isCreator}
          isMobile={false}
        />
        <span className={styles.videoTitle}>{video?.title}</span>
      
      </div>

      <CommentProvider>
        <Post.CommentField originType={"videos"} origin={video} />
        <Post.CommentList origin={video} originType="videos" expanded />
      </CommentProvider>
    </div>
  );
};

export default Player;

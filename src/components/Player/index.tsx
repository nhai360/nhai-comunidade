import { CommentProvider, useAuthContext } from "@/contexts";
import styles from "./index.module.scss";
import { Post } from "@/features/posts";
import { Video } from "@/client/videos";
import { Avatar, Typography } from "@/ui";
import { useUser } from "@/client/users";
import { getFirstNameAndLastName, getInitials } from "@/lib/string";

import * as S from "@/features/video-player/VideoPlayerCard/VideoPlayerCard.styles";
import { format } from "date-fns";
import { LikeButton } from "@/features/video-player";
import MuxVideo from "@mux/mux-video-react";
import BtnGoBack from "@/ui/BtnGoBack";
import { handleCreateUserProgress } from "@/services/firebase/progress";
import { toast } from "react-toastify";
import { CaretDown, CaretUp, ChatText } from "@phosphor-icons/react";
import { useComments } from "@/client/comments";
import { useState } from "react";
import useWindowDimensions from "@/hooks/useWindowDimension";

interface VideoProps {
  video: Video;
}

const Player: React.FC<VideoProps> = ({ video }) => {
  const { session } = useAuthContext();
  const { width = 0 } = useWindowDimensions();
  const [showComments, setShowComments] = useState(width > 1024);

  const { user } = useUser({
    id: session?.userId,
  });

  const { comments } = useComments(
    {
      originId: video.id,
      originType: "videos",
    },
    {
      enabled: true,
    }
  );

  const isCreator = video?.author?.id === user?.id;
  const createdAt = format(new Date(video?.createdAt), "dd MMM");

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  // Executar isso quando o vídeo acabar
  const handleCompleteVideo = async () => {
    if (user && video) {
      await handleCreateUserProgress(user?.id, video).then(() => {
        toast.success("Episódio concluído :)");
      });
    }
  };

  return (
    <div className={styles.video}>
      <div className={styles.breadcrumb}>
        <BtnGoBack
          style={{ border: "1px solid #dadadd", width: 32, height: 32 }}
          url={"/negocios-de-orgulho"}
        />
        <span className={styles.breadcrumbText}>
          {"Contaí Comunidade > Vídeos > Espaço Amstel > "}{" "}
          <strong className={styles.breadcrumbPageIndicator}>
            Assistindo Vídeo
          </strong>
        </span>
      </div>

      <div className={styles.videoWrapper}>
        <MuxVideo
          playbackId={video?.playbackId as string}
          streamType="on-demand"
          metadata={{
            video_id: video?.playbackId as string,
            video_title: video?.title,
            viewer_user_id: session?.userId,
          }}
          title={video?.title}
          controls
          width={"100%"}
          height={"100%"}
          style={{ backgroundColor: "#323232" }}
          autoPlay
          muted
        />

        <div className={styles.videoDetailsContainer}>
          <span className={styles.videoTitle}>{video?.title}</span>
          <S.UserAndLikeContainer style={{ marginTop: 16 }}>
            <S.UserContainer>
              <Avatar.Square
                size="small"
                style={{ borderRadius: 32 }}
                src={video?.author?.profilePicture?.url}
                fallback={getInitials(video?.author?.fullName)}
              />
              <S.UserInformationContainer>
                <Typography.Text css={{ color: "$textTitle" }}>
                  {getFirstNameAndLastName(video?.author?.fullName)}
                  <S.TimeLabel>{createdAt}</S.TimeLabel>
                </Typography.Text>
                <Typography.Text size="body3" color="secondary">
                  @{video?.author?.nickname}
                </Typography.Text>
              </S.UserInformationContainer>
            </S.UserContainer>

            <LikeButton video={video} />
          </S.UserAndLikeContainer>
        </div>
      </div>

      <section className={styles.commentsSection}>
        <CommentProvider>
          <Post.CommentField originType={"videos"} origin={video} />
          {width < 1024 && <div className={styles.divider}></div>}

          {width < 1024 && (
            <div className={styles.commentsBox} onClick={handleShowComments}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <ChatText size={24} />
                <span
                  className={styles.videoTitle}
                  style={{ fontWeight: showComments ? "bold" : 400 }}
                >
                  {" "}
                  {`Comentários ${comments?.length}`}
                </span>
              </div>
              {showComments ? <CaretUp size={20} /> : <CaretDown size={20} />}
            </div>
          )}
          {showComments ? (
            <Post.CommentList origin={video} originType="videos" expanded />
          ) : undefined}
        </CommentProvider>
      </section>
    </div>
  );
};

export default Player;

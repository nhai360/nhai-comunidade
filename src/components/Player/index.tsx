import { CommentProvider, useAuthContext } from "@/contexts";
import styles from "./index.module.scss";
import { Post } from "@/features/posts";
import { Video } from "@/client/videos";
import { Avatar, MuxVideo, Typography } from "@/ui";
import { useUser } from "@/client/users";
import { getFirstNameAndLastName, getInitials } from "@/lib/string";

import { format } from "date-fns";
import { LikeButton } from "@/features/video-player";
import BtnGoBack from "@/ui/BtnGoBack";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { CaretDown, CaretUp, ChatText } from "@phosphor-icons/react";
import { useComments } from "@/client/comments";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useQuestion } from "@/client/questions";
import { handleCreateUserProgress } from "@/services/firebase/progress";
import { GetUserStartedVideo, handleCreateUserStartedVideo } from "@/services/firebase/started-video";
import { QuestionAnswersDialog } from "@/features/negociosdeorgulho/QuestionAnswersDialog";

import * as S from "@/features/video-player/VideoPlayerCard/VideoPlayerCard.styles";

interface VideoProps {
  video: Video;
  watched: boolean;
}

const Player: React.FC<VideoProps> = ({ video, watched }) => {
  const videoRef = useRef<any>(null);
  const router = useRouter();
  const { session } = useAuthContext();
  // const { width = 0 } = useWindowDimensions();
  const { width = 0 } = useWindowSize();
  const [showComments, setShowComments] = useState(false);
  const [onUserStartedVideo, setOnUserStartedVideo] = useState<any[]>([]);

  const { user } = useUser({
    id: session?.userId,
  });

  const { comments } = useComments(
    {
      originId: video?.id,
      originType: "videos",
    },
    {
      enabled: true,
    }
  );

  const { question, isLoading: loadingQuestion } = useQuestion({
    videoId: video?.id,
  });

  // const { answers, isLoading: loadingAnswers } = useQuestionAnswers({
  //   questionId: question?.id,
  // });

  const [showAnswers, setShowAnswers] = useState(false);

  const isCreator = video?.author?.id === user?.id;
  const createdAt = video ? format(new Date(video?.createdAt), "dd MMM") : "";

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  // Executar isso quando o vídeo acabar
  const handleCompleteVideo = async () => {
    if (user && video && !watched) {
      await handleCreateUserProgress(user?.id, video).then(() => {
        toast.success("Episódio concluído :)");
      });
    }
  };

  // Executar isso quando o iniciar o video pela primeira vez
  const handlePlayerVideo = async () => {
    if (user && video) {
      GetUserStartedVideo(user?.id, setOnUserStartedVideo)

      if (!onUserStartedVideo.length) {
        await handleCreateUserStartedVideo(user?.id, video)
      }
    }
  }

  useEffect(() => {
    width > 1024 && setShowComments(true);
  }, [width]);

  useEffect(() => {
    if (!loadingQuestion && question) {
      const findResponse = question.answers.find((a) => a?.userId === user?.id);
      if (question && !findResponse) {
        if (question?.type === "END" && watched) {
          setShowAnswers(true);
          videoRef?.current?.pause();
        } else {
          setShowAnswers(true);
          videoRef?.current?.pause();
        }
      } else {
        !watched && videoRef?.current?.play();
        setShowAnswers(false);
      }
    } else {
      !loadingQuestion && !watched && videoRef?.current?.play();
      setShowAnswers(false);
    }
  }, [question, watched]);

  return (
    <div className={styles.video}>
      <div className={styles.breadcrumb}>
        <BtnGoBack
          style={{ border: "1px solid #dadadd", width: 32, height: 32 }}
          url={"/negocios-de-orgulho"}
        />
        {/* <span className={styles.breadcrumbText}>
          <Link href="/negocios-de-orgulho">
            <span
              style={{ fontFamily: "RingBold", marginRight: 4, color: "red" }}
            >
              {"Negócios de orgulho >"}
            </span>
          </Link>
          <strong className={styles.breadcrumbPageIndicator}>
            Assistindo episódio
          </strong>
        </span> */}
      </div>

      <div className={styles.videoWrapper}>
        <MuxVideo
          ref={videoRef}
          playbackId={video?.playbackId as string}
          streamType="on-demand"
          metadata={{
            video_id: video?.playbackId as string,
            video_title: video?.title,
            viewer_user_id: session?.userId,
            env_key: process.env.MUX_ENV_KEY_DATA,
          }}
          title={video?.title}
          controls
          width={"100%"}
          height={"100%"}
          style={{ backgroundColor: "#323232", maxHeight: 500 }}
          isAmstel
          onEnded={handleCompleteVideo}
          onPlay={handlePlayerVideo}
        />

        <div className={styles.videoDetailsContainer}>
          <span className={styles.videoTitle}>{video?.title}</span>
          <span className={styles.videoDescription}>{video?.description}</span>
          <S.UserAndLikeContainer style={{ marginTop: 16 }}>
            <S.UserContainer>
              <Avatar.Square
                size={width > 768 ? "large" : "small"}
                style={{ borderRadius: 32 }}
                src={"/amstel.png"}
                fallback={getInitials(video?.author?.fullName)}
              />
              <S.UserInformationContainer>
                <Typography.Text css={{ color: "$textTitle" }}>
                  {getFirstNameAndLastName("Amstel")}
                  <S.TimeLabel>{createdAt}</S.TimeLabel>
                </Typography.Text>
                <Typography.Text size="body3" color="secondary">
                  @amstelbr
                </Typography.Text>
              </S.UserInformationContainer>
            </S.UserContainer>

            <LikeButton isAmstel video={video} />
          </S.UserAndLikeContainer>
        </div>
      </div>

      <section className={styles.commentsSection}>
        <CommentProvider>
          <Post.CommentField isAmstel originType={"videos"} origin={video} />
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
      {showAnswers && question && (
        <QuestionAnswersDialog
          question={question}
          onClose={() => setShowAnswers(false)}
          video={video}
        />
      )}
    </div>
  );
};

export default Player;

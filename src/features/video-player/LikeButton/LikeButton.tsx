import { Button } from "@/ui";
import { HeartIcon } from "@/ui/_icons";

import { useAuthContext } from "@/contexts";
import { Video, useLikeVideo } from "@/client/videos";

type Props = {
  video: Video;
  style?: any;
  isAmstel?: boolean;
};

export function LikeButton({ video, isAmstel, ...rest }: Props) {
  const { likeVideo, isLoading } = useLikeVideo();

  const { session } = useAuthContext();

  const alreadyLiked = Boolean(
    video?.likes?.find((like) => like.author.id === session?.userId)
  );

  function handleLikeVideo() {
    likeVideo({
      videoId: video?.id,
      alreadyLiked,
    });
  }

  return (
    <Button
      {...rest}
      size="medium"
      loading={isLoading}
      css={
        isAmstel
          ? {
              transition: "0.6s ease",
              "&:not(:disabled):hover": {
                background: "#f1f1f1 !important",
              },
            }
          : {}
      }
      style={
        isAmstel
          ? {
              backgroundColor: "white",
              borderRadius: 0,
              border: "unset",
            }
          : {
              textTransform: "unset",
            }
      }
      onClick={handleLikeVideo}
    >
      <HeartIcon
        color={!isAmstel ? "white" : "#EE0014"}
        fill={alreadyLiked ? "#EE0014" : "none"}
      />
      <span
        style={
          isAmstel
            ? {
                textTransform: "uppercase",
                fontFamily: "RingBold",
                color: "black",
              }
            : {
                textTransform: "unset",
              }
        }
      >
        {alreadyLiked ? "Curtido" : "Curtir"}
      </span>
    </Button>
  );
}

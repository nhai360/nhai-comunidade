import { Button } from "@/ui";
import { HeartIcon } from "@/ui/_icons";

import { useAuthContext } from "@/contexts";
import { Video, useLikeVideo } from "@/client/videos";

type Props = {
  video: Video;
};

export function LikeButton({ video }: Props) {
  const { likeVideo, isLoading } = useLikeVideo();

  const { session } = useAuthContext();

  const alreadyLiked = Boolean(
    video.likes?.find((like) => like.author.id === session?.userId),
  );

  function handleLikeVideo() {
    likeVideo({
      videoId: video.id,
      alreadyLiked,
    });
  }

  return (
    <Button
      size="medium"
      loading={isLoading}
      variant="primary"
      onClick={handleLikeVideo}
    >
      <HeartIcon fill={alreadyLiked ? "currentColor" : "none"} />
      <span>{alreadyLiked ? "Curtido" : "Curtir"}</span>
    </Button>
  );
}

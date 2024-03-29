import { Post, useLikePost } from "@/client/posts";
import { useAuthContext } from "@/contexts";
import { Button } from "@/ui";
import { HeartIcon } from "@/ui/_icons";

type Props = {
  post: Post;
  isAmstel?: boolean;
};

export function LikeButton({ post, isAmstel }: Props) {
  const { session } = useAuthContext();

  const { likePost } = useLikePost();

  const alreadyLikedPost = Boolean(
    post.likes.find((like) => like.authorId === session?.userId)
  );

  function handleLikePost() {
    likePost({
      postId: post.id,
      alreadyLiked: alreadyLikedPost,
    });
  }

  return (
    <Button
      ghost
      variant="text"
      size="small"
      css={
        isAmstel
          ? {
              color: "red",
              fontSize: "$caption",
            }
          : { color: "$blueDark", fontSize: "$caption" }
      }
      onClick={handleLikePost}
    >
      <HeartIcon fill={alreadyLikedPost ? "currentColor" : "none"} />
      {post.stats.likes}
    </Button>
  );
}

import { Divider } from "@/ui";

import * as S from "./VideoCommentList.styles";
import { Video } from "@/client/videos";
import { useVideoComments } from "@/client/videoscomments";
import { Comment } from "@/features/comments";

type Props = {
  video: Video;
  expanded?: boolean;
};

export function VideoCommentList({ video, expanded = false }: Props) {
  const { comments = video.comments } = useVideoComments(
    {
      videoId: video.id,
    },
    {
      enabled: expanded,
    }
  );

  const commentsToShow = expanded ? comments : comments.slice(0, 1);
  const maxReplies = expanded ? undefined : 2;

  return (
    <>
      <Divider css={{ marginBlock: "$6" }} />
      <S.Container>
        {/* {commentsToShow.map((comment) => (
          <Comment
            post={post}
            key={comment.id}
            comment={comment}
            maxReplies={maxReplies}
          />
        ))} */}
      </S.Container>
    </>
  );
}

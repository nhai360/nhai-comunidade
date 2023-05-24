import { Divider } from "@/ui";

import { Comment } from "@/features/comments";
import { useComments } from "@/client/comments";

import * as S from "./VideoCommentList.styles";
import { Video } from "@/client/videos";

type Props = {
  video: Video;
  expanded?: boolean;
};

export function VideoCommentList({ video, expanded = false }: Props) {
  // const { comments = video.comments } = useComments(
  //   {
  //     videoId: video.id,
  //   },
  //   {
  //     enabled: expanded,
  //   }
  // );

  const commentsToShow = expanded ? [] : [];
  const maxReplies = expanded ? undefined : 2;

  return (
    <>
      <Divider css={{ marginBlock: "$6" }} />
      {/* <S.Container>
        {commentsToShow.map((comment) => (
          <Comment
            post={post}
            key={comment.id}
            comment={comment}
            maxReplies={maxReplies}
          />
        ))}
      </S.Container> */}
    </>
  );
}

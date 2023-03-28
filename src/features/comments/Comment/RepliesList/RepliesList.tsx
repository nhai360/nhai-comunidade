import { ComponentProps, useState } from "react";

import { Button, Divider } from "@/ui";
import { Comment } from "@/client/comments";
import { Post } from "@/client/posts";

import { PostDialog } from "@/features/posts";

import { Reply } from "../Reply";

import * as S from "./RepliesList.styles";

type Props = {
  post?: Post;
  replies?: Comment[];
  divider?: boolean;
  parentId?: string;
  maxReplies?: number;
} & Partial<ComponentProps<typeof S.Container>>;

export function RepliesList({
  post,
  replies = [],
  divider,
  parentId,
  maxReplies,
  ...rest
}: Props) {
  const [isPostDialogVisible, setIsPostDialogVisible] = useState(false);

  const limitedReplies = maxReplies ? replies.slice(0, maxReplies) : replies;

  const remainingRepliesCount = replies.length - limitedReplies.length;

  if (replies.length === 0) {
    return null;
  }

  return (
    <>
      {isPostDialogVisible && post && (
        <PostDialog post={post} onClose={() => setIsPostDialogVisible(false)} />
      )}

      {divider && <Divider />}
      <S.Container {...rest}>
        {limitedReplies.map((reply) => (
          <Reply key={reply.id} reply={reply} parentId={parentId} />
        ))}
        {remainingRepliesCount > 0 && (
          <Button
            ghost
            variant="text"
            css={{ marginRight: "auto" }}
            onClick={() => setIsPostDialogVisible(true)}
          >
            Ver mais {remainingRepliesCount} respostas
          </Button>
        )}
      </S.Container>
    </>
  );
}

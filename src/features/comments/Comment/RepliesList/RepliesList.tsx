import { ComponentProps, useState } from "react";

import { Button, Divider } from "@/ui";
import { Comment } from "@/client/comments";
import { Post } from "@/client/posts";

import { PostDialog } from "@/features/posts";

import { Reply } from "../Reply";

import * as S from "./RepliesList.styles";

type Props = {
  origin?: Post;
  replies?: Comment[];
  divider?: boolean;
  parentId?: string;
  maxReplies?: number;
  showReplyButton?: boolean;
} & Partial<ComponentProps<typeof S.Container>>;

export function RepliesList({
  origin,
  replies = [],
  divider,
  parentId,
  maxReplies,
  showReplyButton = true,
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
      {isPostDialogVisible && origin && (
        <PostDialog
          postId={origin.id}
          onClose={() => setIsPostDialogVisible(false)}
        />
      )}

      {divider && <Divider />}
      <S.Container {...rest}>
        {limitedReplies.map((reply) => (
          <Reply
            key={reply.id}
            reply={reply}
            parentId={parentId}
            showReplyButton={showReplyButton}
          />
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

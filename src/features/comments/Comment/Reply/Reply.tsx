import { useState } from "react";

import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";

import { Avatar } from "@/ui";
import { defaultPlugins } from "@/ui/TextArea/usePlugins";

import { Comment } from "@/client/comments/types";

import { Wrapper, Container } from "@/features/comments/Comment/Comment.styles";
import { LikeAndReplyButtons } from "@/features/comments/Comment/LikeAndReplyButtons";
import { CommentHeader } from "@/features/comments/Comment/CommentHeader";
import { RepliesList } from "@/features/comments/Comment/RepliesList";

import { getInitials } from "@/lib/string";

import * as S from "./Reply.styles";

type Props = {
  reply: Comment;
  parentId?: string;
};

export function Reply({ reply, parentId }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [content, setContent] = useState(
    reply.content ? createEditorStateWithText(reply.content) : null,
  );

  const repliesCount = reply.replies?.length || 0;

  const hiddenReplies = repliesCount - 3;
  const hasMoreToSee = hiddenReplies > 0;

  const replies = isExpanded ? reply.replies : reply.replies?.slice(0, 3);

  return (
    <>
      <Wrapper>
        <Avatar.Square
          size="small"
          src=""
          alt={reply.author.fullName}
          fallback={getInitials(reply.author.fullName)}
        />
        <Container>
          <CommentHeader comment={reply} />

          {content && (
            <S.Content>
              <Editor
                readOnly
                plugins={defaultPlugins}
                editorState={content}
                onChange={setContent}
              />
            </S.Content>
          )}

          <LikeAndReplyButtons comment={reply} />

          <RepliesList
            replies={replies}
            parentId={reply.id}
            css={{ marginTop: "$4" }}
          />
        </Container>
      </Wrapper>
      {!parentId && hasMoreToSee && (
        <S.SeeMoreButton
          onClick={() => setIsExpanded((prevState) => !prevState)}
        >
          {isExpanded
            ? `Esconder ${hiddenReplies} respostas`
            : `Ver mais ${hiddenReplies} respostas`}
        </S.SeeMoreButton>
      )}
    </>
  );
}

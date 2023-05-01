import { useState } from "react";

import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";

import { Avatar, Button } from "@/ui";
import { defaultPlugins } from "@/ui/TextArea/usePlugins";

import { Comment } from "@/client/comments/types";

import { Wrapper, Container } from "@/features/comments/Comment/Comment.styles";
import { LikeAndReplyButtons } from "@/features/comments/Comment/LikeAndReplyButtons";
import { CommentHeader } from "@/features/comments/Comment/CommentHeader";
import { RepliesList } from "@/features/comments/Comment/RepliesList";

import { getInitials, getProfileUrl } from "@/lib/string";

import * as S from "./Reply.styles";

type Props = {
  reply: Comment;
  parentId?: string;
  showReplyButton?: boolean;
};

export function Reply({ reply, parentId, showReplyButton = true }: Props) {
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
          alt={reply.author.fullName}
          src={reply.author.profilePicture?.url}
          fallback={getInitials(reply.author.fullName)}
          profileUrl={getProfileUrl(reply.author.nickname)}
          level={reply.author.score?.level}
          css={{
            "@mobile": {
              width: "24px",
              height: "24px",
              borderRadius: "4px",
              fontSize: "10px",
            },
          }}
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

          <LikeAndReplyButtons
            comment={reply}
            showReplyButton={showReplyButton}
          />

          <RepliesList
            replies={replies}
            parentId={reply.id}
            css={{ marginTop: "$4" }}
            showReplyButton={false}
          />
        </Container>
      </Wrapper>
      {!parentId && hasMoreToSee && (
        <Button
          ghost
          variant="text"
          css={{ marginRight: "auto" }}
          onClick={() => setIsExpanded((prevState) => !prevState)}
        >
          {isExpanded
            ? `Esconder ${hiddenReplies} respostas`
            : `Ver mais ${hiddenReplies} respostas`}
        </Button>
      )}
    </>
  );
}

import { useState } from "react";

import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";

import { Avatar, Typography } from "@/ui";
import { defaultPlugins } from "@/ui/TextArea/usePlugins";

import { Post } from "@/client/posts";
import { getInitials, getProfileUrl } from "@/lib/string";
import { CommentType, Comment } from "@/client/comments";

import { CommentHeader } from "./CommentHeader";
import { RepliesList } from "./RepliesList";
import { LikeAndReplyButtons } from "./LikeAndReplyButtons";

import { Poll } from "./Poll";
import * as S from "./Comment.styles";

type Props = {
  origin: any;
  comment: Comment;
  maxReplies?: number;
};

const COLORS: Record<CommentType, "pink" | "yellow"> = {
  [CommentType.POLL]: "yellow",
  [CommentType.COMMENT]: "pink",
};

export function CommentComponent({ origin, comment, maxReplies }: Props) {
  const [content, setContent] = useState(
    comment.content ? createEditorStateWithText(comment.content) : null
  );

  return (
    <S.Wrapper>
      <Avatar.Square
        alt={comment.author.fullName}
        src={comment.author.profilePicture?.url}
        fallback={getInitials(comment.author.fullName)}
        profileUrl={getProfileUrl(comment.author.nickname)}
        level={comment.author.score?.level}
        css={{
          "@mobile": {
            width: "42px",
            height: "42px",
            borderRadius: "8px",
          },
        }}
      />
      <S.Container>
        <CommentHeader comment={comment} />
        <S.Content color={COLORS[comment.type]}>
          {comment.title && (
            <Typography.Text size="body2" weight="bold">
              {comment.title}
            </Typography.Text>
          )}

          {content && (
            <Editor
              readOnly
              plugins={defaultPlugins}
              editorState={content}
              onChange={setContent}
            />
          )}

          {comment.type === CommentType.POLL && comment.options && (
            <Poll commentId={comment.id} options={comment.options} />
          )}

          <RepliesList
            origin={origin}
            replies={comment.replies}
            maxReplies={maxReplies}
          />
        </S.Content>
        <LikeAndReplyButtons comment={comment} />
      </S.Container>
    </S.Wrapper>
  );
}

import { useState } from "react";

import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";

import { Avatar, Typography } from "@/ui";
import { defaultPlugins } from "@/ui/TextArea/usePlugins";

import { Post } from "@/client/posts";
import { getInitials, getProfileUrl } from "@/lib/string";
import { Comment as CommentType } from "@/client/comments";

import { CommentHeader } from "./CommentHeader";
import { RepliesList } from "./RepliesList";
import { LikeAndReplyButtons } from "./LikeAndReplyButtons";

import * as S from "./Comment.styles";

type Props = {
  post: Post;
  comment: CommentType;
  maxReplies?: number;
};

export function Comment({ post, comment, maxReplies }: Props) {
  const [content, setContent] = useState(
    comment.content ? createEditorStateWithText(comment.content) : null,
  );

  return (
    <S.Wrapper>
      <Avatar.Square
        alt={comment.author.fullName}
        src={comment.author.profilePicture?.url}
        fallback={getInitials(comment.author.fullName)}
        profileUrl={getProfileUrl(comment.author.nickname)}
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
        <S.Content color="pink">
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

          {/* POLL: {comment.options && <Poll options={comment.options} />} */}

          <RepliesList
            post={post}
            replies={comment.replies}
            maxReplies={maxReplies}
          />
        </S.Content>
        <LikeAndReplyButtons comment={comment} />
      </S.Container>
    </S.Wrapper>
  );
}

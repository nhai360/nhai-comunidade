import { useState } from "react";

import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";

import { Avatar } from "@/ui";
import { defaultPlugins } from "@/ui/TextArea/usePlugins";

import { getInitials } from "@/lib/string";
import { Comment as CommentType } from "@/client/comments";

import { CommentHeader } from "./CommentHeader";
import { RepliesList } from "./RepliesList";
import { LikeAndReplyButtons } from "./LikeAndReplyButtons";

import * as S from "./Comment.styles";

type Props = {
  comment: CommentType;
};

export function Comment({ comment }: Props) {
  const [content, setContent] = useState(
    comment.content ? createEditorStateWithText(comment.content) : null,
  );

  return (
    <S.Wrapper>
      <Avatar.Square
        src=""
        alt={comment.author.fullName}
        fallback={getInitials(comment.author.fullName)}
      />
      <S.Container>
        <CommentHeader comment={comment} />
        <S.Content color="pink">
          {content && (
            <Editor
              readOnly
              plugins={defaultPlugins}
              editorState={content}
              onChange={setContent}
            />
          )}

          {/* POLL: {comment.options && <Poll options={comment.options} />} */}

          <RepliesList replies={comment.replies} />
        </S.Content>
        <LikeAndReplyButtons comment={comment} />
      </S.Container>
    </S.Wrapper>
  );
}

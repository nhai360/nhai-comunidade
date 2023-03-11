import { useState } from "react";

import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";

import { Avatar, Divider, Typography } from "@/ui";
import { plugins } from "@/ui/TextArea/plugins";
import { CommentWithColor } from "@/client/comments";

import { Actions } from "./Actions";

import * as S from "./Comment.styles";
import { Reply } from "./Reply";

type Props = {
  comment: CommentWithColor;
};

export function Comment({ comment }: Props) {
  const [editorState, setEditorState] = useState(
    createEditorStateWithText(comment.content),
  );

  return (
    <S.Wrapper>
      <Avatar.Square
        level={comment.author.level}
        src={comment.author.avatarUrl}
        alt={comment.author.name}
        fallback="JZ"
      />
      <S.Container>
        <S.Header>
          <Typography.Title size="h5" weight="bold">
            {comment.author.name}
          </Typography.Title>
          <Actions comment={comment} />
        </S.Header>
        <S.Content color={comment.color}>
          <Editor
            readOnly
            plugins={plugins}
            editorState={editorState}
            onChange={setEditorState}
          />

          {comment.replies && (
            <>
              <Divider />
              <S.RepliesList>
                {comment.replies.map((reply) => (
                  <Reply key={reply.id} reply={reply} />
                ))}
              </S.RepliesList>
            </>
          )}
        </S.Content>
      </S.Container>
    </S.Wrapper>
  );
}

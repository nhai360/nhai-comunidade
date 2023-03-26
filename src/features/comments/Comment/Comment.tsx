import { useState } from "react";

import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";

import { Avatar, Divider, Typography } from "@/ui";
import { defaultPlugins } from "@/ui/TextArea/usePlugins";

import { getInitials } from "@/lib/string";
import { Comment as CommentType } from "@/client/comments";

import { Reply } from "./Reply";
import { Actions } from "./Actions";

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
        <S.Header>
          <Typography.Title size="h5" weight="bold">
            {comment.author.fullName}
          </Typography.Title>
          <Actions comment={comment} />
        </S.Header>
        <S.Content color="pink">
          {content && (
            <Editor
              readOnly
              plugins={defaultPlugins}
              editorState={content}
              onChange={setContent}
            />
          )}

          {/* {comment.options && <Options options={comment.options} />} */}

          {comment.replies?.length > 0 && (
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

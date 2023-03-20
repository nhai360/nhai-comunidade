import { useState } from "react";

import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";

import { Typography } from "@/ui";
import { defaultPlugins } from "@/ui/TextArea/usePlugins";

import { Post } from "@/client/posts";

import * as S from "./PostContent.styles";

type Props = {
  post: Post;
};

export function PostContent({ post }: Props) {
  const [editorState, setEditorState] = useState(
    createEditorStateWithText(post.content),
  );

  const hasColor = Boolean(post.color);
  const hasFile = Boolean(post.file);

  if (hasColor) {
    return (
      <S.ColoredContainer color={post.color}>
        {post.title && (
          <Typography.Title size="h1" weight="black">
            {post.title}
          </Typography.Title>
        )}
        {post.content && (
          <Editor
            readOnly
            editorState={editorState}
            plugins={defaultPlugins}
            onChange={setEditorState}
          />
        )}
      </S.ColoredContainer>
    );
  }

  return (
    <S.DefaultContainer>
      {post.title && (
        <Typography.Title size="h3" weight="medium">
          {post.title}
        </Typography.Title>
      )}
      {post.content && (
        <Editor
          readOnly
          editorState={editorState}
          plugins={defaultPlugins}
          onChange={setEditorState}
        />
      )}
      {hasFile && <S.Image src={post.file?.preview} />}
    </S.DefaultContainer>
  );
}

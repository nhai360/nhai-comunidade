import { useState } from "react";

import { EditorState, convertFromRaw } from "draft-js";
import Editor from "@draft-js-plugins/editor";

import { Typography } from "@/ui";
import { plugins } from "@/ui/TextArea/plugins";

import { Post } from "@/client/posts";

import * as S from "./Content.styles";

type Props = {
  post: Post;
};

export function Content({ post }: Props) {
  const contentState = convertFromRaw(post.content);

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState),
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
            plugins={plugins}
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
          plugins={plugins}
          onChange={setEditorState}
        />
      )}
      {hasFile && <S.Image src={post.file?.preview} />}
    </S.DefaultContainer>
  );
}

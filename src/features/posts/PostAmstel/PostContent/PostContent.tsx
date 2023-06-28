import { useState } from "react";

import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";

import { Typography } from "@/ui";
import { defaultPlugins } from "@/ui/TextArea/usePlugins";

import { Post } from "@/client/posts";

import * as S from "./PostContent.styles";

type Props = {
  post: Post;
  isAmstel?: boolean;
};

export function PostContent({ post }: Props) {
  const [content, setContent] = useState(
    createEditorStateWithText(post.content)
  );

  const postImageUrl = post.images ? post.images.at(0)?.url : null;

  if (post.color) {
    return (
      <S.ColoredContainer color={post.color}>
        {post.title && (
          <Typography.Title
            size="h1"
            weight="black"
            css={{ "@mobile": { fontSize: "$h4" } }}
          >
            {post.title}
          </Typography.Title>
        )}
        {post.content && (
          <Editor
            readOnly
            editorState={content}
            plugins={defaultPlugins}
            onChange={setContent}
          />
        )}
      </S.ColoredContainer>
    );
  }

  return (
    <S.DefaultContainer>
      {post.title && (
        <Typography.Title
          size="h3"
          weight="medium"
          css={{ "@mobile": { fontSize: "$h4" } }}
        >
          {post.title}
        </Typography.Title>
      )}
      {post.content && (
        <Editor
          readOnly
          editorState={content}
          plugins={defaultPlugins}
          onChange={setContent}
        />
      )}
      {postImageUrl && <S.Image src={postImageUrl} />}
    </S.DefaultContainer>
  );
}

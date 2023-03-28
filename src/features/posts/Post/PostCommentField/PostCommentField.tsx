import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCommentContext } from "@/contexts";
import { Post } from "@/client/posts";
import { Avatar, TextArea, TextAreaRefProps } from "@/ui";
import {
  CreateCommentDecoder,
  CreateCommentParams,
  useCreateComment,
} from "@/client/comments";

import * as S from "./PostCommentField.styles";

type Props = {
  post: Post;
};

export function PostCommentField({ post }: Props) {
  const { replyTo } = useCommentContext();

  const fieldRef = useRef<TextAreaRefProps>(null);

  const { createComment } = useCreateComment();

  const { control, getValues, setError } = useForm<CreateCommentParams>({
    resolver: zodResolver(CreateCommentDecoder),
  });

  function handleSendComment() {
    const content = getValues("content");

    createComment(
      {
        postId: post.id,
        replyId: replyTo?.id,
        content,
      },
      {
        onSuccess: () => {
          fieldRef.current?.clearInput();
        },
        onError: () => {
          setError("content", {
            message: "Não foi possível enviar seu comentário. Tente novamente.",
          });
        },
      },
    );

    return "handled" as "handled";
  }

  return (
    <S.Form>
      <Avatar.Square
        level="56"
        size="small"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        alt="Colm Tuite"
        fallback="CT"
      />
      <TextArea
        ref={fieldRef}
        name="content"
        control={control}
        placeholder="Deixe sua opinião..."
        handleReturn={handleSendComment}
        css={{
          ".public-DraftEditor-content": {
            maxHeight: "50px",
          },
        }}
      />
    </S.Form>
  );
}

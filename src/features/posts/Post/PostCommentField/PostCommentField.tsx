import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthContext, useCommentContext } from "@/contexts";
import { Post } from "@/client/posts";
import { Avatar, Popover, TextArea } from "@/ui";
import { ChatIcon, CloseIcon, PollIcon } from "@/ui/_icons";
import {
  CreateCommentDecoder,
  CreateCommentParams,
  useCreateComment,
} from "@/client/comments";
import { CreatePollPopover } from "@/features/comments";

import { useUser } from "@/client/users";
import { getInitials } from "@/lib/string";

import * as S from "./PostCommentField.styles";

type Props = {
  post: Post;
};

export function PostCommentField({ post }: Props) {
  const { session } = useAuthContext();
  const { fieldRef, replyTo, setReplyTo } = useCommentContext();

  const { createComment } = useCreateComment();

  const { user } = useUser({
    id: session?.userId,
  });

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
          setReplyTo(null);
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

  function handleClearReplyTo() {
    setReplyTo(null);
    fieldRef.current?.clearInput();
  }

  return (
    <S.Form>
      {user && (
        <Avatar.Square
          size="small"
          alt={user.fullName}
          fallback={getInitials(user.fullName)}
        />
      )}
      <TextArea
        ref={fieldRef}
        name="content"
        control={control}
        placeholder={
          replyTo
            ? `Respondendo ${replyTo.author.fullName}`
            : "Deixe sua opinião..."
        }
        handleReturn={handleSendComment}
        css={{
          ".public-DraftEditor-content": {
            maxHeight: "50px",
          },
        }}
        reverseActions={!replyTo}
      >
        {replyTo ? (
          <S.Action type="button" onClick={handleClearReplyTo}>
            <CloseIcon strokeWidth="1.8" />
          </S.Action>
        ) : (
          <>
            <Popover.Root>
              <Popover.Trigger asChild>
                <S.Action type="button">
                  <PollIcon size={28} strokeWidth="1.5" />
                </S.Action>
              </Popover.Trigger>
              <CreatePollPopover />
            </Popover.Root>
            <Popover.Root>
              <Popover.Trigger asChild>
                <S.Action type="button">
                  <ChatIcon size={28} strokeWidth="1.5" />
                </S.Action>
              </Popover.Trigger>
              <CreatePollPopover />
            </Popover.Root>
          </>
        )}
      </TextArea>
    </S.Form>
  );
}

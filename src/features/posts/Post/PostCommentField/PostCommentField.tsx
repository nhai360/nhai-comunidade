import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthContext, useCommentContext } from "@/contexts";
import { Post } from "@/client/posts";
import { Avatar, Button, Popover, TextArea } from "@/ui";
import { ArrowRightIcon, ChatIcon, CloseIcon, PollIcon } from "@/ui/_icons";
import {
  CreateCommentDecoder,
  CreateCommentParams,
  useCreateComment,
} from "@/client/comments";
import {
  CreateDiscussionPopover,
  CreatePollPopover,
} from "@/features/comments";

import { useUser } from "@/client/users";
import { getInitials } from "@/lib/string";
import { FeatureDecoder, useFeatureFlag } from "@/lib/features";

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

  const { control, watch, setError, handleSubmit } =
    useForm<CreateCommentParams>({
      resolver: zodResolver(CreateCommentDecoder),
    });

  const content = watch("content");

  const { isEnabled: isEnabledCreatePoll } = useFeatureFlag(
    FeatureDecoder.Values.CREATE_POLL,
  );
  const { isEnabled: isEnabledCreateDiscussion } = useFeatureFlag(
    FeatureDecoder.Values.CREATE_DISCUSSION,
  );

  function handleSendComment() {
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
    <S.Form onSubmit={handleSubmit(handleSendComment)}>
      {user && (
        <Avatar.Square
          size="small"
          alt={user.fullName}
          fallback={getInitials(user.fullName)}
          css={{
            "@mobile": {
              display: "none",
            },
          }}
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
        {content?.length > 0 && (
          <Button
            icon
            type="submit"
            css={{ width: "24px", borderRadius: "4px" }}
          >
            <ArrowRightIcon size={18} />
          </Button>
        )}
        {replyTo ? (
          <S.Action type="button" onClick={handleClearReplyTo}>
            <CloseIcon strokeWidth="1.8" />
          </S.Action>
        ) : (
          <>
            {isEnabledCreatePoll && content?.length === 0 && (
              <Popover.Root>
                <Popover.Trigger asChild>
                  <S.Action type="button">
                    <PollIcon size={24} strokeWidth="1.5" />
                  </S.Action>
                </Popover.Trigger>
                <CreatePollPopover />
              </Popover.Root>
            )}
            {isEnabledCreateDiscussion && content?.length === 0 && (
              <Popover.Root>
                <Popover.Trigger asChild>
                  <S.Action type="button">
                    <ChatIcon size={24} strokeWidth="1.5" />
                  </S.Action>
                </Popover.Trigger>
                <CreateDiscussionPopover />
              </Popover.Root>
            )}
          </>
        )}
      </TextArea>
    </S.Form>
  );
}

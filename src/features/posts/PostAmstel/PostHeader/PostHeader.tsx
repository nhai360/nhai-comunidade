import { useState } from "react";
import { useAuthContext } from "@/contexts";

import { Avatar, Button, Tooltip, Typography } from "@/ui";
import { CheckIcon, LinkIcon, TrashIcon } from "@/ui/_icons";

import { theme } from "@/../stitches.config";

import { Post, useDeletePost } from "@/client/posts";
import {
  getFirstNameAndLastName,
  getInitials,
  getProfileUrl,
} from "@/lib/string";
import { formatDistanceToNow } from "@/lib/date-fns";

import * as S from "./PostHeader.styles";
import { toast } from "react-toastify";

type Props = {
  post: Post;
  isAmstel?: boolean;
};

export function PostHeader({ post, isAmstel }: Props) {
  const { session } = useAuthContext();

  const [isCopied, setIsCopied] = useState(false);

  const { deletePost, isLoading } = useDeletePost();

  const createdAtFormatted = formatDistanceToNow(new Date(post.createdAt));

  const isAuthorFromPost = post.author.id === session?.userId;

  function handleCopyPostUrl() {
    if (isCopied) return;

    navigator.clipboard.writeText(
      `${window.location.origin}?postId=${post.id}`
    );

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }

  function handleDeletePost() {
    deletePost(
      {
        postId: post.id,
      },
      {
        onSuccess: () => {
          toast.success("Publicação excluída!");
        },
        onError: () => {
          toast.error(
            "Não foi possível excluir sua publicação. Tente novamente."
          );
        },
      }
    );
  }

  return (
    <S.Container css={{ backgroundColor: "red" }}>
      <S.User>
        <Avatar.Square
          src={isAmstel ? "/amstel.png" : post.author.profilePicture?.url}
          alt={post.author.fullName}
          fallback={getInitials(post.author.fullName)}
          profileUrl={getProfileUrl(post.author.nickname)}
          level={post.author.score?.level}
        />

        <S.Info>
          <S.FullName
            css={{ color: "white", fontFamily: "RingBold", fontSize: 24 }}
          >
            {isAmstel
              ? "AMSTEL"
              : getFirstNameAndLastName(post.author.fullName)}
            <Typography.Text
              style={{ color: "white" }}
              color="secondary"
              size="caption"
            >
              {createdAtFormatted} atrás
            </Typography.Text>
          </S.FullName>
          <Typography.Text
            style={{ color: "white" }}
            color="secondary"
            size="caption"
          >
            @{post.author.nickname}
          </Typography.Text>
        </S.Info>
      </S.User>
      <S.Actions>
        {isAuthorFromPost && (
          <Tooltip message="Excluir">
            <Button
              icon
              variant="transparent"
              css={{
                "&:active": {
                  background: "#dadada",
                  color: "white",
                  cursor: "not-allowed",
                },
              }}
              loading={isLoading}
              onClick={handleDeletePost}
            >
              <TrashIcon color={"white"} />
            </Button>
          </Tooltip>
        )}
        <Tooltip message={isCopied ? "Copiado" : "Copiar link"}>
          <Button icon variant="transparent" onClick={handleCopyPostUrl}>
            {isCopied ? (
              <CheckIcon size={20} color={"white"} />
            ) : (
              <LinkIcon color={"white"} />
            )}
          </Button>
        </Tooltip>
      </S.Actions>
    </S.Container>
  );
}

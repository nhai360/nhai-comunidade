import { useState } from "react";
import Link from "next/link";

import { Avatar, Button, Logo, Tag, Tooltip, Typography } from "@/ui";
import { InputSearch } from "@/ui/Input/Search";
import { AddCircleIcon, NotificationIcon } from "@/ui/_icons";

import { CreatePostDialog } from "@/features/posts/CreatePostCard/CreatePostDialog";

import * as S from "./Header.styles";

export function Header() {
  const [isCreatePostDialogVisible, setIsCreatePostDialogVisible] =
    useState(false);

  return (
    <>
      {isCreatePostDialogVisible && (
        <CreatePostDialog onClose={() => setIsCreatePostDialogVisible(false)} />
      )}

      <S.Container>
        <S.Content>
          <Link href="/">
            <Logo variant="rainbow" />
          </Link>
          <S.Actions>
            <InputSearch />
            <Tooltip message="Novo post" position="bottom">
              <Button
                icon
                variant="transparent"
                onClick={() => setIsCreatePostDialogVisible(true)}
              >
                <AddCircleIcon />
              </Button>
            </Tooltip>
            <Tooltip message="Notificações" position="bottom">
              <Button icon variant="transparent">
                <NotificationIcon />
              </Button>
            </Tooltip>
            <Link href="/profile">
              <S.UserContainer>
                <Avatar
                  progressBar
                  src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                  alt="Colm Tuite"
                  fallback="CT"
                />
                <S.UserInfo>
                  <Typography.Text color="primary" weight="medium">
                    Colm Tuite
                  </Typography.Text>
                  <Tag variant="pink">Nível 56</Tag>
                </S.UserInfo>
              </S.UserContainer>
            </Link>
          </S.Actions>
        </S.Content>
      </S.Container>
    </>
  );
}

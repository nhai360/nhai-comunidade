import { useState } from "react";
import Link from "next/link";

import { Avatar, Button, Logo, Tag, Tooltip, Typography } from "@/ui";
import { InputSearch } from "@/ui/Input/Search";
import { AddCircleIcon } from "@/ui/_icons";

import { useSearch } from "@/lib/search";
import {
  getFirstNameAndLastName,
  getInitials,
  getProfileUrl,
} from "@/lib/string";
import { useUser } from "@/client/users";

import { useAuthContext } from "@/contexts";
import { CreatePostDialog } from "@/features/posts/CreatePostCard/CreatePostDialog";

import * as S from "./Header.styles";

export function Header() {
  const { searchTerm, handleChange, handleSearch } = useSearch();

  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

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
            <InputSearch
              value={searchTerm}
              onChange={handleChange}
              onSearch={handleSearch}
            />
            <Tooltip message="Novo post" position="bottom">
              <Button
                icon
                variant="transparent"
                onClick={() => setIsCreatePostDialogVisible(true)}
              >
                <AddCircleIcon />
              </Button>
            </Tooltip>
            {/* <Tooltip message="Notificações" position="bottom">
              <Button icon variant="transparent">
                <NotificationIcon />
              </Button>
            </Tooltip> */}
            <Link href={getProfileUrl(user?.nickname)}>
              <S.UserContainer>
                {user && (
                  <Avatar
                    progressBar
                    alt={user?.fullName}
                    src={user.profilePicture?.url}
                    fallback={getInitials(user.fullName)}
                  />
                )}
                <S.UserInfo>
                  <Typography.Text color="primary" weight="medium">
                    {getFirstNameAndLastName(user?.fullName)}
                  </Typography.Text>
                  {user?.nickname && (
                    <Typography.Text size="body3" color="secondary">
                      @{user?.nickname}
                    </Typography.Text>
                  )}
                  {user?.score && (
                    <Tag variant="pink">Nível {user?.score?.level}</Tag>
                  )}
                </S.UserInfo>
              </S.UserContainer>
            </Link>
          </S.Actions>
        </S.Content>
      </S.Container>
    </>
  );
}

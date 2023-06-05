import { useState } from "react";

import { useRouter } from "next/router";

import { Avatar, Button, Divider, Typography } from "@/ui";

import { useUserFromNickname } from "@/client/users";

import { getInitials } from "@/lib/string";

import { Score } from "./Score";
import { UploadedVideos } from "./UploadedVideos";
import { GeneralInformation } from "./GeneralInformation";
import * as S from "./UserProfileInformation.styles";
import { UploadedArticles } from "./UploadedArticles";

type SelectedTab = "score" | "uploadedVideos" | "uploadedArticles";

export function UserProfileInformation() {
  const router = useRouter();

  const { nickname } = router.query;

  const { user } = useUserFromNickname({
    nickname: nickname as string,
  });

  const [selectedTab, setSelectedTab] = useState<SelectedTab>("score");

  const selectedButtonProps = {
    size: "small",
    variant: "primary",
  } as const;

  const defaultButtonProps = {
    size: "small",
    variant: "transparent",
    css: { color: "$textTitle" },
  } as const;

  const scoreButtonProps =
    selectedTab === "score" ? selectedButtonProps : defaultButtonProps;

  const uploadedVideosButtonProps =
    selectedTab === "uploadedVideos" ? selectedButtonProps : defaultButtonProps;

  const uploadedArticlesButtonProps =
    selectedTab === "uploadedArticles"
      ? selectedButtonProps
      : defaultButtonProps;

  return (
    <S.Container>
      <Avatar
        size="xlarge"
        alt={user?.fullName}
        src={user?.profilePicture?.url}
        fallback={getInitials(user?.fullName)}
        css={{ border: "8px solid $neutral100" }}
      />
      <GeneralInformation />
      <Divider css={{ marginBlock: "$6", borderTopWidth: "2px" }} />
      <S.TabsContainer>
        <Button {...scoreButtonProps} onClick={() => setSelectedTab("score")}>
          Estatísticas
        </Button>
        <Button
          {...uploadedVideosButtonProps}
          onClick={() => setSelectedTab("uploadedVideos")}
        >
          Vídeos
        </Button>
        <Button
          {...uploadedArticlesButtonProps}
          onClick={() => setSelectedTab("uploadedArticles")}
        >
          Articles
        </Button>
      </S.TabsContainer>
      {selectedTab === "score" && <Score />}
      {selectedTab === "uploadedVideos" && <UploadedVideos />}
      {selectedTab === "uploadedArticles" && <UploadedArticles />}
    </S.Container>
  );
}

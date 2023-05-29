import { useMemo, useState } from "react";

import { useRouter } from "next/router";
import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";

import { Typography } from "@/ui";
import { ClockIcon } from "@/ui/_icons";
import { defaultPlugins } from "@/ui/TextArea/usePlugins";

import { useAuthContext } from "@/contexts";
import { useUserFromNickname } from "@/client/users";

import { format } from "@/lib/date-fns";
import { FeatureDecoder, useFeatureFlag } from "@/lib/features";

import { EditProfileButton } from "./EditProfileButton";

import * as S from "./GeneralInformation.styles";

export function GeneralInformation() {
  const { isEnabled: isEnabledProfileLocation } = useFeatureFlag(
    FeatureDecoder.Values.PROFILE_LOCATION
  );

  const [bio, setBio] = useState(createEditorStateWithText(""));

  const router = useRouter();
  const { session } = useAuthContext();

  const { nickname } = router.query;

  const { user } = useUserFromNickname(
    {
      nickname: nickname as string,
    },
    {
      onSuccess: ({ bio }) => {
        setBio(createEditorStateWithText(bio ?? "Nenhuma biografia informada"));
      },
    }
  );

  const createdAtFormatted = useMemo(() => {
    if (!user) return "";

    return format(
      new Date(user?.createdAt as any),
      "'Por aqui desde' MMMM 'de' yyyy"
    );
  }, [user]);

  return (
    <S.Container>
      <S.InformationField>
        <Typography.Text size="h3">{user?.fullName}</Typography.Text>
        {user?.id === session?.userId && <EditProfileButton />}
      </S.InformationField>
      {isEnabledProfileLocation && (
        <S.InformationField>
          <S.InformationField css={{ "@minLaptop": { display: "none" } }}>
            <Typography.Text size="body3">@{user?.nickname}</Typography.Text>
            <Typography.Text size="body3">•</Typography.Text>
          </S.InformationField>
          <S.InformationField>
            <img src="/flags/brasil.svg" />
            <Typography.Text color="secondary" size="body3">
              Brasil, São Paulo
            </Typography.Text>
          </S.InformationField>
        </S.InformationField>
      )}
      <S.InformationField
        css={{
          marginBlock: "$4",

          "@laptop": {
            flexDirection: "column",
            alignItems: "flex-start",
            color: "$textSecondary",

            ".bullet": { display: "none" },
          },
        }}
      >
        <Typography.Text size="body3" css={{ "@laptop": { display: "none" } }}>
          @{user?.nickname}
        </Typography.Text>
        <Typography.Text size="body3" className="bullet">
          •
        </Typography.Text>
        <S.InformationField>
          <ClockIcon />
          <Typography.Text size="body3">{createdAtFormatted}</Typography.Text>
        </S.InformationField>
        {/* <Typography.Text size="body3" className="bullet">
          •
        </Typography.Text>
        <S.InformationField>
          <WatchedVideosIcon />
          <Typography.Text size="body3">
            36 mil minutos de vídeo assistido
          </Typography.Text>
        </S.InformationField>
        <Typography.Text size="body3" className="bullet">
          •
        </Typography.Text>
        <S.InformationField>
          <ArticlesIcon />
          <Typography.Text size="body3">27 artigos lidos</Typography.Text>
        </S.InformationField> */}
      </S.InformationField>
      {bio && (
        <Editor
          readOnly
          editorState={bio}
          plugins={defaultPlugins}
          onChange={setBio}
        />
      )}
    </S.Container>
  );
}

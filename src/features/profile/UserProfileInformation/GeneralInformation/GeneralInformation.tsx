import { useMemo, useState } from "react";

import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";

import { Typography } from "@/ui";
import { ArticlesIcon, ClockIcon, WatchedVideosIcon } from "@/ui/_icons";
import { defaultPlugins } from "@/ui/TextArea/usePlugins";

import { useUser } from "@/client/users";
import { useAuthContext } from "@/contexts";

import { format } from "@/lib/date-fns";
import { FeatureDecoder, useFeatureFlag } from "@/lib/features";

import { EditProfileButton } from "./EditProfileButton";

import * as S from "./GeneralInformation.styles";

export function GeneralInformation() {
  const { isEnabled: isEnabledProfileLocation } = useFeatureFlag(
    FeatureDecoder.Values.PROFILE_LOCATION,
  );

  const [bio, setBio] = useState(createEditorStateWithText(""));

  const { session } = useAuthContext();

  const { user } = useUser(
    {
      id: session?.userId,
    },
    {
      onSuccess: ({ bio }) => {
        setBio(createEditorStateWithText(bio ?? ""));
      },
    },
  );

  const createdAtFormatted = useMemo(() => {
    if (!user) return "";

    return format(new Date(user?.createAt), "'Por aqui desde' MMMM 'de' yyyy");
  }, [user]);

  return (
    <S.Container>
      <S.InformationField>
        <Typography.Text size="h3">{user?.fullName}</Typography.Text>
        <EditProfileButton />
      </S.InformationField>
      {isEnabledProfileLocation && (
        <S.InformationField>
          <img src="/flags/brasil.svg" />
          <Typography.Text color="secondary" size="body3">
            Brasil, São Paulo
          </Typography.Text>
        </S.InformationField>
      )}
      <S.InformationField css={{ marginBlock: "$4" }}>
        <Typography.Text size="body3">@{user?.nickname}</Typography.Text>
        <Typography.Text size="body3">•</Typography.Text>
        <ClockIcon />
        <Typography.Text size="body3">{createdAtFormatted}</Typography.Text>
        <Typography.Text size="body3">•</Typography.Text>
        <WatchedVideosIcon />
        <Typography.Text size="body3">
          36 mil minutos de vídeo assistido
        </Typography.Text>
        <Typography.Text size="body3">•</Typography.Text>
        <ArticlesIcon />
        <Typography.Text size="body3">27 artigos lidos</Typography.Text>
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

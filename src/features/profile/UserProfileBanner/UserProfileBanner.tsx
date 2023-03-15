import { theme } from "@/../stitches.config";

import { EditIcon } from "@/ui/_icons";

import * as S from "./UserProfileBanner.styles";

export function UserProfileBanner() {
  return (
    <S.Container>
      <S.Placeholder />
      <S.EditButton icon variant="transparent">
        <EditIcon size={24} color={theme.colors.textSecondary.value} />
      </S.EditButton>
    </S.Container>
  );
}

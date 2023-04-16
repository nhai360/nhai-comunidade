import { theme } from "@/../stitches.config";

import { EditIcon } from "@/ui/_icons";
import { FeatureDecoder, useFeatureFlag } from "@/lib/features";

import * as S from "./UserProfileBanner.styles";

export function UserProfileBanner() {
  const { isEnabled: isEnabledProfileBanner } = useFeatureFlag(
    FeatureDecoder.Values.PROFILE_BANNER,
  );

  return (
    <S.Container>
      <S.Placeholder />
      {isEnabledProfileBanner && (
        <S.EditButton icon variant="transparent">
          <EditIcon size={24} color={theme.colors.textSecondary.value} />
        </S.EditButton>
      )}
    </S.Container>
  );
}

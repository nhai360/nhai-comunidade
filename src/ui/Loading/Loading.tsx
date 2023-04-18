import { LoadingIcon } from "@/ui/_icons";

import * as S from "./Loading.styles";

type Props = {
  size?: number;
};

export function Loading({ size = 20 }: Props) {
  return (
    <S.Container>
      <LoadingIcon size={size} />
    </S.Container>
  );
}

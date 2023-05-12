import { ComponentProps } from "react";

import * as S from "./ProgressBar.styles";

type Props = {
  currentPercent?: number;
} & ComponentProps<typeof S.Container>;

export function ProgressBar({ currentPercent = 0, ...rest }: Props) {
  return (
    <S.Container {...rest}>
      <S.Filled css={{ width: `${currentPercent}%` }} />
    </S.Container>
  );
}

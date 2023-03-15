import { ComponentProps } from "react";

import * as S from "./Radio.styles";

export type RadioProps = ComponentProps<typeof S.Container>;

export function Radio(props: RadioProps) {
  return (
    <S.Container {...props}>
      <S.Indicator />
    </S.Container>
  );
}

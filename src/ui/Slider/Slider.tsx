import { ComponentProps } from "react";

import * as S from "./Slider.styles";

type Props = ComponentProps<typeof S.Root>;

export function Slider(props: Props) {
  return (
    <S.Root {...props}>
      <S.Track>
        <S.Range />
      </S.Track>
      <S.Thumb />
    </S.Root>
  );
}

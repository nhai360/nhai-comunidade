import { ImgHTMLAttributes, ComponentProps } from "react";

import * as S from "./Square.styles";

type Props = {
  fallback: string;
} & ImgHTMLAttributes<HTMLImageElement> &
  ComponentProps<typeof S.Image>;

export function Square({ fallback, size, ...rest }: Props) {
  return (
    <S.Root>
      <S.Image {...rest} size={size} />
      <S.Fallback delayMs={600} size={size}>
        {fallback}
      </S.Fallback>
    </S.Root>
  );
}

import { ImgHTMLAttributes, ComponentProps } from "react";

import * as S from "./Square.styles";

export type AvatarSquareProps = {
  fallback: string;
  level?: string;
} & ImgHTMLAttributes<HTMLImageElement> &
  ComponentProps<typeof S.Image>;

export function Square({ fallback, size, level, ...rest }: AvatarSquareProps) {
  return (
    <S.Root>
      <S.Image {...rest} size={size} />
      <S.Fallback delayMs={600} size={size}>
        {fallback}
      </S.Fallback>
      {level && <S.LevelTag variant="pink">{level}</S.LevelTag>}
    </S.Root>
  );
}

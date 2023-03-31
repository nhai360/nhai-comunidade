import { ImgHTMLAttributes, ComponentProps } from "react";

import * as S from "./Square.styles";

export type AvatarSquareProps = {
  fallback: string;
  level?: string;
} & ImgHTMLAttributes<HTMLImageElement> &
  ComponentProps<typeof S.Image>;

export function Square({
  fallback,
  size,
  level,
  css,
  ...rest
}: AvatarSquareProps) {
  return (
    <S.Root css={css}>
      <S.Image css={css} {...rest} size={size} />
      <S.Fallback css={css} delayMs={0} size={size}>
        {fallback}
      </S.Fallback>
      {level && <S.LevelTag variant="pink">{level}</S.LevelTag>}
    </S.Root>
  );
}

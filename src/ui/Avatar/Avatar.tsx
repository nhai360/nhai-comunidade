import { ImgHTMLAttributes } from "react";

import { CircularProgressBar } from "@/ui";

import { Square } from "./Square";
import * as S from "./Avatar.styles";

type Props = {
  fallback: string;
} & ImgHTMLAttributes<HTMLImageElement>;

export function Avatar({ fallback, ...rest }: Props) {
  return (
    <S.Root>
      <CircularProgressBar value={75}>
        <S.Image {...rest} />
        <S.Fallback delayMs={600}>{fallback}</S.Fallback>
      </CircularProgressBar>
    </S.Root>
  );
}

Avatar.Square = Square;

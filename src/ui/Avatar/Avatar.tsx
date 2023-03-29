import { ComponentProps } from "react";

import { CircularProgressBar } from "@/ui";

import { Square } from "./Square";
import * as S from "./Avatar.styles";

type Props = {
  fallback: string;
  progressBar?: boolean;
} & ComponentProps<typeof S.Image>;

export function Avatar({
  fallback,
  progressBar = false,
  size = "medium",
  css,
  ...rest
}: Props) {
  if (progressBar) {
    return (
      <S.Root>
        <CircularProgressBar value={75}>
          <S.Image css={css} size={size} {...rest} />
          <S.Fallback css={css} size={size} delayMs={0}>
            {fallback}
          </S.Fallback>
        </CircularProgressBar>
      </S.Root>
    );
  }

  return (
    <S.Root>
      <S.Image css={css} size={size} {...rest} />
      <S.Fallback css={css} size={size} delayMs={0}>
        {fallback}
      </S.Fallback>
    </S.Root>
  );
}

Avatar.Square = Square;

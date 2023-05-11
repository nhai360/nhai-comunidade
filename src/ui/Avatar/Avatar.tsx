import { ComponentProps } from "react";

import { useRouter } from "next/router";

import { CircularProgressBar } from "@/ui";

import { Square } from "./Square";
import * as S from "./Avatar.styles";

type Props = {
  fallback: string;
  progressBar?: boolean;
  src?: string | null;
  profileUrl?: string;
} & Omit<ComponentProps<typeof S.Image>, "src">;

export function Avatar({
  fallback,
  progressBar = false,
  size = "medium",
  css,
  src,
  profileUrl,
  ...rest
}: Props) {
  const router = useRouter();

  function handleNavigate() {
    if (!profileUrl) return;

    router.push(profileUrl);
  }

  if (progressBar) {
    return (
      <S.Root onClick={handleNavigate} profileUrl={!!profileUrl} size={size}>
        <CircularProgressBar value={75}>
          <S.Image css={css} src={src || undefined} size={size} {...rest} />
          <S.Fallback css={css} size={size} delayMs={0}>
            {fallback}
          </S.Fallback>
        </CircularProgressBar>
      </S.Root>
    );
  }

  return (
    <S.Root onClick={handleNavigate} profileUrl={!!profileUrl} size={size}>
      <S.Image css={css} src={src || undefined} size={size} {...rest} />
      <S.Fallback css={css} size={size} delayMs={0}>
        {fallback}
      </S.Fallback>
    </S.Root>
  );
}

Avatar.Square = Square;

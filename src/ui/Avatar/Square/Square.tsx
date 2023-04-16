import { useRouter } from "next/router";

import { ImgHTMLAttributes, ComponentProps } from "react";

import * as S from "./Square.styles";

type Props = ImgHTMLAttributes<HTMLImageElement> &
  ComponentProps<typeof S.Image>;

export type AvatarSquareProps = {
  fallback: string;
  level?: string;
  src?: string | null;
  profileUrl?: string;
} & Omit<Props, "src">;

export function Square({
  fallback,
  size,
  level,
  css,
  src,
  profileUrl,
  ...rest
}: AvatarSquareProps) {
  const router = useRouter();

  function handleNavigate() {
    if (!profileUrl) return;

    router.push(profileUrl);
  }

  return (
    <S.Root css={css} onClick={handleNavigate} profileUrl={!!profileUrl}>
      <S.Image css={css} src={src || undefined} {...rest} size={size} />
      <S.Fallback css={css} delayMs={0} size={size}>
        {fallback}
      </S.Fallback>
      {level && <S.LevelTag variant="pink">{level}</S.LevelTag>}
    </S.Root>
  );
}

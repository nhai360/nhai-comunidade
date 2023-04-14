import { ComponentProps } from "react";

import { Loading } from "@/ui";

import * as S from "./Button.styles";

type Props = {
  loading?: boolean;
} & ComponentProps<typeof S.Container>;

export function Button({
  children,
  loading = false,
  disabled,
  ...props
}: Props) {
  return (
    <S.Container disabled={disabled || loading} {...props}>
      {loading ? <Loading /> : children}
    </S.Container>
  );
}

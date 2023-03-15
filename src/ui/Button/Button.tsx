import { ComponentProps } from "react";

import { LoadingIcon } from "@/ui/_icons/";

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
      {loading ? (
        <S.Loading>
          <LoadingIcon size={20} />
        </S.Loading>
      ) : (
        children
      )}
    </S.Container>
  );
}

import { ComponentProps, ReactNode } from "react";

import * as S from "./Tooltip.styles";

export type TooltipProps = {
  message: string;
  children: ReactNode;
} & ComponentProps<typeof S.Message>;

export function Tooltip({ css, message, children, position }: TooltipProps) {
  return (
    <S.BaseElement css={css}>
      <S.Container>
        <S.Message position={position}>{message}</S.Message>
        <S.Indicator position={position} />
      </S.Container>

      {children}
    </S.BaseElement>
  );
}

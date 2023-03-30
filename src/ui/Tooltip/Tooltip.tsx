import { ComponentProps, ReactNode } from "react";

import * as S from "./Tooltip.styles";

export type TooltipProps = {
  message: ReactNode;
  children: ReactNode;
  width?: string;
} & ComponentProps<typeof S.Message>;

export function Tooltip({
  css,
  message,
  children,
  position,
  width,
}: TooltipProps) {
  return (
    <S.BaseElement css={css}>
      <S.Container>
        <S.Message css={{ width }} position={position}>
          {message}
        </S.Message>
        <S.Indicator position={position} />
      </S.Container>

      {children}
    </S.BaseElement>
  );
}

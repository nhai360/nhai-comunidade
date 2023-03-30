import { ComponentProps, ReactNode } from "react";

import * as S from "./Popover.styles";

type Props = {
  children: ReactNode;
} & ComponentProps<typeof S.Content>;

export function Popover({ children, ...rest }: Props) {
  return (
    <S.Portal>
      <S.Content {...rest}>{children}</S.Content>
    </S.Portal>
  );
}

Popover.Root = S.Root;
Popover.Trigger = S.Trigger;
Popover.Action = S.Action;
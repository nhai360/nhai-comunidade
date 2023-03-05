import { ReactNode } from "react";

import { Button } from "@/ui";
import { CloseIcon } from "@/ui/_icons";

import * as S from "./Dialog.styles";

type Props = {
  title: string;
  children: ReactNode;
};

export function Dialog({ title, children }: Props) {
  return (
    <S.Portal>
      <S.Overlay />
      <S.Content>
        <S.Header>
          <S.Title>{title}</S.Title>

          <S.Close asChild>
            <Button icon variant="transparent" type="button">
              <CloseIcon />
            </Button>
          </S.Close>
        </S.Header>
        <S.Body>{children}</S.Body>
      </S.Content>
    </S.Portal>
  );
}

Dialog.Root = S.Root;

Dialog.Trigger = S.Trigger;

import { ReactNode } from "react";

import { Button } from "@/ui";
import { CloseIcon } from "@/ui/_icons";

import * as S from "./Dialog.styles";

type Props = {
  title?: string;
  children: ReactNode;
  closable?: boolean;
};

export function Dialog({ title, children, closable = true }: Props) {
  return (
    <S.Portal>
      <S.Overlay />
      <S.Content>
        <S.Header>
          {title && <S.Title>{title}</S.Title>}

          {closable && (
            <S.Close asChild>
              <Button icon variant="transparent" type="button">
                <CloseIcon />
              </Button>
            </S.Close>
          )}
        </S.Header>
        <S.Body>{children}</S.Body>
      </S.Content>
    </S.Portal>
  );
}

Dialog.Root = S.Root;

Dialog.Trigger = S.Trigger;

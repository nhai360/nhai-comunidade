import { Button } from "@/ui";
import { CloseIcon } from "@/ui/_icons";

import * as S from "./Header.styles";

type Props = {
  title?: string;
  closable?: boolean;
};

export function DialogHeader({ title, closable }: Props) {
  return (
    <S.Container>
      {title && <S.Title>{title}</S.Title>}

      {closable && (
        <S.Close asChild>
          <Button icon variant="transparent" type="button">
            <CloseIcon />
          </Button>
        </S.Close>
      )}
    </S.Container>
  );
}

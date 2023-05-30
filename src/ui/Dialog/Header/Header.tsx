import { Button } from "@/ui";
import { CloseIcon } from "@/ui/_icons";

import * as S from "./Header.styles";

type Props = {
  title?: string;
  closable?: boolean;
  onClose?: () => void;
};

export function DialogHeader({ title, closable, onClose }: Props) {
  return (
    <S.Container>
      {title && <S.Title>{title}</S.Title>}

      {closable && (
        <S.Close asChild onClick={onClose}>
          <Button icon variant="transparent" type="button">
            <CloseIcon />
          </Button>
        </S.Close>
      )}
    </S.Container>
  );
}

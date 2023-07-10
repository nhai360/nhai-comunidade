import { Button } from "@/ui";
import { CloseIcon } from "@/ui/_icons";

import * as S from "./Header.styles";

type Props = {
  title?: string;
  closable?: boolean;
  onClose?: () => void;
  isAmstel?: boolean;
};

export function DialogHeader({
  title,
  closable,
  onClose,
  isAmstel = false,
}: Props) {
  return (
    <S.Container
      style={isAmstel ? { backgroundColor: "red", color: "white" } : {}}
    >
      {title && <S.Title>{title}</S.Title>}

      {closable && (
        <S.Close asChild onClick={onClose}>
          <Button icon variant="transparent" type="button">
            <CloseIcon color={isAmstel ? 'white' : 'black'} />
          </Button>
        </S.Close>
      )}
    </S.Container>
  );
}

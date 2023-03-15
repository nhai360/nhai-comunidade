import { Typography } from "@/ui";

import { SuccessIcon } from "./SuccessIcon";
import * as S from "./CreatePostSuccess.styles";
import { useEffect } from "react";

type Props = {
  onClose: () => void;
};

export function CreatePostSuccess({ onClose }: Props) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [onClose]);

  return (
    <S.Container>
      <SuccessIcon />
      <Typography.Title size="h3" align="center" weight="bold">
        Seu post foi publicado com sucesso!
      </Typography.Title>
      <Typography.Text
        size="body2"
        color="primary"
        align="center"
        weight="regular"
      >
        Agora que compartilhou seus pensamentos com sua comunidade, só aguardar
        para ver as discussões interessantes que podem surgir.
      </Typography.Text>
    </S.Container>
  );
}

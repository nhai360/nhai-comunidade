import { useEffect } from "react";

import { Typography } from "@/ui";

import { SuccessIcon } from "./SuccessIcon";
import * as S from "./Success.styles";

type Props = {
  title: string;
  description: string;
  onClose: () => void;
};

export function Success({ title, description, onClose }: Props) {
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
        {title}
      </Typography.Title>
      <Typography.Text
        size="body2"
        color="primary"
        align="center"
        weight="regular"
      >
        {description}
      </Typography.Text>
    </S.Container>
  );
}

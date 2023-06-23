import { useEffect, useState } from "react";

import { Button, Typography } from "@/ui";

import { SuccessIcon } from "./SuccessIcon";
import * as S from "./Success.styles";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";

type Props = {
  title: string;
  description: string;
  onClose: () => void;
  automaticClose?: boolean;
  link?: string;
};

export function Success({
  title,
  description,
  onClose,
  automaticClose = true,
  link,
}: Props) {
  const [copied, setCopied] = useState<boolean>();

  useEffect(() => {
    if (automaticClose) {
      const timeout = setTimeout(() => {
        onClose();
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
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

      {link && (
        <div
          style={{
            padding: 16,
            border: "1px solid #dadada",
            margin: "1rem 0",
            borderRadius: 8,
          }}
        >
          <Typography.Text
            size="body2"
            color="primary"
            align="center"
            weight="regular"
          >
            {link}
          </Typography.Text>
        </div>
      )}

      {link && (
        <CopyToClipboard text={`${link}`} onCopy={() => setCopied(!copied)}>
          <Button variant={copied ? "outline" : "primary"}>
            {copied ? "Copiado ✅" : "Copiar link"}
          </Button>
        </CopyToClipboard>
      )}
    </S.Container>
  );
}

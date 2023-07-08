import Link from "next/link";

import { ChevronLeftIcon } from "@/ui/_icons";

import * as S from "./BackButton.styles";

interface IBackButton {
  layoutAmstel?: boolean;
}

export function BackButton({ layoutAmstel }: IBackButton) {
  const link = layoutAmstel
    ? "/auth/register/?layout=negocios-de-orgulho"
    : "/auth/register";
  return (
    <Link href={link}>
      <S.Button icon variant="transparent">
        <ChevronLeftIcon />
      </S.Button>
    </Link>
  );
}

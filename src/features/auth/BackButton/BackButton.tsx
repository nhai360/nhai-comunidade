import Link from "next/link";

import { ChevronLeftIcon } from "@/ui/_icons";

import * as S from "./BackButton.styles";

export function BackButton() {
  return (
    <Link href="/auth/register">
      <S.Button icon variant="transparent">
        <ChevronLeftIcon />
      </S.Button>
    </Link>
  );
}

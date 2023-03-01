import { FiChevronLeft } from "react-icons/fi";

import { theme } from "@/../stitches.config";

import * as S from "./BackButton.styles";
import Link from "next/link";

export function BackButton() {
  return (
    <Link href="/auth/register">
      <S.Button variant="transparent">
        <FiChevronLeft size={18} color={theme.colors.textPrimary.value} />
      </S.Button>
    </Link>
  );
}

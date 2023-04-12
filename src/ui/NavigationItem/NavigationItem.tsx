import { ReactNode } from "react";
import Link from "next/link";

import { Tooltip } from "@/ui";

import * as S from "./NavigationItem.styles";

type Props = {
  children: ReactNode;
  tooltip?: string;
  active?: boolean;
  disabled?: boolean;
};

export function NavigationItem({
  children,
  tooltip,
  active = false,
  disabled = false,
}: Props) {
  if (tooltip) {
    return (
      <Link href="/">
        <Tooltip message={tooltip} position="right">
          <S.NavItem active={active} disabled={disabled}>
            {children}
          </S.NavItem>
        </Tooltip>
      </Link>
    );
  }

  return (
    <Link href="/">
      <S.NavItem active={active} disabled={disabled}>
        {children}
      </S.NavItem>
    </Link>
  );
}

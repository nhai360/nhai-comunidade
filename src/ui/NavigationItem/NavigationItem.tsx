import { ReactNode } from 'react';
import Link from 'next/link';

import { Tooltip } from '@/ui';

import * as S from './NavigationItem.styles';
import { useRouter } from 'next/router';

type Props = {
  children: ReactNode;
  tooltip?: string;
  disabled?: boolean;
  href?: string;
};

export function NavigationItem({
  children,
  tooltip,
  disabled = false,
  href = '/',
}: Props) {
  const router = useRouter();
  const path = router?.pathname?.split('/')[1];

  const active = !disabled && `/${path}` === href;

  if (tooltip) {
    return (
      <Link href={href}>
        <Tooltip message={tooltip} position="right">
          <S.NavItem active={active} disabled={disabled}>
            {children}
          </S.NavItem>
        </Tooltip>
      </Link>
    );
  }

  return (
    <Link href={href}>
      <S.NavItem active={active} disabled={disabled}>
        {children}
      </S.NavItem>
    </Link>
  );
}

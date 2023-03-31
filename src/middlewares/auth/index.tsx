import { ComponentType, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

import { useAuthContext } from "@/contexts";

type NavigateProps = {
  href: string;
};

function Navigate({ href }: NavigateProps) {
  const router = useRouter();

  useEffect(() => {
    router.push(href);
  }, [router, href]);

  return <></>;
}

export function withAuth<T extends { children?: ReactNode }>(
  Component: ComponentType<T>,
) {
  const AuthenticatedComponent = (props: T) => {
    const { isAuthenticated, isLoading } = useAuthContext();

    if (isLoading) {
      return <></>;
    }

    if (isAuthenticated) {
      return <Component {...props} />;
    }

    return <Navigate href="/auth/register" />;
  };

  return AuthenticatedComponent;
}

export function withoutAuth<T extends { children?: ReactNode }>(
  Component: ComponentType<T>,
) {
  const UnauthenticatedComponent = (props: T) => {
    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
      return <Component {...props} />;
    }

    return <Navigate href="/" />;
  };

  return UnauthenticatedComponent;
}

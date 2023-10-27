/* eslint-disable no-void */
import { ComponentType, ReactNode, useEffect } from "react";
import { useAuthContext } from "@/contexts";
import { useRouter } from "next/router";

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
  // const AuthenticatedComponent = (props: T) => {
  //   const { isAuthenticated, isLoading } = useAuthContext();

  //   if (isLoading) return <></>;
  //   if (isAuthenticated) {
  //     return <Component {...props} />;
  //   }

  //   return <Navigate href="/auth/register" />;
  // };

  const AuthenticatedComponent = (props: T) => {
    const router = useRouter()
    const { isAuthenticated, isLoading } = useAuthContext();

    if (typeof window !== 'undefined') {
      if (isLoading) return <></>
  
      if (!isAuthenticated) {
        void router.replace('/auth/register')
        return <></>
      }
  
      return <Component {...props} />
    }
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

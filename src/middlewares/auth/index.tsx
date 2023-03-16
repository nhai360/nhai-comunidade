import { ComponentType, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

import { useAuthContext } from "@/contexts";

export function withAuth<T extends { children?: ReactNode }>(
  Component: ComponentType<T>,
) {
  const AuthenticatedComponent = (props: T) => {
    const router = useRouter();

    const { isAuthenticated } = useAuthContext();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/auth/login");
      }
    }, [isAuthenticated, router]);

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
}

export function withoutAuth<T extends { children?: ReactNode }>(
  Component: ComponentType<T>,
) {
  const UnauthenticatedComponent = (props: T) => {
    const router = useRouter();

    const { isAuthenticated } = useAuthContext();

    useEffect(() => {
      if (isAuthenticated) {
        router.push("/");
      }
    }, [isAuthenticated, router]);

    return <Component {...props} />;
  };

  return UnauthenticatedComponent;
}

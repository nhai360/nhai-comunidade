import { ReactNode, useEffect } from "react";
import { toast } from "react-toastify";
import { QueryClient, useQueryClient } from "react-query";

import { authenticatedAPI } from "@/client";
import { useAuthContext } from "@/contexts";

import { isAfter, addDays, isBefore, parseISO, format } from "@/lib/date-fns";
import { invalidateUserQueries } from "@/client/users";

type ScoreProviderProps = {
  children: ReactNode;
};

function claimXp(userId?: string, queryClient?: QueryClient) {
  authenticatedAPI.get(`/users/${userId}/xp`).then(() => {
    toast.success(
      "Parabéns! Você ganhou +10 pontos por entrar mais um dia consecutivo!",
    );

    const date = parseISO(format(new Date(), "yyyy-MM-dd"));

    localStorage.setItem(
      "@nhai-comunidade:claimedXp",
      JSON.stringify({
        maxDate: addDays(date, 2),
        minDate: addDays(date, 1),
      }),
    );

    if (queryClient) {
      invalidateUserQueries(queryClient);
    }
  });
}

export function ScoreProvider({ children }: ScoreProviderProps) {
  const { session } = useAuthContext();

  const queryClient = useQueryClient();

  useEffect(() => {
    const claimedFromStorage = localStorage.getItem(
      "@nhai-comunidade:claimedXp",
    );

    if (claimedFromStorage) {
      const claimed = JSON.parse(claimedFromStorage);

      const maxDate = parseISO(claimed.maxDate);
      const minDate = parseISO(claimed.minDate);

      const canClaimXp =
        isBefore(new Date(), maxDate) && isAfter(new Date(), minDate);

      if (canClaimXp) {
        claimXp(session?.userId, queryClient);
      }
    } else {
      claimXp(session?.userId, queryClient);
    }
  }, [session, queryClient]);

  return <>{children}</>;
}

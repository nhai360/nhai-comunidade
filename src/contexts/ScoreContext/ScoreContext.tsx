import { ReactNode, useEffect } from "react";

import { authenticatedAPI } from "@/client";
import { useAuthContext } from "@/contexts";
import { isAfter, addDays, isBefore, parseISO } from "@/lib/date-fns";

type ScoreProviderProps = {
  children: ReactNode;
};

function claimXp(userId?: string) {
  authenticatedAPI.get(`/users/${userId}/xp`).then(() => {
    localStorage.setItem(
      "@nhai-comunidade:claimedXp",
      JSON.stringify({
        maxDate: addDays(new Date(), 2),
        minDate: addDays(new Date(), 1),
      }),
    );
  });
}

export function ScoreProvider({ children }: ScoreProviderProps) {
  const { session } = useAuthContext();

  useEffect(() => {
    const claimedFromStorage = localStorage.getItem(
      "@nhai-comunidade:claimedXp",
    );

    if (claimedFromStorage) {
      const claimed = JSON.parse(claimedFromStorage);

      const maxDate = parseISO(claimed.maxDate);
      const minDate = parseISO(claimed.minDate);

      const canClaimXp =
        isBefore(maxDate, new Date()) && isAfter(minDate, new Date());

      if (canClaimXp) {
        claimXp(session?.userId);
      }
    } else {
      claimXp(session?.userId);
    }
  }, [session]);

  return <>{children}</>;
}

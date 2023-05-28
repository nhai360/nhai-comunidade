import { useUser } from "@/client/users";
import { useAuthContext } from "@/contexts";
import { Videos } from "@/features/videos";
import { withAuth } from "@/middlewares";
import { useEffect } from "react";

function StagePage() {
  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const isAdmin = user?.role?.name === "ADMIN";

  if (!isAdmin) {
    return null;
  }

  return <></>;
}

export default withAuth(StagePage);
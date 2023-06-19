import { useUser } from "@/client/users";
import { useAuthContext } from "@/contexts";
import { withAuth } from "@/middlewares";
import { Lives } from "@/features/lives";
import { CreateBroadcastDialog } from "@/features/broadcast/CreateBroadcastCard";
import { useState } from "react";
import { useRouter } from "next/router";
import { UserLivesProvider } from "@/contexts/UserLiveContext";

function StagePage() {
  const router = useRouter();
  const { session } = useAuthContext();
  const [isCreateBroadcastDialogVisible, setIsCreateBroadcastDialogVisible] =
    useState(false);

  const { user } = useUser({
    id: session?.userId,
  });

  const isAdmin = user?.role?.name === "ADMIN";

  if (!isAdmin) {
    router.push("/");
    return null;
  }

  return (
    <UserLivesProvider userId={session?.userId || ""}>
      <Lives.DesktopLayout
        handleCreate={() => setIsCreateBroadcastDialogVisible(true)}
      />
      <Lives.AppLayout
        handleCreate={() => setIsCreateBroadcastDialogVisible(true)}
      />

      {isCreateBroadcastDialogVisible && (
        <CreateBroadcastDialog
          onClose={() => setIsCreateBroadcastDialogVisible(false)}
        />
      )}
    </UserLivesProvider>
  );
}

export default withAuth(StagePage);

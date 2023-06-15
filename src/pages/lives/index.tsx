import { useUser } from "@/client/users";
import { useAuthContext } from "@/contexts";
import { withAuth } from "@/middlewares";
import { Lives } from "@/features/lives";
import { LivesProvider } from "@/contexts/LiveContext";
import { CreateBroadcastDialog } from "@/features/broadcast/CreateBroadcastCard";
import { useState } from "react";

function StagePage() {
  const { session } = useAuthContext();
  const [isCreateBroadcastDialogVisible, setIsCreateBroadcastDialogVisible] =
    useState(false);

  const { user } = useUser({
    id: session?.userId,
  });

  const isAdmin = user?.role?.name === "ADMIN";

  if (!isAdmin) {
    return null;
  }

  return (
    <LivesProvider nickname={user?.nickname}>
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
    </LivesProvider>
  );
}

export default withAuth(StagePage);

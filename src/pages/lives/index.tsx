import { useUser } from "@/client/users";
import { useAuthContext } from "@/contexts";
import { withAuth } from "@/middlewares";
import { Lives } from "@/features/lives";
import { LivesProvider } from "@/contexts/LiveContext";

function StagePage() {
  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const isAdmin = user?.role?.name === "ADMIN";

  if (!isAdmin) {
    return null;
  }

  return (
    <LivesProvider nickname={user?.nickname}>
      <Lives.DesktopLayout />
      <Lives.AppLayout />
    </LivesProvider>
  );
}

export default withAuth(StagePage);

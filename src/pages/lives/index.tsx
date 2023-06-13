import { useUser } from "@/client/users";
import { useAuthContext } from "@/contexts";
import { withAuth } from "@/middlewares";
import { Lives } from "@/features/lives";

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
    <>
      <Lives.DesktopLayout />
      <Lives.AppLayout />
    </>
  );
}

export default withAuth(StagePage);

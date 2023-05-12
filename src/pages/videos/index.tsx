import { useUser } from "@/client/users";
import { useAuthContext } from "@/contexts";
import { Videos } from "@/features/videos";
import { withAuth } from "@/middlewares";

function VideosPage() {
  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const isEnabled =
    user?.email.endsWith("@nhai360.com") ||
    user?.email.endsWith("@catency.com");

  if (!isEnabled) {
    return null;
  }

  return <Videos.DesktopLayout />;
}

export default withAuth(VideosPage);

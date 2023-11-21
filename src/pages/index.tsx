import { Feed } from "@/features/feed";
import { withAuth } from "../middlewares";
import { FeedProvider, useAuthContext } from "@/contexts";
import { useUser } from "@/client/users";
import { useRouter } from "next/router";

function FeedPage() {
  const router = useRouter();

  const { session } = useAuthContext();

  if (!session?.userId) {
    router.push('/auth/login');
  }

  return (
    <FeedProvider>
      <Feed.DesktopLayout />
      <Feed.AppLayout />
    </FeedProvider>
  );
}

export default withAuth(FeedPage);

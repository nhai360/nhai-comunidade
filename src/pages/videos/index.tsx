import { useUser } from '@/client/users';
import { useAuthContext } from '@/contexts';
import { Videos } from '@/features/videos';
import { withAuth } from '@/middlewares';
import { useEffect } from 'react';

function VideosPage() {
  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const isAdmin = user?.role?.name === 'ADMIN';

  if (!isAdmin) {
    return null;
  }

  return <Videos.DesktopLayout />;
}

export default withAuth(VideosPage);

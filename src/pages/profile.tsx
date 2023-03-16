import { AppLayout } from "@/layouts";

import { UserProfileBanner, UserProfileInformation } from "@/features/profile";
import { withAuth } from "@/middlewares";

function Profile() {
  return (
    <AppLayout>
      <AppLayout.SimpleGrid>
        <UserProfileBanner />
        <UserProfileInformation />
      </AppLayout.SimpleGrid>
    </AppLayout>
  );
}

export default withAuth(Profile);

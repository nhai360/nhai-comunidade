import { AppLayout } from "@/layouts";

import { UserProfileBanner, UserProfileInformation } from "@/features/profile";
import { withAuth } from "@/middlewares";
import { FeatureDecoder, useFeatureFlag } from "@/lib/features";

function Profile() {
  const isEnabled = useFeatureFlag(FeatureDecoder.Values.PROFILE);

  if (!isEnabled) {
    return null;
  }

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

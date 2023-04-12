import { DefaultLayout } from "@/layouts/desktop";

import { UserProfileBanner, UserProfileInformation } from "@/features/profile";
import { withAuth } from "@/middlewares";
import { FeatureDecoder, useFeatureFlag } from "@/lib/features";

function Profile() {
  const isEnabled = useFeatureFlag(FeatureDecoder.Values.PROFILE);

  if (!isEnabled) {
    return null;
  }

  return (
    <DefaultLayout>
      <DefaultLayout.SimpleGrid>
        <UserProfileBanner />
        <UserProfileInformation />
      </DefaultLayout.SimpleGrid>
    </DefaultLayout>
  );
}

export default withAuth(Profile);

// import { useRouter } from "next/router";

import { DefaultLayout } from "@/layouts/desktop";

import { FeatureDecoder, useFeatureFlag } from "@/lib/features";
import { UserProfileBanner, UserProfileInformation } from "@/features/profile";
import { withAuth } from "@/middlewares";

function Profile() {
  // const router = useRouter();

  const isEnabled = useFeatureFlag(FeatureDecoder.Values.PROFILE);

  // const { nickname } = router.query;

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

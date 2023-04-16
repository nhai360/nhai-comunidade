// import { useRouter } from "next/router";

import { FeatureDecoder, useFeatureFlag } from "@/lib/features";
import { Profile } from "@/features/profile";
import { withAuth } from "@/middlewares";

function ProfilePage() {
  // const router = useRouter();

  const isEnabled = useFeatureFlag(FeatureDecoder.Values.PROFILE);

  // const { nickname } = router.query;

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <Profile.AppLayout />
      <Profile.DesktopLayout />
    </>
  );
}

export default withAuth(ProfilePage);

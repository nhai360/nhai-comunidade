import { Profile } from "@/features/profile";
import { withAuth } from "@/middlewares";

function ProfilePage() {
  return (
    <>
      <Profile.AppLayout />
      <Profile.DesktopLayout />
    </>
  );
}

export default withAuth(ProfilePage);

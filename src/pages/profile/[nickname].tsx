import { Profile } from "@/features/profile";
import { withAuth } from "@/middlewares";
import { useRouter } from "next/router";
import { useEffect } from "react";

function ProfilePage() {
  const router = useRouter();

  const { nickname } = router.query;

  useEffect(() => {
    nickname === process.env.NEXT_PUBLIC_NEGOCIOS_DE_ORGULHO &&
      router.push("/negocios-de-orgulho");
  }, [nickname]);

  return (
    <>
      <Profile.AppLayout />
      <Profile.DesktopLayout />
    </>
  );
}

export default withAuth(ProfilePage);

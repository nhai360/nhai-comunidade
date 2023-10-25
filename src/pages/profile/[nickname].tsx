import { Profile } from "@/features/profile";
import { withAuth } from "@/middlewares";
import { useRouter } from "next/router";
import { useEffect } from "react";

import IPInfo from 'ip-info-react';

function ProfilePage() {
  const router = useRouter();

  const { nickname } = router.query;

  useEffect(() => {
    nickname === process.env.NEXT_PUBLIC_NEGOCIOS_DE_ORGULHO &&
      router.push("/negocios-de-orgulho");
  }, [nickname]);

  return (
    <IPInfo>
      <Profile.AppLayout />
      <Profile.DesktopLayout />
    </IPInfo>
  );
}

export default withAuth(ProfilePage);

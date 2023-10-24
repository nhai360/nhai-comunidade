import { AuthLayout } from "@/layouts/desktop";
import { RegisterForm } from "@/features/auth";
import { withoutAuth } from "@/middlewares";
import { useRouter } from "next/router";

import IPInfo from 'ip-info-react';

function Register() {
  const router = useRouter();

  const layoutAmstel = router?.query?.layout === "negocios-de-orgulho";
  return (
    <AuthLayout
      layoutAmstel={layoutAmstel}
      title="Seja bem-vind@ à comunidade!"
    >
      <IPInfo>
        <RegisterForm layoutAmstel={layoutAmstel} />
      </IPInfo>
    </AuthLayout>
  );
}

export default withoutAuth(Register);

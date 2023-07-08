import { AuthLayout } from "@/layouts/desktop";
import { RegisterForm } from "@/features/auth";
import { withoutAuth } from "@/middlewares";
import { useRouter } from "next/router";

function Register() {
  const router = useRouter();

  const layoutAmstel = router?.query?.layout === "negocios-de-orgulho";
  return (
    <AuthLayout
      layoutAmstel={layoutAmstel}
      title="Seja bem-vind@ à comunidade!"
    >
      <RegisterForm layoutAmstel={layoutAmstel} />
    </AuthLayout>
  );
}

export default withoutAuth(Register);

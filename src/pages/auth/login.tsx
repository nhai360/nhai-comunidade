import { AuthLayout } from "@/layouts/desktop";
import { BackButton, LoginForm } from "@/features/auth";
import { withoutAuth } from "@/middlewares";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();

  const layoutAmstel = router?.query?.layout === "negocios-de-orgulho";

  return (
    <AuthLayout
      layoutAmstel={layoutAmstel}
      title="Que bom te ver, seja bem vind@ de volta!"
    >
      <BackButton layoutAmstel={layoutAmstel} />
      <LoginForm layoutAmstel={layoutAmstel} />
    </AuthLayout>
  );
}

export default withoutAuth(Login);

import { AuthLayout } from "@/layouts";
import { BackButton, LoginForm } from "@/features/auth";
import { withoutAuth } from "@/middlewares";

function Login() {
  return (
    <AuthLayout title="Que bom te ver, seja bem vind@ de volta!">
      <BackButton />
      <LoginForm />
    </AuthLayout>
  );
}

export default withoutAuth(Login);

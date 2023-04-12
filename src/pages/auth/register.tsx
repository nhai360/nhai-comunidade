import { AuthLayout } from "@/layouts/desktop";
import { RegisterForm } from "@/features/auth";
import { withoutAuth } from "@/middlewares";

function Register() {
  return (
    <AuthLayout title="Seja bem-vind@ à comunidade!">
      <RegisterForm />
    </AuthLayout>
  );
}

export default withoutAuth(Register);

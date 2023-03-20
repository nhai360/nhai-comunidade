import Head from "next/head";

import { AuthLayout } from "@/layouts";
import { RegisterForm } from "@/features/auth";
import { withoutAuth } from "@/middlewares";

function Register() {
  return (
    <>
      <Head>
        <title>Contai Comunidade</title>
      </Head>

      <AuthLayout title="Seja bem-vind@ à comunidade!">
        <RegisterForm />
      </AuthLayout>
    </>
  );
}

export default withoutAuth(Register);

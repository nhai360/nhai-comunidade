import { AuthLayout } from "@/layouts";
import { RegisterForm } from "@/features/auth";

import Head from "next/head";

export default function Register() {
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

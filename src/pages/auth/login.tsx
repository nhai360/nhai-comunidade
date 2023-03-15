import { AuthLayout } from "@/layouts";
import { BackButton, LoginForm } from "@/features/auth";

import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Contai Comunidade</title>
      </Head>

      <AuthLayout title="Que bom te ver, seja bem vind@ de volta!">
        <BackButton />
        <LoginForm />
      </AuthLayout>
    </>
  );
}

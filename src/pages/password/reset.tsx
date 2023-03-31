import { useState } from "react";

import { PasswordLayout } from "@/layouts";
import { withoutAuth } from "@/middlewares";
import { CreateSessionParams } from "@/client/users";
import { ResetPasswordForm, ResetPasswordSuccess } from "@/features/password";

function ResetPassword() {
  const [sessionParams, setSessionParams] =
    useState<CreateSessionParams | null>(null);

  function handleResetPassword(params: CreateSessionParams) {
    setSessionParams(params);
  }

  if (sessionParams) {
    return <ResetPasswordSuccess {...sessionParams} />;
  }

  return (
    <PasswordLayout>
      <PasswordLayout.Title>Crie sua nova senha</PasswordLayout.Title>
      <PasswordLayout.Description>
        Sua nova senha precisa ser diferente da sua senha anterior
      </PasswordLayout.Description>

      <ResetPasswordForm onResetPassword={handleResetPassword} />
    </PasswordLayout>
  );
}

export default withoutAuth(ResetPassword);

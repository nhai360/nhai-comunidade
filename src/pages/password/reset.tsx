import { useState } from "react";

import { Typography } from "@/ui";
import { PasswordLayout } from "@/layouts";
import { withoutAuth } from "@/middlewares";
import { ResetPasswordForm, ResetPasswordSuccess } from "@/features/password";

function ResetPassword() {
  const [isSuccess, setIsSuccess] = useState(false);

  function handleResetPassword() {
    setIsSuccess(true);
  }

  if (isSuccess) {
    return <ResetPasswordSuccess />;
  }

  return (
    <PasswordLayout>
      <Typography.Title size="h1" weight="black" color="title">
        Crie sua nova senha
      </Typography.Title>
      <Typography.Text size="body2" color="secondary" align="center">
        Sua nova senha precisa ser diferente da sua senha anterior
      </Typography.Text>

      <ResetPasswordForm onResetPassword={handleResetPassword} />
    </PasswordLayout>
  );
}

export default withoutAuth(ResetPassword);

import { useState } from "react";
import Link from "next/link";

import { Button, Typography } from "@/ui";
import { PasswordLayout } from "@/layouts";
import { RecoverPasswordForm } from "@/features/password";
import { withoutAuth } from "@/middlewares";

function RecoverPassword() {
  const [sendedEmail, setSendedEmail] = useState<string | null>(null);

  const isSendedEmail = Boolean(sendedEmail);

  if (isSendedEmail) {
    return (
      <PasswordLayout>
        <Typography.Title size="h1" weight="black" color="title">
          Verifique seu e-mail
        </Typography.Title>
        <Typography.Text size="body2" color="secondary" align="center">
          Nós te enviamos um link para resetar sua senha para o e-mail:
        </Typography.Text>
        <Typography.Text size="body2" weight="bold">
          {sendedEmail}
        </Typography.Text>

        <Link
          href={`mailto:${sendedEmail}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ width: "100%" }}
        >
          <Button fullWidth css={{ marginBlock: "$8" }}>
            Abrir meu aplicativo de e-mail
          </Button>
        </Link>
      </PasswordLayout>
    );
  }

  return (
    <PasswordLayout>
      <Typography.Title size="h1" weight="black" color="title">
        Esqueceu sua senha?
      </Typography.Title>
      <Typography.Text size="body2" color="secondary" align="center">
        Não se preocupe, vamos te ajudar a resetar sua senha, ok?
      </Typography.Text>

      <RecoverPasswordForm onSendEmail={setSendedEmail} />
    </PasswordLayout>
  );
}

export default withoutAuth(RecoverPassword);
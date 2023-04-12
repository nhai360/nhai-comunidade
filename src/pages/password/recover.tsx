import { useState } from "react";
import Link from "next/link";

import { Button, Typography } from "@/ui";
import { PasswordLayout } from "@/layouts/desktop";
import { RecoverPasswordForm } from "@/features/password";
import { withoutAuth } from "@/middlewares";

function RecoverPassword() {
  const [sendedEmail, setSendedEmail] = useState<string | null>(null);

  const isSendedEmail = Boolean(sendedEmail);

  if (isSendedEmail) {
    return (
      <PasswordLayout>
        <PasswordLayout.Title>Verifique seu e-mail</PasswordLayout.Title>
        <PasswordLayout.Description>
          Nós te enviamos um link para resetar sua senha para o e-mail:
        </PasswordLayout.Description>
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
      <PasswordLayout.Title>Esqueceu sua senha?</PasswordLayout.Title>
      <PasswordLayout.Description>
        Não se preocupe, vamos te ajudar a resetar sua senha, ok?
      </PasswordLayout.Description>

      <RecoverPasswordForm onSendEmail={setSendedEmail} />
    </PasswordLayout>
  );
}

export default withoutAuth(RecoverPassword);

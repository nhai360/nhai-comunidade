import { useRouter } from "next/router";

import { useAuthContext } from "@/contexts";
import { Button, Typography } from "@/ui";
import { PasswordLayout } from "@/layouts";

export function ResetPasswordSuccess() {
  const router = useRouter();

  const { login } = useAuthContext();

  function handleLogin() {
    login();

    router.push("/");
  }

  return (
    <PasswordLayout>
      <Typography.Title size="h1" weight="black" color="title">
        Sua senha foi resetada
      </Typography.Title>
      <Typography.Text size="body2" color="secondary" align="center">
        Sua senha foi resetada com sucesso. Clique no botão a baixo
        <br />
        para fazer login magicamente!
      </Typography.Text>

      <Button
        fullWidth
        onClick={handleLogin}
        css={{ maxWidth: "442px", marginBlock: "$6" }}
      >
        Continuar
      </Button>
    </PasswordLayout>
  );
}

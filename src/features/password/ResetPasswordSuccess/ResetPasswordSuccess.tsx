import { useRouter } from "next/router";

import { Button } from "@/ui";
import { PasswordLayout } from "@/layouts/desktop";
import { useAuthContext } from "@/contexts";
import { authenticatedAPI } from "@/client";
import { useCreateSession } from "@/client/users";

type Props = {
  email: string;
  password: string;
};

export function ResetPasswordSuccess({ email, password }: Props) {
  const router = useRouter();

  const { login } = useAuthContext();

  const { createSession, isLoading } = useCreateSession();

  function handleLogin() {
    createSession(
      { email, password, remember: true },
      {
        onSuccess: (response) => {
          authenticatedAPI.defaults.headers.Authorization = `Bearer ${response.access_token}`;

          login({
            session: response,
            remember: true,
          });

          router.push("/");
        },
      },
    );
  }

  return (
    <PasswordLayout>
      <PasswordLayout.Title>Sua senha foi resetada</PasswordLayout.Title>
      <PasswordLayout.Description>
        Sua senha foi resetada com sucesso. Clique no botão a baixo
        <br />
        para fazer login magicamente!
      </PasswordLayout.Description>

      <Button
        fullWidth
        onClick={handleLogin}
        css={{ maxWidth: "442px", marginBlock: "$6" }}
        loading={isLoading}
      >
        Continuar
      </Button>
    </PasswordLayout>
  );
}

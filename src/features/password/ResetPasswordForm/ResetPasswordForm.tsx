import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Field } from "@/ui";
import {
  ResetPasswordAndConfirmationDecoder,
  ResetPasswordParams,
  useResetPassword,
} from "@/client/password";
import { CreateSessionParams } from "@/client/users";

import * as S from "./ResetPasswordForm.styles";

type Props = {
  onResetPassword: (params: CreateSessionParams) => void;
};

export function ResetPasswordForm({ onResetPassword }: Props) {
  const router = useRouter();

  const { resetPassword, isLoading } = useResetPassword();

  const { formState, register, handleSubmit, setError } =
    useForm<ResetPasswordParams>({
      resolver: zodResolver(ResetPasswordAndConfirmationDecoder),
    });

  const { errors } = formState;
  const { uid } = router.query;

  function handleSendEmail({ password }: ResetPasswordParams) {
    if (!uid || typeof uid !== "string") return;

    resetPassword(
      {
        password,
        uid,
      },
      {
        onSuccess: (user) => {
          onResetPassword({
            email: user.email,
            password,
            remember: true,
          });
        },
        onError: () => {
          setError("password", {
            message: "Seu token expirou, tente novamente com outro link",
          });
        },
      },
    );
  }

  return (
    <S.Container onSubmit={handleSubmit(handleSendEmail)}>
      <S.FieldContainer>
        <Field.Input
          required
          type="password"
          label="Senha"
          placeholder="Digite sua nova senha"
          errorText={errors.password?.message}
          helperText="Sua nova senha precisa ter no mínimo 8 dígitos e que contenha, números, letras e símbolos"
          {...register("password")}
        />
        <Field.Input
          required
          type="password"
          label="Confirmar senha"
          placeholder="Confirme sua nova senha"
          errorText={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Button fullWidth type="submit" loading={isLoading}>
          Resetar senha
        </Button>
      </S.FieldContainer>
    </S.Container>
  );
}

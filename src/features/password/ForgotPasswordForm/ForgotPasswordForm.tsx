import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Field } from "@/ui";
import {
  RecoverPasswordDecoder,
  RecoverPasswordParams,
  useRecoverPassword,
} from "@/client/password";

import * as S from "./ForgotPasswordForm.styles";

type Props = {
  onSendEmail: (email: string) => void;
};

export function ForgotPasswordForm({ onSendEmail }: Props) {
  const { formState, register, handleSubmit, setError } =
    useForm<RecoverPasswordParams>({
      resolver: zodResolver(RecoverPasswordDecoder),
    });

  const { errors } = formState;

  const { recoverPassword, isLoading } = useRecoverPassword();

  function handleRecoverPassword({ email }: RecoverPasswordParams) {
    recoverPassword(
      {
        email,
      },
      {
        onSuccess: () => {
          onSendEmail(email);
        },
        onError: () => {
          setError("email", {
            message: "Não foi possível enviar e-mail de recuperação de senha.",
          });
        },
      },
    );
  }

  return (
    <S.Container onSubmit={handleSubmit(handleRecoverPassword)}>
      <S.FieldContainer>
        <Field.Input
          required
          label="E-mail"
          placeholder="Digite seu e-mail"
          errorText={errors.email?.message}
          {...register("email")}
        />
        <Button fullWidth type="submit" loading={isLoading}>
          Resetar senha
        </Button>
      </S.FieldContainer>
    </S.Container>
  );
}

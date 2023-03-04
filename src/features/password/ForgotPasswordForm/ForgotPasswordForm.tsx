import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";

import { Button, Field } from "@/ui";

import * as S from "./ForgotPasswordForm.styles";

const forgotPasswordSchema = zod.object({
  email: zod
    .string()
    .email({ message: "O formato de e-mail é inválido" })
    .min(1, "E-mail é obrigatório"),
});

type ForgotPasswordFormParams = zod.TypeOf<typeof forgotPasswordSchema>;

type Props = {
  onSendEmail: (email: string) => void;
};

export function ForgotPasswordForm({ onSendEmail }: Props) {
  const { formState, register, handleSubmit } =
    useForm<ForgotPasswordFormParams>({
      resolver: zodResolver(forgotPasswordSchema),
    });

  const { errors } = formState;

  function handleSendEmail({ email }: ForgotPasswordFormParams) {
    onSendEmail(email);
  }

  return (
    <S.Container onSubmit={handleSubmit(handleSendEmail)}>
      <S.FieldContainer>
        <Field
          required
          label="E-mail"
          placeholder="Digite seu e-mail"
          errorText={errors.email?.message}
          {...register("email")}
        />
        <Button fullWidth type="submit">
          Resetar senha
        </Button>
      </S.FieldContainer>
    </S.Container>
  );
}

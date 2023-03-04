import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";

import { Button, Field } from "@/ui";

import * as S from "./ResetPasswordForm.styles";

const resetPasswordSchema = zod
  .object({
    password: zod
      .string()
      .min(1, "Senha é obrigatória")
      .regex(/^[a-zA-Z\d@$!%*?&]{8,}$/, "O formato da senha é inválido"),
    confirmPassword: zod.string().min(1, "Confirmar senha é obrigatório"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"],
  });

type ResetPasswordFormParams = zod.TypeOf<typeof resetPasswordSchema>;

type Props = {
  onResetPassword: () => void;
};

export function ResetPasswordForm({ onResetPassword }: Props) {
  const { formState, register, handleSubmit } =
    useForm<ResetPasswordFormParams>({
      resolver: zodResolver(resetPasswordSchema),
    });

  const { errors } = formState;

  function handleSendEmail() {
    onResetPassword();
  }

  return (
    <S.Container onSubmit={handleSubmit(handleSendEmail)}>
      <S.FieldContainer>
        <Field
          required
          type="password"
          label="Senha"
          placeholder="Digite sua nova senha"
          errorText={errors.password?.message}
          helperText="Sua nova senha precisa ter no mínimo 8 dígitos e que contenha, números, letras e símbolos"
          {...register("password")}
        />
        <Field
          required
          type="password"
          label="Confirmar senha"
          placeholder="Confirme sua nova senha"
          errorText={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Button fullWidth type="submit">
          Resetar senha
        </Button>
      </S.FieldContainer>
    </S.Container>
  );
}

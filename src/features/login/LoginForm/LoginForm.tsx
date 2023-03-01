import { HiArrowNarrowRight } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";

import { Button, Checkbox, Field, Typography } from "@/ui";

import * as S from "./LoginForm.styles";

const loginSchema = zod.object({
  email: zod
    .string()
    .email({ message: "E-mail inválido" })
    .min(1, "E-mail obrigatório"),
  password: zod.string().min(1, "Senha obrigatória"),
  remember: zod.boolean(),
});

type LoginParams = zod.TypeOf<typeof loginSchema>;

export function LoginForm() {
  const { formState, register, handleSubmit, control } = useForm<LoginParams>({
    resolver: zodResolver(loginSchema),
  });

  const { errors } = formState;

  function handleSignIn() {
    console.log("teste");
  }

  return (
    <S.FormContainer onSubmit={handleSubmit(handleSignIn)}>
      <Typography.Text as="h3" size="body1" weight="bold" color="title">
        Preencha os campos para
        <br />
        acessar sua conta
      </Typography.Text>

      <S.FieldContainer>
        <Field
          required
          label="E-mail"
          placeholder="Digite seu e-mail"
          errorText={errors.email?.message}
          {...register("email")}
        />

        <Field
          required
          type="password"
          label="Senha"
          placeholder="Digite sua senha"
          errorText={errors.password?.message}
          {...register("password")}
        />
      </S.FieldContainer>

      <Checkbox name="remember" label="Lembrar de mim?" control={control} />
      <Button fullWidth type="submit">
        Entrar
        <HiArrowNarrowRight size={24} />
      </Button>
      <S.ForgotPasswordLink href="/auth/forgotPassword">
        Esqueci minha senha
      </S.ForgotPasswordLink>
    </S.FormContainer>
  );
}

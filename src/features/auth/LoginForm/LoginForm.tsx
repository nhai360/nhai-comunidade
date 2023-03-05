import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";

import { useAuthContext } from "@/contexts";
import { Button, Checkbox, Field, Typography } from "@/ui";
import { ArrowNarrowRightIcon } from "@/ui/_icons";

import * as S from "./LoginForm.styles";

const loginSchema = zod.object({
  email: zod
    .string()
    .email({ message: "O formato de e-mail é inválido" })
    .min(1, "E-mail é obrigatório"),
  password: zod.string().min(1, "Senha é obrigatória"),
  remember: zod.boolean(),
});

type LoginParams = zod.TypeOf<typeof loginSchema>;

export function LoginForm() {
  const { login } = useAuthContext();
  const router = useRouter();

  const { formState, register, handleSubmit, control } = useForm<LoginParams>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      remember: false,
    },
  });

  const { errors } = formState;

  function handleLogin() {
    login();
    router.push("/");
  }

  return (
    <S.FormContainer onSubmit={handleSubmit(handleLogin)}>
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
        <ArrowNarrowRightIcon />
      </Button>
      <S.ForgotPasswordLink href="/password/forgot">
        Esqueci minha senha
      </S.ForgotPasswordLink>
    </S.FormContainer>
  );
}

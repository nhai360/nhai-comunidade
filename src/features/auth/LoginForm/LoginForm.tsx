import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";

import { useAuthContext } from "@/contexts";
import { Button, Checkbox, Field, Typography } from "@/ui";
import { ArrowNarrowRightIcon } from "@/ui/_icons";

import {
  CreateSessionDecoder,
  CreateSessionParams,
  useCreateSession,
} from "@/client/users";

import * as S from "./LoginForm.styles";

export function LoginForm() {
  const router = useRouter();

  const { login } = useAuthContext();

  const { createSession, isLoading } = useCreateSession();

  const { formState, register, handleSubmit, control, setError } =
    useForm<CreateSessionParams>({
      resolver: zodResolver(CreateSessionDecoder),
      defaultValues: {
        remember: false,
      },
    });

  const { errors } = formState;

  function handleLogin(params: CreateSessionParams) {
    createSession(params, {
      onSuccess: (response) => {
        login({
          session: response,
          remember: params.remember,
        });

        router.push("/");
      },
      onError: () => {
        const fields = ["password", "email"] as const;

        fields.forEach((field) => {
          setError(field, {
            message: "E-mail ou senha inválido",
          });
        });
      },
    });
  }

  return (
    <S.FormContainer onSubmit={handleSubmit(handleLogin)}>
      <Typography.Text as="h3" size="body1" weight="bold" color="title">
        Preencha os campos para
        <br />
        acessar sua conta
      </Typography.Text>

      <S.FieldContainer>
        <Field.Input
          required
          label="E-mail"
          placeholder="Digite seu e-mail"
          errorText={errors.email?.message}
          {...register("email")}
        />

        <Field.Input
          required
          type="password"
          label="Senha"
          placeholder="Digite sua senha"
          errorText={errors.password?.message}
          {...register("password")}
        />
      </S.FieldContainer>

      <Checkbox name="remember" label="Lembrar de mim?" control={control} />
      <Button fullWidth type="submit" loading={isLoading}>
        Entrar
        <ArrowNarrowRightIcon />
      </Button>
      <S.ForgotPasswordLink href="/password/forgot">
        Esqueci minha senha
      </S.ForgotPasswordLink>
    </S.FormContainer>
  );
}

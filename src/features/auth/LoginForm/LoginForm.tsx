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
import { authenticatedAPI } from "@/client";
import { useEffect } from "react";

interface ILoginForm {
  layoutAmstel?: boolean;
}

export function LoginForm({ layoutAmstel }: ILoginForm) {
  const router = useRouter();

  const { login } = useAuthContext();

  const { createSession, isLoading } = useCreateSession();

  const { formState, register, handleSubmit, control, setError, setValue } =
    useForm<CreateSessionParams>({
      resolver: zodResolver(CreateSessionDecoder),
    });

  const { errors } = formState;

  useEffect(() => {
    setValue("remember", true);
  }, []);

  function handleLogin(params: CreateSessionParams) {
    createSession(params, {
      onSuccess: (response) => {
        authenticatedAPI.defaults.headers.Authorization = `Bearer ${response.access_token}`;

        login({
          session: response,
          remember: params.remember,
        });

        router.push(layoutAmstel ? "/negocios-de-orgulho" : "/");
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography.Title size="h1" weight="bold" color="title">
          Acessar
        </Typography.Title>
        <Typography.Text
          weight="medium"
          color="secondary"
          style={{ margin: 0 }}
        >
          Preencha os campos para acessar sua conta.
        </Typography.Text>
      </div>

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

      <Checkbox
        name="remember"
        defaultChecked={true}
        label="Lembrar de mim?"
        control={control}
      />
      <Button fullWidth type="submit" loading={isLoading}>
        Entrar
        <ArrowNarrowRightIcon />
      </Button>
      <S.RecoverPasswordLink href="/password/recover">
        Esqueci minha senha
      </S.RecoverPasswordLink>
    </S.FormContainer>
  );
}

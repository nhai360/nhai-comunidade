import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Field, Typography } from "@/ui";
import { ArrowNarrowRightIcon } from "@/ui/_icons";

import {
  CreateUserDecoder,
  CreateUserParams,
  useCreateUser,
} from "@/client/users";

import * as S from "./RegisterForm.styles";

export function RegisterForm() {
  const router = useRouter();

  const { formState, register, handleSubmit, setError } =
    useForm<CreateUserParams>({
      resolver: zodResolver(CreateUserDecoder),
    });

  const { createUser, isLoading } = useCreateUser();

  const { errors } = formState;

  function handleRegister(params: CreateUserParams) {
    createUser(params, {
      onSuccess: () => {
        router.push("/auth/login");
      },
      onError: () => {
        setError("email", {
          message: "Já existe um usuário cadastrado com esse e-mail",
        });
      },
    });
  }

  return (
    <S.FormContainer onSubmit={handleSubmit(handleRegister)}>
      <Typography.Text as="h3" size="body1" weight="bold" color="title">
        Preencha os campos para
        <br />
        criar sua nova conta
      </Typography.Text>

      <S.FieldContainer>
        <Field.Input
          required
          label="Nome"
          placeholder="Digite seu nome"
          errorText={errors.fullName?.message}
          {...register("fullName")}
        />

        <Field.Input
          label="Apelido (@exemplo)"
          placeholder="Digite seu apelido"
          errorText={errors.nickname?.message}
          maxLength={20}
          {...register("nickname")}
        />

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

      <Button fullWidth type="submit" loading={isLoading}>
        Criar conta
        <ArrowNarrowRightIcon />
      </Button>
      <S.RecoverPasswordLink href="/auth/login">
        Já sou membro
      </S.RecoverPasswordLink>
    </S.FormContainer>
  );
}

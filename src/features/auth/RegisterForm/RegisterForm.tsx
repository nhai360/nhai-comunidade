import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Checkbox, Field, Typography } from "@/ui";
import { ArrowNarrowRightIcon } from "@/ui/_icons";

import {
  CreateUserDecoder,
  CreateUserParams,
  useCreateUser,
} from "@/client/users";

import * as S from "./RegisterForm.styles";
import ProgressFormBar from "@/ui/ProgressFormBar";

export function RegisterForm() {
  const router = useRouter();

  const { formState, register, handleSubmit, control, setError } =
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography.Title size="h1" weight="bold" color="title">
          Criar conta
        </Typography.Title>
        <Typography.Text
          weight="medium"
          color="secondary"
          style={{ margin: 0 }}
        >
          Preencha os campos para criar sua nova conta.
        </Typography.Text>
      </div>

      <div style={{ width: "100%", height: 1, backgroundColor: "#e9e9e9", marginBottom: 16}} />

      <S.FieldContainer>
        <Field.Input
          required
          label="Nome"
          placeholder="Digite seu nome"
          errorText={errors.fullName?.message}
          {...register("fullName")}
        />

        <div style={{ display: "flex", gap: 32 }}>
          <Field.Input
            label="Apelido"
            placeholder="Digite seu apelido"
            errorText={errors.nickname?.message}
            maxLength={20}
            {...register("nickname")}
          />
          <Field.Input
            label="Data de Nascimento"
            placeholder=""
            type="date"
            errorText={errors.birthDate?.message}
            maxLength={20}
            {...register("birthDate")}
          />
        </div>

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
        name="agreeToPrivacyPolicy"
        label="Eu concordo com a coleta e o uso das minhas informações pessoais conforme descrito na Política de Privacidade."
        control={control}
      />
      <Checkbox
        name="mediaConsent"
        label="Consentimento de mídia."
        control={control}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          gap: 16,
        }}
      >
        <Button fullWidth type="submit" loading={isLoading}>
          Criar conta
          <ArrowNarrowRightIcon />
        </Button>
        <S.RecoverPasswordLink href="/auth/login">
          Já sou membro
        </S.RecoverPasswordLink>

        <ProgressFormBar progress={70} />
      </div>
    </S.FormContainer>
  );
}

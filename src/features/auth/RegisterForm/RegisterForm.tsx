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
import { useState } from "react";
import { defaultGenres } from "../../../../public/data/genres";
import { defaultEthnicity } from "../../../../public/data/ethnicity";
import { defaultSexualOrientation } from "../../../../public/data/sexualOrientation";
import { toast } from "react-toastify";

export function RegisterForm() {
  const router = useRouter();

  const [tab, setTab] = useState(1);
  const { formState, register, handleSubmit, control, setError, setValue } =
    useForm<CreateUserParams>({
      resolver: zodResolver(CreateUserDecoder),
    });

  const { createUser, isLoading } = useCreateUser();

  const { errors } = formState;

  function handleRegister(params: CreateUserParams) {
    if (tab === 1) {
      setTab(2);
    } else {
      if (
        params?.phone &&
        params?.ethnicity &&
        params?.gender &&
        params?.sexualOrientation
      ) {
        createUser(
          {
            ...params,
          },
          {
            onSuccess: () => {
              router.push("/auth/login");
            },
            onError: () => {
              toast.error(
                "Não foi possível realizar o cadastro. Tente novamente"
              );
              setError("email", {
                message: "Já existe um usuário cadastrado com esse e-mail",
              });
            },
          }
        );
      } else {
        toast.error("Preencha todos os campos!");
      }
    }
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

      <div
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "#e9e9e9",
          marginBottom: 16,
        }}
      />

      {tab === 1 ? (
        <>
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
                setValue={setValue}
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
        </>
      ) : (
        <S.FieldContainer>
          <Field.Input
            required
            label="Telefone"
            placeholder="(00) 00000-0000"
            errorText={errors.phone?.message}
            {...register("phone")}
          />
          <Field.Select
            required
            label="Identificação étnico-racial*"
            placeholder="Selecione uma opção"
            errorText={errors.ethnicity?.message}
            {...register("ethnicity")}
            data={defaultEthnicity}
            onChange={setValue}
            name="ethnicity"
          />
          <Field.Select
            required
            label="Identidade de gênero*"
            placeholder="Selecione uma opção"
            errorText={errors.gender?.message}
            {...register("gender")}
            data={defaultGenres}
            onChange={setValue}
            name="gender"
          />
          <Field.Select
            required
            label="Orientação sexual declarada*"
            placeholder="Selecione uma opção"
            errorText={errors.sexualOrientation?.message}
            {...register("sexualOrientation")}
            data={defaultSexualOrientation}
            onChange={setValue}
            name="sexualOrientation"
          />
        </S.FieldContainer>
      )}

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
          {tab === 1 ? "Continuar" : "Criar conta"}
          <ArrowNarrowRightIcon />
        </Button>
        <S.RecoverPasswordLink href="/auth/login">
          Já sou membro
        </S.RecoverPasswordLink>

        <ProgressFormBar progress={tab === 1 ? 70 : 100} />
      </div>
    </S.FormContainer>
  );
}

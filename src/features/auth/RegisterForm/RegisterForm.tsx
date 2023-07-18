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
import { useEffect, useState } from "react";
import { defaultGenres } from "../../../../public/data/genres";
import { defaultEthnicity } from "../../../../public/data/ethnicity";
import { defaultSexualOrientation } from "../../../../public/data/sexualOrientation";
import { toast } from "react-toastify";

interface IRegisterForm {
  layoutAmstel?: boolean;
}

export function RegisterForm({ layoutAmstel }: IRegisterForm) {
  const router = useRouter();

  const [tab, setTab] = useState(1);
  const { formState, register, handleSubmit, control, setError, setValue } =
    useForm<CreateUserParams>({
      resolver: zodResolver(CreateUserDecoder),
    });

  const { createUser, isLoading, isError } = useCreateUser();

  const { errors } = formState;

  function calcularIdade(dataNascimento: Date): number {
    const hoje: Date = new Date();
    let idade: number = hoje.getFullYear() - dataNascimento.getFullYear();
    const mesAtual: number = hoje.getMonth() + 1;
    const diaAtual: number = hoje.getDate();
    const mesNascimento: number = dataNascimento.getMonth() + 1;
    const diaNascimento: number = dataNascimento.getDate();

    if (
      mesAtual < mesNascimento ||
      (mesAtual === mesNascimento && diaAtual < diaNascimento)
    ) {
      idade--;
    }

    return idade;
  }

  function handleRegister(params: CreateUserParams) {
    const idade = calcularIdade(new Date(params?.birthDate));
    if (idade < 18) {
      setError("birthDate", {
        message: "Você precisa ser maior de idade",
      });
    } else if (!params?.agreeToPrivacyPolicy) {
      alert("Você precisa aceitar os termos e condições...");
    } else if (tab === 1) {
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
              toast.success(
                "Conta criada com sucesso! Agora basta fazer login 😉"
              );
              router.push(
                layoutAmstel
                  ? "/auth/login/?layout=negocios-de-orgulho"
                  : "/auth/login"
              );
            },
            onError: (err: any) => {
              const message: string = err?.response?.data?.message;
              const status: any = err?.response.status;
              console.log("=>", status, message);
              toast.error(
                "Este usuário já utilizou este e-mail ou nome de usuário"
              );
              setTab(1);
              setError("email", { message: "*" });
              setError("nickname", { message: "*" });
              // if (message === "User with this email already exists.") {
              //   setTab(1);
              //   setError("email", {
              //     message: "Este e-mail já foi usado por outro usuário",
              //   });
              // } else if (
              //   message === "User with this nickname already exists."
              // ) {
              //   setTab(1);
              //   setError("nickname", {
              //     message: "Este nickname já foi usado por outro usuário",
              //   });
              // } else if (status === 409) {
              //   toast.error(
              //     "Este usuário já utilizou este e-mail ou nome de usuário"
              //   );
              //   setTab(1);
              //   setError("email", {
              //     message: "Este e-mail já foi usado por outro usuário",
              //   });
              //   setError("nickname", {
              //     message: "Este nickname já foi usado por outro usuário",
              //   });
              // } else {
              //   console.log("REGISTER ERROR", status);
              //   toast.error(
              //     "Não foi possível realizar o cadastro. Tente novamente"
              //   );
              // }
            },
          }
        );
      } else {
        toast.error("Preencha todos os campos!");
      }
    }
  }

  useEffect(() => {
    if (isError) {
      console.log("Error =>", isError);
      toast.error("Este usuário já utilizou este e-mail ou nome de usuário");
      setTab(1);
      setError("email", { message: "*" });
      setError("nickname", { message: "*" });
    } else {
      console.log("Without errors");
    }
  }, [isError]);

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
            label="Eu concordo com a coleta e o uso das minhas informações pessoais conforme descrito na Política de Privacidade e Consentimento de mídia."
            control={control}
          />
        </>
      ) : (
        <S.FieldContainer>
          <Field.Input
            required
            label="Telefone"
            placeholder="+00 (00) 00000-0000"
            errorText={errors.phone?.message}
            {...register("phone")}
            mask="phone"
            setValue={setValue}
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
            isSearchable={false}
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
            isSearchable={false}
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
            isSearchable={false}
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
        <S.RecoverPasswordLink
          href={
            layoutAmstel
              ? "/auth/login/?layout=negocios-de-orgulho"
              : "/auth/login"
          }
        >
          Já sou membro
        </S.RecoverPasswordLink>

        <ProgressFormBar progress={tab === 1 ? 70 : 100} />
      </div>
    </S.FormContainer>
  );
}

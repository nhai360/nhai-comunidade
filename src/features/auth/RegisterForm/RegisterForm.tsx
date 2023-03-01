import { HiArrowNarrowRight } from "react-icons/hi";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";

import { Button, Field, Typography } from "@/ui";

import * as S from "./RegisterForm.styles";

const registerSchema = zod.object({
  name: zod.string().min(1, "Nome obrigatório"),
  nickname: zod.string(),
  email: zod
    .string()
    .email({ message: "E-mail inválido" })
    .min(1, "E-mail obrigatório"),
  password: zod.string().min(1, "Senha obrigatória"),
});

type RegisterParams = zod.TypeOf<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();

  const { formState, register, handleSubmit } = useForm<RegisterParams>({
    resolver: zodResolver(registerSchema),
  });

  const { errors } = formState;

  function handleRegister() {
    router.push("/auth/login");
  }

  return (
    <S.FormContainer onSubmit={handleSubmit(handleRegister)}>
      <Typography.Text as="h3" size="body1" weight="bold" color="title">
        Preencha os campos para
        <br />
        criar sua nova conta
      </Typography.Text>

      <S.FieldContainer>
        <Field
          required
          label="Nome"
          placeholder="Digite seu nome"
          errorText={errors.name?.message}
          {...register("name")}
        />

        <Field
          label="Apelido"
          placeholder="Digite seu apelido"
          errorText={errors.nickname?.message}
          {...register("nickname")}
        />

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

      <Button fullWidth type="submit">
        Criar conta
        <HiArrowNarrowRight size={24} />
      </Button>
      <S.ForgotPasswordLink href="/auth/login">
        Já sou membro
      </S.ForgotPasswordLink>
    </S.FormContainer>
  );
}

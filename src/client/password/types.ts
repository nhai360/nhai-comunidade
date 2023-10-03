import * as t from "zod";

export const RecoverPasswordDecoder = t.object({
  email: t
    .string()
    .email({ message: "O formato de e-mail é inválido" })
    .min(1, "E-mail é obrigatório"),
});

export type RecoverPasswordParams = t.TypeOf<typeof RecoverPasswordDecoder>;

export const ResetPasswordDecoder = t.object({
  password: t
    .string()
    .min(1, "Senha é obrigatória")
    .regex(/^[a-zA-Z\d!@#$%&*()+=~^<>.,;?/]{8,}$/, "O formato da senha é inválido"),
  confirmPassword: t.string().min(1, "Confirmar senha é obrigatório"),
});

export type ResetPasswordParams = t.TypeOf<typeof ResetPasswordDecoder>;

export const ResetPasswordAndConfirmationDecoder = ResetPasswordDecoder.refine(
  ({ password, confirmPassword }) => password === confirmPassword,
  {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"],
  },
);

export const ResetPasswordAndUidDecoder = t
  .object({
    uid: t.string(),
  })
  .merge(ResetPasswordDecoder)
  .omit({
    confirmPassword: true,
  });

export type ResetPasswordAndUidParams = t.TypeOf<
  typeof ResetPasswordAndUidDecoder
>;

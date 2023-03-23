import * as t from "zod";

export const RecoverPasswordDecoder = t.object({
  email: t
    .string()
    .email({ message: "O formato de e-mail é inválido" })
    .min(1, "E-mail é obrigatório"),
});

export type RecoverPasswordParams = t.TypeOf<typeof RecoverPasswordDecoder>;

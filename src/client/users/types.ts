import * as t from "zod";

export const UserDecoder = t.object({
  id: t.string(),
  fullName: t.string(),
  email: t.string(),
  nickname: t.string().nullable(),
  bio: t.string().nullable(),
  birthDate: t.string().datetime().nullable(),
  userGenderId: t.string().nullish(),
  updatedAt: t.string(),
});

export type User = t.TypeOf<typeof UserDecoder>;

export const CreateUserDecoder = t.object({
  fullName: t.string().min(1, "Nome é obrigatório"),
  nickname: t
    .string()
    .min(1, "Apelido é obrigatório")
    .max(20, "O apelido deve ter no máximo 20 caracteres")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'O apelido só pode conter letras maiúsculas e minúsculas, números e caracteres understore (Ex: "_")',
    ),
  email: t
    .string()
    .email({ message: "O formato de e-mail é inválido" })
    .min(1, "E-mail é obrigatório"),
  password: t.string().min(1, "Senha é obrigatória"),
});

export type CreateUserParams = t.TypeOf<typeof CreateUserDecoder>;

export const SessionDecoder = t.object({
  access_token: t.string(),
  refresh_token: t.string(),
  userId: t.string(),
});

export type Session = t.TypeOf<typeof SessionDecoder>;

export const CreateSessionDecoder = t.object({
  email: t
    .string()
    .email({ message: "O formato de e-mail é inválido" })
    .min(1, "E-mail é obrigatório"),
  password: t.string().min(1, "Senha é obrigatória"),
  remember: t.boolean(),
});

export type CreateSessionParams = t.TypeOf<typeof CreateSessionDecoder>;

export type GetParams = {
  id?: string;
};

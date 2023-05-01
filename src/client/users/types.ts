import * as t from "zod";
import { Media, MediaDecoder } from "@/client/media";

export const UserDecoder = t.object({
  id: t.string(),
  fullName: t.string(),
  email: t.string(),
  nickname: t.string(),
  bio: t.string().nullable(),
  birthDate: t.string().datetime().nullable(),
  userGenderId: t.string().nullish(),
  updatedAt: t.string().datetime(),
  profilePicture: MediaDecoder.nullish(),
  banner: MediaDecoder.nullish(),
  createAt: t.string().datetime(),
});

export type User = t.TypeOf<typeof UserDecoder>;

export const CreateUserDecoder = t.object({
  fullName: t.string().min(1, "Nome é obrigatório"),
  nickname: t
    .string()
    .min(1, "Apelido é obrigatório")
    .max(20, "O apelido deve ter no máximo 20 caracteres")
    .regex(
      /^[a-zA-Z0-9_@]+$/,
      'O apelido só pode conter letras maiúsculas/minúsculas, números e caracteres understore (Ex: "_")',
    )
    .transform((arg) => arg.toLowerCase().replace("@", "")),
  email: t
    .string()
    .email({ message: "O formato de e-mail é inválido" })
    .min(1, "E-mail é obrigatório"),
  password: t.string().min(1, "Senha é obrigatória"),
});

export type CreateUserParams = t.TypeOf<typeof CreateUserDecoder>;

export const UpdateUserDecoder = t.object({
  fullName: t.string().min(1, "Nome é obrigatório"),
  nickname: t
    .string()
    .min(1, "Apelido é obrigatório")
    .max(20, "O apelido deve ter no máximo 20 caracteres")
    .regex(
      /^[a-zA-Z0-9_@]+$/,
      'O apelido só pode conter letras maiúsculas/minúsculas, números e caracteres understore (Ex: "_")',
    )
    .transform((arg) => arg.toLowerCase().replace("@", "")),
  bio: t
    .string()
    .min(1, "Bio é obrigatório")
    .max(255, "A bio deve ter no máximo 255 caracteres"),
  avatar: t.any().optional(),
});

export type UpdateUserParams = t.TypeOf<typeof UpdateUserDecoder>;

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
  nickname?: string;
};

export type PatchParams = {
  userId: string;
  avatar?: Media;
  banner?: Media;
} & Partial<UpdateUserParams>;

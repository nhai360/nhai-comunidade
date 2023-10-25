import * as t from "zod";
import { Media, MediaDecoder } from "@/client/media";
import { ScoreDecoder } from "@/client/score/types";

export const UserStatsDecoder = t.object({
  consecutiveDays: t.number(),
  totalArticlesRead: t.number(),
  totalMinutesWatched: t.number(),
});

export const UserRoleDecoder = t.object({
  name: t.string(),
  updatedAt: t.string().datetime(),
  //TODO: Revisar se o "nullish()" no "createAt" está correto...
  createAt: t.string().datetime().nullish(),
});

export const UserDecoder = t.object({
  id: t.string(),
  role: UserRoleDecoder.nullish(),
  fullName: t.string(),
  email: t.string(),
  nickname: t.string(),
  bio: t.string().nullable(),
  birthDate: t.string().datetime().nullish(),
  userGenderId: t.string().nullish(),
  updatedAt: t.string().datetime(),
  profilePicture: MediaDecoder.nullish(),
  banner: MediaDecoder.nullish(),
  gender: t.string().nullish(),
  phone: t.string().nullish(),
  ethnicity: t.string().nullish(),
  locality: t.string().nullish(),
  sexualOrientation: t.string().nullish(),
  //TODO: Revisar se o "nullish()" no "createAt" está correto...
  createdAt: t.string().datetime().nullish(),
  score: ScoreDecoder.nullish(),
  stats: UserStatsDecoder.nullish(),
});

export type User = t.TypeOf<typeof UserDecoder>;

export const CreateUserDecoder = t.object({
  firstName: t.string().min(2, "Nome é obrigatório"),
  lastName: t.string().min(2, "Sobrenome é obrigatório"),
  nickname: t
    .string()
    .min(1, "Apelido é obrigatório")
    .max(20, "O apelido deve ter no máximo 20 caracteres")
    .regex(
      /^[a-zA-Z0-9_@]+$/,
      'O apelido só pode conter letras maiúsculas/minúsculas, números e caracteres underscore (Ex: "_")'
    )
    .transform((arg) => arg.toLowerCase().replace("@", "")),

  email: t
    .string()
    .email({ message: "O formato de e-mail é inválido" })
    .min(1, "E-mail é obrigatório"),
  password: t.string().min(1, "Senha é obrigatória"),
  gender: t.string().optional(),
  birthDate: t.string().min(10, "Data inválida"),
  phone: t
    .string()
    .refine(
      (value) => /^\+\d{1,3}\s?\(\d{2,3}\)\s?\d{4,5}-\d{4}$/.test(value),
      {
        message: "Número de telefone inválido",
      }
    )
    .optional(),
  ethnicity: t.string().optional(),
  sexualOrientation: t.string().optional(),
  agreeToPrivacyPolicy: t.boolean().optional(),
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
    'O apelido só pode conter letras maiúsculas/minúsculas, números e caracteres understore (Ex: "_")'
    )
    .transform((arg) => arg.toLowerCase().replace("@", "")),
  bio: t
  .string()
  .min(1, "Bio é obrigatório")
  .max(255, "A bio deve ter no máximo 255 caracteres"),
  locality: t.string().optional(),
  avatar: t.any().optional(),
  gender: t.string().optional(),
  birthDate: t.string().optional(),
  phone: t.string().optional(),
  ethnicity: t.string().optional(),
  sexualOrientation: t.string().optional(),
});

export type UpdateUserParams = t.TypeOf<typeof UpdateUserDecoder>;

export const UserNicknameDecoder = t.object({
  nickname: t
    .string()
    .min(1, "Apelido é obrigatório")
    .max(20, "O apelido deve ter no máximo 20 caracteres")
    .regex(
      /^[a-zA-Z0-9_@]+$/,
      'O apelido só pode conter letras maiúsculas/minúsculas, números e caracteres understore (Ex: "_")'
    )
    .transform((arg) => arg.toLowerCase().replace("@", "")),
});

export type UserNicknameParams = t.TypeOf<typeof UserNicknameDecoder>;

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
  profilePicture?: Media;
  banner?: Media;
} & Partial<UpdateUserParams>;

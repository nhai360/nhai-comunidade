import * as t from "zod";

import { UserDecoder, User } from "@/client/users";

export type Comment = {
  id: string;
  content: string;
  author: User;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  replies: Comment[];
  replyToId?: string | null;
};

export const CommentDecoder: t.Schema<Comment> = t.lazy(() =>
  t.object({
    id: t.string(),
    content: t.string(),
    author: UserDecoder,
    authorId: t.string(),
    createdAt: t.string().datetime(),
    updatedAt: t.string().datetime(),
    replies: CommentDecoder.array(),
    replyToId: t.string().nullish(),
  }),
);

export const CreateCommentDecoder = t.object({
  content: t.string().min(1, "O conteúdo do comentário é obrigatório"),
});

export type CreateCommentParams = {
  postId: string;
  content: string;
};

export type GetParams = {
  postId: string;
};

import * as t from "zod";

import { UserDecoder, User } from "@/client/users";

export type Comment = {
  id: string;
  title?: string | null;
  content?: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
  replyToId?: string | null;
};

export const CommentDecoder: t.Schema<Comment> = t.lazy(() =>
  t.object({
    id: t.string(),
    title: t.string().nullish(),
    content: t.string().optional(),
    author: UserDecoder,
    createdAt: t.string().datetime(),
    updatedAt: t.string().datetime(),
    replies: CommentDecoder.array().optional(),
    replyToId: t.string().nullish(),
  }),
);

export const CreateCommentDecoder = t.object({
  content: t.string().min(1, "O conteúdo do comentário é obrigatório"),
});

export type CreateCommentParams = {
  postId: string;
  replyId?: string;
  content: string;
};

export type GetParams = {
  postId: string;
};

export type DeleteParams = {
  commentId: string;
};

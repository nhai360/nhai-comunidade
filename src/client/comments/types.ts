import * as t from "zod";

import { UserDecoder, User } from "@/client/users";

export const CommentLikeDecoder = t.object({
  id: t.string(),
  authorId: t.string(),
  commentId: t.string(),
});

export type CommentLike = t.TypeOf<typeof CommentLikeDecoder>;

export type Comment = {
  id: string;
  title?: string | null;
  content?: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
  replyToId?: string | null;
  likes: CommentLike[];
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
    likes: CommentLikeDecoder.array(),
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

export type LikeCommentParams = {
  commentId: string;
  alreadyLiked: boolean;
};

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
  }),
);

export type CommentWithColor = {
  color: "green" | "pink" | "yellow";
} & Comment;

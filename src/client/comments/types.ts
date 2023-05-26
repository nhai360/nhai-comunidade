import * as t from "zod";

import { UserDecoder, User } from "@/client/users";

export enum CommentType {
  COMMENT = "COMMENT",
  POLL = "POLL",
}

export const CommentLikeDecoder = t.object({
  author: UserDecoder,
});

export type CommentLike = t.TypeOf<typeof CommentLikeDecoder>;

export const CommentStatsDecoder = t.object({
  likes: t.number(),
  replies: t.number(),
});

export type CommentStats = t.TypeOf<typeof CommentStatsDecoder>;

export const CommentOptionVotedByDecoder = t.object({
  id: t.string(),
  authorId: t.string(),
  optionId: t.string(),
});

export const CommentOptionDecoder = t.object({
  id: t.string(),
  name: t.string(),
  commentId: t.string(),
  totalVotes: t.number(),
  votedBy: CommentOptionVotedByDecoder.array(),
});

export type CommentOption = t.TypeOf<typeof CommentOptionDecoder>;

export type Comment = {
  id: string;
  title?: string | null;
  content?: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
  replyToId?: string | null;
  stats: CommentStats;
  likes: CommentLike[];
  type: CommentType;
  options?: CommentOption[];
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
    stats: CommentStatsDecoder,
    likes: CommentLikeDecoder.array(),
    type: t.nativeEnum(CommentType),
    options: CommentOptionDecoder.array().optional(),
  })
);

export const CreateCommentDecoder = t.object({
  content: t.string().min(1, "O conteúdo do comentário é obrigatório"),
});

export type CreateCommentParams = {
  originId: string;
  replyId?: string;
  content: string;
  type: CommentType;
  options?: Partial<CommentOption>[];
  originType: "posts" | "videos";
};

export type GetParams = {
  originId: string;
  originType: "posts" | "videos";
};

export type DeleteParams = {
  commentId: string;
};

export type LikeCommentParams = {
  commentId: string;
  alreadyLiked: boolean;
};

export type VoteCommentParams = {
  commentId: string;
  optionId: string;
  alreadyVoted: boolean;
};

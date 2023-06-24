import t from "zod";

import { MediaDecoder } from "@/client/media/types";
import { UserDecoder } from "@/client/users";
import { CommentDecoder } from "@/client/comments";

export const PostColorDecoder = t.enum(["GREEN", "PINK", "BLUE"]);

export type PostColor = t.TypeOf<typeof PostColorDecoder>;

export const PostStatsDecoder = t.object({
  id: t.string(),
  likes: t.number(),
  comments: t.number(),
});

export type PostStats = t.TypeOf<typeof PostStatsDecoder>;

export const PostLikeDecoder = t.object({
  id: t.string(),
  authorId: t.string(),
  postId: t.string(),
  author: UserDecoder,
});

export const PostDecoder = t.object({
  id: t.string(),
  title: t.string(),
  content: t.string(),
  color: PostColorDecoder.nullish(),
  author: UserDecoder,
  createdAt: t.string().datetime(),
  updatedAt: t.string().datetime(),
  images: MediaDecoder.array().optional(),
  stats: PostStatsDecoder,
  likes: PostLikeDecoder.array(),
  comments: CommentDecoder.array(),
});

export type Post = t.TypeOf<typeof PostDecoder>;

export const TrendPostDecoder = PostDecoder.pick({
  id: true,
  title: true,
  content: true,
  createdAt: true,
  updatedAt: true,
  author: true,
});

export type TrendPost = t.TypeOf<typeof TrendPostDecoder>;

export const CreatePostDecoder = t.object({
  title: t.string().optional(),
  content: t.string().min(1, "Conteúdo é obrigatório"),
  image: t.any().optional(),
  color: PostColorDecoder.optional(),
});

export type CreatePostParams = t.TypeOf<typeof CreatePostDecoder>;

export const CreatePostRequestDecoder = CreatePostDecoder.merge(
  t.object({
    images: MediaDecoder.array().optional(),
  })
).omit({
  image: true,
});

export type CreatePostRequestParams = t.TypeOf<typeof CreatePostRequestDecoder>;

export type GetParams = {
  search?: string;
  orderBy?: keyof Post;
  orderDirection?: "asc" | "desc";
};

export type GetPostParams = {
  postId: string;
};

export type LikePostParams = {
  postId: string;
  alreadyLiked: boolean;
};

export type DeletePostParams = {
  postId: string;
};

export type GetUserPostsParams = {
  search?: string;
  orderBy?: keyof Post;
  orderDirection?: "asc" | "desc";
  nickname: string;
};

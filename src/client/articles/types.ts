import * as t from "zod";
import { UserDecoder } from "@/client/users";
import { MediaDecoder } from "../media";

export const ArticleStatsDecoder = t.object({
  likes: t.number(),
  comments: t.number(),
});

export type ArticleStats = t.TypeOf<typeof ArticleStatsDecoder>;

export const ArticleLikeDecoder = t.object({
  author: UserDecoder,
});

export const ArticleDecoder = t.object({
  id: t.string(),
  title: t.string(),
  content: t.string().nullish(),
  createdAt: t.string().nullish(),
  updatedAt: t.string().nullish(),
  author: UserDecoder.nullish(),
  images: MediaDecoder.array().optional(),
  likes: ArticleLikeDecoder.array().nullish(),
  stats: ArticleStatsDecoder,
});

export type Article = t.TypeOf<typeof ArticleDecoder>;

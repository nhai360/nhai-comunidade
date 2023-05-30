import * as t from "zod";
import { UserDecoder } from "@/client/users";
import { MediaDecoder } from "../media";
import { OutputBlockData } from "@editorjs/editorjs";

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
  //TODO: Revisar tipagem.
  content: t.string(),
  createdAt: t.string().nullish(),
  updatedAt: t.string().nullish(),
  author: UserDecoder.nullish(),
  images: MediaDecoder.array().optional(),
  likes: ArticleLikeDecoder.array().nullish(),
  stats: ArticleStatsDecoder,
});

export type Article = t.TypeOf<typeof ArticleDecoder>;

export type GetArticleParams = {
  articleId?: string;
};

export type GetArticlesParams = {
  search?: string;
  orderBy?: keyof Article;
  orderDirection?: "asc" | "desc";
};

export type ContentType = {
  time: number;
  blocks: OutputBlockData<
    "header" | "paragraph" | "image",
    {
      text?: string;
      level?: number;
      file?: {
        url: string;
      };
      caption?: string;
      withBorder?: boolean;
      stretched?: boolean;
      withBackground?: boolean;
    }
  >[];
  version: string;
};

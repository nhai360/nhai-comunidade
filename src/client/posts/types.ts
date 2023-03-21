import t from "zod";

import { MediaDecoder } from "@/client/media/types";
import { UserDecoder } from "../users";

export const PostColorDecoder = t.enum(["GREEN", "PINK", "BLUE"]);

export type PostColor = t.TypeOf<typeof PostColorDecoder>;

export const PostDecoder = t.object({
  id: t.string(),
  title: t.string(),
  content: t.string(),
  color: PostColorDecoder.nullish(),
  authorId: t.string(),
  author: UserDecoder,
  createdAt: t.string().datetime(),
  updatedAt: t.string().datetime(),
  images: MediaDecoder.array().optional(),
});

export type Post = t.TypeOf<typeof PostDecoder>;

export const CreatePostDecoder = t.object({
  title: t.string(),
  content: t.string(),
  image: t.any().optional(),
  color: PostColorDecoder.optional(),
});

export type CreatePostParams = t.TypeOf<typeof CreatePostDecoder>;

export type GetParams = {
  orderBy?: keyof Post;
  orderDirection?: "asc" | "desc";
};

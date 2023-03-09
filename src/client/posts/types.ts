import { RawDraftContentState } from "draft-js";
import zod from "zod";

export const file = zod.object({
  preview: zod.string(),
});

type File = zod.TypeOf<typeof file>;

export const postColor = zod.union([
  zod.literal("green"),
  zod.literal("pink"),
  zod.literal("blue"),
]);

export type PostColor = zod.TypeOf<typeof postColor>;

export type Post = {
  id: string;
  title: string;
  content: RawDraftContentState;
  file?: File;
  color?: PostColor;
};

export const createPostSchema = zod.object({
  title: zod.string(),
  content: zod.unknown(),
  file: file.optional(),
  color: postColor.optional(),
});

export type CreatePostParams = zod.TypeOf<typeof createPostSchema>;

import * as t from "zod";

import { Media, MediaDecoder } from "@/client/media";

export const VideoTagDecoder = t.object({
  id: t.string(),
  name: t.string(),
  videoId: t.string(),
});

export type VideoTag = t.TypeOf<typeof VideoTagDecoder>;

export const VideoDecoder = t.object({
  id: t.string(),
  title: t.string(),
  description: t.string().nullish(),
  playlistId: t.string().nullish(),
  source: MediaDecoder,
  sourceId: t.string(),
  createAt: t.string(),
  updatedAt: t.string(),
  tags: VideoTagDecoder.array(),
});

export type Video = t.TypeOf<typeof VideoDecoder>;

export const CreateVideoResolver = t.object({
  title: t.string().min(1, "Título é obrigatório"),
  description: t.string().nullish(),
  tags: t.string().min(1, "Tags é obrigatório"),
  file: t.any().optional(),
});

export type CreateVideoParams = t.TypeOf<typeof CreateVideoResolver>;

export type PostParams = {
  tags: string[];
  source: Media;
} & Omit<CreateVideoParams, "file" | "tags">;

export type GetParams = {
  userId?: string;
};

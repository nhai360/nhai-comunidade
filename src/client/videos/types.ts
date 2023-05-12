import * as t from "zod";

import { Media, MediaDecoder } from "@/client/media";
import { UserDecoder } from "@/client/users";

export const VideoTagDecoder = t.object({
  id: t.string(),
  name: t.string(),
  videoId: t.string(),
});

export type VideoTag = t.TypeOf<typeof VideoTagDecoder>;

export const VideoLikeDecoder = t.object({
  author: UserDecoder,
});

export const VideoDecoder = t.object({
  id: t.string(),
  title: t.string(),
  description: t.string().nullish(),
  playlistId: t.string().nullish(),
  source: MediaDecoder.nullish(),
  sourceId: t.string().nullish(),
  thumbnail: MediaDecoder.nullish(),
  author: UserDecoder.nullish(),
  createAt: t.string(),
  updatedAt: t.string(),
  tags: VideoTagDecoder.array().nullish(),
  likes: VideoLikeDecoder.array().nullish(),
});

export type Video = t.TypeOf<typeof VideoDecoder>;

export const CreateVideoResolver = t.object({
  title: t.string().min(1, "Título é obrigatório"),
  description: t.string().nullish(),
  tags: t.string().min(1, "Tags é obrigatório"),
  file: t.any().optional(),
  thumbnail: t.any().optional(),
});

export type CreateVideoParams = t.TypeOf<typeof CreateVideoResolver>;

export type PostParams = {
  tags: string[];
  source: Media;
} & Omit<CreateVideoParams, "file" | "tags">;

export type GetParams = {
  nickname?: string;
};

export type GetVideoParams = {
  videoId?: string;
};

export type LikeVideoParams = {
  videoId: string;
  alreadyLiked: boolean;
};

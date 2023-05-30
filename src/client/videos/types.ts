import * as t from "zod";

import { Media, MediaDecoder } from "@/client/media";
import { UserDecoder } from "@/client/users";
import { CommentDecoder } from "../comments";

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
  createdAt: t.string(),
  updatedAt: t.string(),
  playbackId: t.string().nullish(),
  tags: VideoTagDecoder.array().nullish(),
  likes: VideoLikeDecoder.array().nullish(),
  comments: CommentDecoder.array().nullish(),
});

export type Video = t.TypeOf<typeof VideoDecoder>;

export const PlaylistDecoder = t.object({
  id: t.string(),
  title: t.string(),
  authorId: t.string(),
  author: UserDecoder.nullish(),
  createdAt: t.string(),
  updatedAt: t.string(),
  videos: VideoDecoder.array().nullish(),
});
export type Playlist = t.TypeOf<typeof PlaylistDecoder>;

export const CreateVideoResolver = t.object({
  title: t.string().min(1, "Título é obrigatório"),
  playlist: t.string().nullish(),
  description: t.string().nullish(),
  tags: t.string().min(1, "Tags é obrigatório"),
  file: t.any().optional(),
  thumbnail: t.any().refine((file) => file, "Foto de capa é obrigatório"),
});

export const UpdateVideoResolver = t.object({
  title: t.string().min(1, "Título é obrigatório"),
  playlist: t.string().nullish(),
  description: t.string().nullish(),
  tags: t.string().min(1, "Tags é obrigatório"),
  file: t.any().optional(),
  thumbnail: t
    .any()
    .refine((file) => file, "Foto de capa é obrigatório")
    .optional(),
});

export type CreateVideoParams = t.TypeOf<typeof CreateVideoResolver>;

export const CreatePlaylistResolver = t.object({
  title: t.string().min(1, "Título é obrigatório"),
});

export type CreatePlaylistParams = t.TypeOf<typeof CreatePlaylistResolver>;

export type PostParams = {
  tags: string[];
  source: Media;
  thumbnail: Media;
} & Omit<CreateVideoParams, "file" | "tags" | "thumbnail">;

export type PatchParams = {
  videoId: string;
  tags: string[];
  title: string;
  description?: string | null | undefined;
};

export type PostPlaylistParams = {
  title: string;
};

export type GetParams = {
  nickname?: string;
};

export type GetVideosParams = {
  search?: string;
  orderBy?: keyof Video;
  orderDirection?: "asc" | "desc";
};

export type GetVideoParams = {
  videoId?: string;
};

export type LikeVideoParams = {
  videoId: string;
  alreadyLiked: boolean;
};

export type DeleteVideoParams = {
  videoId: string;
};

export type GetUserPlaylistsParams = {
  userId?: string;
};

import * as t from "zod";
import { UserDecoder } from "@/client/users";
import { VideoDecoder } from "../videos";

export const PlaylistDecoder = t.object({
  id: t.string(),
  title: t.string(),
  authorId: t.string(),
  author: UserDecoder.nullish(),
  createdAt: t.string(),
  updatedAt: t.string(),
  videos: VideoDecoder.array(),
});

export type Playlist = t.TypeOf<typeof PlaylistDecoder>;

export type PostPlaylistParams = {
  title: string;
};

export const CreatePlaylistResolver = t.object({
  title: t.string().min(1, "Título é obrigatório"),
});

export type CreatePlaylistParams = t.TypeOf<typeof CreatePlaylistResolver>;

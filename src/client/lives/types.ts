import { Dispatch, SetStateAction } from "react";
import * as t from "zod";
import { Media, MediaDecoder } from "../media";
import { UserDecoder } from "../users";
import { VideoLikeDecoder } from "../videos";

export const GuestLiveDecoder = t.object({
  id: t.string(),
  guestId: t.string(),
  liveId: t.string(),
  guest: UserDecoder.nullish(),
});

export const LiveDecoder = t.object({
  id: t.string(),
  title: t.string(),
  description: t.string().nullish(),
  status: t.string().nullish(),
  startTime: t.string().datetime(),
  spaceId: t.string().nullish(),
  playbackId: t.string().nullish(),
  broadcastId: t.string().nullish(),
  muxLiveId: t.string().nullish(),
  thumbnail: MediaDecoder.nullish(),
  source: MediaDecoder.nullish(),
  sourceId: t.string().nullish(),
  author: UserDecoder.nullish(),
  guests: GuestLiveDecoder.array().nullish(),
  likes: VideoLikeDecoder.array().nullish(),
});

export type Live = t.TypeOf<typeof LiveDecoder>;

export type GetLiveParams = {
  liveId?: string;
};

export type GetUserLivesParams = {
  userId?: string;
};

export type PostParams = {
  tags: string[];
  title: string;
  description?: string | null | undefined;
  startTime: Date;
  thumbnail: {
    id: string;
  };
  source: {
    id: string;
  };
};

export type PostBroadcastParams = {
  spaceId: string;
  broadcastId: string;
  liveId: string;
};

export type PostLiveInviteParams = {
  spaceId: string;
  guestId: string;
  liveId: string;
};

export const CreateChatResolver = t.object({
  message: t.string().min(1, "Escreva uma mensagem..."),
});

export type CreateChatParams = t.TypeOf<typeof CreateChatResolver>;

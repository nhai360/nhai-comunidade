import { Dispatch, SetStateAction } from "react";
import * as t from "zod";
import { MediaDecoder } from "../media";
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
  source: MediaDecoder.nullish(),
  sourceId: t.string().nullish(),
  author: UserDecoder.nullish(),
  guests: GuestLiveDecoder.array(),
  likes: VideoLikeDecoder.array().nullish(),
});

export type Live = t.TypeOf<typeof LiveDecoder>;

export type GetLiveParams = {
  liveId?: string;
};

import * as t from "zod";

export enum MediaCategory {
  IMAGE = "IMAGE",
  GIF = "GIF",
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
}

export const MediaDecoder = t.object({
  id: t.string(),
  url: t.string().nullish(),
  sourceUrl: t.string().nullish(),
  language: t.string().nullish(),
  mimeType: t.string().nullish(),
  caption: t.string().nullish(),
  sizeInBytes: t.string().nullish(),
  durationInSeconds: t.string().nullish(),
  category: t.nativeEnum(MediaCategory),
});

export type Media = t.TypeOf<typeof MediaDecoder>;

export type PostParams = {
  file: File;
  category: MediaCategory;
};

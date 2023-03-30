import * as t from "zod";

export const MediaCategoryDecoder = t.enum(["IMAGE", "GIF", "AUDIO", "VIDEO"]);

export const MediaDecoder = t.object({
  id: t.string(),
  url: t.string().nullish(),
  sourceUrl: t.string().nullish(),
  language: t.string().nullish(),
  mimeType: t.string().nullish(),
  caption: t.string().nullish(),
  sizeInBytes: t.string().nullish(),
  durationInSeconds: t.string().nullish(),
  category: MediaCategoryDecoder,
});

export type Media = t.TypeOf<typeof MediaDecoder>;

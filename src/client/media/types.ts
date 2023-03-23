import * as t from "zod";

export const MediaCategoryDecoder = t.enum(["IMAGE", "GIF", "AUDIO", "VIDEO"]);

export const MediaDecoder = t.object({
  id: t.string(),
  url: t.string(),
  sourceUrl: t.string(),
  language: t.string(),
  mimeType: t.string(),
  caption: t.string().nullish(),
  sizeInBytes: t.bigint(),
  duration: t.string().datetime().nullish(),
  category: MediaCategoryDecoder,
});

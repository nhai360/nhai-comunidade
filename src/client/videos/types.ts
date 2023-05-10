import * as t from "zod";

import { Media, MediaDecoder } from "@/client/media";

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

import * as t from "zod";

export enum Division {
  WOOD = "WOOD",
  BRASS = "BRASS",
  IRON = "IRON",
  RUBY = "RUBY",
  DIAMOND = "DIAMOND",
  GOLD = "GOLD",
  PLATINUM = "PLATINUM",
  SILVER = "SILVER",
  BRONZE = "BRONZE",
}

export const ScoreDecoder = t.object({
  division: t.nativeEnum(Division),
  level: t.number(),
  totalXp: t.number(),
});

export type Score = t.TypeOf<typeof ScoreDecoder>;

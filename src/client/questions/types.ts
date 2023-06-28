import { Dispatch, SetStateAction } from "react";
import * as t from "zod";

export const QuestionOptionDecoder = t.object({
  id: t.string(),
  title: t.string(),
  description: t.string().nullish(),
  type: t.string(),
  createdAt: t.string(),
  updatedAt: t.string(),
});

export const QuestionAnswersDecoder = t.object({
  id: t.string(),
  createdAt: t.string(),
  updatedAt: t.string(),
  response: t.string(),
  userId: t.string(),
  videoQuestionId: t.string(),
  videoQuestionOptionId: t.string(),
});

export type QuestionAnswers = t.TypeOf<typeof QuestionAnswersDecoder>;

export const QuestionDecoder = t.object({
  id: t.string(),
  title: t.string(),
  description: t.string().nullish(),
  type: t.string(),
  createdAt: t.string(),
  updatedAt: t.string(),
  options: QuestionOptionDecoder.array(),
  answers: QuestionAnswersDecoder.array(),
});

export type Question = t.TypeOf<typeof QuestionDecoder>;

export type GetQuestionParams = {
  videoId?: string;
};

export type GetQuestionAnswersParams = {
  questionId?: string;
};

interface PostQuestionAnswers {
  optionId: string;
  response: string;
}

export type PostQuestionAnswersParams = {
  questionId: string;
  answers: PostQuestionAnswers[];
};

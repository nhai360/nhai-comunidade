import get from "lodash/get";
import * as t from "zod";

export const FeatureDecoder = t.enum([
  "EXAMPLE",
  "PROFILE",
  "LIKES_COMMENTS",
  "ARTICLES_SECTION",
  "ACTIONS_COMMENTS",
  "CREATE_POLL",
  "CREATE_DISCUSSION",
  "FILTER_TRENDING",
]);

export type Feature = t.TypeOf<typeof FeatureDecoder>;

type OpenFlags = Record<Feature, boolean>;

const environment = process.env.NEXT_PUBLIC_ENVIRONMENT ?? "prod";

const openFlags: OpenFlags = {
  EXAMPLE: true,
  PROFILE: true,
  LIKES_COMMENTS: true,
  ARTICLES_SECTION: true,
  ACTIONS_COMMENTS: true,
  CREATE_POLL: true,
  CREATE_DISCUSSION: true,
  FILTER_TRENDING: true,
};

const featureFlags: Record<string, OpenFlags> = {
  staging: openFlags,
  test: openFlags,
  dev: openFlags,
};

export function useFeatureFlag(feature: Feature) {
  const isEnabled = get(featureFlags[environment], feature, false);

  return { isEnabled };
}

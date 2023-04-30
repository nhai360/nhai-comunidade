import get from "lodash/get";
import * as t from "zod";

export const FeatureDecoder = t.enum([
  "EXAMPLE",
  "ARTICLES_SECTION",
  "CREATE_DISCUSSION",
  "FILTER_TRENDING",
  "PROFILE_LOCATION",
  "PROFILE_STATISTICS",
]);

export type Feature = t.TypeOf<typeof FeatureDecoder>;

type OpenFlags = Record<Feature, boolean>;

const environment = process.env.NEXT_PUBLIC_ENVIRONMENT ?? "prod";

const openFlags: OpenFlags = {
  EXAMPLE: true,
  ARTICLES_SECTION: true,
  CREATE_DISCUSSION: true,
  FILTER_TRENDING: true,
  PROFILE_LOCATION: true,
  PROFILE_STATISTICS: true,
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

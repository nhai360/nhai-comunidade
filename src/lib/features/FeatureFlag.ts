import get from "lodash/get";
import * as t from "zod";

export const FeatureDecoder = t.enum(["EXAMPLE", "PROFILE"]);

export type Feature = t.TypeOf<typeof FeatureDecoder>;

type OpenFlags = Record<Feature, boolean>;

const environment = process.env.NEXT_PUBLIC_ENVIRONMENT ?? "prod";

const openFlags: OpenFlags = {
  EXAMPLE: true,
  PROFILE: true,
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

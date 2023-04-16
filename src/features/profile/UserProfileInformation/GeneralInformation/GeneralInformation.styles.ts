import { styled } from "@/../stitches.config";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginTop: "$6",

  ".public-DraftStyleDefault-block": {
    color: "$textSecondary",
    fontSize: "$caption",
  },
});

export const InformationField = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$2",
});

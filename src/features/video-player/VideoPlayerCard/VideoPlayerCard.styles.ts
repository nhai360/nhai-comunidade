import { styled } from "@/../stitches.config";

export const UserAndLikeContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const UserContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$3",
});

export const UserInformationContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const TimeLabel = styled("time", {
  marginLeft: "$3",
  color: "$textSecondary",

  fontSize: "$caption",
  lineHeight: "$caption",

  alignSelf: "flex-start",
  textTransform: "capitalize",
});

import { styled } from "@/../stitches.config";

export const ThumbnailImage = styled("img", {
  width: "100%",
  objectFit: "cover",

  height: "161px",
  borderRadius: "24px",
});

export const UserContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  marginTop: "$3",
  gap: "$3",
});

export const UserInformationContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
});

export const TimeLabel = styled("time", {
  marginLeft: "auto",
  color: "$textSecondary",

  fontSize: "$caption",
  lineHeight: "$caption",

  alignSelf: "flex-start",
  textTransform: "capitalize",
});

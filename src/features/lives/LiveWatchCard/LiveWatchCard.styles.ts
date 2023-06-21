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

export const LiveIndicator = styled("div", {
  alignSelf: "flex-end",
  display: "flex",
  alignItems: "center",
  backgroundColor: "red",
  borderRadius: 4,
  padding: "2px 6px",
  marginBottom: 4,
});

export const Circle = styled("div", {
  backgroundColor: "white",
  borderRadius: 300,
  width: 6,
  height: 6,
  marginRight: 4,
});

export const ThumbContainer = styled("div", {
  display: "flex",
});

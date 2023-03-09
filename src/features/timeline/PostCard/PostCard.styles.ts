import { styled } from "@/../stitches.config";

export const Footer = styled("footer", {
  display: "flex",
  flexDirection: "column",

  padding: "$6",
});

export const Likes = styled("div", {
  display: "flex",
  alignItems: "center",
});

export const LikeActions = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$2",
  marginLeft: "auto",
});

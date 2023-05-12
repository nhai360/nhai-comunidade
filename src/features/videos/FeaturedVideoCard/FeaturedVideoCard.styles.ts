import { styled } from "@/../stitches.config";

export const Content = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$8",
});

export const Actions = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$3",
});

export const Thumbnail = styled("img", {
  width: "392px",
  height: "330px",

  objectFit: "cover",
  borderRadius: "24px",
});

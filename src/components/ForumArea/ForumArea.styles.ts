import { styled } from "@/../stitches.config";

export const Container = styled("div", {
  position: "relative",
  marginTop: "$8",
});

export const List = styled("ul", {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",

  display: "flex",
  flexDirection: "column",
  gap: "$6",

  paddingBottom: "$8",
});

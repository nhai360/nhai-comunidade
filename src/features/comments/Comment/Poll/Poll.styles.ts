import { styled } from "@/../stitches.config";

export const OptionsList = styled("ul", {
  display: "flex",
  flexDirection: "column",
  gap: "$2",
});

export const OptionItem = styled("li", {
  display: "flex",
  alignItems: "flex-start",
  gap: "$4",
});

export const Content = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "$2",
});

export const Label = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

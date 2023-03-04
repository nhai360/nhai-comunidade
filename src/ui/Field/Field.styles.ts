import { styled } from "@/../stitches.config";

export const Container = styled("fieldset", {
  border: 0,

  display: "flex",
  flexDirection: "column",
  gap: "$3",

  width: "100%",
});

export const LabelContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

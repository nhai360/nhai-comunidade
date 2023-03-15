import { styled } from "@/../stitches.config";

export const Container = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "$8",
  marginTop: "$8",

  width: "100%",
});

export const FieldContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$6",
  maxWidth: "442px",
  marginBottom: "$6",
});

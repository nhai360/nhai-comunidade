import { styled } from "@/../stitches.config";

export const Form = styled("form", {
  display: "flex",
  flexDirection: "column",

  marginTop: "$4",
  gap: "$3",
});

export const Actions = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
});

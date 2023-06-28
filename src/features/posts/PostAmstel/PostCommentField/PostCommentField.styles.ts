import { styled } from "@/../stitches.config";

export const Form = styled("form", {
  display: "flex",
  alignItems: "flex-start",
  gap: "$4",
  marginTop: "$6",
});

export const Action = styled("button", {
  all: "unset",

  display: "grid",
  placeItems: "flex-end",

  height: "34px",
  cursor: "pointer",

  transition: "all 0.2s",

  "&:hover": {
    opacity: 0.7,
  },
});

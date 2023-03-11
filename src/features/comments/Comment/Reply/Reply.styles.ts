import { styled } from "@/../stitches.config";

export const SeeMoreButton = styled("button", {
  all: "unset",
  cursor: "pointer",
  marginRight: "auto",

  fontWeight: 600,
  transition: "all 0.2s",

  "&:not(:disabled):hover": {
    opacity: 0.8,
  },
});

export const RepliesList = styled("ul", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "$6",
});

export const Content = styled("div", {
  maxWidth: "460px",
});

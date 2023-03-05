import { styled } from "@/../stitches.config";

export const Container = styled("div", {
  display: "flex",
  gap: "$6",
});

export const Form = styled("form", {
  display: "flex",
  flexDirection: "column",

  flex: 1,
  gap: "$4",
});

export const Footer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const Actions = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$2",
});

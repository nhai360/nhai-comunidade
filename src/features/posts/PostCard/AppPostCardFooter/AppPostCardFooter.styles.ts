import { styled } from "@/../stitches.config";

export const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  padding: "$4",
});

export const Action = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$6",
});
